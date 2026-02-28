import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import { ToastContainer } from "react-toastify";
import Homepage from "./pages/Homepage.jsx";
import Teams from "./components/teams/TeamsSection.jsx";
import TaskDetails from "./pages/TaskDetails.jsx";
import TeamDetails from "./components/teams/TeamDetails.jsx";
import Projects from "./pages/Projects.jsx";
import ProjectDetails from "./pages/ProjectDetails.jsx";
import Reports from "./pages/Reports.jsx";
import Settings from "./pages/Settings.jsx";
import PrivateLayout from "./components/PrivateLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <PrivateLayout />,
        children: [
          {
            element: <App />,
            children: [
              { index: true, element: <Homepage /> },
              { path: "teams", element: <Teams /> },
              { path: "teams/:teamId", element: <TeamDetails /> },
              { path: "tasks/:taskId", element: <TaskDetails /> },
              { path: "projects", element: <Projects /> },
              { path: "projects/:projectId", element: <ProjectDetails /> },
              { path: "reports", element: <Reports /> },
              { path: "settings", element: <Settings /> },
            ],
          },
        ],
      },
    ],
  },

  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-left"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  </StrictMode>,
);
