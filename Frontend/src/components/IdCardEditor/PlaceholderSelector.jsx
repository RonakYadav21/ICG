import React, { useEffect, useState } from "react";
import { getStudentsByCourse } from "../../api/templatesApi";

const PlaceholderSelector = ({ addImage, addText }) => {
  const [placeholders, setPlaceholders] = useState([]);
  useEffect(() => {
    const fetchPlaceholders = async () => {
      try {
        const students = await getStudentsByCourse("92011"); // any course to get all fields
        if (!students || students.length === 0) return;

        const student = students[0];

        const fields = Object.keys(student)
          .filter((key) => key !== "firstName" && key !== "lastName")
          .map((key) => ({
            key,
            label: key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase()),
            type: key.toLowerCase().includes("photo") ? "image" : "text",
          }));

        fields.unshift({
          key: "fullName",
          label: "Full Name",
          type: "text",
        });

        setPlaceholders(fields);
      } catch (err) {
        console.error("Failed to fetch placeholders:", err);
      }
    };

    fetchPlaceholders();
  }, []);

  const handleAddPlaceholder = (placeholderKey, placeholderType) => {
    if (!placeholderKey) return;

    if (placeholderType === "image") {
      addImage("placeholder");
    } else {
      addText(`{{${placeholderKey}}}`);
    }
  };

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-sm">
      <label className="text-sm font-semibold text-slate-700">
        Add Placeholder
      </label>
      <select
        onChange={(e) => {
          const selectedKey = e.target.value;
          const placeholder = placeholders.find((p) => p.key === selectedKey);
          if (!placeholder) return;
          handleAddPlaceholder(placeholder.key, placeholder.type);
          e.target.value = "";
        }}
        className="rounded-xl border border-slate-200 bg-white/90 p-2 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none"
        defaultValue=""
      >
        <option value="">Select Placeholder...</option>
        {placeholders.map((p) => (
          <option key={p.key} value={p.key}>
            {p.label} ({p.type})
          </option>
        ))}
      </select>
    </div>
  );
};

export default PlaceholderSelector;
