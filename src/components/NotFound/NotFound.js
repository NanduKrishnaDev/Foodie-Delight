import React from "react";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div>
        <h1 className="not-found-title">Not Found</h1>
        <p className="not-found-content">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
