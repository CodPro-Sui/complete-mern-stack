import {createPortal} from "react-dom";

const EmailPopup = ({children}) => {
  const addr = document.querySelector("#add");
  return createPortal(
    <div className="overlay">
      <div className="model">
        {children}
      </div>
    </div>
    ,addr
  )
}

export default EmailPopup
