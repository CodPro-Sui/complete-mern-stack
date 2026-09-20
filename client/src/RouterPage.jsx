
import App from "./App.jsx";
import NotFound from "./NotFound.jsx";
import Login from "./authPages/Login.jsx";
import Register from "./authPages/Register.jsx";
import Reset from "./authPages/Reset.jsx";
import Auth from "./protects/Auth.jsx";
import PreventAuth from "./protects/PreventAuth.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
const RouterPage = () => {

  const Logout = () => {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />
  };

  return (
    < Routes >
      <Route element={<PreventAuth />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<Auth />}>
        <Route path="/" element={<App />} />
        <Route path="/logout" element={<Logout />} />
      </Route>
      <Route path="/reset" element={<Reset />} />
      <Route path="*" element={<NotFound />} />

    </Routes >
  )
}

export default RouterPage

