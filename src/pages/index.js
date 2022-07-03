import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";
import { useEffect, useState } from "react";
import BettingSlip from "../components/BettingSlip";
import Featured from "../components/Featured";
import Nav from "../components/Nav";
import "./index.scss";

const IndexPage = () => {
  const [isBetSlipOpen, setBetSlipOpen] = useState();
  const [betData, setBetData] = useState({});

  const toggleBetSlip = (odd, stake, ha, acc, id) => {
    setBetSlipOpen(true);
    setBetData({
      betOdds: odd,
      betStake: stake,
      homeAway: ha,
      account: acc,
      gameId: id + 1,
    });
  };

  const closeBetSlip = () => {
    setBetSlipOpen(false);
  };

  return (
    <main>
      <Nav />
      <StaticImage
        src="../images/Cover.svg"
        className="cover-img"
        alt="cover image"
      ></StaticImage>
      <Featured toggleBetSlip={toggleBetSlip} />
      <BettingSlip
        isBetSlipOpen={isBetSlipOpen}
        closeBetSlip={closeBetSlip}
        betData={betData}
      />
    </main>
  );
};

export default IndexPage;
