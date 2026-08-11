export const parseTemplateElements = (template) => {
  if (Array.isArray(template?.elements)) return template.elements;
  try {
    return JSON.parse(template?.elementsJson || "[]");
  } catch {
    return [];
  }
};

export const parseTemplateMeta = (template) => {
  if (typeof template?.meta === "object") return template.meta || {};
  try {
    return JSON.parse(template?.meta || "{}");
  } catch {
    return {};
  }
};

export const normalizeTemplate = (template) => ({
  ...template,
  elements: parseTemplateElements(template),
  meta: parseTemplateMeta(template),
});
