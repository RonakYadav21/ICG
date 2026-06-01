import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllCourses, studentRegistration } from "../api/templatesApi";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/UI/Navbar";
import { FaUser, FaSchool } from "react-icons/fa";
import Footer from "../components/UI/Footer";
const StudentDashboard = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const [uploading, setUploading] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [courses, setCourses] = useState([]);

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
    courseId: "",
  });
  const navigate = useNavigate();
  //Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        setCourses(data);
      } catch (err) {
        console.log(err);
        toast.error("something went wrong");
      }
    };
    fetchCourses();
  }, [API_URL]);

  // Handle Cloudinary upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setUploading(true);
    //Uploading Image to Cloduinary
    const imgData = new FormData();
    imgData.append("file", file);
    imgData.append("upload_preset", UPLOAD_PRESET);
   console.log("Cloud Name:", CLOUD_NAME);
console.log("Upload Preset:", UPLOAD_PRESET);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: imgData,
        }
      );

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setFormData((prev) => ({
        ...prev,
        studentPhoto: data.secure_url,
      }));
      toast.success("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };
  // input change
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit registration
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formData.studentPhoto) {
      toast.error("Please upload a student photo");
      return;
    }

    if (!formData.courseId) {
      toast.error("Please select a program");
      return;
    }

    try {
      let formattedDOB = "";
      if (formData.dateOfBirth) {
        const dob = new Date(formData.dateOfBirth);
        formattedDOB = dob.toISOString().split("T")[0];
      }

      const submissionData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        fatherName: formData.fatherName.trim(),
        emailAddress: formData.emailAddress.trim().toLowerCase(),
        phoneNo: formData.phoneNo.trim(),
        dateOfBirth: formattedDOB,
        address: formData.address.trim(),
        enrollmentNo: formData.enrollmentNo.trim(),
        programName: formData.programName.trim(),
        rollNo: formData.rollNo.trim(),
        admissionBatch: formData.admissionBatch.trim(),
        studentPhoto: formData.studentPhoto,
        courseId: Number(formData.courseId),
      };
      const res = await studentRegistration(submissionData);

      toast.success("Student registered successfully!");

      navigate("/");
    } catch (err) {
      // axios error
      if (err.response) {
        const status = err.response.status;

        if (status === 400) {
          const msg = err.response.data?.message || "You already registered!";
          toast.error(msg);
          setAlreadyRegistered(true);
          return;
        }

        if (status === 409) {
          toast.error(
            "Email, phone, enrollment, or roll number already exists"
          );
          return;
        }
      }

      toast.error("Registration failed. Please try again.");
    }
  };

  if (alreadyRegistered) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="p-8 text-center bg-white rounded-lg shadow-md max-w-md">
          <div className="mb-4">
            <svg
              className="w-16 h-16 text-green-500 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Registration Already Submitted
          </h2>
          <p className="text-gray-600">
            You've already completed your registration form.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 py-10 px-6 min-h-screen">
        <div>
          <form
            onSubmit={submitHandler}
            className="bg-white p-10 space-y-8 rounded-lg"
          >
            <h2 className="text-4xl font-semibold text-gray-800">
              Student Registration
            </h2>
            <p className="text-gray-500 text-lg">
              Enter your details for ID card generation
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Personal Information */}
              <div className="border border-gray-300 rounded-xl p-8 space-y-6">
                <div className="flex items-center mb-4 gap-3">
                  <FaUser className="text-3xl text-gray-700" />
                  <h3 className="text-xl font-semibold">
                    Personal Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={changeHandler}
                      placeholder="John"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={changeHandler}
                      placeholder="Doe"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    required
                    value={formData.fatherName}
                    onChange={changeHandler}
                    placeholder="Joe Doe"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="emailAddress"
                      required
                      value={formData.emailAddress}
                      onChange={changeHandler}
                      placeholder="DoeJohn@gmail.com"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNo"
                      required
                      value={formData.phoneNo}
                      onChange={changeHandler}
                      placeholder="9123456789"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    required
                    value={formData.dateOfBirth}
                    onChange={changeHandler}
                    max={new Date().toISOString().split("T")[0]}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    required
                    onChange={changeHandler}
                    rows="3"
                    placeholder="123 Main Street, City, State, ZIP"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg resize-none"
                  />
                </div>
              </div>

              {/* Academic Information */}
              <div className="border border-gray-300 rounded-xl p-8 space-y-6">
                <div className="flex items-center mb-4 gap-3">
                  <FaSchool className="text-3xl text-gray-700" />
                  <h3 className="text-xl font-semibold">
                    Academic Information
                  </h3>
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Enrollment Number
                  </label>
                  <input
                    type="text"
                    name="enrollmentNo"
                    required
                    value={formData.enrollmentNo}
                    onChange={changeHandler}
                    placeholder="DE22020XX"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Program Name
                  </label>
                  <select
                    name="courseId"
                    required
                    value={formData.courseId}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      const selectedCourse = courses.find(
                        (c) => c.courseId.toString() === selectedId
                      );
                      setFormData((prev) => ({
                        ...prev,
                        courseId: selectedId,
                        programName: selectedCourse?.courseName || "",
                      }));
                    }}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-lg"
                  >
                    <option value="">-- Select Program --</option>
                    {courses.map((course) => (
                      <option
                        key={course.courseId}
                        value={course.courseId.toString()}
                      >
                        {course.courseName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    name="rollNo"
                    required
                    value={formData.rollNo}
                    onChange={changeHandler}
                    placeholder="IC-2K22-01"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Admission Batch
                  </label>
                  <input
                    type="text"
                    required
                    name="admissionBatch"
                    value={formData.admissionBatch}
                    onChange={changeHandler}
                    placeholder="2022-27"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Student Photo
                  </label>
                  <input
                    type="file"
                    accept="image/jpeg,image/png/jpg"
                    onChange={handleFileChange}
                    disabled={uploading}
                    className={`w-full border border-dashed border-gray-400 rounded-lg px-4 py-6 text-center cursor-pointer focus:outline-none ${
                      uploading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  />
                  {uploading && (
                    <div className="flex justify-center items-center mt-2">
                      <svg
                        className="animate-spin h-6 w-6 text-blue-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                      <span className="ml-2 text-blue-500 font-medium">
                        Uploading...
                      </span>
                    </div>
                  )}
                  {formData.studentPhoto && !uploading && (
                    <img
                      src={formData.studentPhoto}
                      alt="Preview"
                      className="mt-4 w-36 h-36 object-cover rounded-lg border"
                    />
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={uploading}
              className={`w-full bg-primary text-white py-4 rounded-lg hover:bg-[#e54f19] transition duration-200 font-semibold text-lg cursor-pointer ${
                uploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {uploading ? "Uploading Image..." : "Submit Registration"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StudentDashboard;
