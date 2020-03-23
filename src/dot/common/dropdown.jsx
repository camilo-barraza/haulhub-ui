import React, { useState, useEffect } from "react";
import styled from "styled-components";

const SelectorContainer = styled.div`
  outline: none;
  width: 100%;
`;

const MenuContainer = styled.div`
  z-index: 10000;
  margin-top:45px;
  background-color: white ;
  position: absolute;
  width: 100%;
  will-change: transform;
`;

const Menu = styled.div`
  background-color: white;
  position: absolute;
  width: 100%;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  max-height: ${props => {return props.height? props.height: "220px";}} ;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 0 3px 4px 0 rgba(44, 18, 63, 0.1);
  border-bottom: 5px white solid;

  scrollbar-width: thin;
  scrollbar-color: #EDEBF3 #ffffff;

  ::-webkit-scrollbar {
    width: 11px;
  }

  ::-webkit-scrollbar-track {
    background: white;
  }

  ::-webkit-scrollbar-thumb {
    background: #EDEBF3;
    border-right: solid 7px white;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #DCDFE6;
    border-radius: 2px;
  } 
`;

const MenuItemText = styled.div`
  height: 15px;
  font-family: "Open Sans", sans-serif;
  font-size: 12px;
  color: #391751;

  overflow: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  hyphens: auto;
`;

const DropdownMenuItem = styled.div`
  padding: ${props => { return props.first ? "5px" : "11.5px"; }} 18px 11.5px 10px;
  display: flex;
  font-weight: normal;

  :hover {
    font-weight: 600;
    cursor: pointer;
  }
`;

const DropdownContainer = styled.div`
  /* outline: none; */
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: ${props => {return props.isOpen? "0px": "6px";}};
  border-bottom-right-radius: ${props => {return props.isOpen? "0px": "6px";}};
  height: 30px;

  display: flex;
  align-items: center;
  background-color: ${props => { return props.isOpen ? "white" : "#FCFDFF"; }} ;
  opacity: ${props => {return props.disabled? "0.5": "";}};

  border: ${props => { return props.isOpen ? "": "solid 1px #EBE9EE "; }} ;
  box-shadow: ${props => { return props.isOpen ? "0 3px 4px 0 rgba(44, 18, 63, 0.2)": "";}};

  width: ${props => {return props.width? props.width : "270px";}};
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  
  :hover {
    cursor: pointer;
  }
`;

const SelectorText = styled.div`
  overflow: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  hyphens: auto;
  font-size: 12px;
  font-weight: 600;
  text-align:left;
  width: 90%;
`;

const SelectorIcon = styled.div`
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: ${props => {return props.isOpen? "5px": "-6px";}};
`;

const Selector = styled.div`
  padding: 7px 5px 7px 12px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: ${props => { return props.hasValue ? "#391751" : "#A2A2A2"; }} ;

  display: flex;
  align-items: center;

  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

const SearchBar = styled.div`
  background-color: #F6F7FC;
  outline:none;
  height:50px;
  width: 100%;
  margin-top: -5px;
  position: absolute;
  display: flex;
  box-shadow: 0 3px 4px 0 rgba(44, 18, 63, 0.1);
`;

const SearchIconWrapper = styled.div`
  position:relative;
  height:50px;
  width:0px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  pointer-events:none;
`;

const SearchIcon = styled.div`
  color: #461C63;
  margin-left: 15px;
  font-size: 12px;
  margin-top: -0.5px;
  position:absolute;
`;

const SearchInput = styled.input`
  width: 100%;
  background-color: #F6F7FC;
  font-family: "Open Sans", sans-serif;
  font-size: 12px;
  color: #808080;
  font-weight: 600;
  padding:0 1em 0 30px;
  /* border:none; */
  outline:none;
  border-right: none;
  border-left: none;
  border-bottom:10px white solid;
  border-top:10px white solid;
  background-color: transparent ;
  height:50px;

  ::-webkit-input-placeholder { /* Edge */
    color: #A1A1A1;
  }
`;

const DropdownBottom = styled.input`
  margin-top: ${props => { return `calc(${props.height} + 20px)`; }};
  height:0px;
  width: 0px;
  border: 0px;
  position: absolute;
  outline: none;
  opacity: 0;
`;

const Dropdown = ({ 
  selectedValue = "", 
  menuOptions = [], 
  width, 
  height = "190px",
  onChange, 
  disabled,
  onDropdownClose = () => {}, 
  onDropdownOpen = () => {} }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [list, setList] = useState(menuOptions? menuOptions: []);
  const [inputFocused, setInputFocused] = useState(false);
  const inputRef = React.createRef();
  const bottomRef = React.createRef();

  useEffect(() => {
    setList(menuOptions);
  }, [menuOptions]);

  useEffect(() => {
    if(isOpen)
      onOpen();
    else
      onClose();
  }, [isOpen]);

  useEffect(() => {
    if(!inputFocused){
      setTimeout(() => {
        setIsOpen(false);
      }, 200);
    }
  }, [inputFocused]);

  const onSelect = (menuItem)  => {
    setIsOpen(false);
    if(onChange)
      onChange(menuItem);
  }; 

  const handleOnChange = (evt) => {
    const query = evt.target.value;
    const filteredList = menuOptions.filter(option => {
      return option.toLowerCase().includes(query);
    });
    setList(filteredList);
  };

  const onClose = () => {
    setList(menuOptions);
    onDropdownClose();
  };

  const onOpen = () => {
    inputRef.current.value = "";
    bottomRef.current.focus();
    inputRef.current.focus();
    onDropdownOpen();
  };

  const openDropdownMenu = evt => {
    evt.stopPropagation(); 
    evt.preventDefault(); 
    if(!disabled)
      setIsOpen(true);
  };

  return (<DropdownContainer disabled={disabled} width={width} isOpen={isOpen} onClick={openDropdownMenu}>
    <SelectorContainer className="w-100">
      <Selector hasValue={selectedValue.length > 1} className="w-100 d-flex justify-content-between">
        <SelectorText>
          {selectedValue? selectedValue: "Select"}
        </SelectorText>
        <SelectorIcon isOpen={isOpen}>
          {!isOpen? <i className="fa fa-sort-down"/> : <i className="fa fa-sort-up"/>}
        </SelectorIcon>
      </Selector>
      {isOpen &&
        <div className="w-100 position-relative">
          <SearchBar>
            <SearchIconWrapper>
              <SearchIcon>
                <i className="fa fa-search" />
              </SearchIcon>
            </SearchIconWrapper>
            <SearchInput
              tabIndex={0}
              onBlur={() => { setInputFocused(false); }}
              onFocus={() => { setInputFocused(true); }}
              id="search-input"
              ref={inputRef}
              placeholder="Search"
              onChange={handleOnChange} />
          </SearchBar>
          <DropdownMenu
            height={height}
            onSelect={onSelect}
            menu={list} />
          <DropdownBottom height={height} ref={bottomRef} />
        </div>}
    </SelectorContainer>
  </DropdownContainer>);
}; 

const DropdownMenu = ({ height, menu, onSelect }) => {

  const selectItem = (evt, menuItem) => {
    evt.stopPropagation();
    evt.preventDefault();
    onSelect(menuItem);
  };

  return (<MenuContainer>
    <Menu height={height}>
      {menu.map((menuItem, index) => (
        <DropdownMenuItem first={index === 0} key={index} onClick={evt => selectItem(evt, menuItem)} >
          <MenuItemText>
            {menuItem}
          </MenuItemText>
        </DropdownMenuItem>
      ))}
    </Menu>
  </MenuContainer>);
};

export default Dropdown;