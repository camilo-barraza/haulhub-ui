import React, { useEffect } from "react";
import { connect } from "react-redux";
import ReconciliationTable from "./tables/reconciliation_table";
import styled from "styled-components";
import MaterialsTable from "./tables/materials_table";
import Dropdown from "./common/dropdown";
import RangeDatePicker from "./common/range_date_picker";
import { Provider } from "react-redux";
import store from "./store/store";
import { selectProject, loadProjects } from "./store/actions/projectSelectorActions";
import Spinner from "./common/spinner";

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

const SelectProjectText = styled.div`
  font-family: "Open Sans", sans-serif;
  font-size: 12px;
  color: #2C123F;
`;


const LoadingProjects = styled.div`
  position:fixed;
  top:0;
  left:0;
  height:100vh;
  width:100vw;
  opacity:0.8;
  background-color: white ;
  display: flex;
  justify-content: center;
  text-align: center;
`;

const ReconciliationPage = () => {
  return (< Provider store = { store }>
    <Reconciliation/>
  </ Provider>);
};

const Reconciliation = connect((state) => ({
  menuOptions: state.projectSelector.menuOptions,
  loadingProjects: state.projectSelector.loading,
  selectedProject: state.projectSelector.selectedProject
}), { 
  loadProjects,
  selectProject
}) ( 
  ({ loadingProjects, selectedProject, menuOptions, selectProject, loadProjects }) => {

    useEffect(()=>{
      loadProjects();
    }, []);

    const onChangeStartDate = (date) => {
      console.log(date);
    };

    const onChangeEndDate = (date) => {
      console.log(date);
    };

    return (
      <Wrapper className="d-flex  justify-content-center">
        {loadingProjects? <LoadingProjects>
          <div style={{marginTop:"300px"}}>
            <Spinner/>
          </div>
        </LoadingProjects>:
          <Container className="w-100">
            <div style={{ marginLeft: "0px", marginTop: "35px" }} className="d-flex w-100 justify-content-between align-items-center">
              <div className="d-flex align-items-center justify-content-center">
                <SelectProjectText className="mr-3">
                  Select Project
                </SelectProjectText>
                <Dropdown 
                  selectedValue={selectedProject}
                  onChange={selectProject} 
                  menuOptions={menuOptions} ></Dropdown>
              </div>
              <RangeDatePicker
                onChangeStartDate={onChangeStartDate}
                onChangeEndDate={onChangeEndDate} />
            </div>
            <MarginTop>
              <ReconciliationTable />
            </MarginTop>
            <div style={{ marginTop: "35px" }}>
              {/* <MaterialsTable></MaterialsTable> */}
            </div>
          </Container>}
      </Wrapper>);
  }
);

export default ReconciliationPage;