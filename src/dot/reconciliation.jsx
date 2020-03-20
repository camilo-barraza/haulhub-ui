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

const Container = styled.div`
  max-width: 1300px;
  padding: 15px 40px;
  font-family: "Open Sans", sans-serif;

`;

const Wrapper = styled.div`
  background-color: #FCFDFF;
  width:100vw;
  height: 1400px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 100px;
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
  width: 400px;
  display: flex;
  align-items: center;
  text-align: center;
`;

const Button = styled.div`
  font-size: 14px;
  height: 30px;
  border-radius: 6px;
  font-family: "Open Sans", sans-serif;
  display: flex;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  text-align: center;
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

const PreviousButton = styled(Button)`
  color: #7D45A4;
`;

const ExportButton = styled(Button)`
  color: #7D45A4;
  background-color: white ;
  border: solid 1px #7D45A4;
  width: 88px;
`;  

const ReconcileButton = styled(Button)`
  color: white;
  width: 106px;
  margin-left: 15px;
  background-color: #391751 ;
`;  

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

    useEffect(()=>{
      window.scrollTo(0,0);
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
      window.scrollTo(0,0);
    }, [selectedProject]);

    useEffect(()=>{
      loadProjectDetails();
    },[selectedProject]);

    const goToPrevious = () => {
      console.log("clicked go to previous");
    };

    const reconcile = () => {
      console.log("clicked reconcile");
    };

    const exportReconciliation = () => {
      console.log("clicked on export");
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

            <div style={{marginTop: "15px"}} className="d-flex w-100 justify-content-between align-items-center">
              <div className="d-flex align-items-center justify-content-center">
                <SelectProjectText className="mr-3"> Select Project </SelectProjectText>
                <Dropdown 
                  disabled={isReconciliationTableLoading || isMaterialsTableLoading}
                  selectedValue={selectedProject}
                  onChange={selectProject} 
                  menuOptions={menuOptions} ></Dropdown>
              </div>
            </div>

            <div style={{marginTop:"27px"}} className="w-100 d-flex d-flex align-items-center justify-content-between">
              <PreviousButton onClick={goToPrevious}> 
                <i className="fa fa-caret-left mr-2"/> Previous
              </PreviousButton>
              <div className="d-flex d-flex align-items-center justify-content-center">
                <ExportButton onClick={exportReconciliation}> <i className="fa fa-download mr-2" /> Export </ExportButton>
                <ReconcileButton onClick={reconcile}> Reconcile <i className="fa fa-caret-right ml-2" />  </ReconcileButton>
              </div>
            </div>

            <div style={{marginTop:"31px"}} className="d-flex align-items-end justify-content-between">
              <ProjectDetailsContainer>
                {loadingProjectDetails ?
                  <Spinner />
                  : <ProjectDetails {...projectDetails} />}
              </ProjectDetailsContainer>
              <RangeDatePicker />
            </div>
            
            <div style={{marginTop:"33px"}} className="w-100">
              <ReconciliationTable />
            </div>
            <div style={{ marginTop: "35px" }}>
              <MaterialsTable/>
            </div>
          </Container>}
      </Wrapper>);
  }
);

const ReconciliationPage = () => {
  return (< Provider store={store}>
    <Reconciliation />
  </ Provider>);
};

export default ReconciliationPage;