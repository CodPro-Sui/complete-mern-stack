import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <main className="not-found">
      <div className="not-found-bg">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <section className="not-found-card">
        <div className="error-code">
          <span>4</span>
          <div className="zero">
            <div className="zero-inner"></div>
          </div>
          <span>4</span>
        </div>

        <div className="error-content">
          <p className="error-label">PAGE NOT FOUND</p>

          <h1>Lost in the <span>code?</span></h1>

          <p className="error-message">
            The page you're looking for doesn't exist, has been moved,
            or the URL may be incorrect.
          </p>

          <div className="error-actions">
            <Link to="/" className="home-btn">
              <span>←</span>
              Back to Home
            </Link>

            <button
              className="back-btn"
              onClick={() => window.history.back()}
            >
              Go Back
            </button>
          </div>
        </div>

        <div className="error-footer">
          <span className="status-dot"></span>
          <span>404 • Route unavailable</span>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
