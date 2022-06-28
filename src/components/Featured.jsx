import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import axios from "axios";
import "./component.scss";

const Featured = () => {
  const getOdds = (id2, ha) => {
    axios
      .get(`https://showodds.wesleybian.repl.co?id1=0&id2=${id2}&ha=${ha}`)
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  return (
    <div className="event-container" id="sect-2">
      <h1 className="heading">Featured Events.</h1>
      <div className="events-wrap">
        <div className="event-item" onClick={() => getOdds(1, 1)}>
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
        <div className="event-item">
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
        <div className="event-item">
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
        <div className="event-item">
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
        <div className="event-item">
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
      <h1 className="heading">Odds are:</h1>
      <ul>
        <li className="body-text">Highest Odds:</li>
        <li className="body-text">Average Odds:</li>
        <li className="body-text">Lowest Odds:</li>
      </ul>
    </div>
  );
};

export default Featured;
