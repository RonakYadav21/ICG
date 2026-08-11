import { FaUsers } from "react-icons/fa";

export default function EditorHeader({ templateName, onNameChange, onStudents }) {
  return (
    <section className="rounded-[28px] border border-[#e9c9b0] bg-[#fff8f0] p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a55c37]">ID card studio</p>
          <h1 className="mt-1 font-heading text-2xl text-heading">Create a card you are proud to share</h1>
        </div>
        <button onClick={onStudents} className="inline-flex items-center gap-2 rounded-full border border-[#d99a74] bg-white px-4 py-2 text-sm font-semibold text-[#7a4228] hover:bg-[#fff0e4]">
          <FaUsers /> Student details
        </button>
      </div>
      <label className="mt-5 block text-sm font-semibold text-[#6f4835]">
        Template name
        <input value={templateName} onChange={(event) => onNameChange(event.target.value)} placeholder="e.g. Student identity card" className="mt-2 w-full rounded-xl border border-[#e7c9b6] bg-white px-4 py-2.5 text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" />
      </label>
    </section>
  );
}
