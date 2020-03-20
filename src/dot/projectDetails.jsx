import React from "react";
import styled from "styled-components";

const Field = styled.div`
  font-family: "Open Sans", sans-serif;
  font-size: 12px;
  color: #808080;
  width: 147px;
  text-align: left;
  font-weight: bold;
`;

const Value = styled.div`
  font-family: "Open Sans", sans-serif;
  font-size: 12px;
  color: #461C63;
  font-weight: bold;
  margin-bottom: 7px;
`;

const ProjectDetails = ({ contract, aplicationDate, dueDate, billingDateRange }) => {
  return (<div>
    <div className="d-flex">
      <Field> Contract</Field>
      <Value>{contract}</Value>
    </div>
    <div className="d-flex">
      <Field> Aplication Date </Field>
      <Value>{aplicationDate}</Value>
    </div>
    <div className="d-flex">
      <Field> Due Date </Field>
      <Value>{dueDate}</Value>
    </div>
    <div className="d-flex">
      <Field> Billing Date Range </Field>
      <Value>{billingDateRange}</Value>
    </div>
  </div>);
}; 

export default ProjectDetails;