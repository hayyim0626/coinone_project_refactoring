import React from "react";
import Chart from "./MainComponents/Chart";
import Informations from "./MainComponents/Informations";
import Tips from "./MainComponents/Tips";
import Etc from "./MainComponents/Etc";
import Footer from "../../Components/Footer/Footer"
import Nav from "../../Components/Nav/Nav"

const Main = () => (
  <>
    <Nav />
    <Chart />
    <Informations />
    <Tips />
    <Etc />
    <Footer />
  </>
);

export default Main;
