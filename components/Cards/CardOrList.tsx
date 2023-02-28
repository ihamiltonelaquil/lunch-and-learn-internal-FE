import styled from "styled-components";
import { useViewportWidth } from "../Utils/useViewportWidth";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Table from "../Table";
import CardSlider from "./CardSlider";
import {
  CenteredDiv,
  DarkBG,
  RoundedButton,
} from "../StyleComponents/styledComponents";
import CreateMeeting from "./CreateMeeting";

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
  const [didChange, setDidChange] = useState(false);
  const width = isMobile ? 100 : 150;

  useEffect(() => {
    fetch(process.env.API_ROUTE+`/api/Meeting/${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        setTableData(data);
      });
  }, [searchText]);

  const handleClick = () => {
    setShowTable(!showTable);
    setSearchText("");
    toggleChange();
  };

  const handleCreate = () => {
    setShowCreate(!showCreate);
    toggleChange();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchText(searchName);
    setSearchName("");
    toggleChange();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchName(event.target.value);
    toggleChange();
  };

  function toggleChange() {
    setDidChange(!didChange);
  }

  if (!isMobile) {
    return (
      <>
        {showCreate ? (
          <>
            <CreateMeeting setShowCreate={setShowCreate} />
            <DarkBG
              onClick={() => {
                handleCreate();
              }}
            />
          </>
        ) : (
          <>
            {showTable ? <Table data={tableData} /> : <CardSlider didChange={didChange}/>}
            <CenteredDiv>
              <label className="label">
                <div className="toggle">
                  <input className="toggle-state" type="checkbox" name="check" value="check" onChange={handleClick} />
                  <div className="indicator"></div>
                </div>
                <div className="label-text">List View</div>
              </label>
              {showTable ? (
                <>
                  {/* <RoundedButton width={width} onClick={handleClick}>
                    Card View
                  </RoundedButton> */}
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
                  {/* <RoundedButton width={width} onClick={handleClick}>
                    List View
                  </RoundedButton> */}
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
