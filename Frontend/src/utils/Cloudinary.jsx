import axios from "axios";

export const uploadToCloudinary = async (file) => {
  try {
    const url = `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    }/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    const res = await axios.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data?.secure_url || res.data?.url || res.data?.secure_uri;
  } catch (err) {
    console.error(
      "Cloudinary upload failed:",
      err?.response?.data || err.message
    );
    throw new Error("Image upload failed");
  }
};
