import { Navigate, Outlet } from "react-router-dom"
const Auth = () => {
    let token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/login" replace />
    }
    return <Outlet />
}

export default Auth
