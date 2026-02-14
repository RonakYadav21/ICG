import { useState, useEffect } from "react";
import api from "../../utils/axios";

export default function TemplateList({ onSelect }) {
  const [templates, setTemplates] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    api
      .get("/templates")
      .then((res) => setTemplates(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSelect = (template) => {
    setSelectedId(template.id);
    onSelect(template);
  };

  return (
    <div className="w-full rounded-3xl border border-white/70 bg-white/85 p-5 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.45)] backdrop-blur">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Library
          </p>
          <h2 className="text-xl font-bold text-slate-900">Saved Templates</h2>
        </div>
        <span className="rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold text-slate-600">
          {templates.length}
        </span>
      </div>

      {templates.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-white/70 px-4 py-6 text-sm text-slate-500">
          No templates saved yet. Create one from the editor and it will show up
          here.
        </div>
      )}

      <div className="mt-6 flex flex-row gap-2 max-h-[55vh] overflow-auto pr-1 ">
        {templates.map((temp) => (
          <button
            key={temp.id}
            onClick={() => handleSelect(temp)}
            className={`w-full text-left px-4 py-3 rounded-2xl font-medium border transition-all
              ${
                selectedId === temp.id
                  ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20"
                  : "bg-white/80 text-slate-800 border-slate-200 hover:-translate-y-0.5 hover:border-slate-300  hover:bg-slate-900 hover:text-white"
              }
            `}
          >
            <div className="flex items-center justify-between ">
              <span>{temp.name}</span>
              <span
                className={`text-xs ${
                  selectedId === temp.id ? "text-white/70" : "text-slate-400"
                }`}
              >
                {temp.width}x{temp.height}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
