import api from "../utils/axios";

export const saveTemplate = async (template) => {
  console.log("saving template....");
  console.log(template);
  const payload = {
    name: template.name,
    width: template.width,
    height: template.height,
    backgroundColor: template.backgroundColor,
    borderColor: template.borderColor,
    borderWidth: template.borderWidth,
    elementsJson: JSON.stringify(template.elements),
    meta: JSON.stringify(template.meta),
  };

  const res = await api.post(`/templates/save`, payload);
  return res.data;
};

export const getAllTemplates = async () => {
  try {
    const res = await api.get(`/templates`);
    return res.data || [];
  } catch (error) {
    const msg =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch templates";
    throw new Error(msg);
  }
};

export const getTemplateById = async (id) => {
  try {
    const res = await api.get(`/templates/${id}`);
    return res.data;
  } catch (err) {
    const msg =
      err.response?.data?.message || err.message || "Failed to fetch template";
    throw new Error(msg);
  }
};

export const getStudentsByCourse = async (courseId) => {
  try {
    const res = await api.get(`/students/by-course/${courseId}`);
    return res.data || [];
  } catch (err) {
    const msg =
      err.response?.data?.message || err.message || "Failed to fetch students";
    throw new Error(msg);
  }
};

export const generateCards = async (templateId, studentIds) => {
  try {
    const res = await api.post(`/templates/${templateId}/generate`, {
      studentIds,
    });
    return res.data;
  } catch (err) {
    const msg =
      err.response?.data?.message || err.message || "Failed to generate cards";
    throw new Error(msg);
  }
};
