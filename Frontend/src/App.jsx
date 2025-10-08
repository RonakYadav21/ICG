import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import StudentDashboard from "./pages/StudentDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import IDCardStatus from "./pages/IDCardStatus";
import Login from "./pages/Login";
import Signup from './pages/Signup';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<DashboardLayout />}>
          <Route path="/student-registration" element={<StudentDashboard />} />
          <Route path="/id-card-status" element={<IDCardStatus />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
