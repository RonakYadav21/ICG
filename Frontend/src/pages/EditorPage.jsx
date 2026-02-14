import React from "react";
import { useState } from "react";
import IdCardEditor from "../components/IdCardEditor/IdCardEditor";
import TemplateList from "../components/IdCardEditor/TemplateList";
export default function EditorPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  return (
    <div className="">
      <div className="w-full mb-10">
        <TemplateList
          onSelect={(temp) => {
            const parsedElements = JSON.parse(temp.elementsJson);
            const parsedMeta = temp.meta ? JSON.parse(temp.meta) : {};

            setSelectedTemplate({
              name: temp.name,
              width: temp.width,
              height: temp.height,
              backgroundColor: temp.backgroundColor,
              borderColor: temp.borderColor,
              borderWidth: temp.borderWidth,
              elements: parsedElements,
              meta: parsedMeta,
              id: temp.id,
            });
          }}
        />
      </div>
      <IdCardEditor initialTemplate={selectedTemplate} />
    </div>
  );
}
