import "../styles/Delete.css";
import deleteItem from "../hooks/deleteItem.js";
import { useCallback, useEffect, useState } from "react";

const Delete = ({refresh, fn, fname, lname, id, hide, addToast }) => {
  const [message, setMessage] = useState(null);

  const deleteMember = useCallback(async () => {
    try {
      const res = await deleteItem(
        `${import.meta.env.VITE_SERVER_API}/teams/${id}`
      );

      setMessage({
        status: "success",
        message: res.message,
      });
    } catch (err) {
      setMessage({
        status: "error",
        message: err.message,
      });
    }
  }, [id]);

  useEffect(() => {
    if (!message) return;

    addToast(message.status, message.message);

    if (message.status === "success") {
      fn();
      hide();
     refresh();
    }
    setMessage(null);
  }, [message]);


  return (
    <div
      className="modal-overlay"
      id="deleteModal"
    >

      <div className="delete-modal">


        <div className="warning-icon">
          !
        </div>


        <h2 className="delete-title">
          Delete Contact?
        </h2>

        <p className="delete-text">

          Are you sure you want to delete

          <span className="contact-name">
            &nbsp; {fname} {lname} &nbsp;
          </span>?

          <br />

          This action cannot be undone.

        </p>

        <div className="warning-text">
          ⚠ This contact will be permanently removed.
        </div>


        <div className="modal-actions">

          <button
            className="btn cancel-btn"
            onClick={fn}
          >
            Cancel
          </button>

          <button
            className="btn delete-btn"
            onClick={deleteMember}
          >
            Delete Contact
          </button>

        </div>

      </div>

    </div>

  )
}

export default Delete
