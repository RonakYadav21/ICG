import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const StudentDashboard = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const [uploading, setUploading] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    emailAddress: "",
    phoneNo: "",
    dateOfBirth: "",
    address: "",
    enrollmentNo: "",
    programName: "",
    rollNo: "",
    admissionBatch: "",
    studentPhoto: "",
  });

  // Extract admission batch (e.g., "IT-2K22-45" → "2022")
  const extractBatchFromRollNo = (rollNo) => {
    const match = rollNo.match(/2K(\d{2})/i);
    return match ? `20${match[1]}` : "";
  };

  // Watch for email changes → check registration
  useEffect(() => {
    const checkRegistration = async () => {
      if (!formData.emailAddress) return;
      try {
        const res = await axios.get(`${API_URL}/checkStudent?email=${formData.emailAddress}`);
        setAlreadyRegistered(res.data.registered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    checkRegistration();
  }, [formData.emailAddress]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "rollNo") {
      const batch = extractBatchFromRollNo(value);
      setFormData((prev) => ({
        ...prev,
        rollNo: value,
        admissionBatch: batch,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle Cloudinary upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const imgData = new FormData();
    imgData.append("file", file);
    imgData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        imgData
      );
      setFormData((prev) => ({
        ...prev,
        studentPhoto: res.data.secure_url,
      }));
      toast.success("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Submit registration
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/studentRegistration`, formData);
      console.log(res);
      toast.success("Student Registered successfully!");
      setAlreadyRegistered(true);
    } catch (err) {
      if (err.response?.status === 400) {
        toast.error("You have already registered!");
        setAlreadyRegistered(true);
      } else {
        toast.error("Registration failed");
      }
    }
  };

  // if (loading) return <p>Loading...</p>;

  if (alreadyRegistered) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-2">
          Registration Already Submitted
        </h2>
        <p className="text-gray-600">
          You’ve already completed your registration form.
        </p>
      </div>
    );
  }

  // registration form
  return (
    <div>
      <h2>Student Registration</h2>
      <p>Enter your details for ID card generation</p>

      <form onSubmit={submitHandler}>
        <label>First Name</label>
        <input type="text" name="firstName" required value={formData.firstName} onChange={changeHandler} />

        <label>Last Name</label>
        <input type="text" name="lastName" required value={formData.lastName} onChange={changeHandler} />

        <label>Father's Name</label>
        <input type="text" name="fatherName" required value={formData.fatherName} onChange={changeHandler} />

        <label>Email Address</label>
        <input type="email" name="emailAddress" required value={formData.emailAddress} onChange={changeHandler} />

        <label>Phone Number</label>
        <input type="text" name="phoneNo" required value={formData.phoneNo} onChange={changeHandler} />

        <label>Date of Birth</label>
        <input type="date" name="dateOfBirth" required value={formData.dateOfBirth} onChange={changeHandler} />

        <label>Address</label>
        <input type="text" name="address" required value={formData.address} onChange={changeHandler} />

        <label>Enrollment No</label>
        <input type="text" name="enrollmentNo" required value={formData.enrollmentNo} onChange={changeHandler} />

        <label>Program Name</label>
        <select name="programName" required value={formData.programName} onChange={changeHandler}>
          <option value="">-- Select Program --</option>
          <option value="MTech-IT">MTech-IT</option>
          <option value="MCA">MCA</option>
          <option value="BCom">BCom</option>
          <option value="MTech-CS">MTech-CS</option>
        </select>

        <label>Roll No</label>
        <input type="text" name="rollNo" required value={formData.rollNo} onChange={changeHandler} />

        <label>Admission Batch (auto-filled)</label>
        <input type="text" name="admissionBatch" required value={formData.admissionBatch} readOnly />

        <label>Student Photo</label>
        <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} />
        {uploading && <p>Uploading...</p>}
        {formData.studentPhoto && (
          <img src={formData.studentPhoto} alt="Preview" width="120" className="mt-2 rounded" />
        )}

        <button type="submit" disabled={uploading}>Register Student</button>
      </form>
    </div>
  );
};

export default StudentDashboard;
