import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Login";
import SignupPage from "../pages/Signup";
import Dashboard from "../pages/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage/>
    },
    {
        path: "/signin",
        element: <SignupPage/>
    },
    {
        path: "/dashboard",
        element: <Dashboard/>
    }
])

export default router