import TemplateCard from "./TemplateCard";
export default function TemplateGallery({
  templates,
  onSelect,
  onOpen,
  selectedId,
  emptyText = "No templates saved yet. Create a template to see it here.",
}) {
  if (!templates.length)
    return (
      <div className="rounded-2xl border border-dashed border-[#d9bba5] bg-[#fff8f0] p-8 text-center text-sm text-[#8b6a59]">
        {emptyText}
      </div>
    );

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          onSelect={onSelect}
          onOpen={onOpen}
          selected={selectedId === template.id}
        />
      ))}
    </div>
  );
}
