import React, { useState } from "react";
import "./Modal.css";

export default function Modal(props) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  function sendInfo(event){
    const classList = event.target.classList;
    const dataname = event.target.textContent;
    if(classList.length==2){
      props.checkfilters({parameters:[classList[1]],heading:dataname});
    }
    else if(classList.length==3){
      props.checkfilters({parameters:[classList[1],classList[2]],heading:dataname});
    }
    else{
      props.checkfilters({parameters:[],heading:dataname});
    }
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
      Show Filters <img src="./settings-sliders.png" height={20}/>
      </button>

      {modal && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="modal-open-header">Filter <img src="./settings-sliders.png" height={20}/></h2>{/*Filter based on classList[1], classList[2] in category and url*/}
            <div className="filter-grid">
              <button className="filter-button no-filter back-to-normal all-products" onClick={sendInfo}>All Products</button>
              <button className="filter-button -shoes-" onClick={sendInfo}>Shoes</button>
              <button className="filter-button -hoodie- -pullover-" onClick={sendInfo}>Hoodies & Pullovers</button>
              <button className="filter-button -jacket- -vest-" onClick={sendInfo}>Jackets & Vests</button>
              <button className="filter-button -pants-" onClick={sendInfo}>Pants</button>
              <button className="filter-button -t-shirt-" onClick={sendInfo}>T-Shirts</button>
              <button className="filter-button -jersey-" onClick={sendInfo}>Jerseys</button>
              <button className="filter-button -shorts-" onClick={sendInfo}>Shorts</button>
              <button className="filter-button -tights- -leggings-" onClick={sendInfo}>Tights & Leggings</button>
              <button className="filter-button -sports-bra-" onClick={sendInfo}>Sports Bras</button>
              <button className="filter-button -tracksuit-" onClick={sendInfo}>Tracksuits</button>
              <button className="filter-button -swim-" onClick={sendInfo}>Swimwear</button>
              <button className="filter-button -socks-" onClick={sendInfo}>Socks</button>
              <button className="filter-button Accessories" onClick={sendInfo}>Accessories & Equipment</button>
            </div>
            <img className="close-image close-modal" src="./close-button.png" height={30} onClick={toggleModal}/>
          </div>
        </div>
      )}
    </>
  );
}
