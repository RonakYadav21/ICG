import React from "react";
import { useState } from "react";

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
  const [copiedStyle, setCopiedStyle] = useState(null);

  if (!selectedElement) {
    // show canvas controls if nothing selected
    return (
      <div className="flex flex-col gap-4 rounded-3xl border border-white/70 bg-white/85 p-5 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.45)] backdrop-blur">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Canvas
          </p>
          <h3 className="text-lg font-semibold text-slate-900">
            Card Settings
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <label className="w-20 text-sm text-slate-600">Width</label>
          <input
            type="number"
            value={template.width}
            onChange={(e) =>
              onCanvasChange({ width: Math.max(50, Number(e.target.value)) })
            }
            className="w-28 rounded-xl border border-slate-200 bg-white/90 px-2 py-1 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none"
            min="50"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="w-20 text-sm text-slate-600">Height</label>
          <input
            type="number"
            value={template.height}
            onChange={(e) =>
              onCanvasChange({ height: Math.max(50, Number(e.target.value)) })
            }
            className="w-28 rounded-xl border border-slate-200 bg-white/90 px-2 py-1 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none"
            min="50"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="w-20 text-sm text-slate-600">Border</label>
          <input
            type="color"
            value={expandHex(template.borderColor || "#000000")}
            onChange={(e) => onCanvasChange({ borderColor: e.target.value })}
            className="h-10 w-10 rounded-lg border border-slate-200 shadow-sm"
          />
          <input
            type="number"
            value={template.borderWidth || 0}
            onChange={(e) =>
              onCanvasChange({
                borderWidth: Math.max(0, Number(e.target.value)),
              })
            }
            className="w-20 rounded-xl border border-slate-200 bg-white/90 px-2 py-1 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none"
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
      <div className="flex flex-col gap-4 rounded-3xl border border-white/70 bg-white/85 p-5 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.45)] backdrop-blur">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Text
          </p>
          <h3 className="text-lg font-semibold text-slate-900">
            Typography
          </h3>
        </div>

        {/* Font Family */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-slate-600">
            Font Family
          </label>
          <select
            value={selectedElement.props.fontFamily || "Poppins"}
            onChange={(e) => update({ fontFamily: e.target.value })}
            className="rounded-xl border border-slate-200 bg-white/90 p-2 text-sm text-slate-700 shadow-sm transition focus:border-slate-400 focus:outline-none"
          >
            <option value="Poppins">Poppins</option>
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
          </select>
        </div>

        {/* Font Size */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-slate-600">
            Size
          </label>
          <input
            type="number"
            value={selectedElement.props.fontSize || 20}
            onChange={(e) => update({ fontSize: Number(e.target.value) })}
            className="w-28 rounded-xl border border-slate-200 bg-white/90 p-2 text-sm text-slate-700 shadow-sm transition focus:border-slate-400 focus:outline-none"
            min="6"
            max="200"
          />
        </div>

        {/* Color Picker */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-slate-600">
            Color
          </label>
          <input
            type="color"
            value={currentColor}
            onChange={(e) => update({ fill: e.target.value })}
            className="h-12 w-12 cursor-pointer rounded-xl border border-slate-200 shadow-sm"
          />
        </div>
      </div>
    );
  }

  if (selectedElement.type === "rect") {
    const fill = expandHex(selectedElement.props.fill || "#ffffff");
    const stroke = expandHex(selectedElement.props.stroke || "#000000");
    return (
      <div className="flex flex-col gap-3 rounded-3xl border border-white/70 bg-white/85 p-5 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.45)] backdrop-blur">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Shape
          </p>
          <h3 className="text-lg font-semibold text-slate-900">Rectangle</h3>
        </div>

        <div className="flex items-center gap-2">
          <label className="w-24 text-sm text-slate-600">Fill</label>
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
            className="h-10 w-10 rounded-lg border border-slate-200 shadow-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="w-24 text-sm text-slate-600">Stroke</label>
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
            className="h-10 w-10 rounded-lg border border-slate-200 shadow-sm"
          />
          <label className="w-20 text-sm text-slate-600">Width</label>
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
            className="w-20 rounded-xl border border-slate-200 bg-white/90 px-2 py-1 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none"
            min="0"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="w-24 text-sm text-slate-600">Corner</label>
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
            className="w-20 rounded-xl border border-slate-200 bg-white/90 px-2 py-1 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none"
            min="0"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="w-24 text-sm text-slate-600">Width</label>
          <input
            type="number"
            value={selectedElement.width || selectedElement.props.width || 100}
            onChange={(e) =>
              update({ width: Math.max(1, Number(e.target.value)) })
            }
            className="w-28 rounded-xl border border-slate-200 bg-white/90 px-2 py-1 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none"
            min="1"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="w-24 text-sm text-slate-600">Height</label>
          <input
            type="number"
            value={selectedElement.height || selectedElement.props.height || 60}
            onChange={(e) =>
              update({ height: Math.max(1, Number(e.target.value)) })
            }
            className="w-28 rounded-xl border border-slate-200 bg-white/90 px-2 py-1 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none"
            min="1"
          />
        </div>
        {/* Copy / Paste Style Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            className="flex-1 rounded-2xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            onClick={() => setCopiedStyle({ ...selectedElement.props })}
          >
            Copy Style
          </button>

          <button
            className={`flex-1 rounded-2xl bg-emerald-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600 ${
              copiedStyle ? "" : "opacity-50 cursor-not-allowed"
            }`}
            onClick={() => {
              if (copiedStyle) {
                onChange({
                  ...selectedElement,
                  props: { ...selectedElement.props, ...copiedStyle },
                });
              }
            }}
            disabled={!copiedStyle}
          >
            Paste Style
          </button>
        </div>
      </div>
    );
  }
  if (selectedElement.type === "line") {
    return (
      <>
        <div className="flex flex-col gap-4 rounded-3xl border border-white/70 bg-white/85 p-5 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.45)] backdrop-blur">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Shape
            </p>
            <h3 className="text-lg font-semibold text-slate-900">Line</h3>
          </div>

          {/* Stroke Color */}
          <div className="flex items-center gap-3">
            <label className="w-24 text-sm text-slate-600 font-medium">
              Stroke Color:
            </label>
            <input
              type="color"
              value={selectedElement.props.stroke}
              onChange={(e) =>
                onChange({
                  ...selectedElement,
                  props: { ...selectedElement.props, stroke: e.target.value },
                })
              }
              className="h-10 w-10 rounded-lg border border-slate-200 shadow-sm cursor-pointer"
            />
          </div>

          {/* Stroke Width */}
          <div className="flex items-center gap-3">
            <label className="w-24 text-sm text-slate-600 font-medium">
              Stroke Width:
            </label>
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
              className="w-20 rounded-xl border border-slate-200 bg-white/90 px-2 py-1 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none"
            />
          </div>

          {/* Line Style */}
          <div className="flex items-center gap-3">
            <label className="w-24 text-sm text-slate-600 font-medium">
              Line Style:
            </label>
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
                  props: { ...selectedElement.props, dash },
                });
              }}
              className="rounded-xl border border-slate-200 bg-white/90 p-1 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none"
            >
              <option value="solid">Solid</option>
              <option value="dash">Dashed</option>
              <option value="dot">Dotted</option>
            </select>
          </div>

          {/* Copy / Paste Style Buttons */}
          <div className="flex gap-2 mt-4">
            <button
              className="flex-1 rounded-2xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              onClick={() => setCopiedStyle({ ...selectedElement.props })}
            >
              Copy Style
            </button>

            <button
              className={`flex-1 rounded-2xl bg-emerald-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600 ${
                copiedStyle ? "" : "opacity-50 cursor-not-allowed"
              }`}
              onClick={() => {
                if (copiedStyle) {
                  onChange({
                    ...selectedElement,
                    props: { ...selectedElement.props, ...copiedStyle },
                  });
                }
              }}
              disabled={!copiedStyle}
            >
              Paste Style
            </button>
          </div>
        </div>
      </>
    );
  }

  return null;
};

export default ElementStyleControls;
