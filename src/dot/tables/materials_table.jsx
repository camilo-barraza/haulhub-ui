import React, { useState, useEffect } from "react";
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
import { materialsTableData as mockData } from "../mockData";

const sleep = n => new Promise(resolve => setTimeout(resolve, n));

const menuOptions = ["402-3190", "402-3130", "400-3206", "402-3190", "402-3130", "400-3206", "402-3190", "402-3130", "400-3206"];

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


const Row = (props) => {
  const onChangeMaterial = (menuOption) => {
    console.log(props.index, menuOption);
  };

  return (<TableRow onClick={() => { alert(`clicked row ${props.item}`); }} isLast={props.isLast} className="d-flex">
    <TableSection borderless height={props.height}  width={tableColumnWidths[0].sectionWidth}>
      <TableColumn width={tableColumnWidths[0].subSectionWidths[0]}> 
        <Dropdown
          onDropdownOpen={props.onDropdownOpen}
          onDropdownClose={props.onDropdownClose}
          height="140px"
          onChange={onChangeMaterial} 
          width="114px" 
          menuOptions={menuOptions} 
          initialValue={props.item}/>
      </TableColumn>
      <TableColumn width={tableColumnWidths[0].subSectionWidths[1]}> 
        <Material>
          {props.material}
        </Material>
      </TableColumn>
      <TableColumn align="right" width={tableColumnWidths[0].subSectionWidths[2]}> {props.unit} </TableColumn>
    </TableSection>
    <TableSection borderless height={props.height}  width={tableColumnWidths[1].sectionWidth}>
      <TableColumn align="right" width={tableColumnWidths[1].subSectionWidths[0]}> 
        {numberWithCommas(props.workCompletedThisPeriod)} <i className="fa fa-bookmark ml-2"></i>
      </TableColumn>
    </TableSection>
    <TableSection borderless align="right" height={props.height}  rightPadding="15px" width={tableColumnWidths[2].sectionWidth}>
      <TableColumn align="right" width={tableColumnWidths[2].subSectionWidths[0]}> 
        <MatchMaterialButton onClick={(evt) => { handleMatchMaterialClick(evt); }}> Match Material </MatchMaterialButton>
      </TableColumn>
    </TableSection>
  </TableRow>);
};

const MaterialsTable = () => {
  const getData = async () => {
    // simulate network
    await sleep(1000);
    return mockData;
  };

  return (<Container width="890px">
    <Headers>
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
    <Rows maxHeight="400px" getData={getData} totalPages={2} RowLayout={Row} />
  </Container>);
}; 

export default MaterialsTable;