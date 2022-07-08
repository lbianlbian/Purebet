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
          seamlessly and permissionlessly on the blockchain. We believe the
          future of sports betting and prediction markets is community-focused,
          open-source, permissionless, and immutable. Purebet is designed by
          sports bettors, for sports bettors to give the simplest and smoothest
          sports betting experience possible.
        </p>
        <h1 className="heading">Our edge.</h1>
        <p className="body-text">
          We allow users to wager on their chosen events without invading their
          privacy and collecting their personal details like traditional sports
          betting venues. Users are able to self-custody their funds in their
          blockchain wallet and never worry about rejected payout requests or
          misappropriated funds. Opposing bets between different users are
          matched automatically and locked within smart contracts. As soon as an
          event is finished, the funds are immediately available to users with
          winning positions.
        </p>
      </div>
    </div>
  );
};

export default About;
