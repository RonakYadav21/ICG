import React, { useState } from "react";
import GenerateModal from "./GenerateModal";

const Sidebar = ({
  onAddText,
  onAddImage,
  onAddRect,
  onDelete,
  onSave,
  onPreview,
  onGenerateCards,
}) => {
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  const handleGenerate = (selectedStudents) => {
    onGenerateCards(selectedStudents);
    setShowGenerateModal(false);
  };

  return (
    <>
      <div className="w-48 bg-white rounded shadow p-4 space-y-3">
        {/* Design Tools */}
        <div className="space-y-2 pb-4 border-b">
          <button
            onClick={onAddText}
            className="w-full p-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
          >
            Add Text
          </button>
          <button
            onClick={onAddRect}
            className="w-full p-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
          >
            Add Rectangle
          </button>
          <button
            onClick={() => onAddImage("static")}
            className="w-full p-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
          >
            Add Logo
          </button>
          <button
            onClick={() => onAddImage("placeholder")}
            className="w-full p-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
          >
            Add Photo Placeholder
          </button>
          <button
            onClick={onDelete}
            className="w-full p-2 bg-red-50 text-red-600 rounded hover:bg-red-100 text-sm"
          >
            Delete Selected
          </button>
        </div>

        {/* Template Actions */}
        <div className="space-y-2 pt-2">
          <button
            onClick={onSave}
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm font-medium"
          >
            Save Template
          </button>
          <button
            onClick={onPreview}
            className="w-full p-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
          >
            Preview
          </button>
          <button
            onClick={() => setShowGenerateModal(true)}
            className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm font-medium"
          >
            Generate ID Cards
          </button>
        </div>
      </div>

      <GenerateModal
        isOpen={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
        onGenerate={handleGenerate}
      />
    </>
  );
};

export default Sidebar;
