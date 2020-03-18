import React from "react";
import styled from "styled-components";
import moment from "moment";

const tickets = [
  {
    number: "64058703",
    time: "2018-08-29 11:10:46.526069",
    accepted: true,
    truck: "EZ742",
    material: "18.29 Tons  12.MMSP"
  },
  {
    number: "64058703",
    time: "2018-08-29 11:10:46.526069",
    accepted: false,
    truck: "EZ742",
    material: "18.29 Tons  12.MMSP"
  },
  {
    number: "64058703",
    time: "2018-08-29 11:10:46.526069",
    accepted: true,
    truck: "EZ742",
    material: "18.29 Tons  12.MMSP"
  }
];

const CardWrapper = styled.div`
  height:110px;
  width:300px;
  background-color: white ;
  box-shadow: 0 3px 4px 0 rgba(44, 18, 63, 0.1);
  border-radius: 6px;
  padding: 2px 10px;
`;

const FieldTitle = styled.div`
  font-family: "Open Sans", sans-serif;
  font-size: 12px;
  color: #808080;
`;

const FieldValue = styled.div`
  font-family: "Open Sans", sans-serif;
  font-size: 12px;
  color: #2C123F;
  overflow: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  hyphens: auto;
  margin-top: 3px;
`;

const Field = styled.div`
  overflow: hidden;
  width: ${props => {return props.isFirst? "65px": "";}};
  max-width: 180px;
  margin-left: ${props => {return props.withoutMargin? "0px":"20px";}};
`;

const IconContainer = styled.div`
  height:19.3px;
  width:19.3px;
  border-radius: 4.7px;
  background-color: ${props => { return props.backgroundColor ? props.backgroundColor : "#F5EEFA";}};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;


const Icon = styled.div`
  background-color: ${props => { return props.iconBackgroundColor ? props.iconBackgroundColor : "#F5EEFA"; }};
  color: ${props => { return props.iconColor ? props.iconColor : "white";}};
  border-radius: 100%;
  height:12px;
  width:12px;
  font-size: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const StatusIcon = ({ icon, iconBackgroundColor, iconColor, backgroundColor }) => {
  return (<IconContainer backgroundColor={backgroundColor}>
    <Icon
      iconBackgroundColor={iconBackgroundColor}
      iconColor={iconColor}>
      <i className={`fa fa-${icon}`} />
    </Icon>
  </IconContainer>);
};

const TicketCard = ( { number, time, accepted, truck, material }) => {
  return (<CardWrapper className='mt-3 d-flex flex-wrap align-items-center'>
    <div className='d-flex'>
      <Field isFirst withoutMargin>
        <FieldTitle> Number </FieldTitle>
        <FieldValue> {number} </FieldValue>
      </Field>
      <Field>
        <FieldTitle> Time </FieldTitle>
        <FieldValue style={{ color: "#9E5FCA" }}> {moment(time).format("HH:MM A")} </FieldValue>
      </Field>
      <Field>
        <FieldTitle> Status </FieldTitle>
        <FieldValue> 
          {accepted? <div className='d-flex'>
            <StatusIcon icon="check" backgroundColor="#F5EEFA" iconColor="white" iconBackgroundColor="#7D45A4"/>
            <div className='ml-1'>
              Accepted
            </div>
          </div> : <div className='d-flex'>
            <StatusIcon icon="exclamation" backgroundColor="#391751" iconColor="#5C406F" iconBackgroundColor="white" />
            <div className='ml-1'>
                Rejected
            </div>
          </div>}
        </FieldValue>
      </Field>
    </div>
    <div className='d-flex'>
      <Field isFirst withoutMargin>
        <FieldTitle> Truck </FieldTitle>
        <FieldValue> {truck} </FieldValue>
      </Field>
      <Field >
        <FieldTitle> Material </FieldTitle>
        <FieldValue> {material} </FieldValue>
      </Field>
    </div>
  </CardWrapper>);
};

const Header = styled.div`
  font-family: "Open Sans", sans-serif;
  color: #7D45A4;
  font-size: 14px;
  font-weight: bold;
  margin-top: 28px;
`;

const TicketDetails = () => {
  return (<div className="w-100">
    <Header> 
      <i className='mr-2 fa fa-bookmark'></i>
      Tickets 
    </Header>
    {tickets.map((ticket, index) => (<div key={index}>
      <TicketCard {...ticket} />
    </div>))}
  </div>);
}; 

export default TicketDetails;