import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { 
  Container,
  Headers, 
  SectionHeader,
  SectionSubheaders,
  TableColumnHeader, 
  TableColumn, 
  TableRow,
  Rows,
  TableSection, 
  numberWithCommas } from "./reconciliation_table";
import Dropdown from "../common/dropdown";
import { loadTableFirstPage, loadTablePage } from "../store/actions/tableActions";
import { openTicketsPanel } from "../store/actions/ticketsPanelActions";
import Spinner from "../common/spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faRegularBookmark } from "@fortawesome/free-regular-svg-icons";


const Material = styled.div`
  overflow: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  hyphens: auto;
`;

const MatchMaterialButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: solid 2px #A883C2;
  height:30px;
  width:110px;
  border-radius: 6px;
  color: #9568B5;
`;

const handleMatchMaterialClick = (evt)=>{
  evt.stopPropagation();
  evt.preventDefault();
  alert("match button click");
};

const tableColumnWidths = [{
  sectionWidth: "60%",
  subSectionWidths: ["30%", "50%", "10%"]
},
{
  sectionWidth: "18%",
  subSectionWidths: ["100%"]
},
{
  sectionWidth: "22%",
  subSectionWidths: ["100%"]
}];

const MATERIALS_FILTER = "MATERIALS_FILTER";

const Row  = connect(state => ({
  menuOptions: state.materials.menuOptions.data,
  loadingMenuOptions: state.materials.menuOptions.loading,
  isTicketDetailOpen: state.ticketsPanel.isOpen,
  selectedFilter: state.ticketsPanel.selectedFilter,
  selectedMaterial: state.ticketsPanel.selectedMaterial
}), { openTicketsPanel }) (
  (props) => {
    const { item, openTicketsPanel, selectedFilter, selectedItem, selectedMaterial, material } = props; 
    const [selectedMenuItem, setSelectedMenuItem] = useState(props.item);

    useEffect(() => {
      setSelectedMenuItem(props.item);
    }, [props.item]);

    const onChangeMaterial = (menuOption) => {
      setSelectedMenuItem(menuOption);
      console.log(props.index, menuOption);
    };

    return (<TableRow isSelected={material === selectedMaterial} isLast={props.isLast} className="d-flex">
      <TableSection borderless height={props.height} width={tableColumnWidths[0].sectionWidth}>
        <TableColumn width={tableColumnWidths[0].subSectionWidths[0]}>
          {props.loadingMenuOptions? <div>
            <Spinner/>
          </div>:
            <Dropdown
              onDropdownOpen={props.onDropdownOpen}
              onDropdownClose={props.onDropdownClose}
              height="140px"
              selectedValue={selectedMenuItem}
              onChange={onChangeMaterial}
              width="114px"
              menuOptions={props.menuOptions}
              initialValue={props.item} />}
        </TableColumn>
        <TableColumn width={tableColumnWidths[0].subSectionWidths[1]}>
          <Material>
            {material}
          </Material>
        </TableColumn>
        <TableColumn align="right" width={tableColumnWidths[0].subSectionWidths[2]}> {props.unit} </TableColumn>
      </TableSection>
      <TableSection borderless height={props.height} width={tableColumnWidths[1].sectionWidth}>
        <TableColumn isClickable onClick={() => { openTicketsPanel(item, MATERIALS_FILTER, material); }}
          align="right" width={tableColumnWidths[1].subSectionWidths[0]}>
          {numberWithCommas(props.workCompletedThisPeriod)} 
          {selectedFilter === MATERIALS_FILTER && selectedMaterial === material?
            <i className="fa fa-bookmark ml-2" /> :
            <FontAwesomeIcon className='ml-2' icon={faRegularBookmark} />}
        </TableColumn>
      </TableSection>
      <TableSection borderless align="right" height={props.height} rightPadding="15px" width={tableColumnWidths[2].sectionWidth}>
        <TableColumn align="right" width={tableColumnWidths[2].subSectionWidths[0]}>
          <MatchMaterialButton onClick={(evt) => { handleMatchMaterialClick(evt); }}> Match Material </MatchMaterialButton>
        </TableColumn>
      </TableSection>
    </TableRow>);
  }
);


export default connect((state) => ({
  selectedProject: state.projectSelector.selectedProject,
  loadingData: state.materials.table.loading,
  loadedLastPage: state.materials.table.loadedLastPage,
  tableType: state.materials.table.tableType,
  data: state.materials.table.data,
}), {
  loadTableFirstPage, loadTablePage
})(
  ({
    selectedProject,
    tableType,
    data,
    loadingData,
    loadedLastPage,
    loadTableFirstPage,
    loadTablePage
  }) => {
    const [scrollbarWidth, setScrollbarWidth] = useState(0);

    useEffect(() => {
      if (selectedProject !== "")
        loadTableFirstPage(tableType);
    }, [selectedProject]);

    const onRenderRows = (_scrollbarWidth) => {
      if (scrollbarWidth !== _scrollbarWidth)
        setScrollbarWidth(_scrollbarWidth);
    };

    return (<Container width="75%">
      <Headers scrollbarWidth={scrollbarWidth}>
        <TableSection borderless className="d-flex flex-column align-items-center justify-content-center" width={tableColumnWidths[0].sectionWidth}>
          <SectionHeader className="d-flex align-items-center"> Unallocated Quantities </SectionHeader>
          <SectionSubheaders>
            <TableColumnHeader width={tableColumnWidths[0].subSectionWidths[0]}> Item </TableColumnHeader>
            <TableColumnHeader width={tableColumnWidths[0].subSectionWidths[1]}> Material </TableColumnHeader>
            <TableColumnHeader align="right" width={tableColumnWidths[0].subSectionWidths[2]}> Unit </TableColumnHeader>
          </SectionSubheaders>
        </TableSection>
        <TableSection borderless className="d-flex flex-column align-items-center justify-content-center" width={tableColumnWidths[1].sectionWidth}>
          <SectionHeader className="d-flex align-items-center flex-row-reverse"> Work Completed </SectionHeader>
          <SectionSubheaders>
            <TableColumnHeader align="right" normalFontWeight  width={tableColumnWidths[1].subSectionWidths[0]}> This Period </TableColumnHeader>
          </SectionSubheaders>
        </TableSection>
        <TableSection borderless rightPadding="15px" width={tableColumnWidths[2].sectionWidth}>
        </TableSection>
      </Headers>
      <Rows
        onRender={onRenderRows}
        maxHeight="400px"
        tableType={tableType}
        data={data}
        loadData={loadTablePage}
        loadingData={loadingData}
        loadedLastPage={loadedLastPage}
        RowLayout={Row} />
    </Container>);
  }
);