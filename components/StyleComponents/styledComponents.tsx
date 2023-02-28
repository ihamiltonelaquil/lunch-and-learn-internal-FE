import styled, { keyframes } from "styled-components";

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

const hoverContainerIn = keyframes`
  0% {
    box-shadow: 
              -6px -6px 14px rgba(255, 255, 255, .7),
              -6px -6px 10px rgba(255, 255, 255, .5),
              6px 6px 8px rgba(255, 255, 255, .075),
              6px 6px 10px rgba(0, 0, 0, .15);
  }
  50%{
    box-shadow: none;
  }
  100%{
    box-shadow: 
              inset -2px -2px 6px rgba(255, 255, 255, .7),
              inset -2px -2px 4px rgba(255, 255, 255, .5),
              inset 2px 2px 2px rgba(255, 255, 255, .075),
              inset 2px 2px 4px rgba(0, 0, 0, .15);
  }
`

const hoverContainerOut = keyframes`
  0% {
    box-shadow: inherit;
  }
  50%{
    box-shadow: none;
  }
  100%{
    box-shadow: 
              -6px -6px 14px rgba(255, 255, 255, .7),
              -6px -6px 10px rgba(255, 255, 255, .5),
              6px 6px 8px rgba(255, 255, 255, .075),
              6px 6px 10px rgba(0, 0, 0, .15);
  }
`

export const StyledCard = styled.div`
  /* border: var(--border); */
  border-radius: var(--rounded-corners);
  margin: 16px;
  padding: 16px;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color:  var(--colour-bg);
  color: var(--colour-text);
  text-align: center;
  width: auto;
  max-width: 800px;
  min-width: var(--mw-mobileM);
  min-height: 400px;
  font-size: var(--fs-base);
  font-family: var(--ff-primary);
  /* cursor: pointer; */
  transition: box-shadow 0.2s ease-in-out;
  box-shadow:-6px -6px 14px rgba(255, 255, 255, .7),
              -6px -6px 10px rgba(255, 255, 255, .5),
              6px 6px 8px rgba(255, 255, 255, .075),
              6px 6px 10px rgba(0, 0, 0, .15);
  animation: ${hoverContainerOut} 0.2s ease-out forwards;
  
  &:hover {
    animation: ${hoverContainerIn} 0.2s ease-out forwards;
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
  background-color: var(--colour-bg);
  border: none;
  border-radius: var(--rounded-corners);
  font-weight: var(--fw-semi-bold);
  font-size: var(--fs-xl);
  width: 45%;
  min-height: 90px;
  margin-left: 5px;
  margin-right: 5px;
  padding: 16px;
  transition: 0.2s ease-out;
  box-shadow:-6px -6px 14px rgba(255, 255, 255, .7),
              -6px -6px 10px rgba(255, 255, 255, .5),
              6px 6px 8px rgba(255, 255, 255, .075),
              6px 6px 10px rgba(0, 0, 0, .15);
  animation: ${hoverContainerOut} 0.2s ease-out forwards;
  z-index: 2;
  :hover {
    animation: ${hoverContainerIn} 0.2s ease-out forwards;
    color: var(--colour-primary);
  }
  :active {
    color: var(--colour-background);
    transition: 0.05s ease-in;
    background: linear-gradient(135deg, rgba(0,0,0,0.22), rgba(255,255,255,0.25));
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
  animation: none;
  box-shadow: 
              inset -2px -2px 6px rgba(255, 255, 255, .7),
              inset -2px -2px 4px rgba(255, 255, 255, .5),
              inset 2px 2px 2px rgba(255, 255, 255, .075),
              inset 2px 2px 4px rgba(0, 0, 0, .15);
  :hover{
    animation: none;
  }
`;

export const DarkBG = styled.div`
  background-color: rgba(255, 255, 255, 0.3);
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
  backdrop-filter: blur(5px);
`;

