import React from "react";
import Directory from "../../components/directory/directory.component";
import Header from "../../components/header/header.component";
import { HomePageContainer } from "./homepage.styles";

const HomePage = () => {
  return (
    <HomePageContainer>
      <Directory />
    </HomePageContainer>
  );
};

export default HomePage;
