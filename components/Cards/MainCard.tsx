import React from "react";
import styled from "styled-components";

const LandingPageContainer = styled.div`
  background-color: #f0f0f0;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const YellowRectangle = styled.div`
  background-color: #ffff00;
  height: 70vh;
  width: 80vw;
`;

function MainCard() {
  return (
    <LandingPageContainer>
      <YellowRectangle />
    </LandingPageContainer>
  );
}

export default MainCard;
