import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Spinner from "../common/spinner";
import TicketPanel from "../tickets/ticket_panel";

const sleep = n => new Promise(resolve => setTimeout(resolve, n));

const mockData = [
  {
    line: 1, 
    item: "400-3206", 
    description: "ASPH CONC 12.5mm OGFC, GP 2 INLY, INCL POLYMER-MODIFIED BUTIM MATL & H LIME",
    bidQuantity: 37000,
    unit: "TN",
    previousPeriod: 10000,
    thisPeriod: 5000,
    totalCompletedStoredToDate: 15000,
    percentComplete: 40.43,
    balanceToFinish: 22100
  },
  {
    line: 2, 
    item: "400-3206", 
    description: "ASPH CONC 12.5mm OGFC, GP 2 INLY, INCL POLYMER-MODIFIED BUTIM MATL & H LIME",
    bidQuantity: 37000,
    unit: "TN",
    previousPeriod: 10000,
    thisPeriod: 5000,
    totalCompletedStoredToDate: 15000,
    percentComplete: 40.43,
    balanceToFinish: 22100
  },
  {
    line: 3, 
    item: "400-3206", 
    description: "ASPH CONC 12.5mm OGFC, GP 2 INLY, INCL POLYMER-MODIFIED BUTIM MATL & H LIME",
    bidQuantity: 37000,
    unit: "TN",
    previousPeriod: 10000,
    thisPeriod: 5000,
    totalCompletedStoredToDate: 15000,
    percentComplete: 40.43,
    balanceToFinish: 22100
  },
  {
    line: 4, 
    item: "400-3206", 
    description: "ASPH CONC 12.5mm OGFC, GP 2 INLY, INCL POLYMER-MODIFIED BUTIM MATL & H LIME",
    bidQuantity: 37000,
    unit: "TN",
    previousPeriod: 10000,
    thisPeriod: 5000,
    totalCompletedStoredToDate: 15000,
    percentComplete: 40.43,
    balanceToFinish: 22100
  },
  {
    line: 5, 
    item: "400-3206", 
    description: "ASPH CONC 12.5mm OGFC, GP 2 INLY, INCL POLYMER-MODIFIED BUTIM MATL & H LIME",
    bidQuantity: 37000,
    unit: "TN",
    previousPeriod: 10000,
    thisPeriod: 5000,
    totalCompletedStoredToDate: 15000,
    percentComplete: 40.43,
    balanceToFinish: 22100
  },
  {
    line: 6, 
    item: "400-3206", 
    description: "ASPH CONC 12.5mm OGFC, GP 2 INLY, INCL POLYMER-MODIFIED BUTIM MATL & H LIME",
    bidQuantity: 37000,
    unit: "TN",
    previousPeriod: 10000,
    thisPeriod: 5000,
    totalCompletedStoredToDate: 15000,
    percentComplete: 40.43,
    balanceToFinish: 22100
  },
  {
    line: 7, 
    item: "400-3206", 
    description: "ASPH CONC 12.5mm OGFC, GP 2 INLY, INCL POLYMER-MODIFIED BUTIM MATL & H LIME",
    bidQuantity: 37000,
    unit: "TN",
    previousPeriod: 10000,
    thisPeriod: 5000,
    totalCompletedStoredToDate: 15000,
    percentComplete: 40.43,
    balanceToFinish: 22100
  },
  {
    line: 8, 
    item: "400-3206", 
    description: "ASPH CONC 12.5mm OGFC, GP 2 INLY, INCL POLYMER-MODIFIED BUTIM MATL & H LIME",
    bidQuantity: 37000,
    unit: "TN",
    previousPeriod: 10000,
    thisPeriod: 5000,
    totalCompletedStoredToDate: 15000,
    percentComplete: 40.43,
    balanceToFinish: 22100
  },
  {
    line: 9, 
    item: "400-3206", 
    description: "ASPH CONC 12.5mm OGFC, GP 2 INLY, INCL POLYMER-MODIFIED BUTIM MATL & H LIME",
    bidQuantity: 37000,
    unit: "TN",
    previousPeriod: 10000,
    thisPeriod: 5000,
    totalCompletedStoredToDate: 15000,
    percentComplete: 40.43,
    balanceToFinish: 22100
  },
  {
    line: 10, 
    item: "400-3206", 
    description: "ASPH CONC 12.5mm OGFC, GP 2 INLY, INCL POLYMER-MODIFIED BUTIM MATL & H LIME",
    bidQuantity: 37000,
    unit: "TN",
    previousPeriod: 10000,
    thisPeriod: 5000,
    totalCompletedStoredToDate: 15000,
    percentComplete: 40.43,
    balanceToFinish: 22100
  },
  {
    line: 11, 
    item: "400-3206", 
    description: "ASPH CONC 12.5mm OGFC, GP 2 INLY, INCL POLYMER-MODIFIED BUTIM MATL & H LIME",
    bidQuantity: 37000,
    unit: "TN",
    previousPeriod: 10000,
    thisPeriod: 5000,
    totalCompletedStoredToDate: 15000,
    percentComplete: 40.43,
    balanceToFinish: 22100
  },
  {
    line: 12, 
    item: "400-3206", 
    description: "ASPH CONC 12.5mm OGFC, GP 2 INLY, INCL POLYMER-MODIFIED BUTIM MATL & H LIME",
    bidQuantity: 37000,
    unit: "TN",
    previousPeriod: 10000,
    thisPeriod: 5000,
    totalCompletedStoredToDate: 15000,
    percentComplete: 40.43,
    balanceToFinish: 22100
  }];

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const Container = styled.div`
  background-color: white ;
  width: ${props => {return props.width? props.width: "1200px";}};
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
`;

