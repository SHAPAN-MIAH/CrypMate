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

import logo from "./assets/images/wallet.png"
import './Components/WelcomePage/WelcomePage.css';
import PhishingWarningPage from './Components/PhishingWarningPage/PhishingWarningPage';


// component for welcome page.
const WelcomePage = () => {
  return (
    <>
      <div class="container-fluid">
          <div className="welcome-section">
            <div className='logo-container'>
              <img src={logo} alt=""/>
            </div>
            <div className="welcome-content">
              <h2>Welcome to CrypMate</h2>
              <h5>Connecting you to Ethereum and the Decentralized web.</h5>
              <h5 className="child2">We are happy to see you.</h5>
            </div>
            <div>
              <button onClick={() => goTo(PhishingWarningPage)} id="GetStartedBtn">Get Started</button>
            </div>
          </div>
      </div>
    </>
  );
};

// component for app.js
function App() {
  return (
    <div className="App">
      <Router>
        <WelcomePage/>
      </Router>
      
    </div>
  );
}

export default App;
