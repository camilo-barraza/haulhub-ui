import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  right:0;
  top:0;
  position:fixed;
  height:100vh;
  width: 400px;
  z-index: 200;
  transform: ${props => { return props.isOpen ? "" : "translateX(100%)"; }}; 
  will-change: transform;
  transition: transform 0.2s cubic-bezier(0,0,0.3,1);
  background-color: #F6F7FC ;
  z-index:1000;
`;

const Backdrop = styled.div`
  position: fixed;
  height:100%;
  width:100%;
  top:0;
  transition: transform 0.2s cubic-bezier(0,0,0.3,1);
  overflow: hidden;
  background-color: white;
  opacity: ${props => { return props.isOpen ? "0.2" : "0"; }};
  display: ${props => { return props.isOpen ? "block" : "none"; }};
  z-index: 200;
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

const TicketDetail = ({ isOpen, setIsOpen, children }) => {
  React.useEffect(() => {
    if (isOpen)
      document.body.style.overflowY = "hidden";
    else
      document.body.style.overflowY = "auto";
  }, [isOpen]);


  return (<div>
    <Backdrop className="flex-row-reverse" isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
    <Wrapper isOpen={isOpen}>
      {children}
    </Wrapper>
  </div>
  );
};

export default TicketDetail;