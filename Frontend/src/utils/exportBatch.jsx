import JSZip from "jszip";
import { mergeTemplateWithData } from "./Placeholders";

export async function generateIdCardsZip({
  stageRef,
  setElements,
  template,
  students,
  options = { pixelRatio: 2 },
}) {
  const zip = new JSZip();
  const originalElements = JSON.parse(JSON.stringify(template.elements || []));

  for (let i = 0; i < students.length; i++) {
    const student = students[i];

    const merged = mergeTemplateWithData(
      { ...template, elements: originalElements },
      student
    );
    setElements(merged.elements);

    // wait for Konva to render updated elements
    await waitForStageRender(stageRef);

    const dataUrl = stageRef.current.toDataURL({
      pixelRatio: options.pixelRatio || 2,
    });
    const blob = await (await fetch(dataUrl)).blob();

    // Create safe file name
    const namePart = `${student.firstName || ""}_${
      student.lastName || ""
    }`.trim();
    const fallback = student.id != null ? student.id : i + 1;
    const safeName =
      (namePart || fallback).toString().replace(/[^\w\-_. ]+/g, "_") + ".png";

    zip.file(safeName, blob);
  }

  // Restore original elements
  setElements(originalElements);

  const zipBlob = await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
  });
  return { zipBlob };
}

// helpers
function waitForStageRender(stageRef, timeout = 500) {
  return new Promise((resolve) => {
    if (!stageRef?.current) return setTimeout(resolve, 100);
    requestAnimationFrame(() => {
      try {
        stageRef.current.batchDraw?.();
      } catch (e) {}
      setTimeout(resolve, 120);
    });
    setTimeout(resolve, timeout);
  });
}
