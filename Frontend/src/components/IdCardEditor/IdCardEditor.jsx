import { useRef, useState, useEffect, useCallback } from "react";
import { Stage, Layer, Rect, Transformer } from "react-konva";
import toast from "react-hot-toast";
import { saveAs } from "file-saver";
import JSZip from "jszip";

import KonvaText from "../KonvaElements/KonvaText";
import KonvaImage from "../KonvaElements/KonvaImage";
import KonvaLine from "../KonvaElements/KonvaLine";

import Sidebar from "./Sidebar";
import ElementStyleControls from "./ElementStyleControls";
import { CanvasResizer } from "./CanvasResizer";
import { CanvasContainer } from "./CanvasContainer";
import { mergeTemplateWithData } from "../../utils/Placeholders";
import { uploadToCloudinary } from "../../utils/Cloudinary";
import {
  saveTemplate,
  updateTemplate,
  deleteTemplate,
  getStudentsByCourse,
} from "../../api/templatesApi";

import { FaEdit, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const uid = () => Math.random().toString(36).slice(2, 9);

export default function IdCardEditor({ initialTemplate }) {
  // Initial Template
  const initial = initialTemplate ?? {
    name: "Untitled",
    width: 800,
    height: 500,
    backgroundColor: "#ffffff",
    borderColor: "#000000",
    borderWidth: 0,
    elements: [],
  };

  const [template, setTemplate] = useState(initial);
  const [templateName, setTemplateName] = useState(initial.name || "Untitled");
  const [elements, setElements] = useState(initial.elements || []);
  const [selectedId, setSelectedId] = useState(null);
  const stageRef = useRef(null);
  const layerRef = useRef(null);
  const trRef = useRef(null);
  const prevTemplateRef = useRef(template);
  const navigate = useNavigate();
  const [loading, setLoading] = useState({
    saving: false,
    generating: false,
  });
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (initialTemplate) {
      setTemplate(initialTemplate);
      setElements(initialTemplate.elements || []);
      setTemplateName(initialTemplate.name);
    }
  }, [initialTemplate]);

  useEffect(() => {
    prevTemplateRef.current = template;
  }, [template]);

  // sync template.elements when elements change
  useEffect(() => {
    setTemplate((t) => ({ ...t, elements }));
  }, [elements]);

  // attach transformer for resized/rotated elements
  useEffect(() => {
    const layer = layerRef.current;
    const tr = trRef.current;
    if (!layer || !tr) return;
    const node = layer.findOne(`#${selectedId}`);
    if (node) {
      tr.nodes([node]);
      tr.getLayer().batchDraw();
    } else {
      tr.nodes([]);
      tr.getLayer().batchDraw();
    }
  }, [selectedId, elements]);

  // deselect when clicking background
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const handler = (e) => {
      const target = e.target;
      const targetId =
        typeof target.id === "function" ? target.id() : target?.id;
      if (target === stage || targetId === "background") setSelectedId(null);
    };
    stage.on("mousedown touchstart", handler);
    return () => stage.off("mousedown touchstart", handler);
  }, []);

  // zoom
  const [zoom, setZoom] = useState(1);

  // utility: maintain image aspect ratio after transform
  const maintainAspectRatio = (element) => {
    if (
      element.type === "image" &&
      element.props?.originalWidth &&
      element.width
    ) {
      const ratio = element.props.originalWidth / element.props.originalHeight;
      return {
        ...element,
        height: Math.max(1, Math.round(element.width / ratio)),
      };
    }
    return element;
  };

  const addText = (placeholderKey = "name") => {
    const el = {
      id: uid(),
      type: "text",
      x: 40,
      y: 40,
      rotation: 0,
      props: {
        text: `${placeholderKey}`,
        fontSize: 22,
        fontFamily: "Poppins",
        fill: "#222222",
      },
    };
    setElements((s) => [...s, el]);
    setSelectedId(el.id);
  };

  const addRect = () => {
    const el = {
      id: uid(),
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
    };
    setElements((s) => [...s, el]);
    setSelectedId(el.id);
  };

  const addImage = async (imageType = "static") => {
    if (imageType === "placeholder") {
      const el = {
        id: uid(),
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
      };
      setElements((s) => [...s, el]);
      setSelectedId(el.id);
      return;
    }

    // Original file picker for static images (logos etc)
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      //local preview
      const localURL = URL.createObjectURL(file);
      const img = new Image();
      img.src = localURL;

      await new Promise((res) => {
        img.onload = res;
        img.onerror = res;
      });

      //permanent upload to cloudinary
      const uploadedURL = await uploadToCloudinary(file);

      const initialWidth = Math.min(240, img.width || 240);
      const initialHeight = img.width
        ? Math.min(160, img.height * (initialWidth / img.width))
        : 160;

      const el = {
        id: uid(),
        type: "image",
        x: 20,
        y: 20,
        width: initialWidth,
        height: initialHeight,
        rotation: 0,
        props: {
          isStatic: true,
          src: uploadedURL,
          originalWidth: img.width || initialWidth,
          originalHeight: img.height || initialHeight,
        },
      };
      setElements((s) => [...s, el]);
      setSelectedId(el.id);
    };
    input.click();
  };

  const addLine = () => {
    const el = {
      id: uid(),
      type: "line",
      x: 150,
      y: 150,
      points: [0, 0, 200, 0],
      rotation: 0,
      props: {
        stroke: "#000000",
        strokeWidth: 2,
        dash: [],
      },
    };
    setElements((e) => [...e, el]);
    setSelectedId(el.id);
  };

  const updateElement = (updated) => {
    setElements((prev) =>
      prev.map((e) => (e.id === updated.id ? maintainAspectRatio(updated) : e))
    );
  };

  const deleteSelected = () => {
    setElements((prev) => prev.filter((e) => e.id !== selectedId));
    setSelectedId(null);
  };

  // handle canvas resize: receives canvas pixel sizes (already zoom-applied)
  const handleCanvasResize = useCallback(
    (newCanvasPxW, newCanvasPxH) => {
      // compute logical (unzoomed) sizes
      const newLogicalW = Math.max(50, Math.round(newCanvasPxW / zoom));
      const newLogicalH = Math.max(30, Math.round(newCanvasPxH / zoom));

      const prev = prevTemplateRef.current || template;
      const prevW = prev.width || 1;
      const prevH = prev.height || 1;

      const scaleX = newLogicalW / prevW;
      const scaleY = newLogicalH / prevH;

      // scale elements using functional update to avoid stale closures
      setElements((prevElements) =>
        prevElements.map((el) => {
          const ex = typeof el.x === "number" ? el.x : 0;
          const ey = typeof el.y === "number" ? el.y : 0;
          const scaled = { ...el };

          scaled.x = Math.max(0, Math.round(ex * scaleX));
          scaled.y = Math.max(0, Math.round(ey * scaleY));

          if (typeof el.width === "number")
            scaled.width = Math.max(1, Math.round(el.width * scaleX));
          if (typeof el.height === "number")
            scaled.height = Math.max(1, Math.round(el.height * scaleY));

          if (el.type === "text") {
            const prevFont = (el.props && el.props.fontSize) || 20;
            scaled.props = {
              ...el.props,
              fontSize: Math.max(6, Math.round(prevFont * scaleY)),
            };
          }

          return scaled;
        })
      );

      // update template logically (will cause Stage to rerender at new size)
      setTemplate((t) => {
        const updated = { ...t, width: newLogicalW, height: newLogicalH };
        prevTemplateRef.current = updated;
        return updated;
      });
    },
    [zoom, template]
  );

  // Canvas change via inspector inputs (logical units)
  const onCanvasChange = (updates) => {
    // keep elements inside bounds when user changes canvas size manually
    setTemplate((t) => {
      const next = { ...t, ...updates };
      prevTemplateRef.current = next;
      return next;
    });

    if (updates.width || updates.height) {
      setElements((prevElements) =>
        prevElements.map((el) => {
          const scaled = { ...el };
          if (updates.width)
            scaled.x = Math.max(
              0,
              Math.min(
                (updates.width || template.width) - (el.width || 0),
                el.x || 0
              )
            );
          if (updates.height)
            scaled.y = Math.max(
              0,
              Math.min(
                (updates.height || template.height) - (el.height || 0),
                el.y || 0
              )
            );
          return scaled;
        })
      );
    }
  };

  //handle template Name
  const handleSave = async () => {
    if (!templateName.trim()) {
      alert("Please enter a template name");
      return;
    }

    try {
      setLoading((prev) => ({ ...prev, saving: true }));

      const templateData = {
        name: templateName,
        width: template.width,
        height: template.height,
        backgroundColor: template.backgroundColor,
        borderColor: template.borderColor,
        borderWidth: template.borderWidth,

        elements: elements.map((el) => ({
          ...el,
          props:
            el.type === "image"
              ? {
                  ...el.props,
                  // src: el.props.src.startsWith("http")
                  //   ? el.props.src
                  //   : `${import.meta.env.VITE_BACKEND_URL}${el.props.src}`,
                  src: el.props.src,
                }
              : el.props,
        })),

        meta: template.meta || {},
      };

      const saved = await saveTemplate(templateData);

      setTemplate(saved);
      setTemplateName(saved?.name || templateName);

      toast.success("Template saved successfully!");
      return saved;
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to save template");
    } finally {
      setLoading((prev) => ({ ...prev, saving: false }));
    }
  };

  //update existing template
  const handleUpdate = async () => {
    if (!template.id) return alert("Save before update");

    try {
      setLoading((p) => ({ ...p, saving: true }));

      const payload = {
        name: templateName,
        width: template.width,
        height: template.height,
        backgroundColor: template.backgroundColor,
        borderColor: template.borderColor,
        borderWidth: template.borderWidth,
        elementsJson: JSON.stringify(template.elements),
        meta: JSON.stringify(template.meta),
      };

      // merge with existing
      const merged = { ...template, ...payload };

      const updated = await updateTemplate(template.id, merged);

      setTemplate(updated);
      toast.success("Updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading((p) => ({ ...p, saving: false }));
    }
  };

  //delete a template
  const handleDelete = async () => {
    if (!template.id) return alert("Nothing to delete");

    if (!confirm("Delete Template?")) return;

    try {
      await deleteTemplate(template.id);
      toast.success("Deleted successfully!");

      setTemplate(initial);
      setTemplateName("Untitled");
      setElements([]);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  // called from Sidebar/GenerateModal with array of selected student IDs and the courseId
  const handleGenerateCards = async ({ courseId, selectedStudentIds }) => {
    if (!template.id) {
      alert("Please save template before generating ID cards.");
      return;
    }

    try {
      setIsGenerating(true);

      // fetch students for course
      const studentsForCourse = await getStudentsByCourse(courseId);
      const students = studentsForCourse.filter((s) =>
        (selectedStudentIds || []).includes(s.id)
      );

      if (students.length === 0) {
        toast.error("No students selected or found for the course.");
        return;
      }

      const zip = new JSZip();
      const originalElements = [...elements];

      for (let i = 0; i < students.length; i++) {
        const student = students[i];

        // merge template placeholders with student data
        const merged = mergeTemplateWithData(template, {
          ...student,
          photo: student.studentPhoto,
        });
        setElements(merged.elements);

        // wait for stage to render
        await new Promise((res) => setTimeout(res, 100));

        // export PNG
        const dataUrl = stageRef.current.toDataURL({ pixelRatio: 2 });
        const blob = await (await fetch(dataUrl)).blob();

        const safeName = `${student.firstName}_${student.lastName}.png`.replace(
          /[^\w\-_. ]+/g,
          "_"
        );
        zip.file(safeName, blob);
      }

      // restore original template elements
      setElements(originalElements);

      // generate ZIP and download
      const zipBlob = await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
      });
      saveAs(zipBlob, `${template.name || "idcards"}.zip`);

      toast.success("ID cards generated successfully!");
    } catch (err) {
      console.error("Generate failed:", err);
      toast.error(err.message || "Failed to generate ID cards");
    } finally {
      setIsGenerating(false);
    }
  };

  // helper to trigger download using file-saver
  const saveBlob = (blob, filename) => {
    // dynamic import to keep bundle small if file-saver not installed globally
    // file-saver is required (npm install file-saver)
    saveAs(blob, filename);
  };

  return (
    <div className="flex gap-6 p-6">
      <Sidebar
        onAddText={addText}
        onAddImage={addImage}
        onAddRect={addRect}
        onDelete={deleteSelected}
        onSave={handleSave}
        onUpdate={handleUpdate}
        onTemplateDelete={handleDelete}
        onGenerateCards={handleGenerateCards}
        onAddLine={addLine}
      />

      <div className="w-64">
        <ElementStyleControls
          selectedElement={elements.find((el) => el.id === selectedId)}
          onChange={updateElement}
          onCanvasChange={onCanvasChange}
          template={template}
        />
        <div className="mt-3 bg-white rounded shadow p-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom((z) => Math.min(3, +(z + 0.1).toFixed(2)))}
              className="p-2 border rounded"
            >
              Zoom +
            </button>
            <button
              onClick={() =>
                setZoom((z) => Math.max(0.2, +(z - 0.1).toFixed(2)))
              }
              className="p-2 border rounded"
            >
              Zoom -
            </button>
            <div className="ml-auto">Zoom: {(zoom * 100).toFixed(0)}%</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded shadow p-4 flex-1">
        <div className="flex justify-between mb-3 items-center">
          <h3 className="text-xl font-semibold">ID Card Template Editor</h3>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="border rounded px-2 py-1"
              placeholder="Template Name"
            />
            <button
              onClick={() => navigate("/admin-dashboard/student-details")}
              className="flex items-center gap-3 w-full px-4 py-2 rounded-lg bg-primary text-white hover:bg-gray-100 text-gray-700 font-medium transition"
            >
              <FaUsers /> Student Details
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <div
            style={{
              position: "relative",
              width: template.width * zoom,
              height: template.height * zoom,
            }}
          >
            <CanvasContainer
              width={template.width * zoom}
              height={template.height * zoom}
            >
              <Stage
                width={template.width * zoom}
                height={template.height * zoom}
                scaleX={zoom}
                scaleY={zoom}
                ref={stageRef}
                style={{ position: "absolute", left: 0, top: 0 }}
              >
                <Layer ref={layerRef}>
                  <Rect
                    id="background"
                    x={0}
                    y={0}
                    width={template.width}
                    height={template.height}
                    fill={template.backgroundColor}
                    cornerRadius={12}
                    shadowBlur={8}
                    stroke={
                      template.borderWidth ? template.borderColor : undefined
                    }
                    strokeWidth={template.borderWidth || 0}
                  />

                  {elements.map((el) => {
                    if (el.type === "line") {
                      return (
                        <KonvaLine
                          key={el.id}
                          shape={el}
                          isSelected={el.id === selectedId}
                          onSelect={(id) => setSelectedId(id)}
                          onChange={updateElement}
                        />
                      );
                    }
                    if (el.type === "text") {
                      return (
                        <KonvaText
                          key={el.id}
                          ref={null}
                          shape={el}
                          isSelected={el.id === selectedId}
                          onSelect={(id) => setSelectedId(id)}
                          onChange={updateElement}
                        />
                      );
                    }
                    if (el.type === "image") {
                      return (
                        <KonvaImage
                          key={el.id}
                          ref={null}
                          shape={el}
                          isSelected={el.id === selectedId}
                          onSelect={(id) => setSelectedId(id)}
                          onChange={updateElement}
                        />
                      );
                    }
                    if (el.type === "rect") {
                      const props = el.props || {};
                      return (
                        <Rect
                          key={el.id}
                          id={el.id}
                          x={el.x || 0}
                          y={el.y || 0}
                          width={el.width || 100}
                          height={el.height || 50}
                          fill={props.fill || "#fff"}
                          stroke={props.stroke}
                          strokeWidth={props.strokeWidth || 0}
                          cornerRadius={props.cornerRadius || 0}
                          rotation={el.rotation || 0}
                          draggable
                          onClick={(e) => {
                            e.cancelBubble = true;
                            setSelectedId(el.id);
                          }}
                          onTap={(e) => {
                            e.cancelBubble = true;
                            setSelectedId(el.id);
                          }}
                          onDragEnd={(e) =>
                            updateElement({
                              ...el,
                              x: e.target.x(),
                              y: e.target.y(),
                            })
                          }
                          onTransformEnd={(e) => {
                            const node = e.target;
                            const scaleX = node.scaleX();
                            const scaleY = node.scaleY();
                            node.scaleX(1);
                            node.scaleY(1);
                            updateElement({
                              ...el,
                              x: node.x(),
                              y: node.y(),
                              rotation: node.rotation(),
                              width: Math.max(
                                1,
                                Math.round(node.width() * scaleX)
                              ),
                              height: Math.max(
                                1,
                                Math.round(node.height() * scaleY)
                              ),
                            });
                          }}
                        />
                      );
                    }
                    return null;
                  })}

                  <Transformer
                    ref={trRef}
                    rotateEnabled={true}
                    anchorSize={8}
                  />
                </Layer>
              </Stage>
            </CanvasContainer>

            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: template.width * zoom,
                height: template.height * zoom,
                pointerEvents: "none",
              }}
            >
              <CanvasResizer
                width={template.width * zoom}
                height={template.height * zoom}
                onResize={handleCanvasResize}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
