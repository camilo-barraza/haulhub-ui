import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Spinner from "../common/spinner";
import TicketPanel from "../tickets/ticket_panel";
import { faBookmark as faRegularBookmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReconciliationContext } from "../reconciliation"; 

const sleep = n => new Promise(resolve => setTimeout(resolve, n));

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const Container = styled.div`
  background-color: white ;
  width: ${props => {return props.width? props.width: "100%";}};
  border-radius: 4px;
  box-shadow: 0 1px 5px 0 rgba(44, 18, 63, 0.1); 
  border: solid 0.4px #EAE8ED ;
`;

export const TableSection = styled.div`
  width: ${props => props.width};
  height: ${props => props.height ? props.height : "79px"};
  border-right: ${props => { return props.borderless ? "" : "solid 1px #EAE8ED";}}   ;
  padding: ${props => { return `0 ${props.rightPadding ? props.rightPadding : "30px"} 0 14px`; }} ;
  font-family: "Open Sans", sans-serif;
  display: flex;
`;

const Column = styled.div`
  width: ${props => props.width};
  display: flex;
  align-items: center;
  
  ${props => {
    return props.isClickable ? `-webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      :hover {
        cursor: pointer;
        opacity: 0.7;
      }` : ""; }}
`;

export const SectionHeader = styled(Column)`
  font-size: 12px;
  width: 100%;
  color: #6D547F;
  font-weight: 600;
`;

const ColumnHeader = styled(Column)`
  color: #6D547F;
  font-size: 12px;
  display: flex;
  align-items: center;
  font-weight: ${props => {return props.normalFontWeight? "normal" : "600";}};
`;

export const Headers = styled.div`
  display: flex;
  align-items: center;
  border-bottom: solid 1px #EAE8ED ;
  width: ${props => { return props.scrollbarWidth ? `calc(100% - ${props.scrollbarWidth}px)`: "calc(100% - 6px)";}};
`;

export const SectionSubheaders = styled.div`
  display: flex;
  margin-top: 17px;
  width: 100%;
  font-weight: normal;
`;

const TableColumnContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: ${props => {return props.align? 
    props.align === "right"? "flex-end": "center" 
    : "flex-start";}};
  text-align: ${props => {return props.align;}};
`;

export const TableColumnHeader = (props) => {
  const { width, align } = props;
  return (<ColumnHeader normalFontWeight={props.normalFontWeight} width={width}>
    <TableColumnContent align={align}>
      {props.children}
    </TableColumnContent>
  </ColumnHeader>);
};

const TableData = styled.div`
  color: #461C63;
  font-size: 12px;
  font-weight: inherit;
  display: flex;
  align-items: center;
`;

export const TableColumn = (props) => {
  const { width, align } = props;
  return (<Column onClick={props.onClick} isClickable={props.isClickable} width={width}>
    <TableColumnContent align={align}>
      <TableData>
        {props.children}
      </TableData>
    </TableColumnContent>
  </Column>);
};

const RowDescription = styled.div`
  color: #808080;
  text-align: left;
  overflow: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  hyphens: auto;
`;

export const TableRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-bottom: ${props => { return !props.isLast ? "1px solid #EAE7ED" : ""; }} ;
  background-color: color ;
  font-weight: ${props => {return props.isSelected? "600": "normal";}};
  border: ${props => { return props.isSelected ? "dotted 0.1px #7D45A4": "";}} ;
`;

export const RowsContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: ${props => { return props.maxHeight ? props.maxHeight : "254px"; }};
  scrollbar-width: thin;

  scrollbar-width: thin;
  scrollbar-color: #EDEBF3 #ffffff;

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: white;
  }

  ::-webkit-scrollbar-thumb {
    background: #EDEBF3;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #DCDFE6;
    border-radius: 2px;
  } 
