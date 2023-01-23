import { useState, useEffect } from "react";
import styled from "styled-components";
import { useViewportWidth } from "../Utils/useViewportWidth";
import { useUser } from "@auth0/nextjs-auth0/client";

interface CenteredDivProps {
  marginTop: number;
}

interface UserData {
  authID: string;
  firstName: string;
  lastName: string;
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
  margin-bottom: 0px;
`;

const GreetingCard = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState<UserData[]>([]);
  const [isBusy, setBusy] = useState(true);
  const [, isMobile] = useViewportWidth();
  const marginTop = isMobile ? 15 : 25;

  useEffect(() => {
    if (user?.sub != undefined || null) {
      setBusy(true);
      fetch(`https://localhost:555/api/user/${user?.sub}`)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
          setBusy(false);
        });
    }
  }, [user]);

  return (
    <>
      <CenteredDiv marginTop={marginTop}>
        <StyledH5>
          {userData.length > 0 ? (
            userData.map((data) => (
              <div key={data.authID}>
                Hi {data.firstName} {data.lastName}!
              </div>
            ))
          ) : (
            <div>Loading name</div>
          )}
        </StyledH5>
        <StyledParagraph>
          The next Digital Services Lunch & Learn will be:
        </StyledParagraph>
      </CenteredDiv>
    </>
  );
};

export default GreetingCard;
