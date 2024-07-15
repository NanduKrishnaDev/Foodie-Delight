import React from "react";
import loadIcon from "./../../assets/icons/loader.gif";
import "./Loading.scss";

const Loading = () => {
  return (
    <div className="loading-container">
      <img src={loadIcon} className="loading-gif" alt="loader" />
    </div>
  );
};

export default Loading;
