import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import HomePage from "./pages/HomePage";
import StudentDetailPage from "./pages/StudentDetailPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import ErrorPage from "./pages/ErrorPage";
import PendingAdmins from "./pages/PendingAdmins";
import AddCourse from "./pages/AddCourses";
import AdminLayout from "./pages/AdminLayout";
import Navbar from "./components/UI/Navbar";
import Footer from "./components/UI/Footer";
import EditorPage from "./pages/EditorPage";
import AdminDashboardPreview from "./pages/AdminDashboardPreview";
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="" element={<AdminDashboard />} />
            <Route path="pending-admins" element={<PendingAdmins />} />
            <Route path="add-course" element={<AddCourse />} />
            <Route path="student-details" element={<StudentDetailPage />} />
            <Route path="templates" element={<AdminDashboardPreview />} />
            <Route path="templates/:id" element={<EditorPage />} />
            <Route path="editor" element={<EditorPage />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;
