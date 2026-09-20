import { useState} from "react";

const useUpload = () => {
  const [pathUrl,setPathUrl] = useState("");
  const uploadFile = (event) =>{
    let file = event.target.files[0];
   
    if(file){
       const reader = new FileReader();
        reader.onload = (e) =>{
            setPathUrl(e.target.result)
        }
        reader.readAsDataURL(file)
    }
  }
  return {pathUrl,uploadFile}
}

export default useUpload
