import React, { useState } from "react";
import PlaceholderSelector from "./PlaceholderSelector";
import { FiFilePlus, FiTrash2 } from "react-icons/fi";
import { MdLineStyle, MdRectangle, MdImage } from "react-icons/md";

const Sidebar = ({ onAddText, onAddImage, onAddRect, onDelete, onAddLine }) => {
  return (
    <>
      <div className="rounded-3xl border border-white/70 bg-white/85 p-5 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.45)] backdrop-blur flex flex-col gap-6">
        {/* --- PLACEHOLDERS --- */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 mb-3">
            Placeholders
          </h4>
          <div className="flex flex-col gap-2">
            <PlaceholderSelector addText={onAddText} addImage={onAddImage} />
          </div>
        </div>

        {/* --- ELEMENTS --- */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 mb-3">
            Elements
          </h4>
          <div className="flex flex-col gap-2">
            <button
              onClick={onAddLine}
              className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-3 py-2 text-slate-700 font-medium transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white"
            >
              <MdLineStyle /> Add Line
            </button>
            <button
              onClick={onAddText}
              className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-3 py-2 text-slate-700 font-medium transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white"
            >
              <FiFilePlus /> Add Text
            </button>
            <button
              onClick={onAddRect}
              className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-3 py-2 text-slate-700 font-medium transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white"
            >
              <MdRectangle /> Add Rectangle
            </button>
            <button
              onClick={() => onAddImage("static")}
              className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-3 py-2 text-slate-700 font-medium transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white"
            >
              <MdImage /> Add Logo
            </button>
            <button
              onClick={() => onAddImage("placeholder")}
              className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-3 py-2 text-slate-700 font-medium transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white"
            >
              <MdImage /> Add Photo Placeholder
            </button>
            <button
              onClick={onDelete}
              className="flex items-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-3 py-2 text-red-600 font-medium transition hover:-translate-y-0.5 hover:bg-red-100"
            >
              <FiTrash2 /> Delete Selected
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
