import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";
import Featured from "../components/Featured";
import Nav from "../components/Nav";
import "./index.scss";

const IndexPage = () => {
  return (
    <main>
      <Nav />
      <StaticImage
        src="../images/Cover.svg"
        className="cover-img"
        alt="cover image"
      ></StaticImage>
      <Featured />
    </main>
  );
};

export default IndexPage;
