import { useEffect,useState, useRef } from "react";
import "./EmailVerify.css";
import sendOtp from "../hooks/sendOtp.js";

import { useNavigate } from "react-router-dom";
const EmailVerify = ({ email ,path,purpose,addTost}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef([]);
  const [otpTime, setOtpTime] = useState(300);
  const [limitOtp, setLimitOtp] = useState(1);
  const [isLoading,setIsLoading] = useState(false);
  const [isResending,setIsResending] = useState(false);
  let navigate = useNavigate();
  
  const isComplete = otp.join("").length === 6; 

  const handle = async (e) => {
    e.preventDefault();
   if(isLoading) return;
     if(!isComplete){
    return addTost("error","OTP must be 6-digit");
    }
    setIsLoading(true);
    try{
    setIsLoading(true);
    let res = await sendOtp({email,purpose,otp:otp.join("")},path);
    if(!res){
      return addTost("error","Failed to fetch!")
    }
   console.log(res);
    addTost(res.status,res.message);
    


    const ok = String(res.status).toLowerCase() === "success";
    if (!ok) return;

    if (purpose === "login") {
      localStorage.setItem("token", res.token);
      navigate("/", { replace: true });
    } else if (purpose === "register" || purpose === "update") {
      navigate("/login", { replace: true });
    } else {
      console.warn("Unknown purpose:", purpose); // tells you if purpose is the problem
    }




    }catch(error){
    console.error(error.message);
    addTost("error","Something went wrong!");
    }finally{
    setIsLoading(false)
   }
  }

  const enter = (e, i) => {
    let val = e.target.value;
    if(!/^\d$/.test(val)) return;
    let newArr = [...otp];
    newArr[i] = val;
    setOtp(newArr);

    if (val) {
      let ind = Math.min(i + 1, 5);
      inputRef.current[ind].focus();
      inputRef.current[ind].setSelectionRange(1, 1);
    }

  }

  const back = (e, i) => {
    
    if (e.key !== "Backspace") {
      return;
    }
    let newArr = [...otp];
    newArr[i] = "";
    setOtp(newArr);
    let ind = Math.max(i - 1, 0);
    inputRef.current[ind].focus();
    inputRef.current[ind].setSelectionRange(0, 0);
  }

  const resend = async () => {
   if(isResending) return;
   
   setIsResending(true);
   try{
    let res = await sendOtp({email,purpose},"resend");
    if(!res){
      return addTost("error","Failed to fetch!")
    }
   
   addTost(res.status,res.message)
   
   if(res.status === "success") {
      setLimitOtp(1);
      setOtpTime(300);
      setOtp(["","","","","",""]);
      inputRef.current[0]?.focus();
    }

    }catch(error){
   console.log(error.message);
   addTost("error",error.message)
   }finally{
   setIsResending(false)
   }
  }

  useEffect(() => {
    if(limitOtp === 0) return;
    let interval = setInterval(() => {
      setOtpTime(pre => {
        if (pre <= 1) {
          clearInterval(interval);
          setLimitOtp(0);
          setIsResending(false);
          return 0;
        }
        return pre - 1
      })
    }, 1000)
    return () => clearInterval(interval);
  }, [limitOtp])
  return (
    <div className="emailcontainer">
      <form onSubmit={handle}>

        <div className="messagelogo">
          <span>✉️</span>
        </div>

        <div className="subject">
          <h2>Verify your email</h2>
          <p>We sent a 6-digit verification code to</p>
          <div className="center">  <strong>{email}</strong></div>

        </div>
        <div className="otp">
          {otp.map((val, i) => (
            <input type="text" disabled={isLoading}
              maxLength="1" minLength="1"
              onKeyDown={(e) => back(e, i)}
              inputMode="numeric" key={i} onChange={(e) => enter(e, i)} value={val} ref={(el) => (inputRef.current[i] = el)} />
          ))}
        </div>
        <div className="verifybtn">
          <button type="submit" disabled={!isComplete || isLoading}>{isLoading? "Verifying...":"Verify"}</button>
        </div>

        <div className="resendotp">
          <p>Didn't receive the code?</p>
          <div className="timer">
            <span className="countdown">
              ⏱️ Time Left: {Math.floor(otpTime /60)}:{String(otpTime % 60).padStart(2,"0")}
            </span>
            <button type="button" onClick={resend} disabled={limitOtp === 1 || isResending} className="resend">Resend</button>
          </div>

        </div>
      </form>
    </div>
  )
}

export default EmailVerify;
