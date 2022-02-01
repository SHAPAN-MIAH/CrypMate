import React from 'react';
import './ImportWalletForm.css'
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
import Congratulations from '../CongratulationPage/Congratulations';
import { useState } from 'react';


const ImportWalletForm = () => {
  const [userInfo, setUserInfo] = useState([])

  // Function for input change.
  const handleImportWalletChange = (e) => {
    const PasswordValue = document.getElementById("password").value;
    const ConfirmPasswordValue = document.getElementById("confirmPassword").value;
    const PhraseValue = document.getElementById("Phrase").value;
    const createWalletBtnOverlay = document.getElementById("createWalletBtnOverlay");
    const passwordError = document.getElementById("passwordError");
    const formCheckInput = document.getElementById("formCheckInput");
    const passwordNotEnough = document.getElementById("passwordNotEnough");
    const phraseContainWords = document.getElementById("phraseContainWords");
    

    // Phrase Validation.

    const words = PhraseValue.trim().split(/\s+/);

    let ValidPhrase = true;
    if(e.target.name === "phrase"){
      const isPhraseValid = words.length >= 12;
      ValidPhrase = isPhraseValid;
      phraseContainWords.innerHTML= "";

      if(words.length < 12){
        phraseContainWords.innerHTML= "Secret Recovery Phrases contain 12, 15, 18, 21, or 24 words";
        createWalletBtnOverlay.style.display = "block";
      }
    }
    

    // Form Validation.

    let isFormValid = true;
    if(e.target.name === "password"){
      const isPasswordValid = e.target.value.length >= 8;
      isFormValid = isPasswordValid;
      passwordNotEnough.innerHTML= "";

      if(PasswordValue === ""){
        createWalletBtnOverlay.style.display = "block";
      };
      if(PasswordValue.length < 8){
        passwordNotEnough.innerHTML= "Password not long enough";
        createWalletBtnOverlay.style.display = "block";
      };
    }

    if(PasswordValue !== ConfirmPasswordValue){
      createWalletBtnOverlay.style.display = "block";
      passwordError.innerHTML= "Password doesn’t match!";

      if(ConfirmPasswordValue === ""){
        createWalletBtnOverlay.style.display = "block";
        passwordError.innerHTML= "";
      }
    };
    if(PasswordValue === ConfirmPasswordValue){
      passwordError.innerHTML= ""
    };
    if(ValidPhrase && isFormValid && PasswordValue === ConfirmPasswordValue){
      formCheckInput.addEventListener("click", ()=>{
        createWalletBtnOverlay.style.display = "none";

        if(PhraseValue === ""){
          createWalletBtnOverlay.style.display = "block";
        }
        if(words.length < 12){
          phraseContainWords.innerHTML= "Secret Recovery Phrases contain 12, 15, 18, 21, or 24 words";
          createWalletBtnOverlay.style.display = "block";
        }
        if(words.length >= 12){
          phraseContainWords.innerHTML= "";
        }
        if(PasswordValue.length < 8){
          passwordNotEnough.innerHTML= "Password not long enough";
          createWalletBtnOverlay.style.display = "block";
        };
        if(PasswordValue.length >= 8){
          passwordNotEnough.innerHTML= "";
        };
      });
    };
  };

  // Function for form submit.

  const handelSubmit = (e) => {
    const Password = document.getElementById("password").value;
    const ConfirmPassword = document.getElementById("confirmPassword").value;
    const Phrase = document.getElementById("Phrase").value;

    if(Password === ""){
      alert("Password is required")
      return false;
    };
    if(Password !== ConfirmPassword){
      return false;
    };
    if(Password === ConfirmPassword){
      return true;
    }
    let isFormValid = true;
    if(e.target.name === "password"){
      const isPasswordValid = e.target.value.length >= 8;
      isFormValid = isPasswordValid;
    }
    if(Phrase && isFormValid && Password === ConfirmPassword){
      return true;
    };

  };


  // Phrase show and hide toggle function.

  const showPhrase = (e) => {
    const show = document.getElementById("Phrase");
    if(show.type === "password"){
      show.type = 'text';
    }else{
      show.type = "password"
    }
    console.log("clicked")
  }

  
  return (
    <div className="form-container" style={{margin: '0 45px'}}>
      <div className="header-text">
        <h2>Import an Account with Secret Recovery Phrase</h2>
        <h6>Enter your secret phrase here to restore your vault.</h6>
      </div>

      {/* Import wallet form */}

      <form className="forms" onSubmit={handelSubmit}>
        <div class="form-group formGroup">
          <label for="">Secret Recovery Phrase</label>
          <input type="password" onChange={handleImportWalletChange} name="phrase" id="Phrase" class="form-control shadow-none" placeholder="Paste Secret Recovery Phrase From Clipboard" aria-describedby="helpId" required/>
          <div id="phraseContainWords"></div>
        </div>
        <div class="form-check">
          <label class="form-check-label">
            <input onClick={()=> showPhrase()} type="checkbox" class="form-check-input shadow-none" name="viewPhrase" id="viewPhrase" value="checkedValue"/>
            <span>Show Secret Recovery Phrase</span>
          </label>
        </div>
        <div class="form-group formGroup">
          <label for="">New password (min 8 chars)</label>
          <input type="password" onChange={handleImportWalletChange} name="password" id="password" class="form-control shadow-none" placeholder="" aria-describedby="helpId" required/>
          <div id="passwordNotEnough"></div>
        </div>
        <div class="form-group formGroup">
          <label for="">Confirm password</label>
          <input type="password" onChange={handleImportWalletChange} name="password" id="confirmPassword" class="form-control shadow-none" placeholder="" aria-describedby="helpId" required/>
          <div id="passwordError"></div>
        </div>
        <div class="form-check">
          <label class="form-check-label">
            <span><input type="checkbox" class="form-check-input shadow-none" name="" id="formCheckInput" value="checkedValue" required/></span>
            <span className="terms-checkbox">I have read and agree to the <a href="">Terms of Use</a></span>
          </label>
        </div>
        <span onClick={() => goTo(Congratulations)}><input id="submitBtn" type="submit" value={ 'Import'}/></span>
        <br/><span className="createWalletBtn-overlay" id="createWalletBtnOverlay" ></span>
      </form>
    </div>
  );
};

export default ImportWalletForm;