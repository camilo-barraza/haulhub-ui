import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { DayPickerRangeController } from "react-dates";

const RangeDatePickerContainer = styled.div`
  width: 180px;
  border: solid 1px #ECEBEF ;
  height:30;
  font-weight: 600;
  border-radius: 6px;
  background-color: #FCFDFF;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const DatePickerIcon = styled.div`
  color: #461C63;
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

const EndDate = styled(DateText)`
  margin-left: 5px;
`;

const StartDate = styled(DateText)`
  margin-left: 8px;
  margin-right: 5px;
`;

const Label = styled.div`
  font-size: 12px;
  font-family: "Open Sans", sans-serif;
  color:#808080;
  margin-right: 18px;
`;

const Button = styled(Label)`
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

const RangeDatePicker = () => {

  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [focusedInput, setFocusedInput] = useState("startDate");
  const [isOpen, setIsOpen] = useState(false);


  const onFocusChange = (focusedInput) => {
    setFocusedInput(focusedInput || "startDate");
  };

  const onDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(startDate && !endDate ? startDate : endDate);
  };

  const setDefault = () => {
    console.log("clicked default");
  };

  const render = () => {
    return (<div className="d-flex position-relative align-items-center justify-content-center">
      <Label> Date Filter </Label>
      <div>
        <RangeDatePickerContainer onClick={() => { setIsOpen(true); }} className="position-relative d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center justify-content-center">
            <StartDate>
              {moment(startDate).format("DD/MM/YYYY")}
            </StartDate>
            <div className="d-flex align-items-center justify-content-center" style={{marginBottom:"5px"}}> - </div>
            <EndDate>
              {moment(endDate).format("DD/MM/YYYY")}
            </EndDate>
          </div>
          <DatePickerIcon >
            <i className="fa fa-calendar mr-2" />
          </DatePickerIcon>
        </RangeDatePickerContainer>
        {isOpen &&
        <div className="reconciliation">
          <div className="position-absolute w-100 mt-2">
            <DayPickerRangeController
              startDate={startDate}
              endDate={endDate}
              onOutsideClick={() => { setIsOpen(false); }}
              hideKeyboardShortcutsPanel={true}
              focusedInput={focusedInput}
              onDatesChange={onDatesChange}
              onFocusChange={onFocusChange}
              initialVisibleMonth={() => moment().add(2, "M")}
            />
          </div>
        </div>}
      </div>
      <Button className="ml-3" onClick={setDefault}> <i className="fa fa-refresh mr-1"/> Default </Button>
    </div>
    );
  };

  return render();
};

export default RangeDatePicker;