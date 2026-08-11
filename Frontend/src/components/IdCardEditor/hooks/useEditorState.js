import { useCallback, useEffect, useRef, useState } from "react";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import toast from "react-hot-toast";
import { mergeTemplateWithData } from "../../../utils/Placeholders";
import { uploadToCloudinary } from "../../../utils/Cloudinary";
import {
  deleteTemplate,
  getStudentsByCourse,
  saveTemplate,
  updateTemplate,
} from "../../../api/templatesApi";

const createId = () => Math.random().toString(36).slice(2, 9);
const defaultTemplate = {
  name: "Untitled",
  width: 800,
  height: 500,
  backgroundColor: "#ffffff",
  borderColor: "#000000",
  borderWidth: 0,
  elements: [],
};
const keepImageRatio = (element) => {
  if (
    element.type !== "image" ||
    !element.props?.originalWidth ||
    !element.width
  )
    return element;
  return {
    ...element,
    height: Math.max(
      1,
      Math.round(
        element.width /
          (element.props.originalWidth / element.props.originalHeight),
      ),
    ),
  };
};

export default function useEditorState(initialTemplate) {
  const initial = initialTemplate || defaultTemplate;
  const [template, setTemplate] = useState(initial);
  const [templateName, setTemplateName] = useState(initial.name || "Untitled");
  const [elements, setElements] = useState(initial.elements || []);
  const [selectedId, setSelectedId] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [saving, setSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const previousTemplate = useRef(initial);

  useEffect(() => {
    if (initialTemplate) {
      setTemplate(initialTemplate);
      setTemplateName(initialTemplate.name || "Untitled");
      setElements(initialTemplate.elements || []);
      setSelectedId(null);
    }
  }, [initialTemplate]);
  useEffect(() => {
    previousTemplate.current = template;
  }, [template]);
  useEffect(() => {
    setTemplate((current) => ({ ...current, elements }));
  }, [elements]);

  const addElement = (element) => {
    setElements((current) => [...current, element]);
    setSelectedId(element.id);
  };
  const addText = (placeholderKey = "name") =>
    addElement({
      id: createId(),
      type: "text",
      x: 40,
      y: 40,
      rotation: 0,
      props: {
        text: placeholderKey,
        fontSize: 22,
        fontFamily: "Poppins",
        fill: "#222222",
      },
    });
  const addRect = () =>
    addElement({
      id: createId(),
      type: "rect",
      x: 60,
      y: 60,
      rotation: 0,
      width: 160,
      height: 90,
      props: {
        fill: "#ffffff",
        stroke: "#000000",
        strokeWidth: 1,
        cornerRadius: 6,
      },
    });
  const addLine = () =>
    addElement({
      id: createId(),
      type: "line",
      x: 150,
      y: 150,
      points: [0, 0, 200, 0],
      rotation: 0,
      props: { stroke: "#000000", strokeWidth: 2, dash: [] },
    });
  const addImage = async (imageType = "static") => {
    if (imageType === "placeholder")
      return addElement({
        id: createId(),
        type: "image",
        x: 20,
        y: 20,
        width: 120,
        height: 120,
        rotation: 0,
        props: {
          placeholder: "photo",
          originalWidth: 120,
          originalHeight: 120,
        },
        src: null,
      });
    const picker = document.createElement("input");
    picker.type = "file";
    picker.accept = "image/*";
    picker.onchange = async (event) => {
      const file = event.target.files?.[0];
      if (!file) return;
      const previewUrl = URL.createObjectURL(file);
      const image = new Image();
      image.src = previewUrl;
      await new Promise((resolve) => {
        image.onload = resolve;
        image.onerror = resolve;
      });
      const src = await uploadToCloudinary(file);
      const width = Math.min(240, image.width || 240);
      addElement({
        id: createId(),
        type: "image",
        x: 20,
        y: 20,
        width,
        height: image.width
          ? Math.min(160, image.height * (width / image.width))
          : 160,
        rotation: 0,
        props: {
          isStatic: true,
          src,
          originalWidth: image.width || width,
          originalHeight: image.height || 160,
        },
      });
      URL.revokeObjectURL(previewUrl);
    };
    picker.click();
  };
  const updateElement = (element) =>
    setElements((current) =>
      current.map((item) =>
        item.id === element.id ? keepImageRatio(element) : item,
      ),
    );
  const deleteSelected = () => {
    if (!selectedId) return;
    setElements((current) => current.filter((item) => item.id !== selectedId));
    setSelectedId(null);
  };
  const updateCanvas = (updates) =>
    setTemplate((current) => ({ ...current, ...updates }));
  const resizeCanvas = useCallback(
    (pixelWidth, pixelHeight) => {
      const nextWidth = Math.max(50, Math.round(pixelWidth / zoom));
      const nextHeight = Math.max(30, Math.round(pixelHeight / zoom));
      const previous = previousTemplate.current;
      const xScale = nextWidth / previous.width;
      const yScale = nextHeight / previous.height;
      setElements((current) =>
        current.map((item) => ({
          ...item,
          x: Math.max(0, Math.round((item.x || 0) * xScale)),
          y: Math.max(0, Math.round((item.y || 0) * yScale)),
          width:
            typeof item.width === "number"
              ? Math.max(1, Math.round(item.width * xScale))
              : item.width,
          height:
            typeof item.height === "number"
              ? Math.max(1, Math.round(item.height * yScale))
              : item.height,
          props:
            item.type === "text"
              ? {
                  ...item.props,
                  fontSize: Math.max(
                    6,
                    Math.round((item.props?.fontSize || 20) * yScale),
                  ),
                }
              : item.props,
        })),
      );
      setTemplate((current) => ({
        ...current,
        width: nextWidth,
        height: nextHeight,
      }));
    },
    [zoom],
  );
  const serializableTemplate = () => ({
    name: templateName,
    width: template.width,
    height: template.height,
    backgroundColor: template.backgroundColor,
    borderColor: template.borderColor,
    borderWidth: template.borderWidth,
    elements,
    meta: template.meta || {},
  });
  const save = async () => {
    if (!templateName.trim())
      return toast.error("Please enter a template name");
    try {
      setSaving(true);
      const saved = await saveTemplate(serializableTemplate());
      setTemplate(saved);
      setTemplateName(saved?.name || templateName);
      toast.success("Template saved successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to save template");
    } finally {
      setSaving(false);
    }
  };
  const update = async () => {
    if (!template.id) return toast.error("Save the template before updating");
    try {
      setSaving(true);
      const payload = serializableTemplate();
      const updated = await updateTemplate(template.id, {
        ...template,
        ...payload,
        elementsJson: JSON.stringify(elements),
        meta: JSON.stringify(payload.meta),
      });
      setTemplate(updated);
      toast.success("Template updated successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to update template");
    } finally {
      setSaving(false);
    }
  };
  const remove = async () => {
    if (!template.id) return toast.error("Nothing to delete");
    if (!window.confirm("Delete this template?")) return;
    try {
      await deleteTemplate(template.id);
      setTemplate(defaultTemplate);
      setTemplateName("Untitled");
      setElements([]);
      setSelectedId(null);
      toast.success("Template deleted");
    } catch (error) {
      toast.error(error.message || "Failed to delete template");
    }
  };
  const generate = async ({ courseId, selectedStudentIds }, stage) => {
    if (!template.id)
      return toast.error("Save the template before generating ID cards.");
    try {
      setIsGenerating(true);
      const students = (await getStudentsByCourse(courseId)).filter((student) =>
        selectedStudentIds.includes(student.id),
      );
      if (!students.length)
        return toast.error("No students selected or found.");
      const zip = new JSZip();
      const originalElements = elements;
      for (const student of students) {
        const data = {
          fullName:
            `${student.firstName || ""} ${student.lastName || ""}`.trim(),
          fatherName: student.fatherName || "",
          rollNo: student.rollNo || "",
          enrollmentNo: student.enrollmentNo || "",
          admissionBatch: student.admissionBatch || "",
          programName: student.programName || "",
          email: student.emailAddress || "",
          phone: student.phoneNo || "",
          address: student.address || "",
          dateOfBirth: student.dateOfBirth || "",
          photo: student.studentPhoto || "",
        };
        setElements(
          mergeTemplateWithData(
            { ...template, elements: originalElements },
            data,
          ).elements,
        );
        await new Promise((resolve) => setTimeout(resolve, 500));
        const blob = await (
          await fetch(stage.toDataURL({ pixelRatio: 2 }))
        ).blob();
        zip.file(
          `${data.fullName || "student"}.png`.replace(/[^\w\-_. ]+/g, "_"),
          blob,
        );
      }
      setElements(originalElements);
      saveAs(
        await zip.generateAsync({ type: "blob", compression: "DEFLATE" }),
        `${template.name || "idcards"}.zip`,
      );
      toast.success("ID cards generated successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to generate ID cards");
    } finally {
      setIsGenerating(false);
    }
  };
  return {
    template,
    templateName,
    setTemplateName,
    elements,
    selectedId,
    setSelectedId,
    zoom,
    setZoom,
    saving,
    isGenerating,
    addText,
    addRect,
    addLine,
    addImage,
    updateElement,
    deleteSelected,
    updateCanvas,
    resizeCanvas,
    save,
    update,
    remove,
    generate,
  };
}
