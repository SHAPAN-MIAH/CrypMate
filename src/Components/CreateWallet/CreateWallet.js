import React from 'react';
import * as ReactDOM from 'react-dom';
import {
  goBack,
  goTo,
  popToTop,
  Link,
  Router,
  getCurrent,
  getComponentStack,
} from 'react-chrome-extension-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import CreateWalletForm from '../CreateWalletForm/CreateWalletForm';
import logo from "../../assets/images/wallet.png"

const CreateWallet = () => {
  return (
    <>
      <div className="container-fluid" style={{width: "1200px", margin: "auto"}}>
        <div className="header">
            <img src={logo} alt=""/> 
            <h2>CrypMate</h2>
        </div>
        <span style={{cursor: "pointer", fontFamily: "Poppins", color: "color: rgb(58, 58, 58)", margin: '0 45px'}} onClick={() => goBack()}><FontAwesomeIcon icon={faChevronLeft} /> Back</span>
        
        <CreateWalletForm/>
      </div>
    </>
  );
};

export default CreateWallet;