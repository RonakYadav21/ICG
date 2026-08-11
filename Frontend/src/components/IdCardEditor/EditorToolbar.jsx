export default function EditorToolbar({ zoom, onZoomChange }) {
  const updateZoom = (amount) =>
    onZoomChange((value) =>
      Math.min(3, Math.max(0.2, +(value + amount).toFixed(2))),
    );
  return (
    <section className="rounded-[28px] border border-[#e9c9b0] bg-[#fff8f0] p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a55c37]">
          Canvas zoom
        </p>
        <span className="rounded-full bg-[#f9dec9] px-3 py-1 text-sm font-bold text-[#7a4228]">
          {Math.round(zoom * 100)}%
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={() => updateZoom(-0.1)}
          className="rounded-xl border border-[#e7c9b6] bg-white px-3 py-2 text-sm font-semibold text-[#7a4228] hover:bg-[#fff0e4]"
        >
          − Zoom out
        </button>
        <button
          onClick={() => updateZoom(0.1)}
          className="rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-white hover:bg-[#bf4e25]"
        >
          + Zoom in
        </button>
      </div>
    </section>
  );
}
