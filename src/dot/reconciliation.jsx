import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ReconciliationTable from "./tables/reconciliation_table";
import styled from "styled-components";
import MaterialsTable from "./tables/materials_table";
import Dropdown from "./common/dropdown";
import RangeDatePicker from "./common/range_date_picker";
import { Provider } from "react-redux";
import store from "./store/store";
import { selectProject, loadProjects } from "./store/actions/projectSelectorActions";
import { loadMaterialOptions } from "./store/actions/tableActions";
import Spinner from "./common/spinner";
import { projectDetails as projectDetailsMockData } from "./mockData";
import ProjectDetails from "./projectDetails";
import moment from "moment";
import { DayPickerRangeController } from "react-dates";


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
  margin-top: 33px;
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

const ProjectDetailsContainer = styled.div`
  margin-top:80px;
  width: 400px;
  display: flex;
  align-items: center;
  text-align: center;
`;

const ReconciliationPage = () => {
  return (< Provider store = { store }>
    <Reconciliation/>
  </ Provider>);
};

var sleep = n => new Promise(resolve => setTimeout(resolve, n));

const Reconciliation = connect((state) => ({
  menuOptions: state.projectSelector.menuOptions,
  loadingProjects: state.projectSelector.loading,
  selectedProject: state.projectSelector.selectedProject,
  isReconciliationTableLoading: state.reconciliationTable.loading,
  isMaterialsTableLoading: state.materials.table.loading,
}), { 
  loadProjects,
  selectProject,
  loadMaterialOptions
}) ( 
  ({ 
    isMaterialsTableLoading,
    isReconciliationTableLoading,
    loadMaterialOptions, 
    loadingProjects, 
    selectedProject, 
    menuOptions, 
    selectProject, 
    loadProjects 
  }) => {

    const [loadingProjectDetails, setLoadingProjectDetails] = useState(false);
    const [projectDetails, setProjectDetails] = useState({});
    const [focusedInput, setFocusedInput] = useState("startDate");

    const [startDate, setStartDate] = useState(moment().add({days:2}));
    const [endDate, setEndDate] = useState(moment().add({ days: 4 }));

    useEffect(()=>{
      loadProjects();
      loadMaterialOptions();
    }, []);

    const loadProjectDetails = async () => {
      // emulate network
      setLoadingProjectDetails(true);
      await sleep(1000);
      // selectedProject as param for api request

      setProjectDetails(projectDetailsMockData);
      setLoadingProjectDetails(false);
    };

    useEffect(()=>{
      loadProjectDetails();
    },[selectedProject]);

    const onFocusChange = (focusedInput) => { 
      setFocusedInput(focusedInput || "startDate");
    };

    const onDatesChange = ({ startDate, endDate }) => {
      setStartDate(startDate);
      setEndDate(startDate && !endDate ? startDate : endDate);
    };

    return (
      <Wrapper className="d-flex  justify-content-center">
        {loadingProjects? <LoadingProjects>
          <div style={{marginTop:"300px"}}>
            <Spinner/>
          </div>
        </LoadingProjects>
          :
          <Container className="w-100">
            <div style={{ marginLeft: "0px", marginTop: "35px" }} className="d-flex w-100 justify-content-between align-items-center">
              <div className="d-flex align-items-center justify-content-center">
                <SelectProjectText className="mr-3">
                Select Project
                </SelectProjectText>
                <Dropdown 
                  disabled={isReconciliationTableLoading || isMaterialsTableLoading}
                  selectedValue={selectedProject}
                  onChange={selectProject} 
                  menuOptions={menuOptions} ></Dropdown>
              </div>


              {/* <div className='reconciliation'>
                <DayPickerRangeController
                  startDate={startDate}
                  endDate={endDate}
                  hideKeyboardShortcutsPanel={true}
                  noBorder={true}
                  focusedInput={focusedInput}
                  onDatesChange={onDatesChange} 
                  onFocusChange={onFocusChange}
                  initialVisibleMonth={() => moment().add(2, "M")} 
                />
              </div> */}

              <RangeDatePicker/>
            </div>
            <ProjectDetailsContainer>
              {loadingProjectDetails ?
                <Spinner />
                : <ProjectDetails {...projectDetails} />}
            </ProjectDetailsContainer>
            <MarginTop>
              <ReconciliationTable />
            </MarginTop>
            <div style={{ marginTop: "35px" }}>
              <MaterialsTable/>
            </div>
          </Container>}
      </Wrapper>);
  }
);

export default ReconciliationPage;