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
    <div className="w-64 bg-white rounded-xl shadow-lg p-4 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
      <h2 className="text-lg font-bold text-gray-700">Saved Templates</h2>

      {templates.length === 0 && (
        <p className="text-gray-400 text-sm">No templates saved yet.</p>
      )}

      <div className="flex flex-col gap-2">
        {templates.map((temp) => (
          <button
            key={temp.id}
            onClick={() => handleSelect(temp)}
            className={`w-full text-left px-3 py-2 rounded-lg font-medium border transition-colors
              ${
                selectedId === temp.id
                  ? "bg-primary text-white border-blue-600"
                  : "bg-gray-50 text-gray-800 border-gray-200 hover:bg-blue-100"
              }
            `}
          >
            {temp.name}
          </button>
        ))}
      </div>
    </div>
  );
}
