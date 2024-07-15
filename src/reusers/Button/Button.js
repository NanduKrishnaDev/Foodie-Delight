import React from "react";
import "./Button.scss";

const Button = ({
  icon,
  label,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  green = false,
}) => {
  return (
    <button
      type={type}
      className={`button-with-icon ${className} ${green ? "button-green" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <img className="icon" src={icon} alt="icon"/>}
      {label && <span className="label">{label}</span>}
    </button>
  );
};

export default Button;
