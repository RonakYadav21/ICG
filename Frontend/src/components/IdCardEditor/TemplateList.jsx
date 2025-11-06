import { useState, useEffect } from "react";
import api from "../../utils/axios";
export default function TemplateList({ onSelect }) {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    api
      .get("/templates")
      .then((res) => setTemplates(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-4 border w-60">
      <h2 className="text-lg font-bold mb-2">Saved Templates</h2>

      {templates.map((temp) => (
        <button
          key={temp.id}
          className="block w-full text-left p-2 border-b bg-red-400 m-2 text-white"
          onClick={() => onSelect(temp)}
        >
          {temp.name}
        </button>
      ))}
    </div>
  );
}
