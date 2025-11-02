import { useRef } from "react";

export const CanvasResizer = ({ width, height, onResize }) => {
  // width/height are canvas px (already multiplied by zoom)
  const startRef = useRef(null);

  const onMouseDown = (e, corner) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = width;
    const startH = height;
    startRef.current = { startX, startY, startW, startH, corner };

    const onMove = (me) => {
      me.preventDefault();
      const deltaX = me.clientX - startX;
      const deltaY = me.clientY - startY;
      let newW = startW;
      let newH = startH;

      switch (corner) {
        case "se":
          newW = Math.max(80, startW + deltaX);
          newH = Math.max(50, startH + deltaY);
          break;
        case "sw":
          newW = Math.max(80, startW - deltaX);
          newH = Math.max(50, startH + deltaY);
          break;
        case "ne":
          newW = Math.max(80, startW + deltaX);
          newH = Math.max(50, startH - deltaY);
          break;
        case "nw":
          newW = Math.max(80, startW - deltaX);
          newH = Math.max(50, startH - deltaY);
          break;
        default:
          newW = Math.max(80, startW + deltaX);
          newH = Math.max(50, startH + deltaY);
      }

      // call onResize with new canvas px sizes
      onResize(Math.round(newW), Math.round(newH));
    };

    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  const handleStyle = {
    width: 12,
    height: 12,
    background: "#1976d2",
    position: "absolute",
    borderRadius: 6,
    cursor: "pointer",
    zIndex: 9999,
    border: "2px solid white",
    boxShadow: "0 0 4px rgba(0,0,0,0.3)",
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none", // allow stage interactions except the handles
      }}
    >
      <div
        style={{
          ...handleStyle,
          top: -6,
          left: -6,
          cursor: "nw-resize",
          pointerEvents: "auto",
        }}
        onMouseDown={(e) => onMouseDown(e, "nw")}
      />
      <div
        style={{
          ...handleStyle,
          top: -6,
          right: -6,
          cursor: "ne-resize",
          pointerEvents: "auto",
        }}
        onMouseDown={(e) => onMouseDown(e, "ne")}
      />
      <div
        style={{
          ...handleStyle,
          bottom: -6,
          left: -6,
          cursor: "sw-resize",
          pointerEvents: "auto",
        }}
        onMouseDown={(e) => onMouseDown(e, "sw")}
      />
      <div
        style={{
          ...handleStyle,
          bottom: -6,
          right: -6,
          cursor: "se-resize",
          pointerEvents: "auto",
        }}
        onMouseDown={(e) => onMouseDown(e, "se")}
      />
    </div>
  );
};