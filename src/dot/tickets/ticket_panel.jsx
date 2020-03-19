import React from "react";
import styled from "styled-components";
import TicketDetails from "./ticket_details";
import { connect } from "react-redux";
import { closeTicketsPanel } from "../store/actions/ticketsPanelActions";

const Wrapper = styled.div`
  right:0;
  top:0;
  width: 326px;
  position:fixed;
  overflow-y:auto;
  padding:12px;
  height:100vh;
  z-index: 200;
  transform: ${props => { return props.isOpen ? "" : "translateX(100%)"; }}; 
  will-change: transform;
  transition: transform 0.2s cubic-bezier(0,0,0.3,1);
  background-color: #F6F7FC ;
  z-index:1000;
  border-left: 1px solid #EFEEF2;
  padding-bottom: 50px;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: white;
  }

  ::-webkit-scrollbar-thumb {
    background: #DAD5DE;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #DCDFE6;
    border-radius: 2px;
  } 
`;

const Backdrop = styled.div`
  position: fixed;
  height:100vh;
  width:100vw;
  top:0;
  left:0;
  transition: transform 0.2s cubic-bezier(0,0,0.3,1);
  overflow: hidden;
  background-color: white;
  opacity: ${props => { return props.isOpen ? "0.6" : "0"; }};
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

const CloseIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height:30px;
  width:30px;
  color: #934EC5;
  background-color: #ECE6F7 ;
  border-radius: 6px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

export default connect( () => ({}), { closeTicketsPanel } )(
  ({ isOpen, closeTicketsPanel }) => {
    React.useEffect(() => {
      if (isOpen)
        document.body.style.overflowY = "hidden";
      else
        document.body.style.overflowY = "auto";
    }, [isOpen]);

    return (<div>
      <Backdrop className="flex-row-reverse" isOpen={isOpen} onClick={closeTicketsPanel} />
      <Wrapper isOpen={isOpen} >
        <CloseIcon onClick={closeTicketsPanel}>
          <i className="fa fa-times" />
        </CloseIcon>
        <TicketDetails />
      </Wrapper>
    </div>
    );
  }
);