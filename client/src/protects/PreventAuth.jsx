import { Navigate,Outlet } from "react-router-dom"
const PreventAuth = () => {
    let token = localStorage.getItem("token");
    if(token){
        return <Navigate to="/" replace />
    }
    return <Outlet />

}

export default PreventAuth;