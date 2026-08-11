import { Layer, Rect, Stage, Transformer } from "react-konva";
import { CanvasContainer } from "./CanvasContainer";
import { CanvasResizer } from "./CanvasResizer";
import ElementRenderer from "./ElementRenderer";

export default function CanvasArea({
  template,
  elements,
  zoom,
  stageRef,
  layerRef,
  transformerRef,
  selectedId,
  onSelect,
  onChange,
  onResize,
}) {
  const width = template.width * zoom;
  const height = template.height * zoom;
  return (
    <section className="rounded-[28px] border border-[#e9c9b0] bg-[#fff8f0] p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a55c37]">
            Live preview
          </p>
          <h2 className="font-heading text-xl text-heading">
            Your card canvas
          </h2>
        </div>
        <span className="text-sm text-[#7a6256]">
          {template.width} × {template.height}px
        </span>
      </div>
      <div className="overflow-x-auto pb-3">
        <div
          className="mx-auto w-fit"
          style={{ position: "relative", width, height }}
        >
          <CanvasContainer width={width} height={height}>
            <Stage
              width={width}
              height={height}
              scaleX={zoom}
              scaleY={zoom}
              ref={stageRef}
              style={{ position: "absolute", left: 0, top: 0 }}
            >
              <Layer ref={layerRef}>
                <Rect
                  id="background"
                  width={template.width}
                  height={template.height}
                  fill={template.backgroundColor}
                  cornerRadius={12}
                  stroke={
                    template.borderWidth ? template.borderColor : undefined
                  }
                  strokeWidth={template.borderWidth || 0}
                />
                {elements.map((element) => (
                  <ElementRenderer
                    key={element.id}
                    element={element}
                    selectedId={selectedId}
                    onSelect={onSelect}
                    onChange={onChange}
                  />
                ))}
                <Transformer
                  ref={transformerRef}
                  rotateEnabled
                  anchorSize={8}
                  borderStroke="#dd6031"
                  anchorFill="#dd6031"
                />
              </Layer>
            </Stage>
          </CanvasContainer>
          <div
            className="absolute left-0 top-0 pointer-events-none"
            style={{ width, height }}
          >
            <CanvasResizer width={width} height={height} onResize={onResize} />
          </div>
        </div>
      </div>
    </section>
  );
}
