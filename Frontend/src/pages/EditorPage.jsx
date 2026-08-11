import { useLocation } from "react-router-dom";

import IdCardEditor from "../components/IdCardEditor/IdCardEditor";

export default function EditorPage() {
  const { state } = useLocation();

  const initialTemplate = state?.initialTemplate
    ? {
        ...state.initialTemplate,
        elements: JSON.parse(state.initialTemplate.elementsJson || "[]"),
        meta: JSON.parse(state.initialTemplate.meta || "{}"),
      }
    : null;

  return (
    <main className="mx-auto max-w-[1500px] px-6 py-8 md:px-10">
      <IdCardEditor initialTemplate={initialTemplate} />
    </main>
  );
}
