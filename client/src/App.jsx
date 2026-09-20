
import "./App.css"
import Add from './components/Add'
import Popup from './Popup'
import Show from './components/Show'
import Delete from "./components/Delete"
import Loading from "./components/Loading"
import Edit from './components/Edit'
import useUtilities from "./hooks/useUtilities.js"
import getData from "./hooks/getData.js"
import { useEffect, useCallback, useState } from "react"
import Toast from "./Toast.jsx"
import {useNavigate} from "react-router-dom";

const App = () => {
  const { isOpen, toggle, toasts, addToast, removeToast, dataStore, passData, showHide, startDeleting, startEditing, startAdd } = useUtilities();
  const [teams, setTeams] = useState([]);
 const [search,setSearch] = useState("");
  const navigate = useNavigate();

  const [page,setPage] = useState(1);
  const retrieveData = useCallback(async () => {
    try {
      const res = await getData(`${import.meta.env.VITE_SERVER_API}/teams?page=${page}&limit=10&search=${search}`);
    if (res?.tag === "token") {
  localStorage.removeItem("token");
    navigate("/logout",{replace:true})
}
      setTeams(res);
    } catch (error) {
      console.log(error)
    }
  }, [search,page]);
   const handleLogout = () => navigate("/logout",{replace: true});
  const searching = (e) =>{
    setSearch((e.target.value).trim())
    }
  useEffect(() => {
    retrieveData()
  }, [retrieveData]);
   
   useEffect(() => {
  const onlineStatus = () => {
    if (navigator.onLine) {
      addTost("success", "You are back online");
    } else {
      addTost("error", "You are offline");
    }
  };

  window.addEventListener("online", onlineStatus);
  window.addEventListener("offline", onlineStatus);

  return () => {
    window.removeEventListener("online", onlineStatus);
    window.removeEventListener("offline", onlineStatus);
  };
});    

  return (
    <div className='container'>
      <div>

        <div className="brandHeader">
          <div className="brand">
            <img
              className="brandLogo"
              src="/company.png"
              alt="CodPro Logo"
            />

            <div className="brandText">
              <h1>CodPro</h1>
              <p>CODE • INNOVATE • ELEVATE</p>
            </div>
          </div>

       <div><button className="logout-btn" onClick={handleLogout}>
  <span className="logout-icon">↪</span>
  Logout
</button></div>
        </div>

        <div className="header">
          <h2>Team Members</h2>

          <p>
            Manage your CodPro team members and their contact information.
          </p>
        </div>

        <div className="card">

          <div className="toolbar">
            <div className="searchBox">
              <span className="searchIcon">⌕</span>

              <input
                id="searchInput"
                type="text"
                onChange={searching}
                placeholder="Search team members..."
              />
            </div>

            <button
              className="refreshBtn"
              onClick={retrieveData}
            >
              ↻ &nbsp; Refresh
            </button>
          </div>

          <div className="tableWrapper">

            <table>
              <thead>
                <tr>
                  <th>Sr.</th>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody id="teamTable">

                {
                  teams?.teams?.length === 0 ?
                    (<tr><td colSpan="7">No records found</td></tr>) :
                    (teams?.teams?.map((data, i) => (
                      <tr key={data._id}>
                        <td className="serial">{String(i + teams?.pageInfo?.startInd).padStart(2, "0")}</td>

                        <td>
                          <div className="profile">
                            <img
                              src={`http://localhost:3030/uploads/${data.avatar}`}
                              alt="Team_Member"
                            />
                          </div>
                        </td>

                        <td>
                          <div className="name">{data.fname} {data.lname}</div>
                          <div className="email">{data.email}</div>
                        </td>

                        <td className="number">+91 {data.number}</td>
                        <td className="number">{data.email}</td>

                        <td>
                          <span className={`role ${data.role}`}>{data.role}</span>
                        </td>

                        <td>
                          <button className="actionBtn" onClick={() => {
                            showHide();
                            passData(data);
                          }}>View</button>
                        </td>
                      </tr>

                    )))
                }

              </tbody>
            </table>

          </div>

          <div className="footer">

            <div className="showing">
              Showing {teams?.pageInfo?.page}–{teams?.pageInfo?.limit} of {teams?.pageInfo?.totalDocs} team members
            </div>

            <div className="pagination">
            { teams?.pageInfo?.hasPre &&  <button className="pageBtn arrow" onClick={() => setPage(teams?.pageInfo?.page - 1)}>‹</button>}
              
               {[...Array(teams?.pageInfo?.totalPages || 0)].map((_, i) => {
  const pageNumber = i + 1;

  return (
    <button
      key={pageNumber}
      className={`pageBtn ${
        pageNumber === teams?.pageInfo?.page ? "active" : ""
      }`}
      onClick={() => setPage(pageNumber)}
    >
      {pageNumber}
    </button>
  );
})}

           {teams?.pageInfo?.hasNext &&  <button className="pageBtn arrow" onClick={() => setPage(teams?.pageInfo?.page + 1)}>›</button>}
            </div>

          </div>
        </div>
      </div>
      <div className="adding" onClick={() => {
        toggle();
        addToast("success","start adding new team")
      }}>+</div>

      {
        toasts.map(data => {
          return <Toast key={data.id} toastName={data.type} message={data.message} durationName={`${data.type}d`} cls={() => removeToast(data.id)} contentName={""} messageName={""} closeName={""} />
        })
      }

      {startAdd && <Popup fn={toggle}>
        <Add fn={toggle} send={retrieveData} addToast={addToast}/>
      </Popup>
      }

      {isOpen.isHide && <Popup fn={showHide}>
        <Show fn={showHide} data={dataStore} deleteContact={startDeleting} edit={startEditing} />
      </Popup>}

      {
        isOpen.deleting && <Popup fn={startDeleting}>
          <Delete refresh={retrieveData}  fn={startDeleting} fname={dataStore.fname} addToast={addToast} lname={dataStore.lname} id={dataStore._id} hide={showHide} />
        </Popup>
      }
      {
        isOpen.editing && <Popup fn={startEditing}>
          <Edit refresh={retrieveData}  close={showHide} addToast={addToast} data={dataStore} fn={startEditing} />
        </Popup>
      }

   {/*loading component */}
   {teams.length < 1? <Loading />:""}
  

    </div>
  )
}

export default App