`;

export const Rows = ({ tableType, data, onRender = () => {}, loadingData, loadedLastPage, loadData, RowLayout, maxHeight }) => {
  const rowsRef = React.createRef();
  const rowChildRef = React.createRef();

  useEffect(() => {
    const scrollbarWidth = rowChildRef.current.parentNode.offsetWidth - rowChildRef.current.offsetWidth;
    const isChrome = navigator.userAgent.search("Chrome") > 0;
    onRender(isChrome? scrollbarWidth-1: scrollbarWidth);
  });

  const onScroll = () => {
    if (loadingData || loadedLastPage)
      return;
    const rowsElement = rowsRef.current;
    if (rowsElement.scrollHeight - rowsElement.offsetHeight - rowsElement.scrollTop < 40) 
      loadData(tableType);
  };

  const onDropdownOpen = async () => {
    await sleep(500);
    if (rowsRef.current)
      rowsRef.current.style.overflow = "hidden";
  };

  const onDropdownClose = async () => {
    rowsRef.current.style.overflow = "auto";
  };

  return (<RowsContainer maxHeight={maxHeight} ref={rowsRef} onScroll={onScroll}>
    <div ref={rowChildRef}>
      {data.map((row, index) =>
        <RowLayout 
          onDropdownClose={onDropdownClose}
          onDropdownOpen={onDropdownOpen} 
          index={index} height="50px" 
          key={index} 
          isLast={index === data.length - 1} 
          {...row} />)}
      {loadingData && <div className="my-3">
        <Spinner />
      </div>}
    </div>
  </RowsContainer>);
};

const tableColumnWidths = [{
  sectionWidth: "55%",
  subSectionWidths: ["10%", "18%", "45%", "17%", "12%"]
},
{
  sectionWidth: "25%",
  subSectionWidths: ["50%", "50%"]
},
{
  sectionWidth: "30%",
  subSectionWidths: ["33%", "33%", "33%"]
}];

const ticketFilters = {
  PREVIOUS_PERIOD: "PREVIOUS_PERIOD",
  THIS_PERIOD: "THIS_PERIOD",
  TOTAL_COMPLETED: "TOTAL_COMPLETED",
};


const Row = (props) => {
  const [{
    ticketsPanel
  },
  {
    openTicketsPanel
  }] = useContext(ReconciliationContext);

  const { selectedFilter, selectedItem } = ticketsPanel;
  const { item } = props;

  return (<div>
    <TableRow isSelected={item === selectedItem}  isLast={props.isLast} className="d-flex">
      <TableSection height={props.height} width={tableColumnWidths[0].sectionWidth}>
        <TableColumn width={tableColumnWidths[0].subSectionWidths[0]}> {props.line} </TableColumn>
        <TableColumn width={tableColumnWidths[0].subSectionWidths[1]}> {item} </TableColumn>
        <TableColumn width={tableColumnWidths[0].subSectionWidths[2]}>
          <RowDescription title={props.description}> {props.description} </RowDescription>
        </TableColumn>
        <TableColumn align="right" width={tableColumnWidths[0].subSectionWidths[3]}> {numberWithCommas(props.bidQuantity)} </TableColumn>
        <TableColumn align="right" width={tableColumnWidths[0].subSectionWidths[4]}> {props.unit} </TableColumn>
      </TableSection>
      <TableSection height={props.height} width={tableColumnWidths[1].sectionWidth}>
        <TableColumn onClick={() => { openTicketsPanel(item, ticketFilters.PREVIOUS_PERIOD); }}
          isClickable align="right" width={tableColumnWidths[1].subSectionWidths[0]}>
          {numberWithCommas(props.previousPeriod)} 
          {selectedFilter === ticketFilters.PREVIOUS_PERIOD && selectedItem === item? 
            <i className="fa fa-bookmark ml-2"/>:
            <FontAwesomeIcon className='ml-2' icon={faRegularBookmark} />}
        </TableColumn>
        <TableColumn onClick={() => { openTicketsPanel(item, ticketFilters.THIS_PERIOD); }}
          isClickable align="right" width={tableColumnWidths[1].subSectionWidths[1]}>
          {numberWithCommas(props.thisPeriod)}  
          {selectedFilter === ticketFilters.THIS_PERIOD && selectedItem === item?
            <i className="fa fa-bookmark ml-2" /> :
            <FontAwesomeIcon className='ml-2' icon={faRegularBookmark} />}
        </TableColumn>
      </TableSection>
      <TableSection height={props.height} borderless width={tableColumnWidths[2].subSectionWidths[0]}>
        <TableColumn onClick={() => { openTicketsPanel(item, ticketFilters.TOTAL_COMPLETED); }}
          isClickable align="right" width={tableColumnWidths[2].subSectionWidths[0]}>
          {numberWithCommas(props.totalCompletedStoredToDate)} 
          {selectedFilter === ticketFilters.TOTAL_COMPLETED && selectedItem === item?
            <i className="fa fa-bookmark ml-2" /> :
            <FontAwesomeIcon className='ml-2' icon={faRegularBookmark} />}
        </TableColumn>
        <TableColumn align="right" width={tableColumnWidths[2].subSectionWidths[1]}> {props.percentComplete}%</TableColumn>
        <TableColumn align="right" width={tableColumnWidths[2].subSectionWidths[2]}> {numberWithCommas(props.balanceToFinish)}  </TableColumn>
      </TableSection>
    </TableRow>
  </div>);
};


export default () => {
  const [{
    projectSelector,
    ticketsPanel,
    reconciliationTable
  },
  {
    loadTableFirstPage,
    loadTablePage
  }] = useContext(ReconciliationContext);

  const { selectedProject } = projectSelector;
  const { loading: loadingData, loadedLastPage, tableType, data } = reconciliationTable;
  const { isOpen: isTicketsPanelOpen } = ticketsPanel;

  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  useEffect(()=>{
    if(selectedProject !== "")
      loadTableFirstPage(tableType);
  },[selectedProject]);

  const onRenderRows = (_scrollbarWidth) => {
    if(scrollbarWidth !== _scrollbarWidth)
      setScrollbarWidth(_scrollbarWidth);
  };

  return (<Container>
    <Headers scrollbarWidth={scrollbarWidth}>
      <TicketPanel isOpen={isTicketsPanelOpen} />
      <TableSection width={tableColumnWidths[0].sectionWidth}>
        <TableColumnHeader width={tableColumnWidths[0].subSectionWidths[0]}> Line </TableColumnHeader>
        <TableColumnHeader width={tableColumnWidths[0].subSectionWidths[1]}> Item </TableColumnHeader>
        <TableColumnHeader width={tableColumnWidths[0].subSectionWidths[2]}> Description </TableColumnHeader>
        <TableColumnHeader align="right" width={tableColumnWidths[0].subSectionWidths[3]}> Bid Quantity </TableColumnHeader>
        <TableColumnHeader align="right" width={tableColumnWidths[0].subSectionWidths[4]}> Unit </TableColumnHeader>
      </TableSection>
      <TableSection className="d-flex flex-column align-items-center justify-content-center" width={tableColumnWidths[1].sectionWidth}>
        <SectionHeader className="d-flex align-items-center justify-content-center"> Work Completed </SectionHeader>
        <SectionSubheaders>
          <TableColumnHeader normalFontWeight align="right" width={tableColumnWidths[1].subSectionWidths[0]}> Previous Period </TableColumnHeader>
          <TableColumnHeader normalFontWeight align="right" width={tableColumnWidths[1].subSectionWidths[1]}> This Period </TableColumnHeader>
        </SectionSubheaders>
      </TableSection>
      <TableSection borderless width={tableColumnWidths[2].subSectionWidths[0]}>
        <TableColumnHeader align="right" width={tableColumnWidths[2].subSectionWidths[0]}>
          <div className="text-center" style={{ width: "90px" }}> Total Completed Stored to Date </div>
        </TableColumnHeader>
        <TableColumnHeader align="right" width={tableColumnWidths[2].subSectionWidths[1]}> % Complete </TableColumnHeader>
        <TableColumnHeader align="right" width={tableColumnWidths[2].subSectionWidths[2]}>
          <div style={{ width: "60px" }}> Balance to Finish </div>
        </TableColumnHeader>
      </TableSection>
    </Headers>
    <Rows 
      maxHeight={"356px"}
      onRender={onRenderRows}
      tableType={tableType}
      data={data}
      loadData={loadTablePage} 
      loadingData={loadingData} 
      loadedLastPage={loadedLastPage} 
      RowLayout={Row} />
  </Container>);
};