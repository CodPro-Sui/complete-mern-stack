import {useEffect,useState,useCallback,useActionState} from "react";
import "../styles/add.css";
import useUpload from "../hooks/useUpload.js";
import updateItem from "../hooks/updateItem.js";
import Loading from "./Loading.jsx";

const Edit = ({close,fn,data,addToast,refresh}) => {
const [editable,setEditable] = useState(data);
const {pathUrl,uploadFile} = useUpload();
   const imgPath = data.avatar;
 const triger = useCallback((e) =>{
       const {value,name} = e.target;
     setEditable(pre =>({...pre,[name]: value.trim()}));
   },[]);
    const takeDataFromServer = async (pre,formData) =>{
     
    try{
    formData.append("unique_id",data.unique_id);
    const api = import.meta.env.VITE_SERVER_API;
    const res = await updateItem(`${api}/teams`,formData);
     return res
    }catch(err){
      return {
        status: "error",
      message: err.message
     }
   }}
;       
     const [state,action,isPending] = useActionState(takeDataFromServer,null);
    useEffect(() =>{
      if(state?.status === "success"){
        addToast(state.status,state.message);
        fn();
        close ();
       refresh();
      }
      if(state?.status === "error"){
        addToast(state.status,state.message)
      }
      if(state?.status === "warning"){
        addToast(state.status,state.message)
      }
    },[state]);
    return (
         <div className="container1">
    <div>


    <div className="form-card">

      <div className="form-header">
        <div>
        <h2>
          Contact Information
        </h2>

        <p>
          Fill in the details below to create a new contact.
        </p>
        </div>
        <button onClick={fn}>×</button>
      </div>


      <form action={action}>

        <div className="form-body">

          <div className="profile-section">

            <div className="avatar" id="avatar">
              <img src={pathUrl || imgPath} alt="team" />
            </div>

            <div className="upload-info">

              <h3>
                Profile Picture
              </h3>

              <p>
                JPG, PNG or WEBP. Maximum size 3MB.
              </p>

              <label
                htmlFor="profileImage"
                className="upload-btn"
              >
                Upload Photo
              </label>

              <input
                id="profileImage"
                className="upload-input"
                onChange={uploadFile}
                type="file"
                accept="image/*"
                name="avatar"
              />
              <small>{state?.avatar?.msg}</small>
            </div>

          </div>


          <div className="form-grid">

            <div className="form-group">

              <label className="form-label">
                First Name <span className="required">*</span>
              </label>

              <input
                className="form-input"
                type="text"
                name="fname"
                value={editable.fname}
                onChange={triger}
                required
              />
              <small>{state?.fname?.msg}</small>
            </div>


            <div className="form-group">

              <label className="form-label">
                Last Name <span class="required">*</span>
              </label>

              <input
                className="form-input"
                type="text"
                name="lname"
                value={editable.lname}
                onChange={triger}
                required
              />
              <small>{state?.lname?.msg}</small>
            </div>

            <div className="form-group">

              <label className="form-label">
                Phone Number <span className="required">*</span>
              </label>

              <input
                className="form-input"
                type="tel"
                name="number"
                value={editable.number}
                onChange={triger}
                required
              />
              <small>{state?.number?.msg}</small>
            </div>



            <div className="form-group">

              <label className="form-label">
                Email Address
              </label>

              <input
                className="form-input"
                type="email"
                name="email"
                value={editable.email}
                onChange={triger}
              />
              <small>{state?.email?.msg}</small>
            </div>


            <div className="form-group">

              <label className="form-label">
                Role <span className="required">*</span>
              </label>

              <select name="role" value={editable.role} onChange={triger}  className="form-select" required>

                <option value="admin">
                  Administrator
                </option>

                <option value="manager">
                  Manager
                </option>

                <option value="developer">
                  Developer
                </option>

                <option value="designer">
                  Designer
                </option>

                <option value="employee">
                  Employee
                </option>

              </select>
              <small>{state?.role?.msg}</small>
            </div>


          </div>

        </div>

        <div className="form-footer">

          <button
            type="button"
            className="btn cancel-btn"
            onClick={fn}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn save-btn"
            disabled={isPending}
          >
            {isPending?"Updating...":"Update"}
          </button>

        </div>

      </form>

    </div>
    </div>
    {isPending && <Loading />}
  </div>
    );
};

export default Edit;
