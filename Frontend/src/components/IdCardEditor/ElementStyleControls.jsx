import React from "react";

const expandHex = (hex) => {
  if (!hex) return "#000000";
  const h = hex.trim();
  if (/^#([0-9a-f]{6})$/i.test(h)) return h.toLowerCase();
  if (/^#([0-9a-f]{3})$/i.test(h)) {
    const s = h.slice(1).split("");
    return (
      "#" +
      s
        .map((c) => c + c)
        .join("")
        .toLowerCase()
    );
  }
  const rgbMatch = h.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (rgbMatch) {
    const r = Number(rgbMatch[1]).toString(16).padStart(2, "0");
    const g = Number(rgbMatch[2]).toString(16).padStart(2, "0");
    const b = Number(rgbMatch[3]).toString(16).padStart(2, "0");
    return `#${r}${g}${b}`;
  }
  return "#000000";
};
const ElementStyleControls = ({
  selectedElement,
  onChange,
  onCanvasChange,
  template,
}) => {
  if (!selectedElement) {
    // show canvas controls if nothing selected
    return (
      <div className="flex flex-col gap-3 p-4 bg-white rounded shadow">
        <h3 className="font-semibold text-lg">Canvas</h3>

        <div className="flex items-center gap-2">
          <label className="w-20">Width:</label>
          <input
            type="number"
            value={template.width}
            onChange={(e) =>
              onCanvasChange({ width: Math.max(50, Number(e.target.value)) })
            }
            className="border rounded p-1 w-28"
            min="50"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="w-20">Height:</label>
          <input
            type="number"
            value={template.height}
            onChange={(e) =>
              onCanvasChange({ height: Math.max(50, Number(e.target.value)) })
            }
            className="border rounded p-1 w-28"
            min="50"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="w-20">Border:</label>
          <input
            type="color"
            value={expandHex(template.borderColor || "#000000")}
            onChange={(e) => onCanvasChange({ borderColor: e.target.value })}
            className="w-10 h-10"
          />
          <input
            type="number"
            value={template.borderWidth || 0}
            onChange={(e) =>
              onCanvasChange({
                borderWidth: Math.max(0, Number(e.target.value)),
              })
            }
            className="border rounded p-1 w-20"
            min="0"
          />
        </div>
      </div>
    );
  }

  const update = (updates) => {
    onChange({
      ...selectedElement,
      props: {
        ...selectedElement.props,
        ...updates,
      },
      ...updates, // width/height at element root for non-text shapes
    });
  };
  if (selectedElement.type === "text") {
    const currentColor = expandHex(selectedElement.props.fill || "#000000");
    return (
      <div className="flex flex-col gap-3 p-4 bg-white rounded shadow">
        <h3 className="font-semibold text-lg">Text Style</h3>

        <select
          value={selectedElement.props.fontFamily || "Poppins"}
          onChange={(e) => update({ fontFamily: e.target.value })}
          className="border rounded p-2"
        >
          <option value="Poppins">Poppins</option>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
        </select>

        <div className="flex items-center gap-2">
          <label>Size:</label>
          <input
            type="number"
            value={selectedElement.props.fontSize || 20}
            onChange={(e) => update({ fontSize: Number(e.target.value) })}
            className="border rounded p-1 w-20"
            min="6"
            max="200"
          />
        </div>

        <div className="flex items-center gap-2">
          <label>Color:</label>
          <input
            type="color"
            value={currentColor}
            onChange={(e) => update({ fill: e.target.value })}
            className="w-10 h-10"
          />
        </div>

        <div className="flex gap-2">
          {["left", "center", "right"].map((align) => (
            <button
              key={align}
              onClick={() => update({ align })}
              className={`p-2 border rounded ${
                selectedElement.props.align === align
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
            >
              {align.charAt(0).toUpperCase() + align.slice(1)}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (selectedElement.type === "rect") {
    const fill = expandHex(selectedElement.props.fill || "#ffffff");
    const stroke = expandHex(selectedElement.props.stroke || "#000000");
    return (
      <div className="flex flex-col gap-3 p-4 bg-white rounded shadow">
        <h3 className="font-semibold text-lg">Rectangle</h3>

        <div className="flex items-center gap-2">
          <label className="w-24">Fill:</label>
          <input
            type="color"
            value={fill}
            onChange={(e) =>
              update({
                props: {
                  ...(selectedElement.props || {}),
                  fill: e.target.value,
                },
              })
            }
            className="w-10 h-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="w-24">Stroke:</label>
          <input
            type="color"
            value={stroke}
            onChange={(e) =>
              update({
                props: {
                  ...(selectedElement.props || {}),
                  stroke: e.target.value,
                },
              })
            }
            className="w-10 h-10"
          />
          <label className="w-20">Width:</label>
          <input
            type="number"
            value={
              selectedElement.props.strokeWidth ||
              selectedElement.strokeWidth ||
              0
            }
            onChange={(e) =>
              update({
                props: {
                  ...(selectedElement.props || {}),
                  strokeWidth: Number(e.target.value),
                },
                strokeWidth: Number(e.target.value),
              })
            }
            className="border rounded p-1 w-20"
            min="0"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="w-24">Corner:</label>
          <input
            type="number"
            value={
              selectedElement.props.cornerRadius ||
              selectedElement.cornerRadius ||
              0
            }
            onChange={(e) =>
              update({
                props: {
                  ...(selectedElement.props || {}),
                  cornerRadius: Number(e.target.value),
                },
                cornerRadius: Number(e.target.value),
              })
            }
            className="border rounded p-1 w-20"
            min="0"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="w-24">Width:</label>
          <input
            type="number"
            value={selectedElement.width || selectedElement.props.width || 100}
            onChange={(e) =>
              update({ width: Math.max(1, Number(e.target.value)) })
            }
            className="border rounded p-1 w-28"
            min="1"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="w-24">Height:</label>
          <input
            type="number"
            value={selectedElement.height || selectedElement.props.height || 60}
            onChange={(e) =>
              update({ height: Math.max(1, Number(e.target.value)) })
            }
            className="border rounded p-1 w-28"
            min="1"
          />
        </div>
      </div>
    );
  }
  if (selectedElement.type === "line") {
    return (
      <>
        <label>Stroke color</label>
        <input
          type="color"
          value={selectedElement.props.stroke}
          onChange={(e) =>
            onChange({
              ...selectedElement,
              props: { ...selectedElement.props, stroke: e.target.value },
            })
          }
        />

        <label>Stroke width</label>
        <input
          type="number"
          min={1}
          value={selectedElement.props.strokeWidth}
          onChange={(e) =>
            onChange({
              ...selectedElement,
              props: {
                ...selectedElement.props,
                strokeWidth: +e.target.value,
              },
            })
          }
        />

        <label>Line style</label>
        <select
          value={
            selectedElement.props.dash?.length === 0
              ? "solid"
              : selectedElement.props.dash?.join(",") === "6,4"
              ? "dash"
              : "dot"
          }
          onChange={(e) => {
            let dash = [];

            if (e.target.value === "dash") dash = [6, 4];
            if (e.target.value === "dot") dash = [2, 2];

            onChange({
              ...selectedElement,
              props: {
                ...selectedElement.props,
                dash,
              },
            });
          }}
        >
          <option value="solid">Solid</option>
          <option value="dash">Dashed</option>
          <option value="dot">Dotted</option>
        </select>
      </>
    );
  }

  return null;
};

export default ElementStyleControls;
