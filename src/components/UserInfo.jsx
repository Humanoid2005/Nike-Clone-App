import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import "./Modal.css";


export default function UserInfo(props) {
  const [modal, setModal] = useState(false);
  const user = useSelector(selectUser);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }


  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        <div className="user-details-button">
            <img src="./user.png" height={50}/>
            <h3>{user.username!=""?user.username:"User"}</h3>
        </div>
      </button>

      {modal && (
        <div className="modal">
          <div className="modal-content">
            <div className="user-details">
                <h1>My Profile</h1>
                <img src="./user.png" height={100}/>
                <div className="user-data">
                    <p className="user-parameter"><b>Name: </b></p>
                    <p className="user-value">{user.username!=""?user.username:"User"}</p>
                </div>
                <div className="user-data">
                    <p className="user-parameter"><b>E-Mail: </b></p>
                    <p className="user-value">{user.email!=""?user.email:"user@email.com"}</p>
                </div>
            </div>
            <img className="close-image close-modal" src="./close-button.png" height={30} onClick={toggleModal}/>
          </div>
        </div>
      )}
    </>
  );
}
