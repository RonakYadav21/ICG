import { FiDownload, FiEdit, FiSave, FiTrash2 } from "react-icons/fi";

const actionClass = "flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold";
export default function EditorActions({ onSave, onGenerate, onUpdate, onDelete, saving }) {
  return <section className="rounded-[28px] border border-[#e9c9b0] bg-[#fff8f0] p-5 shadow-sm"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a55c37]">Template actions</p><div className="mt-4 grid gap-2"><button disabled={saving} onClick={onSave} className={`${actionClass} bg-primary text-white disabled:opacity-60`}><FiSave /> Save template</button><button onClick={onGenerate} className={`${actionClass} border border-[#d99a74] bg-white text-[#7a4228] hover:bg-[#fff0e4]`}><FiDownload /> Generate ID cards</button><button disabled={saving} onClick={onUpdate} className={`${actionClass} bg-secondary text-heading disabled:opacity-60`}><FiEdit /> Update template</button><button onClick={onDelete} className={`${actionClass} border border-red-200 bg-red-50 text-red-700 hover:bg-red-100`}><FiTrash2 /> Delete template</button></div></section>;
}
