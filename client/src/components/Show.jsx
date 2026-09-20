import "../styles/Show.css"
const show = ({ fn, data, deleteContact, edit }) => {
  return (

    <div className="container2">

      <div className="profile-card">

        <div className="profile-cover">

          <div className="profile-picture-wrapper">

            <img
              className="profile-picture"
              src={`http://localhost:3030/uploads/${data.avatar}`}
              alt="Rahul Kumar"
            />

          </div>
          <div className="back">
            <button onClick={fn}>×</button>
          </div>

        </div>

        <div className="profile-info">

          <h2 className="profile-name">
            {data.fname} {data.lname}
          </h2>

          <p className="profile-email">
            {data.email}
          </p>

          <span className="role">
            ● &nbsp; {data.role}
          </span>

        </div>

        <div className="details">

          <h3 className="section-title">
            Personal Information
          </h3>

          <div className="details-grid">

            <div className="detail-box">
              <div className="detail-label">
                Full Name
              </div>

              <div className="detail-value">
                {data.fname} {data.lname}
              </div>
            </div>


            <div className="detail-box">
              <div className="detail-label">
                Phone Number
              </div>

              <div className="detail-value">
                +91 {data.number.slice(0, 5)} {data.number.slice(5, 10)}
              </div>
            </div>


            <div className="detail-box">
              <div className="detail-label">
                Email Address
              </div>

              <div className="detail-value">
                {data.email}
              </div>
            </div>


            <div className="detail-box">
              <div className="detail-label">
                Role
              </div>

              <div className="detail-value">
                {data.role}
              </div>
            </div>


            <div className="detail-box">
              <div className="detail-label">
                Contact ID
              </div>

              <div className="detail-value">
                #{data.unique_id}
              </div>
            </div>


            <div className="detail-box">
              <div className="detail-label">
                Joined Date
              </div>

              <div className="detail-value">
                {new Date(data.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
                })}
              </div>
            </div>

          </div>

        </div>

        <div className="card-footer">

          <button className="btn delete-btn" onClick={deleteContact}>
            Delete Contact
          </button>

          <button className="btn edit-btn" onClick={edit}>
            ✎ &nbsp; Edit Contact
          </button>

        </div>

      </div>

    </div>
  )
}

export default show
