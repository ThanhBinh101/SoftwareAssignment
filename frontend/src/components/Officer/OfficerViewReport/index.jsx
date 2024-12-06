import React, { useState, useEffect } from "react";
import ExportButton from "./ExportButton";
import PrinterRefillPaperButton from './PrinterRefillPaperButton';
import PrinterMaintainButton from "./PrinterMaintainButton";
import TurnOffPrinterButton from "./TurnOffPrinter";
import PrinterList from "./PrinterList";
import Table from "../Table";
import PrinterExport from "../../PopUp/PrinterReportExport"; 
import MaintainPrinter from "../../PopUp/MaintainPrinter";
import { use } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewReport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [studentID, setStudentID] = useState("");
  const [exportModalShow, setExportModalShow] = useState(false);
  const [maintainModalShow, setMaintainModalShow] = useState(false);
  const [selectedPrinter, setSelectedPrinter] = useState(null);
  const [matchingDocs, setMatchingDocs] = useState([]);
  const [maintainHis, setMaintainHis] = useState([])
  const [refillHis, setRefillHis] = useState([]);

  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);
  const handleStudentIDChange = (e) => setStudentID(e.target.value);
  const handleSearch = () => console.log("Searching for:", studentID);
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleExportClick = () => setExportModalShow(true);
  const handleExportClose = () => setExportModalShow(false);

  const handleMaintainClick = () => {
    console.log("Maintain button clicked"); 
    setMaintainModalShow(true);
  };

  const handleMaintainClose = () => {
    console.log("Closing maintain modal");
    setMaintainModalShow(false);
  };

  const handleTurnOffPrinter = () => {
    if (selectedPrinter) {
      setPrinterStatuses((prevStatuses) => ({
        ...prevStatuses,
        [selectedPrinter]: "Off",
      }));
    }
  };

  
  useEffect(() => {
    const fetchPrinterHistory = async () => {
      if (selectedPrinter) {
        try {
          const history = selectedPrinter.history || [];  // Store the fetched history data
  
          const allDocs = (await axios.get(`http://localhost:3000/Document`)).data;
  
          // Assuming history contains document IDs that can be matched with the documents
          const matchings = allDocs.filter((doc) => 
            history.some((item) => item === doc.id)  // Compare item.documentID with doc.id
          );
          setMatchingDocs(matchings);  // Set the filtered documents
          setMaintainHis(selectedPrinter.maintains);
          setRefillHis(selectedPrinter.refillPaper);
        } catch (err) {
          console.error("Error fetching printer history:", err);
        }
      }
    };
  
    fetchPrinterHistory();
  }, [selectedPrinter]);
  

  return (
    <div>
      <div className="flex items-center justify-center mt-[30px]">
        <span className="font-Ubuntu font-medium text-[36px]">Report</span>
      </div>

      <div className="flex justify-center mt-[30px]">
        <div className="mt-[10px] mr-[10px]">
          <span className="font-Ubuntu text-[18px]">Search</span>
        </div>
        <div className="relative w-[431px]">
          <input
            type="text"
            placeholder=""
            className="border border-[#A68BC1] rounded-[16px] p-2 w-full h-[48px]"
            value={studentID}
            onChange={handleStudentIDChange}
            onKeyDown={handleKeyDown}
          />
          <img
            src="/Search_alt_fill.svg"
            alt="Search icon"
            className="absolute right-[10px] top-1/2 transform -translate-y-[14px] w-6 h-6 cursor-pointer"
            onClick={handleSearch}
          />
        </div>
        <div className="ml-[30px] mt-[10px] mr-[10px]">
          <span className="font-Ubuntu text-[18px]">From</span>
        </div>
        <input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          className="border bg-[#A68BC133] border-[#A68BC1] rounded-[16px] p-2 w-[180px] h-[48px]"
        />
        <div className="ml-[30px] mt-[10px] mr-[10px]">
          <span className="font-Ubuntu text-[18px]">To</span>
        </div>
        <input
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          className="border bg-[#A68BC133] border-[#A68BC1] rounded-[16px] p-2 w-[180px] h-[48px]"
        />
        <div className="ml-[50px]">
          <ExportButton onClick={handleExportClick} />
        </div>

        <PrinterExport show={exportModalShow} onClose={handleExportClose} />
      </div>

      <div className="flex ml-[30px] mt-[30px] w-full h-full"> 
        <div className="mt-[20px]">
          <span className="text-[18px] font-inter font-semibold">Printer List</span>
          <div className="mt-[30px] w-[170px] h-[500px]">
            <PrinterList onSelectPrinter={setSelectedPrinter} />
          </div>
        </div>
        
        <div className="ml-[50px] mt-[30px] mr-[30px]"> 
          <div className="w-[381px] h-[669px] bg-[#FFEEE8] mt-[20px] rounded-[30px] flex justify-center border-2 border-[#A68BC1]">
            <div className="mt-[50px]"> 
              <div className="text-2xl font-bold mb-[20px]">
                <span className="underline">Location:</span>
                <span> </span>
                <span className="text-[#A68BC1]">{selectedPrinter ? selectedPrinter.id : "No printer"}</span>
              </div>
              <div className="text-2xl font-bold mb-[20px]">
                <span className="underline">Next maintain day:</span> 
                <span> </span>
                <span className="text-[#A68BC1]">Jan 10th</span>
              </div>
              <div className="text-2xl font-bold mb-[20px]">
                <span className="underline">Available paper:</span> 
                <span> </span>
                <span className="text-[#A68BC1]"> {selectedPrinter ? selectedPrinter.paper : ""}</span>
              </div>
              <div className="text-2xl font-bold mb-[20px]">
                <span className="underline">Status:</span> 
                <span> </span>
                <span className="text-[#A68BC1]">
                {selectedPrinter ? selectedPrinter.status : ""}
                </span>
              </div>
              <div className="mt-[150px] mb-[50px]">
                <div className="flex flex-col items-center w-full"> 
                  <div className="bg-[#97D99D] text-xl rounded-[25px] mt-[25px] w-[245px] flex items-center justify-center h-[52px]"> 
                    <PrinterRefillPaperButton />
                  </div>
                  <div className="bg-[#FEC8D8] text-xl rounded-[25px] mt-[25px] w-[245px] flex items-center justify-center h-[52px]"> 
                    <PrinterMaintainButton onClick={handleMaintainClick} />
                  </div>
                  <MaintainPrinter 
                    show={maintainModalShow}
                    onClose={handleMaintainClose} 
                    printerCode={selectedPrinter} 
                    time="10:00 AM ngày 2/11/2024"       
                  />
                  <div className="bg-[#A68BC1] text-xl rounded-[25px] mt-[25px] w-[245px] flex items-center justify-center h-[52px]"> 
                    <TurnOffPrinterButton onClick={handleTurnOffPrinter}/> 
                  </div>

                  
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[700px]"> 
          <Table  
            title={<span className="text-lg font-semibold">{`Printer History`}</span>} 
            tableCol={["Date", "Finish Day", "File", "Student", "Number of Paper"]} 
            tableRow={matchingDocs.map((item) => [
              item.printDate,
              item.finishDate,
              item.name,
              item.studentID,
              item.paper
            ])}
            bgColor={'#F7BCD633'}
            titleColor={'black'}
            rowTextColor={'#A68BC1'}
            maxHeight="586px"
          /> 
        </div>
        
        <div className="ml-[20px] h-full"> 
          <div className="w-[380px] h-[278px]">
            <Table
              title={<span className="text-lg font-semibold">{`Maintain History`}</span>} 
              tableCol={["Day", "Status"]} 
              tableRow={maintainHis.map((item)=>[
                item.date,
                item.status
              ])}
              bgColor={'white'} 
              titleColor={'black'}
              rowTextColor={'#A68BC1'}
              maxHeight="228px"
            />
          </div>
          <div className="mt-[80px] mb-[100px] w-[380px] h-[278px]">
            <Table
              title={<span className="text-lg font-semibold">{`Refill History`}</span>} 
              tableCol={["Day", "Number"]} 
              tableRow={refillHis.map((item)=>[
                item.date,
                item.amount
              ])}
              bgColor="#FFEEE8"
              titleColor={'black'}
              rowTextColor={'#A68BC1'}
              maxHeight={"228px"}
            />
          </div>
        </div>
      </div>

      {exportModalShow && ( 
        <PrinterExport onClose={handleExportClose} />
      )}
    </div>
  );
};

export default ViewReport;
