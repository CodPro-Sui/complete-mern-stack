import {createPortal} from "react-dom";
import "./toast.css"
const Toast = ({message,cls,toastName,durationName,contentName,messageName,closeName}) =>{
  
   return createPortal(
        <div className="toast-parent">
            <div className={`toast-child ${toastName}`}>
                <div className={`duration ${durationName}`}></div>
                <div className={`content ${contentName}`}>
                 
                     <span className={`message ${messageName}`}>
                     {message}
                     </span>
                         
                    <span className="toast-icon">
                    {toastName === "success" && "✓"}
                    {toastName === "error" && "!"}
                    {toastName === "warning" && "⚠"}
                    </span>
                 
                    <button onClick={cls} className={`cls ${closeName}`}>×</button>
                </div>
            </div>
        </div>,document.querySelector(".toast")
    )
 }

export default Toast;
