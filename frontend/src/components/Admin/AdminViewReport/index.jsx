import React, { useState } from "react";
import ExportButton from "../../Officer/OfficerViewReport/ExportButton"; 
import OfficerButton from "../AdminViewReport/ChooseOfficerButton";
import StudentButton from "../AdminViewReport/ChooseStudentButton";
import ViewStudentReport from "../AdminViewReport/StudentReport"; 
import ViewOfficerReport from "../AdminViewReport/OfficerReport"; 
import StudentExport from "../../PopUp/StudentReportExport";
import PrinterExport from "../../PopUp/PrinterReportExport";
import { useNavigate} from "react-router-dom";

const ViewReport = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [studentID, setStudentID] = useState("");
  const [exportModalShow, setExportModalShow] = useState(false);
  
  const handleButtonClick = (buttonType) => {
    setSelectedButton(buttonType); 
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleStudentIDChange = (e) => {
    setStudentID(e.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for:", studentID, "From:", startDate, "To:", endDate);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col"> 
      <div className="flex items-center justify-center mt-[30px]">
        <span className="font-Ubuntu font-medium text-[36px]">Report</span>
      </div>

      <div className="flex justify-center mt-[30px]">
        <div className="ml-[10px]">
          <StudentButton
            isSelected={selectedButton === "student"}
            onClick={() => handleButtonClick("student")}
          />
        </div>
        <div className="ml-[40px] mr-[100px]">
          <OfficerButton
            isSelected={selectedButton === "officer"}
            onClick={() => handleButtonClick("officer")}
          />
        </div>
        <div className="mt-[10px] mr-[10px]">
          <span className="font-Ubuntu text-[18px]">Search</span>
        </div>
        <div className="relative w-[431px]">
          <input
            type="text"
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
        <div className="ml-[30px] mt-[10px]">
          <span className="font-Ubuntu text-[18px]">From</span>
        </div>
        <input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          className="border bg-[#A68BC133] border-[#A68BC1] rounded-[16px] p-2 w-[180px] h-[48px] ml-[10px]"
        />
        <div className="ml-[30px] mt-[10px]">
          <span className="font-Ubuntu text-[18px]">To</span>
        </div>
        <input
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          className="border bg-[#A68BC133] border-[#A68BC1] rounded-[16px] p-2 w-[180px] h-[48px] ml-[10px]"
        />
        <div className="ml-[50px]">
          <ExportButton onClick={() => setExportModalShow(true)} />
        </div>
      </div>

      {selectedButton === "student" && (
        <StudentExport show={exportModalShow} onClose={() => setExportModalShow(false)} />
      )}
      {selectedButton === "officer" && (
        <PrinterExport show={exportModalShow} onClose={() => setExportModalShow(false)} />
      )}

      <div className="mt-[30px] flex-grow"> 
        {selectedButton === "student" && <ViewStudentReport />}
        {selectedButton === "officer" && <ViewOfficerReport />}
      </div>

    </div>
  );
};

export default ViewReport;
