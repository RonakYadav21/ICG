export const CanvasContainer = ({ width, height, children }) => {
  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        borderRadius: 16,
        background: "#f8fafc",
        display: "inline-block",
        border: "1px solid rgba(15,23,42,0.15)",
        overflow: "hidden",
        boxSizing: "border-box",
        boxShadow: "0 18px 40px -30px rgba(15,23,42,0.6)",
      }}
    >
      {children}
    </div>
  );
};

