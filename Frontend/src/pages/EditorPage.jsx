import React from "react";
import { useState } from "react";
import IdCardEditor from "../components/IdCardEditor/IdCardEditor";
import ShowTemplate from "../components/ShowTemplate";
import TemplateList from "../components/IdCardEditor/TemplateList";
export default function EditorPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  return (
    <div className="min-h-screen p-6">
      All Available templates:
      {/* <ShowTemplate /> */}
      Playground to create ID card template:
      <div className="flex">
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

        <IdCardEditor initialTemplate={selectedTemplate} />
      </div>
    </div>
  );
}
