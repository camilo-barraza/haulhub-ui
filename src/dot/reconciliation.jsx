import React from "react";
import ReconciliationTable from "./tables/reconciliation_table";
import styled from "styled-components";
import MaterialsTable from "./tables/materials_table";
import Dropdown from "./common/dropdown";
import RangeDatePicker from "./common/range_date_picker";
import { Provider } from "react-redux";
import store from "./store/store";

const Container = styled.div`
  max-width: 1300px;
  padding: 15px 40px;
  font-family: "Open Sans", sans-serif;

`;

const Wrapper = styled.div`
  background-color: #FCFDFF;
  height:100vh;
  width:100vw;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 100px;
`;

const MarginTop = styled.div`
  margin-top: 70px;
`;

const menuOptions = [
  "32359 MCINTOSH PKWY NEWNAN SUB",
  "123 MCINTOSH PKWY NEWNAN SUB",
  "12343245 MCINTOSH PKWY NEWNAN SUB",
  "34543 MCINTOSH PKWY NEWNAN SUB",
  "32354354359 MCINTOSH PKWY NEWNAN SUB",
  "5435 MCINTOSH PKWY NEWNAN SUB",
  "32354354359 MCINTOSH PKWY NEWNAN SUB",
  "543 MCINTOSH PKWY NEWNAN SUB",
  "56 MCINTOSH PKWY NEWNAN SUB"
];

const SelectProjectText = styled.div`
  font-family: "Open Sans", sans-serif;
  font-size: 12px;
  color: #2C123F;
`;

const Reconciliation = () => {

  const onChangeStartDate = (date) => {
    console.log(date);
  };

  const onChangeEndDate = (date) => {
    console.log(date);
  };

  return (<Provider store={store}>
    <Wrapper className="d-flex  justify-content-center">
      <Container className="w-100">
        <div style={{ marginLeft: "0px", marginTop: "35px" }} className="d-flex w-100 justify-content-between align-items-center">
          <div className="d-flex align-items-center justify-content-center">
            <SelectProjectText className="mr-3">
            Select Project
            </SelectProjectText>
            <Dropdown onChange={(menuItem) => {
              console.log(menuItem);
            }} menuOptions={menuOptions} ></Dropdown>
          </div>
          <RangeDatePicker
            onChangeStartDate={onChangeStartDate}
            onChangeEndDate={onChangeEndDate} />
        </div>
        <MarginTop>
          <ReconciliationTable />
        </MarginTop>
        <div style={{ marginTop: "35px" }}>
          <MaterialsTable></MaterialsTable>
        </div>
      </Container>
    </Wrapper>
  </Provider>);
};

export default Reconciliation;