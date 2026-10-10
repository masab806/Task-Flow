import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Login";
import SignupPage from "../pages/Signup";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage/>
    },
    {
        path: "/signin",
        element: <SignupPage/>
    }
])

export default router