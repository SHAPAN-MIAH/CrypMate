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
import logo from "../../assets/images/wallet.png";
import userIcon from "../../assets/images/950771.png";
import ethereumIcon from "../../assets/images/628px-Ethereum_logo_2014.svg.png";
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Footer from '../Footer/Footer';
import Account1 from './Account1/Account1';
import Buy from './Buy/Buy';
import Send from './Send/Send';
import Activity from './Activity/Activity';
import { useSelector } from 'react-redux';
import { useState } from 'react';


const Home = () => {

  // The function of the activity component for content change handle.
  const activityHandler = ()=> {
    const activityTitle = document.querySelector(".activity-title");
    const act = document.querySelector(".act");
    const ast = document.querySelector(".ast");
    const assetsTitle = document.querySelector(".assets-title");
    const assetsBalanceContainer = document.getElementById("assetsBalanceContainer");
    const activityTransactionsContainer = document.querySelector(".activity-transactions-container");
    const addTokenBtn = document.getElementById("addTokenBtn");
  
    activityTitle.style.borderBottom = "1px solid #037dd6"
    assetsTitle.style.borderBottom = "none";
    act.style.color = "#037dd6";
    ast.style.color = "#7e7e7e";
    activityTransactionsContainer.style.display = "block";
    assetsBalanceContainer.style.display = "none";
    addTokenBtn.style.display = "none";
  };

  // The function of the assets component for content change handle
  const assetsHandler = ()=> {
    const activityTitle = document.querySelector(".activity-title");
    const ast = document.querySelector(".ast");
    const act = document.querySelector(".act");
    const assetsTitle = document.querySelector(".assets-title");
    const assetsBalanceContainer = document.getElementById("assetsBalanceContainer");
    const activityTransactionsContainer = document.querySelector(".activity-transactions-container");
    const addTokenBtn = document.getElementById("addTokenBtn");

    activityTitle.style.borderBottom = "none"
    assetsTitle.style.borderBottom = "1px solid #037dd6";
    ast.style.color = "#037dd6";
    act.style.color = "#7e7e7e";
    assetsBalanceContainer.style.display = "block"
    activityTransactionsContainer.style.display = "none"
    addTokenBtn.style.display = "block";
  }

  const activityafterSend = ()=>{
    activityHandler()
  }
  // let doneTransactions = false;
  const balances = useSelector((state) => {
    return state.walletBalance
  })

  const [ETHBalance, setETHBalance] = useState('7')
  const [USDBalance, setUSDBalance] = useState('20145')

  // setETHBalance(balances.Eth)
  // setUSDBalance(balances.Usd)

  return (
    <div>
      <div className="home-body">
        <div className="home-header">
          <div className="container-fluid" style={{width: "1100px", margin: "auto"}}>
            <div className="d-flex" style={{marginRight: '35px'}}>

              <div className="home-logo">
                <img src={logo} alt=""/> 
                <h3>CrypMate</h3>
              </div>

              <div className="NetworksForm-container">
                <select name="Networks" id="Networks" form="NetworksForm">
                  <option value="ethereum">Ethereum Mainnet</option>
                  <option value="ropsten">Ropsten Test Network</option>
                  <option value="Kovan">Kovan Test Network</option>
                  <option value="rinkeby">Rinkeby Test Network</option>
                  <option value="Goerli">Goerli Test Network</option>
                  <option value="Localhost">Localhost 8545</option>
                  <option value="Custom">Custom Rpc</option>
                </select>
              </div>

              <div className="profile-ber">
                <div className="profile-icon walletProfileIcon">
                  <img src={userIcon} alt=""/>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container-fluid" style={{width: "1100px", margin: "auto"}}>
          <div className="home-container">
            <div>
              <Account1/>
            </div>
            <div className="balance-container m-auto">
              <div className=" d-flex justify-content-center mt-3 mb-3">
                <div className="ethereum-icon">
                  <img width="15px" src={ethereumIcon} alt=""/>
                </div>
              </div>

              <div className="eth-balance text-center">
                <h3>
                  { balances.length?
                    balances.map(balance => <span>{balance.Eth}</span>) : ETHBalance
                  } ETH
                </h3>
                <p>$ 
                  { balances.length?
                    balances.map(balance => <span>{balance.Usd}</span>) : USDBalance
                  } USD</p>
              </div>
              <div className="buy-send-swap-container d-flex justify-content-center mb-3">
                <div className='buyDiv'>
                  <Buy/>
                </div>
                <div className='sendDiv' onClick={activityafterSend}>
                  <Send/>
                </div>
                <div className="buy-send-swap text-center">
                  <div className="swap"><FontAwesomeIcon className="icons" icon={faRetweet} /></div>
                  <p>Swap</p>
                </div>
              </div>
            </div>

            <div className="assets-activity-container ">
              <div class="row">
                <div className="col-md-6">
                  <div className="assets">
                    <div onClick={assetsHandler} className="assets-title text-center">
                      <h6 className="ast">Assets</h6>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="activity">
                    <div onClick={activityHandler} className="activity-title text-center">
                      <h6 className="act">Activity</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="assetsBalanceContainer">
              <div className="assets-balance-container d-flex">
                <div className="d-flex">
                  <div className="assets-ethereum-icon">
                    <img width="15px" src={ethereumIcon} alt=""/>
                  </div>
                  <div className="assets-eth-balance">
                    <h6>
                      {
                        balances.length?
                        balances.map(balance => <span>{balance.Eth}</span>) : ETHBalance
                      } ETH
                    </h6>
                    <p>$ 
                      {
                        balances.length?
                        balances.map(balance => <span>{balance.Usd}</span>) : USDBalance
                      } USD
                    </p>
                  </div>
                </div>
                <div className="ChevronRightIcon">
                  <FontAwesomeIcon className="ChevronRightIcons" icon={faChevronRight} />
                </div>
              </div>
            </div>

            <div className="activity-transactions-container">
                <div className="transactions-content">
                  <Activity/>
                </div>
            </div>

            {/* <div className="add-token-container">
              <div className="add-token d-flex justify-content-center mb-5">
                <button id="addTokenBtn" type="">Add Token</button>
              </div>
            </div> */}
            <Footer/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;