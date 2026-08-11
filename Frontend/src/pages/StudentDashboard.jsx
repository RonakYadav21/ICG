import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllCourses, studentRegistration } from "../api/templatesApi";
import { useNavigate } from "react-router-dom";
import { FaUser, FaSchool } from "react-icons/fa";
import Footer from "../components/UI/Footer";
import { useForm } from "react-hook-form";

const StudentDashboard = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const [uploading, setUploading] = useState(false);
  const [courses, setCourses] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
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
    },
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

  // Register Student photo & programName
  useEffect(() => {
    register("studentPhoto", {
      required: "Student Photo is required",
    });
  }, [register]);

  useEffect(() => {
    register("programName");
  }, [register]);

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

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: imgData,
        },
      );

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();

      setValue("studentPhoto", data.secure_url, {
        shouldValidate: true,
      });

      toast.success("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Submit registration
  const submitHandler = async (data) => {
    try {
      let formattedDOB = "";
      if (data.dateOfBirth) {
        const dob = new Date(data.dateOfBirth);
        formattedDOB = dob.toISOString().split("T")[0];
      }

      const submissionData = {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        fatherName: data.fatherName.trim(),
        emailAddress: data.emailAddress.trim().toLowerCase(),
        phoneNo: data.phoneNo.trim(),
        dateOfBirth: formattedDOB,
        address: data.address.trim(),
        enrollmentNo: data.enrollmentNo.trim(),
        programName: data.programName.trim(),
        rollNo: data.rollNo.trim(),
        admissionBatch: data.admissionBatch,
        studentPhoto: data.studentPhoto,
        courseId: Number(data.courseId),
      };
      await studentRegistration(submissionData);
      toast.success("Student registered successfully!");

      navigate("/");
    } catch (error) {
      toast.error("Registration failed. Please try again.");

      if (error.message.includes("could not execute statement")) {
        toast.error("Email Already registered!", {
          duration: 10000,
        });
      }
    }
  };

  return (
    <>
      <div className="">
        <div>
          <div className="text-center mt-8">
            <h2 className="text-4xl font-heading text-gray-800">
              Student ID Registration
            </h2>

            <p className="mt-2 text-lg text-gray-500 italic">
              Enter your personal and academic information to register and
              generate your student ID card.
            </p>
          </div>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="bg-white p-10 space-y-8 rounded-lg"
          >
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
                      First Name <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      placeholder="John"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg"
                      {...register("firstName", {
                        required: "First Name is required",
                      })}
                    />

                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                      Last Name
                    </label>

                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg"
                      {...register("lastName")}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Father's Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Joe Doe"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg"
                    {...register("fatherName", {
                      required: "Father's Name is required",
                    })}
                  />

                  {errors.fatherName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.fatherName.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="email"
                      placeholder="john@gmail.com"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg"
                      {...register("emailAddress", {
                        required: "Email Address is required",
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Please enter a valid email address",
                        },
                      })}
                    />

                    {errors.emailAddress && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.emailAddress.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="9123456789"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg"
                      {...register("phoneNo", {
                        required: "Phone Number is required",
                        pattern: {
                          value: /^[6-9]\d{9}$/,
                          message: "Please enter a valid 10-digit phone number",
                        },
                      })}
                    />

                    {errors.phoneNo && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.phoneNo.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="date"
                    max={new Date().toISOString().split("T")[0]}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg"
                    {...register("dateOfBirth", {
                      required: "Date of Birth is required",
                    })}
                  />

                  {errors.dateOfBirth && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.dateOfBirth.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>

                  <textarea
                    rows={3}
                    placeholder="123 Main Street, City, State, ZIP"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg resize-none"
                    {...register("address", {
                      required: "Address is required",
                    })}
                  />

                  {errors.address && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.address.message}
                    </p>
                  )}
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
                    Enrollment Number <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="DE22020XX"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg"
                    {...register("enrollmentNo", {
                      required: "Enrollment Number is required",
                      pattern: {
                        value: /^[A-Z]{2}\d+[A-Z]*$/,
                        message:
                          "Enrollment Number must start with 2 letters followed by numbers (e.g., DE22020XX)",
                      },
                    })}
                  />

                  {errors.enrollmentNo && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.enrollmentNo.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Program Name <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-lg"
                    {...register("courseId", {
                      required: "Please select a program",
                    })}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      const selectedCourse = courses.find(
                        (course) => course.courseId.toString() === selectedId,
                      );
                      setValue("courseId", selectedId);
                      setValue("programName", selectedCourse?.courseName || "");
                    }}
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
                  {errors.courseId && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.courseId.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Roll Number <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="IC-2K22-01"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg"
                    {...register("rollNo", {
                      required: "Roll Number is required",
                      pattern: {
                        value: /^[A-Za-z]{2,3}-2[Kk]\d{2}-\d+$/,
                        message: "Roll Number must be like IC-2K22-01",
                      },
                    })}
                  />

                  {errors.rollNo && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.rollNo.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Admission Batch <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="2022-27"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg"
                    {...register("admissionBatch", {
                      required: "Admission Batch is required",
                      pattern: {
                        value: /^\d{4}-\d{2}$/,
                        message:
                          "Admission Batch must be in the format YYYY-YY (e.g., 2022-27)",
                      },
                    })}
                  />

                  {errors.admissionBatch && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.admissionBatch.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Student Photo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/jpg"
                    onChange={handleFileChange}
                    disabled={uploading}
                    className={`w-full border border-dashed border-gray-400 rounded-lg px-4 py-6 text-center cursor-pointer focus:outline-none ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
                  />
                  {errors.studentPhoto && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.studentPhoto.message}
                    </p>
                  )}
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
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      <span className="ml-2 text-blue-500 font-medium">
                        Uploading...
                      </span>
                    </div>
                  )}
                  {watch("studentPhoto") && !uploading && (
                    <img
                      src={watch("studentPhoto")}
                      alt="Preview"
                      className="mt-4 w-36 h-36 object-cover rounded-lg border"
                    />
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={uploading || isSubmitting}
              value={isSubmitting ? "Submitting" : "Submit Registration"}
              className={`w-1/2 translate-x-1/2 bg-primary text-white py-4 rounded-lg hover:bg-[#B84B22]  transition duration-200 font-semibold text-lg cursor-pointer ${
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
