import AdminDashboard from "./components/Admin/AdminDashboard";
import StudentDashboard from "./components/Student/StudentDashboard";

const page = () => {
  const role: string = "STUDENT";

  return <>{role === "ADMIN" ? <AdminDashboard /> : <StudentDashboard />}</>;
};

export default page;
