import React, { forwardRef, useRef } from "react";
import { Text } from "react-konva";

const KonvaText = forwardRef(
  ({ shape, isSelected, onSelect, onChange }, ref) => {
    const localRef = ref || useRef();

    if (!shape || !shape.props) {
      console.error("Invalid shape props provided to KonvaText");
      return null;
    }

    const defaultStyles = {
      fontSize: 20,
      fontFamily: "Poppins, Arial",
      fill: "#111",
      padding: 5,
      letterSpacing: 0,
      lineHeight: 1.2,
      textDecoration: "",
      align: "left",
    };

   const handleDblClick = (e) => {
  try {
    const textNode = e.target;
    const stage = textNode.getStage();

    // stage container position
    const stageBox = stage.container().getBoundingClientRect();

    // current zoom scale
    const scaleX = stage.scaleX();
    const scaleY = stage.scaleY();

    // text absolute position inside stage
    const absPos = textNode.getAbsolutePosition();

    // create textarea
    const area = document.createElement("textarea");

    let cleaned = false;

    const cleanup = () => {
      if (cleaned) return;
      cleaned = true;

      area.removeEventListener("keydown", onKeyDown);
      area.removeEventListener("blur", onBlur);

      if (area.parentNode) {
        area.parentNode.removeChild(area);
      }
    };

    const applyChanges = () => {
      onChange({
        ...shape,
        props: {
          ...shape.props,
          text: area.value,
        },
      });

      cleanup();
    };

    const onKeyDown = (ev) => {
      if (ev.key === "Enter" && !ev.shiftKey) {
        ev.preventDefault();
        applyChanges();
      }

      if (ev.key === "Escape") {
        cleanup();
      }
    };

    const onBlur = () => {
      applyChanges();
    };

    // CORRECT POSITION
    const areaX =
      stageBox.left +
      window.scrollX +
      absPos.x * scaleX;

    const areaY =
      stageBox.top +
      window.scrollY +
      absPos.y * scaleY;

    // styles
    Object.assign(area.style, {
      position: "absolute",

      top: `${areaY}px`,
      left: `${areaX}px`,

      width: `${Math.max(
        textNode.width() * scaleX,
        120
      )}px`,

      minHeight: "30px",

      fontSize: `${
        (shape.props.fontSize || 20) * scaleY
      }px`,

      fontFamily:
        shape.props.fontFamily || "Poppins",

      color: shape.props.fill || "#111",

      lineHeight:
        shape.props.lineHeight || 1.2,

      letterSpacing: `${
        shape.props.letterSpacing || 0
      }px`,

      textAlign: shape.props.align || "left",

      background: "white",
      border: "1px solid #ccc",
      borderRadius: "6px",

      padding: "4px",

      margin: "0px",

      overflow: "hidden",

      resize: "none",

      outline: "none",

      zIndex: 9999,
    });

    // rotation support
    const rotation = textNode.rotation();

    area.style.transformOrigin = "left top";

    area.style.transform =
      rotation !== 0
        ? `rotate(${rotation}deg)`
        : "";

    area.value = shape.props.text || "";

    document.body.appendChild(area);

    area.focus();

    area.select();

    area.addEventListener("keydown", onKeyDown);

    area.addEventListener("blur", onBlur);

  } catch (error) {
    console.error("Error in handleDblClick:", error);
  }
};

    return (
      <Text
        ref={localRef}
        id={shape.id}
        x={shape.x}
        y={shape.y}
        text={shape.props.text}
        fontSize={shape.props.fontSize || defaultStyles.fontSize}
        fontFamily={shape.props.fontFamily || defaultStyles.fontFamily}
        fill={shape.props.fill || defaultStyles.fill}
        rotation={shape.rotation || 0}
        draggable
        padding={shape.props.padding || defaultStyles.padding}
        letterSpacing={shape.props.letterSpacing || defaultStyles.letterSpacing}
        lineHeight={shape.props.lineHeight || defaultStyles.lineHeight}
        textDecoration={
          shape.props.textDecoration || defaultStyles.textDecoration
        }
        align={shape.props.align || defaultStyles.align}
        opacity={shape.props.opacity || 1}
        shadowColor={shape.props.shadowColor}
        shadowBlur={shape.props.shadowBlur}
        shadowOffset={shape.props.shadowOffset}
        shadowOpacity={shape.props.shadowOpacity}
        stroke={isSelected ? shape.props.outlineColor || "#1976d2" : undefined}
        strokeWidth={isSelected ? 2 : 0}
        dash={isSelected ? [4, 4] : []}
        onClick={(e) => {
          e.cancelBubble = true;
          if (typeof onSelect === "function") onSelect(shape.id);
        }}
        onTap={(e) => {
          e.cancelBubble = true;
          if (typeof onSelect === "function") onSelect(shape.id);
        }}
        onDblClick={handleDblClick}
        onDragEnd={(e) => {
          try {
            onChange({
              ...shape,
              x: e.target.x(),
              y: e.target.y(),
            });
          } catch (error) {
            console.error("Error in onDragEnd:", error);
          }
        }}
        onTransformEnd={() => {
          try {
            const node = localRef.current;
            if (!node) return;

            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            node.scaleX(1);
            node.scaleY(1);

            const newFontSize = Math.max(
              6,
              (shape.props.fontSize || defaultStyles.fontSize) * scaleY
            );

            const newWidth = node.width() * scaleX;

            onChange({
              ...shape,
              x: node.x(),
              y: node.y(),
              rotation: node.rotation(),
              props: {
                ...shape.props,
                fontSize: newFontSize,
                width: newWidth,
              },
            });
          } catch (error) {
            console.error("Error in onTransformEnd:", error);
          }
        }}
      />
    );
  }
);

KonvaText.displayName = "KonvaText";

export default KonvaText;
