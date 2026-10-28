import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Login";
import SignupPage from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import { SupervisorDashboard } from "../pages/Supervisor-Dashboard";
import ProtectedRoutes from "./ProtectedRoutes";
import ForgotPassword from "../pages/ForgotPassword";

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
    },
    {
        path: "/forgot",
        element: <ForgotPassword/>
    }
])

export default router