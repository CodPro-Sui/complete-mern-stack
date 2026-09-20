import { Link } from "react-router-dom";
import "./Login.css";
import EmailPopup from "../EmailPopup.jsx";
import EmailVerify from "../components/EmailVerify.jsx";
import { useEffect,useState,useActionState, useCallback } from "react";
import Loading from "../components/Loading.jsx";
import sendFormData from "../hooks/sendFormData.js";
import useUtilities from "../hooks/useUtilities.js";
import Toast from "../Toast";
import { useNavigate } from "react-router-dom";

const Login = () =>{
  const format = {
    email:"",
    password:""
  };
  const [perfect,setPerfect] = useState(false);
  const [save,setSave] = useState(format);
  const navigate = useNavigate();

  const handleLogin = async (pre,formData) =>{
  try {
    const res = await sendFormData(`${import.meta.env.VITE_AUTH}/login`,formData);
    if(!res){
      return {
        status:"error",
        message:"failed to fetch"
      }
    }
    return {
    status: res.status,
    tag: res.tag,
   message: res.message
   }
    } catch (error) {
    return {status: "error",message: error.message}
  }
 }

  const [state,action,isPending] = useActionState(handleLogin,{});
  const {addToast,removeToast,toasts} = useUtilities();
  const typing = useCallback((e) =>{
    const {value,name} = e.target;
    setSave(pre =>({...pre,[name]:value}))
  },[])

  useEffect(() =>{
if(!state) return;
    if(state?.status === "success"){
      addToast("success",state.message);
      setPerfect(true)
    }
    if(state?.status === "error"){
      addToast("error",state.message)
    }
   if(state?.status === "warning"){
   addToast("warning",state.message);
    }
  },[state])
return (

<main className="login-page">

  <section className="login-card">

    <div className="brand">
      <div className="logo">C</div>
      <span>CodPro</span>
    </div>

    <header className="login-header">
      <h1>Welcome back</h1>
      <p>Sign in to access your account</p>
    </header>

    <form action={action} className="login-form">

      <div className="field">
        <label htmlFor="email">Email</label>

        <input
          type="email"
          name="email"
          value={save.email}
          onChange={typing}
          placeholder="Enter your email"
          required
        />
        <small>{state?.email?.msg} {state?.tag === "email" && state?.message}</small>
      </div>

      <div className="field">

        <div className="password-heading">
          <label htmlFor="password">Password</label>

          <Link to="/reset">Forget Password?</Link>
        </div>

        <input
          type="password"
          name="password"
          value={save.password}
          onChange={typing}
          placeholder="Enter your password"
          required
        />
        <small>{state?.password?.msg} {state?.tag === "password" && state?.message} </small>
      </div>

      <button className="login-btn" type="submit" disabled={isPending}>
        {isPending?"Sending...":"Send OTP"}
      </button>

    </form>

    {/* Register */}
    <div className="register">
      <span>Don't have an account?</span>
      <Link to="/register">Create Account</Link>
    </div>

    <div className="security">
      <span>✦</span>
      Your information is securely protected
    </div>

  </section>
{
    toasts.map(data =>(
      <Toast key={data.id} toastName={data.type} message={data.message} durationName={`${data.type}d`} cls={() => removeToast(data.id)} contentName={""} messageName={""} closeName={""}  />
    ))
  }
  {isPending && <Loading />}

  {
    perfect &&
    <EmailPopup>
      <EmailVerify path={"verify-login"} email={save.email} purpose={"login"} addTost={addToast}/>
    </EmailPopup>
  }
</main>
)
}

export default Login;
