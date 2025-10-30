export const CanvasContainer = ({ width, height, children }) => {
  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        borderRadius: 12,
        background: "#f3f4f6",
        display: "inline-block",
        border: "1px solid #d1d5db",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  );
};


