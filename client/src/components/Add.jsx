import { useActionState, useEffect} from "react";
import "../styles/add.css";
import useUpload from "../hooks/useUpload.js";
import addData from "../hooks/addData.js";
import useUtilities from "../hooks/useUtilities.js";
import Loading from "./Loading.jsx";

const Add = ({ fn,addToast,send}) => {
  const {pathUrl,uploadFile} = useUpload();
  const {fields,tracking,orginalState} = useUtilities();
  const actionHandle = async (pre, formData) => {
     let avatar = formData.get("avatar");
     if(!avatar || avatar.size === 0){
      addToast("error","please upload your selfie");
      return {
        avatar:{
          msg:"Please upload your selfie"
        }
      }
     }
    try {
      const api = import.meta.env.VITE_SERVER_API;

      const result = await addData(`${api}/teams`,formData);     
 return result
    } catch (error) {
      return error.message
    }
  };
  const [state, action, isPending] = useActionState(
    actionHandle,
    {}
  );
   
  useEffect(() =>{
    if(state.status === "success"){
       addToast("success",state.message);
       send();
       fn();
       orginalState();
    }
    if(state.status === "warning"){
      addToast("warning",state.message)
    }
    if(state.status === "error"){
      addToast("error",state.message)
    }
  },[state])
 
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
                  {pathUrl?<img src={pathUrl} alt="team" />:"+"}
                </div>

                <div className="upload-info">

                  <h3>
                    Profile Picture
                  </h3>

                  <p>
                    JPG, PNG or JPEG. Maximum size 3MB.
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
                    type="file"
                    accept="image/*"
                    name="avatar"
                    onChange={uploadFile}
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
                    onChange={tracking}
                    value={fields.fname}
                    placeholder="Enter first name"
                    required
                  />
                  <small>{state?.fname?.msg}</small>

                </div>


                <div className="form-group">

                  <label class="form-label">
                    Last Name <span class="required">*</span>
                  </label>

                  <input
                    className="form-input"
                    type="text"
                    name="lname"
                    onChange={tracking}
                    value={fields.lname}
                    placeholder="Enter last name"
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
                    onChange={tracking}
                    value={fields.number}
                    name="number"
                    placeholder="+91 98765 43210"
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
                    value={fields.email}
                    onChange={tracking}
                    placeholder="example@email.com"
                  />
                  <small>{state?.email?.msg}</small>

                </div>


                <div className="form-group">

                  <label className="form-label">
                    Role <span className="required">*</span>
                  </label>

                  <select name="role" value={fields.role} onChange={tracking} className="form-select" required>

                    <option value="">
                      Select role
                    </option>

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
                 disabled={isPending}>
                {isPending? "Saving...":"Save"}
              </button>

            </div>

          </form>

        </div>
      </div>
   {isPending &&  <Loading />}
    </div>
  );
};

export default Add;
