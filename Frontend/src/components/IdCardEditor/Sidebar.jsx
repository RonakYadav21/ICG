import React, { useState } from "react";
import GenerateModal from "./GenerateModal";
import PlaceholderSelector from "./PlaceholderSelector";
import {
  FiFilePlus,
  FiTrash2,
  FiSave,
  FiDownload,
  FiEdit,
} from "react-icons/fi";
import { MdLineStyle, MdRectangle, MdImage } from "react-icons/md";

const Sidebar = ({
  onAddText,
  onAddImage,
  onAddRect,
  onDelete,
  onSave,
  onUpdate,
  onTemplateDelete,
  onGenerateCards,
  onAddLine,
}) => {
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  const handleGenerate = (selectedStudents) => {
    onGenerateCards(selectedStudents);
    setShowGenerateModal(false);
  };

  return (
    <>
      <div className="w-60 bg-white rounded-xl shadow-lg p-4 flex flex-col gap-6">
        {/* --- PLACEHOLDERS --- */}
        <div>
          <h4 className="text-gray-600 font-semibold mb-2">Placeholders</h4>
          <div className="flex flex-col gap-2">
            <PlaceholderSelector addText={onAddText} addImage={onAddImage} />
          </div>
        </div>

        {/* --- ELEMENTS --- */}
        <div>
          <h4 className="text-gray-600 font-semibold mb-2">Elements</h4>
          <div className="flex flex-col gap-2">
            <button
              onClick={onAddLine}
              className="flex items-center gap-2 p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors text-gray-700 font-medium"
            >
              <MdLineStyle /> Add Line
            </button>
            <button
              onClick={onAddText}
              className="flex items-center gap-2 p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors text-gray-700 font-medium"
            >
              <FiFilePlus /> Add Text
            </button>
            <button
              onClick={onAddRect}
              className="flex items-center gap-2 p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors text-gray-700 font-medium"
            >
              <MdRectangle /> Add Rectangle
            </button>
            <button
              onClick={() => onAddImage("static")}
              className="flex items-center gap-2 p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors text-gray-700 font-medium"
            >
              <MdImage /> Add Logo
            </button>
            <button
              onClick={() => onAddImage("placeholder")}
              className="flex items-center gap-2 p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors text-gray-700 font-medium"
            >
              <MdImage /> Add Photo Placeholder
            </button>
            <button
              onClick={onDelete}
              className="flex items-center gap-2 p-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors font-medium"
            >
              <FiTrash2 /> Delete Selected
            </button>
          </div>
        </div>

        {/* --- TEMPLATE ACTIONS --- */}
        <div>
          <h4 className="text-gray-600 font-semibold mb-2">Template Actions</h4>
          <div className="flex flex-col gap-2">
            <button
              onClick={onSave}
              className="flex items-center gap-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-medium transition-colors"
            >
              <FiSave /> Save Template
            </button>
            <button
              onClick={() => setShowGenerateModal(true)}
              className="flex items-center gap-2 p-2 bg-green-500 text-white rounded hover:bg-green-600 font-medium transition-colors"
            >
              <FiDownload /> Generate ID Cards
            </button>
            {onUpdate && (
              <button
                onClick={onUpdate}
                className="flex items-center gap-2 p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 font-medium transition-colors"
              >
                <FiEdit /> Update Template
              </button>
            )}
            <button
              onClick={onTemplateDelete}
              className="flex items-center gap-2 p-2 bg-red-500 text-white rounded hover:bg-red-600 font-medium transition-colors"
            >
              <FiTrash2 /> Delete Template
            </button>
          </div>
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
