import { Link,useNavigate } from "react-router-dom";
import "./Register.css";
import EmailPopup from "../EmailPopup.jsx";
import EmailVerify from "../components/EmailVerify.jsx";
import { useActionState, useCallback, useEffect,useState} from "react";
import sendFormData from "../hooks/sendFormData.js";
import Loading from "../components/Loading.jsx";
import Toast from "../Toast.jsx";
import useUtilities from "../hooks/useUtilities.js";

const Register = () =>{
  const navigate = useNavigate();
  const [agree,setAgree] = useState(false);
  const format = {
    username:"",
    number:"",
    email:"",
    password:""
  }
  const [perfect,setPerfect] = useState(false);
  const [save,setSave] = useState(format);
 const registerHandle = async (pre,formData) =>{
  try {
    const res = await sendFormData(`${import.meta.env.VITE_AUTH}/register`,formData);
    return res
    } catch (error) {
    return {status: "error",message: error.message}
  }
 }
  const [state,action,isPending] = useActionState(registerHandle,{});
  const {addToast,toasts,removeToast} = useUtilities();
  const typing = useCallback((e) =>{
    const {name,value} = e.target;
    setSave(pre => ({...pre,[name]:value}))
},[])
  useEffect(() =>{
    if(state?.status === "success"){
      addToast("success",state?.message);
      setPerfect(true)
    }
    if(state?.state === "error"){
      addToast("error",state?.message)
    }
  },[state])
  const trigger = (e) =>{
    setAgree(e.target.checked)
  }
return (
<main className="auth-page">

  <section className="auth-card">

    {/* Brand */}
    <div className="brand">
      <div className="logo">C</div>
      <span>CodPro</span>
    </div>

    {/* Header */}
    <header className="auth-header">
      <h1>Create your account</h1>
      <p>Enter your details carefully to get started.</p>
    </header>

    {/* Registration Form */}
    <form className="auth-form" action={action}>

      {/* Username */}
      <div className="field">
        <label htmlFor="username">Username</label>

        <input
          type="text"
          id="username"
          name="username"
          value={save.username}
          onChange={typing}
          placeholder="Choose a username"
          autoComplete="username"
          required
        />
        <small>{state?.username?.msg} {state?.status === "error" && state?.message} </small>
      </div>

      {/* Phone */}
      <div className="field">
        <label htmlFor="phone">Phone number</label>

        <input
          type="tel"
          id="phone"
          name="number"
          value={save.number}
          onChange={typing}
          placeholder="Enter your phone number"
          inputMode="numeric"
          autoComplete="tel"
          maxLength={10}
          required
        />
        <small>{state?.phone?.msg} {state?.status === "error" && state?.message} </small>
      </div>


      {/* Email */}
      <div className="field">
        <label htmlFor="email">Email: </label>

        <input
          type="email"
          id="email"
          name="email"
          value={save.email}
          onChange={typing}
          placeholder="codpro@gmail.com"
          required
        />
        <small>{state?.email?.msg} {state?.status === "error" && state?.message} </small>
      </div>

      {/* Password */}
      <div className="field">
        <label htmlFor="password">Password</label>

        <input
          type="password"
          id="password"
          name="password"
          value={save.password}
          onChange={typing}
          placeholder="Create a strong password"
          autoComplete="new-password"
          required
        />
        <small>{state?.password?.msg} {state?.status === "error" && state?.message} </small>
      </div>

      {/* Agreement */}
      <label className="agreement">

        <input
          type="checkbox"
          id="agreement"
          onChange={trigger}
          checked={agree}
          required
        />

        <span className="checkmark"></span>

        <span className="agreement-text">
          I confirm that the information provided above is{" "}
          <strong>correct</strong> and I understand that after
          registration, my username and phone number cannot be
          changed. Only my password can be updated.
        </span>

      </label>
  

      {/* Register */}
      <button
        type="submit"
        className="register-btn"
        disabled={isPending}
      >
        {isPending?"Sending...":"Send OTP"}
        <span>→</span>
      </button>

    </form>

    {/* Login */}
    <div className="login-link">
      <span>Already have an account?</span>
      <Link to="/login">Login</Link>
    </div>

    {/* Security */}
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
 {perfect && <EmailPopup><EmailVerify email={save.email} path={"verify-register"} purpose={"register"} addTost={addToast}/></EmailPopup>}
</main>
)
}

export default Register;
