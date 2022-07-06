import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import Nav from "../components/Nav";

const About = () => {
  return (
    <div>
      <Nav />
      <StaticImage
        src="../images/about-cover.png"
        className="cover-img"
        alt="cover image"
      ></StaticImage>
      <div className="about-body">
        <h1 className="heading">Who we are.</h1>
        <p className="body-text">
          Purebet is a decentralised, non-custodial betting exchange based on
          the Solana blockchain, custom built from the ground up to give the
          optimal betting experience. Purebet relieves users of the stress of
          missing deposits, withdrawal delays, and account closures by working
          seamlessly and permissionlessly on the blockchain. Users are able to
          bet on a wide variety of sporting events, financial markets, political
          races, and other prediction markets without needing to trust a
          centralised entity to safeguard their personal details or custody
          their funds. Users hold their funds in their own wallet until they
          place a bet on an event. Once the event has concluded, any winnings
          are made available to users immediately. Users are able to select the
          stake they wish to place on the bet, and the odds they would like to
          obtain. Once a bet placed by a user matches up against bets of the
          opposing outcome from other users, the stakes are locked in the smart
          contract until the completion of the event. Afterwards, the winners
          are paid out automatically at the agreed odds. We believe the future
          of sports betting and prediction markets is community-focused,
          open-source, permissionless, and immutable. Purebet is designed by
          sports bettors, for sports bettors to give the simplest and smoothest
          sports betting experience possible.
        </p>
      </div>
    </div>
  );
};

export default About;
