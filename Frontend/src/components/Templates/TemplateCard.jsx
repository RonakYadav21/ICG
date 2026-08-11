import { Layer, Rect, Stage, Text } from "react-konva";
import { FiEdit3 } from "react-icons/fi";
import { parseTemplateElements } from "../../utils/templateUtils";

const PreviewElement = ({ element }) => {
  if (element.type === "rect")
    return (
      <Rect
        x={element.x || 0}
        y={element.y || 0}
        width={element.width || 100}
        height={element.height || 50}
        fill={element.props?.fill || "#fff"}
        stroke={element.props?.stroke}
        strokeWidth={element.props?.strokeWidth || 0}
        cornerRadius={element.props?.cornerRadius || 0}
        rotation={element.rotation || 0}
      />
    );
  if (element.type === "line")
    return (
      <Text
        x={element.x || 0}
        y={element.y || 0}
        text="—"
        fontSize={element.props?.strokeWidth ? 18 : 12}
        fill={element.props?.stroke || "#000"}
      />
    );
  if (element.type === "text")
    return (
      <Text
        x={element.x || 0}
        y={element.y || 0}
        text={element.props?.text || "Text"}
        fontSize={element.props?.fontSize || 20}
        fontFamily={element.props?.fontFamily || "Arial"}
        fill={element.props?.fill || "#222"}
        rotation={element.rotation || 0}
      />
    );
  if (element.type === "image")
    return (
      <Rect
        x={element.x || 0}
        y={element.y || 0}
        width={element.width || 100}
        height={element.height || 100}
        fill="#f9dec9"
        cornerRadius={6}
        stroke="#d99a74"
        dash={[5, 4]}
      />
    );
  return null;
};

export default function TemplateCard({ template, onSelect, onOpen, selected }) {
  const elements = parseTemplateElements(template);
  const width = Number(template.width) || 800;
  const height = Number(template.height) || 500;
  const scale = Math.min(240 / width, 145 / height);

  return (
    <button
      onClick={() => onSelect?.(template)}
      onDoubleClick={() => onOpen?.(template)}
      className={`group overflow-hidden rounded-2xl border text-left transition ${selected ? "border-primary ring-2 ring-primary/20" : "border-[#e9c9b0] hover:-translate-y-1 hover:border-[#d99a74]"}`}
    >
      <div className="flex h-44 items-center justify-center bg-[#f6e8da] p-4">
        <div
          className="overflow-hidden rounded-lg shadow-md"
          style={{ width: width * scale, height: height * scale }}
        >
          <Stage
            width={width * scale}
            height={height * scale}
            scaleX={scale}
            scaleY={scale}
          >
            <Layer>
              <Rect
                width={width}
                height={height}
                fill={template.backgroundColor || "#fff"}
                stroke={template.borderColor}
                strokeWidth={template.borderWidth || 0}
              />
              {elements.map((element) => (
                <PreviewElement key={element.id} element={element} />
              ))}
            </Layer>
          </Stage>
        </div>
      </div>
      <div className="bg-white p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-heading">
              {template.name || "Untitled template"}
            </h3>
            <p className="mt-1 text-xs text-[#8b6a59]">
              {width} × {height}px · {elements.length} elements
            </p>
          </div>
          <FiEdit3 className="mt-1 text-primary opacity-0 transition group-hover:opacity-100" />
        </div>
      </div>
    </button>
  );
}
