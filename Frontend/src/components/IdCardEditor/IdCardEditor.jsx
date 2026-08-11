import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CanvasArea from "./CanvasArea";
import EditorActions from "./EditorActions";
import EditorHeader from "./EditorHeader";
import EditorToolbar from "./EditorToolbar";
import ElementStyleControls from "./ElementStyleControls";
import GenerateModal from "./GenerateModal";
import Sidebar from "./Sidebar";
import useEditorState from "./hooks/useEditorState";

export default function IdCardEditor({ initialTemplate }) {
  const editor = useEditorState(initialTemplate);
  const stageRef = useRef(null);
  const layerRef = useRef(null);
  const transformerRef = useRef(null);
  const navigate = useNavigate();
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const selectedElement = editor.elements.find(
    (element) => element.id === editor.selectedId,
  );

  useEffect(() => {
    const layer = layerRef.current;
    const transformer = transformerRef.current;
    if (!layer || !transformer) return;
    const node = layer.findOne(`#${editor.selectedId}`);
    transformer.nodes(node ? [node] : []);
    transformer.getLayer()?.batchDraw();
  }, [editor.selectedId, editor.elements]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    const deselect = (event) => {
      const targetId =
        typeof event.target.id === "function"
          ? event.target.id()
          : event.target?.id;
      if (event.target === stage || targetId === "background")
        editor.setSelectedId(null);
    };
    stage.on("mousedown touchstart", deselect);
    return () => stage.off("mousedown touchstart", deselect);
  }, [editor]);

  return (
    <div className="mx-auto max-w-[1500px] space-y-6 pb-12">
      <EditorHeader
        templateName={editor.templateName}
        onNameChange={editor.setTemplateName}
        onStudents={() => navigate("/admin-dashboard/student-details")}
      />
      <div className="grid gap-6 xl:grid-cols-[250px_minmax(0,1fr)_250px]">
        <aside className="space-y-5">
          <EditorToolbar zoom={editor.zoom} onZoomChange={editor.setZoom} />
          <Sidebar
            onAddText={editor.addText}
            onAddImage={editor.addImage}
            onAddRect={editor.addRect}
            onAddLine={editor.addLine}
            onDelete={editor.deleteSelected}
          />
        </aside>
        <CanvasArea
          template={editor.template}
          elements={editor.elements}
          zoom={editor.zoom}
          stageRef={stageRef}
          layerRef={layerRef}
          transformerRef={transformerRef}
          selectedId={editor.selectedId}
          onSelect={editor.setSelectedId}
          onChange={editor.updateElement}
          onResize={editor.resizeCanvas}
        />
        <aside className="space-y-5">
          <ElementStyleControls
            selectedElement={selectedElement}
            onChange={editor.updateElement}
            onCanvasChange={editor.updateCanvas}
            template={editor.template}
          />
          <EditorActions
            saving={editor.saving}
            onSave={editor.save}
            onUpdate={editor.update}
            onDelete={editor.remove}
            onGenerate={() => setShowGenerateModal(true)}
          />
        </aside>
      </div>
      <GenerateModal
        isOpen={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
        onGenerate={(selection) => {
          editor.generate(selection, stageRef.current);
          setShowGenerateModal(false);
        }}
        isGenerating={editor.isGenerating}
      />
    </div>
  );
}
