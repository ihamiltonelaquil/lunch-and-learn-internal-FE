import styled from "styled-components";

const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
};

export const StyledContainer = styled.div`
  border: 2px solid black;
  border-radius: 16px;
  margin-top: 16px;
  margin-bottom: 16px;
  padding: 16px;
`;

export const StyledCard = styled.div`
  border: var(--border);
  border-radius: var(--rounded-corners);
  margin: 16px;
  padding: 16px;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: var(--colour-primary-light);
  color: var(--colour-text);
  text-align: center;
  width: auto;
  max-width: 800px;
  min-width: var(--mw-mobileM);
  min-height: 525px;
  font-size: var(--fs-base);
  font-family: var(--ff-primary);
  /* cursor: pointer; */
  transition: box-shadow 0.2s ease-in-out;
  box-shadow:1px 8px 8px 0px #00000025;
  &:hover {
    box-shadow:1px 8px 15px 3px #00000025;
  }
  .mainContent {
    margin: auto;
    width: 80%;
  }
  h1 {
    font-size: var(--fs-xxl);
    font-weight: var(--fw-bold);
  }
  h3 {
    padding: 0px;
    margin: 0px;
    font-size: var(--fs-xl);
    font-weight: var(--fw-semi-bold);
  }
  p {
    font-size: var(--fs-sm);
    padding: 0px;
    margin: 0px;
  }
  span {
    width: 100%;
  }
`;
export const StyledMeetingCardButton = styled.button`
  background-color: var(--colour-primary-light);
  border: var(--border);
  border-radius: var(--rounded-corners);
  font-weight: var(--fw-semi-bold);
  font-size: var(--fs-xl);
  width: 45%;
  min-height: 90px;
  margin-left: 5px;
  margin-right: 5px;
  padding: 16px;
  transition: 0.2s ease-out;
  :hover {
    background-color: var(--colour-accent);
    color: var(--colour-primary-light);
    border-color: var(--colour-accent);
    transition: 0.2s ease-in;
  }
  :active {
    background-color: var(--colour-accent-dark);
    color: var(--colour-background);
    border-color: var(--colour-accent-dark);
    transition: 0.05s ease-in;
  }
`;

export const StyledExpandedMeetingCard = styled(StyledCard)`
  margin: auto;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 1000px;
  min-width: 1000px;
  min-height: 700px;
  z-index: 10;
`;

export const DarkBG = styled.div`
  background-color: black;
  opacity: 30%;
  height: 100%;
  width: 100%;
  position: fixed;
  cursor: pointer;
  z-index: 5;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
`;

export const AttachmentContainer = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  margin: -1px;
  padding: 5px;
  gap: 20px;
  border-top: 1px;
  border-bottom: 1px;
  border-left: 0px;
  border-right: 0px;
  border-style: solid;
  border-color: var(--colour-grey-dark);
  p{
    width: 50%;
  }
  `;

interface RoundedButtonProps {
  width: number;
}

export const CenteredDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
`;

export const RoundedButton = styled.button<RoundedButtonProps>`
  width: ${(props) => props.width}px;
  margin: 3px 0px;
  border-radius: 50px;
  background-color: white;
  border: 2px solid lightgray;
  height: 35px;
  margin-right: 10px;
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;