import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import TemplateGallery from "../components/Templates/TemplateGallery";
import { getAllTemplates } from "../api/templatesApi";

export default function AdminDashboardPreview() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    getAllTemplates()
      .then(setTemplates)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 md:px-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a55c37]">
            Template library
          </p>
          <h1 className="mt-2 font-heading text-4xl text-heading">
            Choose a starting canvas
          </h1>
          <p className="mt-2 max-w-xl text-[#7a6256]">
            Double-click a saved design to edit it, or start a fresh card.
          </p>
        </div>
      </div>
      {loading ? (
        <div className="rounded-2xl bg-[#fff8f0] p-8 text-[#8b6a59]">
          Loading templates…
        </div>
      ) : (
        <TemplateGallery
          templates={templates}
          onSelect={(template) => setSelectedTemplate(template)}
          onOpen={(template) =>
            navigate(`/admin-dashboard/templates/${template.id}`, {
              state: { initialTemplate: template },
            })
          }
          emptyText="No templates yet. Use New template to create your first card."
        />
      )}
    </main>
  );
}
