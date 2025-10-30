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
    const safeName =
      (student.name || student.id || `student-${i + 1}`).replace(
        /[^\w\-_. ]+/g,
        "_"
      ) + ".png";
    zip.file(safeName, blob);
  }

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
      // small delay to ensure drawing complete
      setTimeout(resolve, 120);
    });
    // fallback timeout
    setTimeout(resolve, timeout);
  });
}
