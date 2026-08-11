import { Rect } from "react-konva";
import KonvaImage from "../KonvaElements/KonvaImage";
import KonvaLine from "../KonvaElements/KonvaLine";
import KonvaText from "../KonvaElements/KonvaText";

export default function ElementRenderer({ element, selectedId, onSelect, onChange }) {
  const common = { shape: element, isSelected: element.id === selectedId, onSelect, onChange };
  if (element.type === "text") return <KonvaText {...common} />;
  if (element.type === "image") return <KonvaImage {...common} />;
  if (element.type === "line") return <KonvaLine {...common} />;
  if (element.type !== "rect") return null;
  const props = element.props || {};
  return <Rect id={element.id} x={element.x || 0} y={element.y || 0} width={element.width || 100} height={element.height || 50} fill={props.fill || "#fff"} stroke={props.stroke} strokeWidth={props.strokeWidth || 0} cornerRadius={props.cornerRadius || 0} rotation={element.rotation || 0} draggable onClick={(event) => { event.cancelBubble = true; onSelect(element.id); }} onTap={(event) => { event.cancelBubble = true; onSelect(element.id); }} onDragEnd={(event) => onChange({ ...element, x: event.target.x(), y: event.target.y() })} onTransformEnd={(event) => { const node = event.target; const xScale = node.scaleX(); const yScale = node.scaleY(); node.scaleX(1); node.scaleY(1); onChange({ ...element, x: node.x(), y: node.y(), rotation: node.rotation(), width: Math.max(1, Math.round(node.width() * xScale)), height: Math.max(1, Math.round(node.height() * yScale)) }); }} />;
}