export const AttachmentContainer = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: center; */
  text-align: center;
  width: 100%;
  margin: 20px 0px;
  padding: 5px 10px;
  gap: 20px;
  box-shadow:-6px -6px 7px 2px rgba(255, 255, 255, .7),
              -6px -6px 5px 2px rgba(255, 255, 255, .5),
              6px 6px 4px 2px rgba(255, 255, 255, .075),
              6px 6px 5px 2px rgba(0, 0, 0, .15);
  border-radius: 10px;
  p{
    width: inherit;
    text-align: left;
  }
  `;

interface RoundedButtonProps {
  width?: number;
}

export const CenteredDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
`;

export const RoundedButton = styled.button<RoundedButtonProps>`
  width: ${(props) => props.width != null ? props.width + "px" : "100%"};
  margin: 6px 0px;
  height: 35px;
  margin-right: 10px;
  overflow: hidden;
  background-color: var(--colour-bg);
  border: none;
  border-radius: var(--rounded-corners);
  transition: 0.2s ease-out;
  box-shadow:-6px -6px 14px rgba(255, 255, 255, .7),
              -6px -6px 10px rgba(255, 255, 255, .5),
              6px 6px 8px rgba(255, 255, 255, .075),
              6px 6px 10px rgba(0, 0, 0, .15);
  animation: ${hoverContainerOut} 0.2s ease-out forwards;
  :hover {
    animation: ${hoverContainerIn} 0.2s ease-out forwards;
    color: var(--colour-primary);
  }
  :active {
    color: var(--colour-background);
    transition: 0.05s ease-in;
    background: linear-gradient(135deg, rgba(0,0,0,0.22), rgba(255,255,255,0.25));
  }
`;

export const CardButtonWrapper = styled.span`
  width:  800px;
  margin: 25px auto;
  justify-content: center;
  display: flex;
  gap: 20px;
`

export const StyledInput = styled.input`
  width: 100%;
  align-items: center;
  justify-content: center;
  outline: none;
  border-radius: 60px;
  box-sizing: border-box;
  transition: border 0.2s ease-in-out;
  background-color: rgba(255, 255, 255, 0.3);
  border: none;
  box-shadow: 
          inset -2px -2px 6px rgba(255, 255, 255, .7), 
          inset -2px -2px 4px rgba(255, 255, 255, .5), 
          inset 2px 2px 2px rgba(255, 255, 255, .075), 
          inset 2px 2px 4px rgba(0, 0, 0, .15);
  padding: 10px 15px;
  margin: 2px 0px;
  color: black;
  transition: box-shadow 0.2s ease-in-out;
  &:focus {
    box-shadow: 
          inset -2px -3px 7px rgba(255, 255, 255, .7), 
          inset -2px -3px 5px rgba(255, 255, 255, .5), 
          inset 2px 3px 3px rgba(255, 255, 255, .075), 
          inset 2px 3px 5px rgba(0, 0, 0, .15);
  }
`;

export const StyledTextArea = styled.textarea`
  resize: none;
  width: 100%;
  align-items: center;
  justify-content: center;
  outline: none;
  border-radius: 20px;
  box-sizing: border-box;
  transition: border 0.2s ease-in-out;
  background-color: rgba(255, 255, 255, 0.3);
  border: none;
  box-shadow: 
          inset -2px -2px 6px rgba(255, 255, 255, .7), 
          inset -2px -2px 4px rgba(255, 255, 255, .5), 
          inset 2px 2px 2px rgba(255, 255, 255, .075), 
          inset 2px 2px 4px rgba(0, 0, 0, .15);
  padding: 10px 15px;
  margin: 2px 0px;
  color: black;
  transition: box-shadow 0.2s ease-in-out;
  &:focus {
    box-shadow: 
          inset -2px -3px 7px rgba(255, 255, 255, .7), 
          inset -2px -3px 5px rgba(255, 255, 255, .5), 
          inset 2px 3px 3px rgba(255, 255, 255, .075), 
          inset 2px 3px 5px rgba(0, 0, 0, .15);
  }
`;

export const InputHeader = styled.p`
  text-align: left;
  font-weight: 600;
  margin: 5px 0px 0px 10px !important;
`;