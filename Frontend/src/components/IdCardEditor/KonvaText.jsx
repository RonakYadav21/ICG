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
        const stage = e.target.getStage();
        const absPos = e.target.getAbsolutePosition();
        const stageBox = stage.container().getBoundingClientRect();
        const area = document.createElement("textarea");

        let cleaned = false;
        const cleanup = () => {
          if (cleaned) return;
          cleaned = true;
          try {
            area.removeEventListener("keydown", onKeyDown);
            area.removeEventListener("blur", onBlur);
          } catch (err) {
            // ignore
          }
          if (area.parentNode) {
            try {
              area.parentNode.removeChild(area);
            } catch (err) {
              // ignore
            }
          }
        };

        const applyChanges = () => {
          const newText = area.value;
          onChange({
            ...shape,
            props: {
              ...shape.props,
              text: newText,
            },
          });
          cleanup();
        };

        const onKeyDown = (ev) => {
          if (ev.key === "Enter" && !ev.shiftKey) {
            ev.preventDefault();
            applyChanges();
          } else if (ev.key === "Escape") {
            cleanup();
          }
        };

        const onBlur = () => {
          // blur can happen after keydown: guard in cleanup
          applyChanges();
        };

        const fontSize = shape.props.fontSize || defaultStyles.fontSize;
        const textareaStyles = {
          position: "absolute",
          top: `${stageBox.top + absPos.y}px`,
          left: `${stageBox.left + absPos.x}px`,
          fontSize: `${fontSize}px`,
          fontFamily: shape.props.fontFamily || defaultStyles.fontFamily,
          color: shape.props.fill || defaultStyles.fill,
          padding: `6px`,
          border: "1px solid rgba(0,0,0,0.15)",
          borderRadius: "4px",
          background: "rgba(255,255,255,0.95)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
          minWidth: "120px",
          minHeight: "24px",
          maxWidth: "60vw",
          maxHeight: "60vh",
          outline: "none",
          resize: "both",
          overflow: "auto",
          lineHeight: defaultStyles.lineHeight,
          letterSpacing: `${
            shape.props.letterSpacing || defaultStyles.letterSpacing
          }px`,
          textAlign: shape.props.align || defaultStyles.align,
          zIndex: 9999,
        };

        Object.assign(area.style, textareaStyles);
        area.value = shape.props.text || "";
        document.body.appendChild(area);
        area.focus();

        area.addEventListener("keydown", onKeyDown);
        area.addEventListener("blur", onBlur);

        // safety: if component unmounts, ensure cleanup
        const onBeforeUnload = () => cleanup();
        window.addEventListener("beforeunload", onBeforeUnload, { once: true });
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
