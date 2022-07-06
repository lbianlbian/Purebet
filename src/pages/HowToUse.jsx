import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import Nav from "../components/Nav";

const HowToUse = () => {
  return (
    <div>
      <Nav />
      <StaticImage
        src="../images/htu-cover.png"
        className="cover-img"
        alt="cover image"
      ></StaticImage>
      <div className="about-body">
        <h1 className="heading">How we work.</h1>
        <p className="body-text">
          To use Purebet, simply connect your Solana blockchain wallet to the
          website (for the hackathon, only Phantom on{" "}
          <a href="https://docs.realms.today/phantom-wallet" target="_blank">
            devnet
          </a>{" "}
          is supported), load it up with your funds (for the hackathon, only
          devnet SOL is supported;{" "}
          <a href="https://solfaucet.com/" target="_blank">
            {" "}
            faucet here
          </a>
          ), and browse the wide range of markets (for the hackathon, a
          selection of imaginary events are offered). Purebet uses decimal odds,
          these odds multiplied by your stake specify the total returns if your
          bet wins (e.g. stake of 2.1 sol x odds of 3.0 = return of 6.2 sol). If
          you see an outcome you would like to bet on and like the odds on
          offer, enter your stake and place a taker order and it will be matched
          right away. If you wish to bet more than the available amount, place a
          taker order up to the available amount followed by a second order
          specifying the additional stake you want to place. If you would like
          to back an outcome at higher odds than are on offer for a bigger
          pay-out if it wins, open a bet slip and enter the stake and the odds
          you want. Your maker order will be placed in the smart contract and
          will match with any user(s) who wants to take the opposite side of
          your offer. Note that only the most competitive odds are matched for
          users who place taker orders so uncompetitive offers may not get
          action. This means your order will not get matched and will be
          cancelled and returned to you at the start of the event.
        </p>
      </div>
    </div>
  );
};

export default HowToUse;
