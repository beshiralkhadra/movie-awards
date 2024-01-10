import React from "react";
import "./index.css";

const SuccessModal = ({ closeModal }) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="suceess-modal_content">
          <h1>Submission Successful!</h1>
          <p>Thank you for your submission.</p>
          <button
            onClick={closeModal}
            id="cancelBtn"
            className="success-modal_btn"
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
