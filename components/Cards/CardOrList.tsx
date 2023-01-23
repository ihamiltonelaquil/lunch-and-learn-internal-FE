import styled from "styled-components";
import { useViewportWidth } from "../Utils/useViewportWidth";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Table from "../Table";
import CardSlider from "./CardSlider";
import {
  CenteredDiv,
  RoundedButton,
  StyledExpandedMeetingCard,
} from "../styledComponents";
import ExpandedMeetingCard from "./ExpandedMeetingCard";
import CreateMeeting from "../CreateMeeting";

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

export default function CardOrList() {
  const [searchName, setSearchName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [tableData, setTableData] = useState<any[]>([]);
  const [showTable, setShowTable] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [, isMobile] = useViewportWidth();
  const width = isMobile ? 100 : 150;

  useEffect(() => {
    fetch(`https://localhost:555/api/Meeting/${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        setTableData(data);
      });
  }, [tableData]);

  const handleClick = () => {
    setShowTable(!showTable);
    setSearchText("");
  };

  const handleCreate = () => {
    setShowCreate(!showCreate);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchText(searchName);
    setSearchName("");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchName(event.target.value);
  };

  if (!isMobile) {
    return (
      <>
        {showCreate ? (
          <CreateMeeting />
        ) : (
          <>
            {showTable ? <Table data={tableData} /> : <CardSlider />}
            <CenteredDiv>
              {showTable ? (
                <>
                  <RoundedButton width={width} onClick={handleClick}>
                    Card View
                  </RoundedButton>
                  <form onSubmit={handleSubmit}>
                    <SearchWrapper>
                      <SearchInput
                        type="text"
                        placeholder="Search..."
                        onChange={handleChange}
                      />
                      <SearchIcon size={20} />
                    </SearchWrapper>
                  </form>
                </>
              ) : (
                <>
                  <RoundedButton width={width} onClick={handleClick}>
                    List View
                  </RoundedButton>
                  <RoundedButton width={width} onClick={handleCreate}>
                    Create
                  </RoundedButton>
                </>
              )}
            </CenteredDiv>
          </>
        )}
      </>
    );
  }
  return <Table data={tableData} />;
}
