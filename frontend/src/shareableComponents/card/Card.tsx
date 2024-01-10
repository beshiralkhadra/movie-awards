import React from "react";
import "./index.css";
type CardTypes = {
  isSelected?: boolean;
  children: React.ReactNode;
};
const Card = ({ children, isSelected }: CardTypes) => {
  return (
    <div
      className={`card ${isSelected ? "selected" : ""}`}
      style={{ border: isSelected && " 2px solid #C79F27" }}
    >
      {children}
    </div>
  );
};

export default Card;
