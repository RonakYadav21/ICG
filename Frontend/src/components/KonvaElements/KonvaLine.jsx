import { Line, Transformer } from "react-konva";
import React, { useRef, useEffect } from "react";

export default function KonvaLine({ shape, isSelected, onSelect, onChange }) {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected, shape.points]);

  return (
    <>
      <Line
        ref={shapeRef}
        id={shape.id}
        x={shape.x}
        y={shape.y}
        points={shape.points}
        stroke={shape.props.stroke}
        strokeWidth={shape.props.strokeWidth}
        hitStrokeWidth={20}
        dash={shape.props.dash?.length ? shape.props.dash : undefined}
        rotation={shape.rotation || 0}
        draggable
        onClick={(e) => {
          e.cancelBubble = true;
          onSelect(shape.id);
        }}
        onDragEnd={(e) => {
          onChange({ ...shape, x: e.target.x(), y: e.target.y() });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();

          node.scaleX(1);

          const newPoints = shape.points.map((p, i) =>
            i % 2 === 0 ? p * scaleX : p
          );

          onChange({
            ...shape,
            x: node.x(),
            y: node.y(),
            rotation: node.rotation(),
            points: newPoints,
          });
        }}
      />

      {isSelected && (
        <Transformer
          ref={trRef}
          rotateEnabled={true}
          enabledAnchors={["middle-left", "middle-right"]}
        />
      )}
    </>
  );
}
