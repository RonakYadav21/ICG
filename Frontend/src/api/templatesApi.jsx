import api from "../utils/axios";

// TEMPLATE APIS
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
  console.log(res.data);
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

export const updateTemplate = async (id, data) => {
  try {
    const res = await api.put(`/templates/${id}`, data);
    return res.data;
  } catch (err) {
    const msg =
      err.response?.data?.message || err.message || "Failed to fetch template";
    throw new Error(msg);
  }
};

export const deleteTemplate = async (id) => {
  try {
    const res = await api.delete(`/templates/${id}`);
    return res.data;
  } catch (err) {
    const msg =
      err.response?.data?.message || err.message || "Failed to fetch template";
    throw new Error(msg);
  }
};

// COURSE APIS

export const getAllCourses = async () => {
  try {
    const res = await api.get("/templates/all");
    return res.data || [];
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

//STUDENT APIS
export const studentRegistration = async (submissionData) => {
  try {
    const res = await api.post(`/student/studentRegistration`, submissionData);
    return res || [];
  } catch (error) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

export const getStudentsByCourse = async (courseId) => {
  try {
    const res = await api.get(`/student/by-course/${courseId}`);
    return res.data || [];
  } catch (err) {
    const msg =
      err.response?.data?.message || err.message || "Failed to fetch students";
    throw new Error(msg);
  }
};
