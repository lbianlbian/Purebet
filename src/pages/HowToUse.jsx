import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

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
        <ul>
          <li className="body-text">
            To use Purebet, simply connect your Solana blockchain wallet to the
            website (for the hackathon, only Phantom on{" "}
            <span>
              <a
                href="https://docs.realms.today/phantom-wallet"
                target="_blank"
              >
                devnet
              </a>
            </span>{" "}
            is supported), load it up with your funds (for the hackathon, only
            devnet SOL is supported;{" "}
            <span>
              <a href="https://solfaucet.com/" target="_blank">
                faucet here
              </a>
            </span>
            ), and browse the wide range of markets (for the hackathon, a
            selection of imaginary events are offered).
          </li>
          <li className="body-text">
            Purebet uses decimal odds, these odds multiplied by your stake
            specify the total returns if your bet wins (e.g. stake of 2.1 sol x
            odds of 3.0 = return of 6.2 sol).
          </li>
          <li className="body-text">
            If you see an outcome you would like to bet on and like the odds on
            offer, enter your stake and place a taker order and it will be
            matched right away.
          </li>
          <li className="body-text">
            If you would like to back an outcome at higher odds than are on
            offer for a bigger pay-out if it wins, open a bet slip and enter the
            stake and the odds you want. Your maker order will be placed in the
            smart contract and will match with any user(s) who wants to take the
            opposite side of your offer. Note that only the most competitive
            odds are matched for users who place taker orders so uncompetitive
            offers may not get action. This means your order will not get
            matched and will be cancelled and returned to you at the start of
            the event.
          </li>
          <li className="body-text">
            Please note: The minimum bet stake is 0.02 SOL. Maker orders with
            stakes less than 0.02 SOL or taker orders that leave less than 0.02
            SOL unmatched may fail.
          </li>
          <li className="body-text">
            Please also note: The maximum amount you can receive from the faucet
            each time is 2 SOL.
          </li>
          <li className="body-text">
            Please note: It may take 10 seconds for available odds to display
          </li>
          <li className="body-text">
            We would appreciate it for this hackathon if you made bets with
            stake of 0.1, since this would help our orderbook stay liquid.
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default HowToUse;
