/* eslint-disable react/prop-types */
import React from 'react';

function Modal({ closeModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button type="button" onClick={() => closeModal(false)}> X </button>
        </div>
        <div className="title">
          <h1> title test</h1>
        </div>
        <div className="body">
          <p>
            this is the body.
            in the future will be market fish price
          </p>
        </div>
        <div className="footer">
          <button className="cancelBtn" type="button" onClick={() => closeModal(false)}> Cancel </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
