import AdminDashboard from "./components/Admin/AdminDashboard";
import StudentDashboard from "./components/Student/StudentDashboard";

const page = () => {
  const role: string = "ADMIN";

  return <>{role === "ADMIN" ? <AdminDashboard /> : <StudentDashboard />}</>;
};

export default page;
