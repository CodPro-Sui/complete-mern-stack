import {createPortal} from "react-dom";

const Popup = ({children,fn}) => {
  const addr = document.querySelector("#add");
  const stop = (e) =>{
    e.stopPropagation()
  }
  return createPortal(
    <div className="overlay" onClick={fn}>
      <div className="model" onClick={stop}>
        {children}
      </div>
    </div>
    ,addr
  )
}

export default Popup