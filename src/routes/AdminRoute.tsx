import { Routes, Route } from "react-router-dom";
import Layout from "../components/admin/Layout";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Candidates from "../pages/admin/Candidates";
import Stacks from "../pages/admin/Stacks";
import AddStack from "../pages/admin/AddStack";
import Interviewers from "../pages/admin/Interviewers";
import SingleInterviewerDetails from "../pages/admin/SingleInterviewerDetails";
import AdminLoggedIn from "../components/admin/AdminLoggedIn";
import Interviews from "../pages/admin/Interviews";

const AdminRoute = () => {
  return (
    <Routes>
      <Route path="" element={<AdminLogin />} />

      <Route path="" element={<AdminLoggedIn/>}>
      <Route
        path="dashboard"
        element={
          <Layout>
            <AdminDashboard />
          </Layout>
        }
      />
      <Route path="candidates" element={<Layout><Candidates/></Layout>} />
      <Route path="stacks" element={<Layout><Stacks/></Layout>} />
      <Route path="add-stack" element={<Layout><AddStack/></Layout>} />
      <Route path="interviewers" element={<Layout><Interviewers/></Layout>} />
      <Route path="interviewer/:id" element={<Layout><><SingleInterviewerDetails/></></Layout>} />

      <Route path="interviews" element={<Layout><Interviews /></Layout>} />
      </Route>

      
    </Routes>
  );
};

export default AdminRoute;
