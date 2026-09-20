import {useActionState,useState, useCallback, useEffect } from "react";
import "./Reset.css";
import EmailPopup from "../EmailPopup.jsx";
import EmailVerify from "../components/EmailVerify.jsx";
import sendFormData from "../hooks/sendFormData.js";
import { Link, useNavigate } from "react-router-dom";
import useUtilities from "../hooks/useUtilities.js";
import Toast from "../Toast";
import Loading from "../components/Loading.jsx";

const Reset = () => {
  let navigate = useNavigate();
  const format = {
    email: "",
    number: "",
    newPassword: "",
    confirmPassword: ""
  };
  const [perfect,setPerfect] = useState(false);
  const [persist, setPersist] = useState(format);
  const formHandle = async (pre, formData) => {
    try {
      let res = await sendFormData(`${import.meta.env.VITE_AUTH}/reset`, formData);
      return res
    } catch (err) {
      return { status: "error", message: err.message }
    }
  }

  const [state, action, isPending] = useActionState(formHandle, {});


  const typing = useCallback((e) => {
    const { name, value } = e.target;
    setPersist(pre => ({ ...pre, [name]: value }))
  }, []);
  const {addToast,removeToast,toasts} = useUtilities();


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
    <div className="rp-wrapper">

      <div className="rp-card">

        <div className="rp-lock">🔐</div>

        <h1 className="rp-title">
          Reset Password
        </h1>

        <p className="rp-subtitle">
          Verify your account details and create
          a secure new password.
        </p>

        <form action={action} className="rp-form">

          {/* Username */}
          <div className="rp-field">
            <label htmlFor="rp-username">
              Email
            </label>

            <div className="rp-input-wrapper">
              <span className="rp-input-icon">♙</span>

              <input
                type="email"
                id="rp-username"
                value={persist.email}
                name="email"
                onChange={typing}
                placeholder="example@gmail.com"
                autoComplete="email"
                required
              />
              <small>{state?.email?.msg} {state?.tag === "email" && state.message}</small>
            </div>
          </div>


          {/* Mobile Number */}
          <div className="rp-field">
            <label htmlFor="rp-number">
              Mobile Number
            </label>

            <div className="rp-input-wrapper">
              <span className="rp-input-icon">⌕</span>

              <input
                type="tel"
                id="rp-number"
                value={persist.number}
                name="number"
                onChange={typing}
                placeholder="Enter registered number"
                inputMode="numeric"
                autoComplete="tel"
                required
              />
              <small>{state?.number?.msg} {state?.tag === "number" && state.message}</small>
            </div>
          </div>


          {/* New Password */}
          <div className="rp-field">
            <label htmlFor="rp-password">
              New Password
            </label>

            <div className="rp-input-wrapper">
              <span className="rp-input-icon">◆</span>

              <input
                type="password"
                id="rp-password"
                value={persist.newPassword}
                name="newPassword"
                onChange={typing}
                placeholder="Create new password"
                autoComplete="new-password"
                required
              />
              <small>{state?.newPassword?.msg}</small>
            </div>
          </div>


          {/* Confirm Password */}
          <div className="rp-field">
            <label htmlFor="rp-confirm-password">
              Confirm Password
            </label>

            <div className="rp-input-wrapper">
              <span className="rp-input-icon">◆</span>

              <input
                type="password"
                id="rp-confirm-password"
                value={persist.confirmPassword}
                name="confirmPassword"
                onChange={typing}
                placeholder="Confirm your password"
                autoComplete="new-password"
                required
              />
              <small>{state?.newPassword?.msg} </small>
            </div>
          </div>


          <button
            className="rp-update"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Sending..." : "Next"}
          </button>

        </form>


        <Link to="/login" className="rp-back">
         Back to Login
        </Link>


        <div className="rp-security">
          Your password is securely protected
        </div>

      </div>
      {
    toasts.map(data =>(
      <Toast key={data.id} toastName={data.type} message={data.message} durationName={`${data.type}d`} cls={() => removeToast(data.id)} contentName={""} messageName={""} closeName={""}  />
    ))
  }
  {isPending && <Loading />}
  {perfect && <EmailPopup><EmailVerify path={"verify-reset"} email={persist.email} purpose={"update"} addTost={addToast}/></EmailPopup>}
    </div>
  )
}

export default Reset;
