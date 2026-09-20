import {createPortal} from "react-dom";
const Loading = () => {
  return createPortal(
 <div className="loadingArea">    
<div className='loading'>
        <div className="spinner"></div>
        <p style={{paddingTop: "8px"}}>Loading...</p>
    </div></div>,document.querySelector("#loadingArea")
  )
}

export default Loading
