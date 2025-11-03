import React from "react";
import IdCardEditor from "../components/IdCardEditor/IdCardEditor";
import ShowTemplate from "../components/ShowTemplate";
export default function EditorPage() {
  return (
    <div className="min-h-screen p-6">
      All Available templates:
      <ShowTemplate />

      Playground to create ID card template:
      <IdCardEditor />
    </div>
  );
}
