import styled from "styled-components";
import { useViewportWidth } from "../Utils/useViewportWidth";

interface CenteredDivProps {
  marginTop: number;
}

const StyledParagraph = styled.p`
  font-size: 20px;
`;

const StyledH5 = styled.h5`
  font-weight: bold;
  font-size: 36px;
  margin-bottom: 0px;
`;

const CenteredDiv = styled.div<CenteredDivProps>`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-top: ${(props) => props.marginTop}px;
`;

const GreetingCard = (props: { name: string }): JSX.Element => {
  const [width, isMobile] = useViewportWidth();
  const marginTop = isMobile ? 25 : 50;
  return (
    <CenteredDiv marginTop={marginTop}>
      <StyledH5>Hi {props.name}!</StyledH5>
      <StyledParagraph>
        The next Digital Services Lunch & Learn will be:
      </StyledParagraph>
    </CenteredDiv>
  );
};

export default GreetingCard;
