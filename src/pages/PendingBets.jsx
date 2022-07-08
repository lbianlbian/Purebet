import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import axios from "axios";
import "./index.scss";
import { StaticImage } from "gatsby-plugin-image";
import solana from "@Solana/web3.js";

const PendingBets = () => {
  // const [walletAcc, setWalletAcc] = useState();
  const [results, setResults] = useState([]);

  const connectWallet = async () => {
    try {
      let wallet = await window.phantom.solana.connect();
      let pubkey = wallet.publicKey.toString();
      console.log(pubkey);
      const response = await axios.get(
        `https://script.google.com/macros/s/AKfycbyjzSwPRrsHVbThL_uf1cpnTV_vSwy7h-4jifDrKIHtBESH-Vm7ijoGhWZsK8_6r20A/exec?key=${pubkey}`
      );
      setResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const events = [
    { home: "George Washington", away: "Abraham Lincoln" },
    { home: "100 Thieves", away: "FaZe Clan" },
    { home: "USC Trojans", away: "Northwestern Wildcats" },
    { home: "Los Angeles Lakers", away: "Chicago Bulls" },
    { home: "PureBet will Win", away: "PureBet will Lose" },
    {
      home: "Bitcoin above $20K on 31st July",
      away: "Bitcoin below $20K on 31st July",
    },
  ];

  return (
    <div>
      <Nav />
      <StaticImage
        src="../images/pb-cover.png"
        className="cover-img overflow-cover"
        alt="cover image"
      ></StaticImage>
      <div className="pb-content">
        <div className="wallet-btn body-text" onClick={() => connectWallet()}>
          Connect to Phantom
        </div>
        <div className="p-bets">
          <div className="p-bet-row1 pb-row">
            <div className="heading row-title">Events</div>
            {results &&
              results.map((result) => {
                return (
                  <div className="event-cell" key={result._id}>
                    <h4 className="body-text">
                      {result.id2 === 1 && events[0].home}
                      {result.id2 === 2 && events[1].home}
                      {result.id2 === 3 && events[2].home}
                      {result.id2 === 4 && events[3].home}
                      {result.id2 === 5 && events[4].home}
                      {result.id2 === 6 && events[5].home}
                      <br />
                      VS
                      <br />
                      {result.id2 === 1 && events[0].away}
                      {result.id2 === 2 && events[1].away}
                      {result.id2 === 3 && events[2].away}
                      {result.id2 === 4 && events[3].away}
                      {result.id2 === 5 && events[4].away}
                      {result.id2 === 6 && events[5].away}
                    </h4>
                  </div>
                );
              })}
          </div>
          <div className="p-bet-row2 pb-row">
            <div className="heading row-title">Backing</div>
            {results &&
              results.map((result) => {
                return (
                  <div className="event-cell" key={result._id}>
                    <h4 className="body-text">
                      {result.id2 === 1 &&
                        result.ha === "home" &&
                        events[0].home}
                      {result.id2 === 2 &&
                        result.ha === "home" &&
                        events[1].home}
                      {result.id2 === 3 &&
                        result.ha === "home" &&
                        events[2].home}
                      {result.id2 === 4 &&
                        result.ha === "home" &&
                        events[3].home}
                      {result.id2 === 5 &&
                        result.ha === "home" &&
                        events[4].home}
                      {result.id2 === 6 &&
                        result.ha === "home" &&
                        events[5].home}
                      {result.id2 === 1 &&
                        result.ha === "away" &&
                        events[0].away}
                      {result.id2 === 2 &&
                        result.ha === "away" &&
                        events[1].away}
                      {result.id2 === 3 &&
                        result.ha === "away" &&
                        events[2].away}
                      {result.id2 === 4 &&
                        result.ha === "away" &&
                        events[3].away}
                      {result.id2 === 5 &&
                        result.ha === "away" &&
                        events[4].away}
                      {result.id2 === 6 &&
                        result.ha === "away" &&
                        events[5].away}
                    </h4>
                  </div>
                );
              })}
          </div>
          <div className="p-bet-row3 pb-row">
            <div className="heading row-title">Odds</div>
            {results &&
              results.map((result) => {
                return (
                  <div className="event-cell" key={result._id}>
                    <h4 className="body-text">{result.odds}</h4>
                  </div>
                );
              })}
          </div>
          <div className="p-bet-row4 pb-row">
            <div className="heading row-title">Stake</div>
            {results &&
              results.map((result) => {
                return (
                  <div className="event-cell" key={result._id}>
                    <h4 className="body-text">{result.stake}</h4>
                  </div>
                );
              })}
          </div>
          <div className="p-bet-row5 pb-row">
            <div className="heading row-title">Is Matched</div>
            {results &&
              results.map((result) => {
                return (
                  <div className="event-cell" key={result._id}>
                    <h4 className="body-text">
                      {result.isMatched === true ? "True" : "False"}
                    </h4>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingBets;