export const SectionHeader = styled(Column)`
  font-size: 12px;
  width: 100%;
  color: #6D547F;
  font-weight: bold;
`;

const ColumnHeader = styled(Column)`
  color: #6D547F;
  font-size: 12px;
  display: flex;
  align-items: center;
  font-weight: ${props => {return props.normalFontWeight? "normal" : "bold";}};
`;

export const Headers = styled.div`
  display: flex;
  align-items: center;
  border-bottom: solid 1px #EAE8ED ;
  width: calc(100% - 6px);
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
  return (<Column width={width}>
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
  font-weight: normal;

  :hover {
    cursor: pointer;
    background-color: #FCFDFF ;
    font-weight: bold !important;
  }
`;

export const RowsContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: ${props => { return props.maxHeight ? props.maxHeight : "254px"; }};

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

export const Rows = ({ getData, totalPages, RowLayout, maxHeight }) => {
  const rowsRef = React.createRef();
  const currentPage = React.useRef(1);
  const loadedLastPage = React.useRef(false);
  const [loadingData, setLoadingData] = useState(false);
  const [rows, setRows] = useState([]);

  const getInitialData = async () => {
    const data = await getData();
    setRows(data);
    setLoadingData(false);
  };

  useEffect( () => {
    setLoadingData(true);
    getInitialData();
  }, []);

  const loadData = async () => {
    const data = await getData();
    setRows([...rows, ...data]);
    setLoadingData(false);
    currentPage.current = currentPage.current+1;
    if (currentPage.current === totalPages)
      loadedLastPage.current = true;
  };

  const onScroll = () => {
    if (loadingData || loadedLastPage.current)
      return;
    const rowsElement = rowsRef.current;
    if (rowsElement.scrollHeight - rowsElement.offsetHeight - rowsElement.scrollTop < 40) {
      setLoadingData(true);
      loadData();
    }
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
    {rows.map((row, index) =>
      <RowLayout 
        onDropdownClose={onDropdownClose}
        onDropdownOpen={onDropdownOpen} 
        index={index} height="50px" 
        key={index} 
        isLast={index === rows.length - 1} {...row} />)}
    {loadingData && <div className="my-3">
      <Spinner />
    </div>}
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


const Row = (props) => {
  const [isTicketDetailOpen, setIsTicketDetailOpen] = useState();

  const showTicketDetail = () => {
    setIsTicketDetailOpen(true);
    console.log(` colo clicked row ${props.line}`);
  };

  return (<div>
    {/* <TicketPanel isOpen={isTicketDetailOpen} setIsOpen={setIsTicketDetailOpen} >
      <div className="d-flex align-items-center justify-content-center mt-5">{props.line}</div>
    </TicketPanel> */}
    <TableRow onClick={showTicketDetail} isLast={props.isLast} className="d-flex">
      <TableSection height={props.height} width={tableColumnWidths[0].sectionWidth}>
        <TableColumn width={tableColumnWidths[0].subSectionWidths[0]}> {props.line} </TableColumn>
        <TableColumn width={tableColumnWidths[0].subSectionWidths[1]}> {props.item} </TableColumn>
        <TableColumn width={tableColumnWidths[0].subSectionWidths[2]}>
          <RowDescription title={props.description}> {props.description} </RowDescription>
        </TableColumn>
        <TableColumn align="right" width={tableColumnWidths[0].subSectionWidths[3]}> {numberWithCommas(props.bidQuantity)} </TableColumn>
        <TableColumn align="right" width={tableColumnWidths[0].subSectionWidths[4]}> {props.unit} </TableColumn>
      </TableSection>
      <TableSection height={props.height} width={tableColumnWidths[1].sectionWidth}>
        <TableColumn align="right" width={tableColumnWidths[1].subSectionWidths[0]}>
          {numberWithCommas(props.previousPeriod)} <i className="fa fa-bookmark ml-2"></i>
        </TableColumn>
        <TableColumn align="right" width={tableColumnWidths[1].subSectionWidths[1]}>
          {numberWithCommas(props.thisPeriod)} <i className="fa fa-bookmark ml-2"></i>
        </TableColumn>
      </TableSection>
      <TableSection height={props.height} borderless width={tableColumnWidths[2].subSectionWidths[0]}>
        <TableColumn align="right" width={tableColumnWidths[2].subSectionWidths[0]}>
          {numberWithCommas(props.totalCompletedStoredToDate)} <i className="fa fa-bookmark ml-2"></i>
        </TableColumn>
        <TableColumn align="right" width={tableColumnWidths[2].subSectionWidths[1]}> {props.percentComplete}%</TableColumn>
        <TableColumn align="right" width={tableColumnWidths[2].subSectionWidths[2]}> {numberWithCommas(props.balanceToFinish)}  </TableColumn>
      </TableSection>
    </TableRow>
  </div>);
};


const ReconciliationTable = () => {
  const getData = async () => {
    // simulate network
    await sleep(1000);
    return mockData;
  };

  return (<Container>
    <Headers>
      <TicketPanel isOpen={true} >
        
      </TicketPanel>
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
          <div className="text-center" style={{width:"90px"}}> Total Completed Stored to Date </div> 
        </TableColumnHeader>
        <TableColumnHeader align="right" width={tableColumnWidths[2].subSectionWidths[1]}> % Complete </TableColumnHeader>
        <TableColumnHeader align="right" width={tableColumnWidths[2].subSectionWidths[2]}> 
          <div style={{width:"60px"}}> Balance to Finish </div> 
        </TableColumnHeader>
      </TableSection>
    </Headers>
    <Rows getData={getData} totalPages={3} RowLayout={Row}/>
  </Container>);
}; 

export default ReconciliationTable; 