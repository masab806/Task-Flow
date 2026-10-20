import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Login";
import SignupPage from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import { SupervisorDashboard } from "../pages/Supervisor-Dashboard";
import ProtectedRoutes from "./ProtectedRoutes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />
    },
    {
        path: "/signin",
        element: <SignupPage />
    },
    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />
            },
        ]
    },
    {
        path: "/supervisor",
        element: <SupervisorDashboard />
    }
])

export default router