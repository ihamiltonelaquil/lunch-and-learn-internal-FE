import styled from "styled-components";
import { useViewportWidth } from "../Utils/useViewportWidth";
import { FaSearch } from "react-icons/fa";

interface RoundedButtonProps {
  width: number;
}
const CenteredDiv = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const RoundedButton = styled.button<RoundedButtonProps>`
  width: ${(props) => props.width}px;
  border-radius: 50px;
  background-color: white;
  border: 2px solid lightgray;
  height: 35px;
  margin-right: 10px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 35px;
`;
const SearchInput = styled.input`
  border-radius: 50px;
  outline: none;
  background-color: white;
  border: 2px solid lightgray;
  padding: 10px 40px 10px 10px;
  height: 100%;
  &:hover,
  :focus {
    background-color: rgba(0, 0, 0, 0.1);
  }
  ::placeholder {
    color: black;
  }
`;
const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: lightgray;
`;

export default function ListView() {
  const [viewPort, isMobile] = useViewportWidth();
  const width = isMobile ? 100 : 150;
  return (
    <CenteredDiv>
      <RoundedButton width={width}>List View</RoundedButton>
      <SearchWrapper>
        <SearchInput type="text" placeholder="Search..." />
        <SearchIcon size={20} />
      </SearchWrapper>
    </CenteredDiv>
  );
}
