import React from "react";
import { useEffect, useState } from "react";
import phantom_connect from "../placeBet";
import $ from "jquery";

const BettingSlip = ({ isBetSlipOpen, closeBetSlip, betData }) => {
  const [total, setTotal] = useState();
  const [Odds, setOdds] = useState(betData.betOdds);
  const [Stake, setStake] = useState(betData.betStake);
  const [Hash, setHash] = useState();
  const [success, setSuccess] = useState();

  useEffect(() => {
    setOdds(betData.betOdds);
    setStake(betData.betStake);
  }, [betData.betOdds, betData.betStake]);

  useEffect(() => {
    let odds = document.getElementById("odds").value;
    let stake = document.getElementById("stake").value;
    setTotal((odds * stake).toFixed(2));
  });
  const handleOdds = (e) => {
    setOdds(e.target.value);
  };
  const handleStake = (e) => {
    setStake(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    phantom_connect();
    setSuccess(true);
    document.querySelector("#trans-hash").innerText = "";
    closeBetSlip();
  };
  useEffect(() => {
    let hashId = document.querySelector("#trans-hash").innerText;
    console.log(hashId);
    // if (hashId !== "") {
    //   setHash(true);
    // } else {
    //   setHash(false);
    // }
  }, []);
  // const handleHash = () => {
  //   setHash(true);
  // };
  const closeSuccess = () => {
    setSuccess(false);
    setHash(false);
    document.querySelector("#trans-hash").innerText = "";
  };

  return (
    <div>
      <div
        className={`betting-wrapper ${isBetSlipOpen && "betting-wrapper-open"}`}
        onClick={closeBetSlip}
      ></div>
      <div
        className={`betting-container ${
          isBetSlipOpen && "betting-container-open"
        }`}
      >
        <div className="betting-content">
          <h1 className="heading">
            {betData.homeTeam} <br /> VS <br /> {betData.awayTeam}
          </h1>
          <div className="divider"></div>
          <h1 className="heading">
            Backing{" "}
            {betData.homeAway == 0 ? betData.homeTeam : betData.awayTeam}
          </h1>
          <form action="">
            <label htmlFor="odds" className="heading">
              Odds
            </label>
            <br />
            <input
              type="text"
              id="odds"
              className="body-text"
              onChange={handleOdds}
              value={Odds}
            />
            <br />
            <label htmlFor="stake" className="heading">
              Stake
            </label>
            <br />
            <input
              type="text"
              id="stake"
              className="body-text"
              onChange={handleStake}
              value={Stake}
            />
            <input
              type="text"
              className="body-text crypto-type"
              value={"SOL"}
              readonly
            />
            <br />
            <label htmlFor="total-bet" className="heading">
              Total Winnings
            </label>
            <br />
            <input
              type="text"
              id="total-bet"
              className="body-text"
              value={total}
              readonly
            />
            <input
              type="text"
              className="body-text crypto-type"
              value={"SOL"}
              readonly
            />
            <br />
            <button className="place-bet body-text" onClick={handleSubmit}>
              Place Bet!
            </button>
          </form>
          <div className="hidden-data">
            <p id="acc">{betData.account}</p>
            <p id="id1">0</p>
            <p id="id2">{betData.gameId}</p>
            <p id="ha">{betData.homeAway}</p>
            <p id="originalOdds">{betData.betOdds}</p>
            <p id="originalStake">{betData.betStake}</p>
          </div>
        </div>
      </div>
      <div
        className={`success-wrapper ${success && "success-wrapper-open"}`}
        onClick={closeSuccess}
      ></div>
      <div className={`success-popup ${success && "success-popup-open"}`}>
        <div className="success-msg">
          <h1 className="heading">Your bet confirmation will appear below.</h1>
          <div className="divider"></div>
          <a href="" target="_blank" id="trans-hash" className="heading">
            See your bet confirmation on the Solana blockchain.
          </a>
        </div>
      </div>
    </div>
  );
};

export default BettingSlip;
