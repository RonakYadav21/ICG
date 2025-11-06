import React, { useRef, useState, useEffect, useCallback } from "react";
import { Stage, Layer, Rect, Transformer } from "react-konva";
import KonvaText from "./KonvaText";
import KonvaImage from "./KonvaImage";
import Sidebar from "./Sidebar";
import ElementStyleControls from "./ElementStyleControls";
import { CanvasResizer } from "./CanvasResizer";
import { CanvasContainer } from "./CanvasContainer";
import { generateCards, saveTemplate } from "../../api/templatesApi";
import { mergeTemplateWithData } from "../../utils/Placeholders";
import { uploadToCloudinary } from "../../utils/Cloudinary";
import { getStudentsByCourse } from "../../api/templatesApi";
import { generateIdCardsZip } from "../../utils/exportBatch";

const uid = () => Math.random().toString(36).slice(2, 9);

export default function IdCardEditor({ initialTemplate }) {
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

  // Add loading state
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
    console.log(prevTemplateRef.current);
    console.log("Template changed:");
    console.log(template);
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

  const addText = () => {
    const el = {
      id: uid(),
      type: "text",
      x: 40,
      y: 40,
      rotation: 0,
      props: {
        text: "{{name}}",
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
      // Add a placeholder for student photo
      const el = {
        id: uid(),
        type: "image",
        x: 20,
        y: 20,
        width: 120,
        height: 120,
        rotation: 0,
        props: {
          placeholder: "photo", // indicates this is a photo placeholder
          src: "/placeholder-profile.png", // default placeholder image
          originalWidth: 120,
          originalHeight: 120,
        },
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
          isStatic: true, // indicates this is a static image
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

  const updateElement = (updated) => {
    setElements((prev) =>
      prev.map((e) => (e.id === updated.id ? maintainAspectRatio(updated) : e))
    );
  };

  const deleteSelected = () => {
    setElements((prev) => prev.filter((e) => e.id !== selectedId));
    setSelectedId(null);
  };

  const exportPNG = () => {
    if (!stageRef.current) return;
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
    const a = document.createElement("a");
    a.href = uri;
    a.download = "idcard-export.png";
    a.click();
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

  // Export with student data merged (NOT USED CURRENTLY)
  const exportWithStudentData = async (studentIds) => {
    if (!template._id) {
      alert("Please save the template first");
      return;
    }

    try {
      setLoading((prev) => ({ ...prev, generating: true }));
      const result = await generateCards(template._id, studentIds);

      // Handle job status
      if (result.jobId) {
        alert(`Generation started! Job ID: ${result.jobId}`);
      }
    } catch (error) {
      console.error("Generation failed:", error);
      alert(error.message || "Failed to generate ID cards");
    } finally {
      setLoading((prev) => ({ ...prev, generating: false }));
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
                  src: el.props.src.startsWith("http")
                    ? el.props.src
                    : `${import.meta.env.VITE_BACKEND_URL}${el.props.src}`,
                }
              : el.props,
        })),

        meta: template.meta || {},
      };

      const saved = await saveTemplate(templateData);

      setTemplate(saved);
      setTemplateName(saved?.name || templateName);

      alert("Template saved successfully!");
      return saved;
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to save template");
    } finally {
      setLoading((prev) => ({ ...prev, saving: false }));
    }
  };

  const handlePreview = async (studentData) => {
    try {
      // Create preview template with student data
      const previewTemplate = mergeTemplateWithData(template, studentData);

      // Temporarily update elements with merged data
      const originalElements = elements;
      setElements(previewTemplate.elements);

      // Wait for stage to update
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Export preview
      const dataUrl = stageRef.current.toDataURL({ pixelRatio: 2 });

      // Restore original elements
      setElements(originalElements);

      // Open preview in new tab
      const win = window.open();
      win.document.write(`
        <html>
          <head>
            <title>ID Card Preview</title>
          </head>
          <body style="display:flex; justify-content:center; align-items:center; min-height:100vh; margin:0; background:#f0f0f0;">
            <img src="${dataUrl}" style="max-width:100%; box-shadow:0 4px 8px rgba(0,0,0,0.1);" />
          </body>
        </html>
      `);
    } catch (error) {
      console.error("Preview failed:", error);
      alert("Failed to generate preview");
    }
  };

  // called from Sidebar/GenerateModal with array of selected student IDs and the courseId
  const handleGenerateCards = async ({ courseId, selectedStudentIds }) => {
    if (!template._id) {
      alert("Please save template before generating ID cards.");
      return;
    }
    try {
      setIsGenerating(true);

      // fetch students for course from backend
      const studentsForCourse = await getStudentsByCourse(courseId);
      // filter to selected ones
      const students = studentsForCourse.filter((s) =>
        selectedStudentIds.includes(s._id)
      );

      if (students.length === 0) {
        alert("No students selected or found for the course.");
        return;
      }

      // generate zip using current template and Konva stage
      const { zipBlob } = await (async () => {
        const result = await generateIdCardsZip({
          stageRef,
          setElements, // NOTE: this will temporarily swap elements to merged ones
          template,
          students,
          options: { pixelRatio: 2 },
        });
        return { zipBlob: result.zipBlob };
      })();

      // download ZIP
      const fileName = `${(template.name || "idcards").replace(
        /[^\w\-_. ]+/g,
        "_"
      )}_${courseId}.zip`;
      saveBlob(zipBlob, fileName);
      alert("ID cards generated and downloaded as ZIP.");
    } catch (err) {
      console.error("Generate failed:", err);
      alert(err.message || "Failed to generate ID cards");
    } finally {
      setIsGenerating(false);
    }
  };

  // helper to trigger download using file-saver
  const saveBlob = (blob, filename) => {
    // dynamic import to keep bundle small if file-saver not installed globally
    // file-saver is required (npm install file-saver)
    const { saveAs } = require("file-saver");
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
        onPreview={handlePreview}
        onGenerateCards={handleGenerateCards}
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
              onClick={handleSave}
              className="p-2 border rounded bg-blue-500 text-white"
            >
              Save Template
            </button>
            <button onClick={exportPNG} className="p-2 border rounded">
              Export PNG
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
