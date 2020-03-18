import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";

const RangeDatePickerContainer = styled.div`
  width: 180px;
  border: solid 1px #ECEBEF ;
  height:30;
  border-radius: 6px;
  background-color: #FCFDFF;
`;

const DatePickerIcon = styled.div`
  color: #461C63;
`;
const DatePickerInput = styled.input`
  position: absolute;
  width: 65px;
  height: 35px;
  opacity: 0;
  z-index: 10000;

  ::-webkit-calendar-picker-indicator {
    position: absolute;
    right: 0px;
    width: 50px;
    height: 23px;
    z-index: 1000;
  }

  ::-webkit-calendar-picker-indicator:hover {
    cursor: pointer;
  }

  ::-webkit-clear-button, .t-date-picker__input::-webkit-inner-spin-button {
    display: none;
    -webkit-appearance: none;
  }
`; 

const DateText = styled.div`
  width: 62px;
  font-size: 12px; 
  font-family: "Open Sans", sans-serif;
  color: #461C63;
  height: 30px;
  display: flex;
  align-items: center;
`;

const StartDatePicker = styled(DatePickerInput)`
  margin-left: 10px;
`;
const EndDatePicker = styled(DatePickerInput)`
  margin-left:85px;
`;

const StartDateText = styled(DateText)`
  margin-left: 10px;
`;

const EndDateText = styled(DateText)`
`;

const RangeDatePicker = (props) => {

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onChangeStartDate = (event) => {
    setStartDate(event.target.value);
    if(props.onChangeStartDate)
      props.onChangeStartDate(event.target.value);
  };

  const onChangeEndDate = (event) => {
    setEndDate(event.target.value);
    if(props.onChangeEndDate)
      props.onChangeEndDate(event.target.value);
  };

  const render = () => {
    return (<RangeDatePickerContainer className="position-relative d-flex align-items-center justify-content-between">
      <StartDatePicker type="date" onChange={onChangeStartDate} />
      <EndDatePicker type="date" onChange={onChangeEndDate} />
      <div className="d-flex align-items-center justify-content-center">
        <StartDateText>
          {moment(startDate).format("DD/MM/YYYY")}
        </StartDateText>
        <div className="mx-1"> - </div>
        <EndDateText>
          {moment(endDate).format("DD/MM/YYYY")}
        </EndDateText>
      </div>
      <DatePickerIcon >
        <i className="fa fa-calendar mr-2" />
      </DatePickerIcon>
    </RangeDatePickerContainer>);
  };

  return render();
};

export default RangeDatePicker;