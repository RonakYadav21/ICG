import StudentDetailPage from "./StudentDetailPage";
import EditorPage from "./EditorPage";

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Create ID card template & save it.</h2>
      <StudentDetailPage />
      <EditorPage />
    </div>
  );
};

export default AdminDashboard;
