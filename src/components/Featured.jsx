import React, { useEffect, useState } from "react";
import { StaticImage } from "gatsby-plugin-image";
import axios from "axios";
import "./component.scss";

const Featured = ({ toggleBetSlip }) => {
  const [odds, setOdds] = useState(null);
  const [isSliderOpen, setisSliderOpen] = useState();
  const [eventId, setEventId] = useState(0);

  const toggleSlider = (id) => {
    setisSliderOpen(true);
    axios
      .get(
        `https://script.google.com/macros/s/AKfycbwnHC3Apglmz8YADs5Iyw2_W2PbZL_7ytFunadNpBs2OPhMiG9Xyb3RvHnOoVXG0fUu/exec?id2=${id}`
      )
      .then(function (response) {
        setOdds(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    setEventId(id - 1);
  };
  const closeSlider = () => {
    setisSliderOpen(false);
    setOdds(null);
  };

  const events = [
    { home: "George Washington", away: "Abraham Lincoln" },
    { home: "100 Thieves", away: "FaZe Clan" },
    { home: "USC Trojans", away: "Northwestern Wildcats" },
    { home: "Los Angeles Lakers", away: "Chicago Bulls" },
    { home: "Betting Sims will Win", away: "Betting Sims will Lose" },
  ];

  return (
    <div className="event-container" id="sect-2">
      <h1 className="heading">Featured Events.</h1>
      <div className="events-wrap">
        <div className="event-item" onClick={() => toggleSlider(1)}>
          <StaticImage
            src="../images/Group 3.png"
            alt="event-image"
          ></StaticImage>
          <p className="featured-body body-text">
            George Washington
            <br />
            VS
            <br />
            Abraham Lincoln
          </p>
        </div>
        <div className="event-item" onClick={() => toggleSlider(2)}>
          <StaticImage
            src="../images/Rectangle 9.png"
            alt="event-image"
          ></StaticImage>
          <p className="featured-body body-text">
            100 Theives
            <br />
            VS
            <br />
            FaZe Clan
          </p>
        </div>
        <div className="event-item" onClick={() => toggleSlider(3)}>
          <StaticImage
            src="../images/Rectangle 10.png"
            alt="event-image"
          ></StaticImage>
          <p className="featured-body body-text">
            USC Trojans
            <br />
            VS
            <br />
            Northwestern Wildcats
          </p>
        </div>
        <div className="event-item" onClick={() => toggleSlider(5)}>
          <StaticImage
            src="../images/Rectangle 11.png"
            alt="event-image"
          ></StaticImage>
          <p className="featured-body body-text">
            Betting Sims will Win
            <br />
            VS
            <br />
            Betting Sims will Lose
          </p>
        </div>
        <div className="event-item" onClick={() => toggleSlider(4)}>
          <StaticImage
            src="../images/Group 4.png"
            alt="event-image"
          ></StaticImage>
          <p className="featured-body body-text">
            Los Angeles Lakers
            <br />
            VS
            <br />
            Chicago Bulls
          </p>
        </div>
      </div>
      <div
        className={`odds-slider-wrapper ${
          isSliderOpen && "odds-slider-wrapper-open"
        }`}
        onClick={closeSlider}
      ></div>
      <div className={`odds-slider ${isSliderOpen && "odds-slider-open"}`}>
        {odds ? (
          <div className="slider-content">
            <div className="row1">
              <div className="heading">{events[eventId].home}</div>
              <div className="ho">
                <ul
                  className="first-cell"
                  onClick={() => {
                    toggleBetSlip(
                      odds.home[0].odds,
                      odds.home[0].stake,
                      0,
                      odds.home[0].acc,
                      eventId,
                      events[eventId].home,
                      events[eventId].away
                    );
                    closeSlider();
                  }}
                >
                  <li className="odds body-text">{odds.home[0].odds}</li>
                  <li className="bet-avail body-text">
                    {odds.home[0].stake} SOL
                  </li>
                </ul>
              </div>
              <div className="sho">
                <ul
                  className="second-cell"
                  onClick={() => {
                    toggleBetSlip(
                      odds.home[1].odds,
                      odds.home[1].stake,
                      0,
                      odds.home[1].acc,
                      eventId,
                      events[eventId].home,
                      events[eventId].away
                    );
                    closeSlider();
                  }}
                >
                  <li className="odds body-text">{odds.home[1].odds}</li>
                  <li className="bet-avail body-text">
                    {odds.home[1].stake} SOL
                  </li>
                </ul>
              </div>
              <div className="tho">
                <ul
                  className="third-cell"
                  onClick={() => {
                    toggleBetSlip(
                      odds.home[2].odds,
                      odds.home[2].stake,
                      0,
                      odds.home[2].acc,
                      eventId,
                      events[eventId].home,
                      events[eventId].away
                    );
                    closeSlider();
                  }}
                >
                  <li className="odds body-text">{odds.home[2].odds}</li>
                  <li className="bet-avail body-text">
                    {odds.home[2].stake} SOL
                  </li>
                </ul>
              </div>
            </div>
            <div className="row2">
              <div className="heading">{events[eventId].away}</div>
              <div className="ho">
                <ul
                  className="first-cell"
                  onClick={() => {
                    toggleBetSlip(
                      odds.away[0].odds,
                      odds.away[0].stake,
                      1,
                      odds.away[0].acc,
                      eventId,
                      events[eventId].home,
                      events[eventId].away
                    );
                    closeSlider();
                  }}
                >
                  <li className="odds body-text">{odds.away[0].odds}</li>
                  <li className="bet-avail body-text">
                    {odds.away[0].stake} SOL
                  </li>
                </ul>
              </div>
              <div className="sho">
                <ul
                  className="second-cell"
                  onClick={() => {
                    toggleBetSlip(
                      odds.away[1].odds,
                      odds.away[1].stake,
                      1,
                      odds.away[1].acc,
                      eventId,
                      events[eventId].home,
                      events[eventId].away
                    );
                    closeSlider();
                  }}
                >
                  <li className="odds body-text">{odds.away[1].odds}</li>
                  <li className="bet-avail body-text">
                    {odds.away[1].stake} SOL
                  </li>
                </ul>
              </div>
              <div className="tho">
                <ul
                  className="third-cell"
                  onClick={() => {
                    toggleBetSlip(
                      odds.away[2].odds,
                      odds.away[2].stake,
                      1,
                      odds.away[2].acc,
                      eventId,
                      events[eventId].home,
                      events[eventId].away
                    );
                    closeSlider();
                  }}
                >
                  <li className="odds body-text">{odds.away[2].odds}</li>
                  <li className="bet-avail body-text">
                    {odds.away[2].stake} SOL
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <h1 className="heading">Loading</h1>
        )}
      </div>
    </div>
  );
};

export default Featured;
