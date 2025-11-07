import React, { forwardRef, useRef, useEffect, useState } from "react";
import { Image, Group, Text, Rect } from "react-konva";
import useImage from "use-image";
import Konva from "konva";

const KonvaImage = forwardRef(
  ({ shape, isSelected, onSelect, onChange }, ref) => {
    const [img] = useImage(shape.props?.src || null, "anonymous");
    const localGroupRef = ref || useRef();
    const imageRef = useRef();
    const [loaded, setLoaded] = useState(false);

    // determine placeholder state and styles
    const isPlaceholder = shape.props?.placeholder;
    const placeholderStyles = {
      fill: shape.props?.backgroundColor || "#f3f4f6",
      stroke: shape.props?.borderColor || "#999999",
      strokeWidth: shape.props?.borderWidth ?? 2,
      cornerRadius: shape.props?.borderRadius ?? 8,
      label: shape.props?.label || "",
      labelColor: shape.props?.labelColor || "#666666",
      labelFontSize: shape.props?.fontSize || 14,
      labelFontStyle: shape.props?.fontStyle || "italic",
      opacity: shape.props?.opacity ?? 0.75,
    };

    useEffect(() => {
      setLoaded(!!img);
    }, [img]);

    // Called when Konva Image node is transformed (scaled/rotated)
    const handleImageTransformEnd = (e) => {
      const node = imageRef.current;
      if (!node) return;
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();

      // reset scale to 1 and compute new width/height
      node.scaleX(1);
      node.scaleY(1);

      const newW = Math.max(1, Math.round(node.width() * scaleX));
      const newH = Math.max(1, Math.round(node.height() * scaleY));

      // update parent state
      onChange({
        ...shape,
        x: node.x(),
        y: node.y(),
        rotation: node.rotation(),
        width: newW,
        height: newH,
      });
    };

    // When group dragged, update element position
    const handleDragEnd = (e) => {
      onChange({
        ...shape,
        x: Math.round(e.target.x()),
        y: Math.round(e.target.y()),
      });
    };

    // If transformer targets the image node, transform events occur on the image.
    // We attach transformEnd to the image node.
    return (
      <Group
        ref={localGroupRef}
        x={shape.x || 0}
        y={shape.y || 0}
        rotation={shape.rotation || 0}
        draggable
        onClick={(e) => {
          e.cancelBubble = true;
          onSelect && onSelect(shape.id);
        }}
        onTap={(e) => {
          e.cancelBubble = true;
          onSelect && onSelect(shape.id);
        }}
        onDragEnd={handleDragEnd}
      >
        {/* placeholder background / border */}
        {isPlaceholder && (
          <Rect
            x={0}
            y={0}
            width={shape.width || 100}
            height={shape.height || 100}
            fill={placeholderStyles.fill}
            stroke={placeholderStyles.stroke}
            strokeWidth={placeholderStyles.strokeWidth}
            dash={[6, 6]}
            cornerRadius={placeholderStyles.cornerRadius}
            shadowColor="#00000033"
            shadowBlur={4}
            shadowOffsetX={0}
            shadowOffsetY={2}
            perfectDrawEnabled={false}
          />
        )}

        {/* actual image (or placeholder src) */}

        <Image
          id={shape.id}
          ref={imageRef}
          image={img}
          width={shape.width || 100}
          height={shape.height || 100}
          opacity={
            isPlaceholder && !shape.props?.src
              ? placeholderStyles.opacity
              : shape.props?.opacity ?? 1
          }
          filters={
            isPlaceholder && !shape.props?.src ? [Konva.Filters.Grayscale] : []
          }
          onTransformEnd={handleImageTransformEnd}
          onDragEnd={(e) => {
            // if image node is dragged directly, sync position to group coords
            const node = e.target;
            onChange({
              ...shape,
              x: Math.round(node.x()),
              y: Math.round(node.y()),
            });
          }}
          // keep pointerEvents enabled so transformer can select image
          listening={true}
        />

        {/* placeholder label centered */}
        {isPlaceholder && (
          <>
            <Text
              text={placeholderStyles.label}
              fill={placeholderStyles.labelColor}
              fontSize={placeholderStyles.labelFontSize}
              fontStyle={placeholderStyles.labelFontStyle}
              align="center"
              width={shape.width || 100}
              y={
                (shape.height || 100) / 2 -
                (placeholderStyles.labelFontSize / 2 + 2)
              }
            />
          </>
        )}

        {/* selection indicator */}
        {isSelected && (
          <Rect
            x={-4}
            y={-4}
            width={(shape.width || 100) + 8}
            height={(shape.height || 100) + 8}
            stroke="#00a0ff"
            strokeWidth={2}
            dash={[4, 4]}
            cornerRadius={placeholderStyles.cornerRadius}
          />
        )}
      </Group>
    );
  }
);

KonvaImage.displayName = "KonvaImage";
export default KonvaImage;
