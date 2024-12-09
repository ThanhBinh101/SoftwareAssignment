import { useEffect, useState } from "react";
// import ExportButton from "../../Officer/OfficerViewReport/ExportButton";
import OfficerButton from "../AdminViewReport/ChooseOfficerButton";
import StudentButton from "../AdminViewReport/ChooseStudentButton";
import ViewStudentReport from "../AdminViewReport/StudentReport";
import ViewOfficerReport from "../AdminViewReport/OfficerReport";
// import StudentExport from "../../PopUp/StudentReportExport";
// import PrinterExport from "../../PopUp/PrinterReportExport";
import axios from "axios";

const ViewReport = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchBar, setSearchBar] = useState("");
  const [studentList, setStudentList] = useState([]); //Danh sách sinh viên
  const [officerList, setOfficerList] = useState([]); //Danh sách nhân viên
  const [printerList, setPrinterList] = useState([]); //Danh sách máy in
  const [documentList, setDocumentList] = useState([]); //Danh sách tài liệu in
  const [filteredStudentList, setFilteredStudentList] = useState([]);
  const [filteredPrinterList, setFilteredPrinterList] = useState([]);
  const [filteredDocumentList, setFilteredDocumentList] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null); //Sinh viên được chọn
  const [selectedOfficer, setSelectedOfficer] = useState(null); //Nhân viên được chọn
  const [selectedPrinter, setSelectedPrinter] = useState(null); //Máy in được chọn

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/Student");
        setStudentList(response.data);
        setFilteredStudentList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudentData();
  }, []);

  useEffect(() => {
    const fetchOfficerData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/Officer");
        setOfficerList(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfficerData();
  }, []);

  useEffect(() => {
    const fetchPrinterData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/Printer");
        setPrinterList(response.data);
        setFilteredPrinterList(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPrinterData();
  }, []);

  useEffect(() => {
    const fetchDocumentData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/Document");
        setDocumentList(response.data);
        setFilteredDocumentList(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDocumentData();
  }, []);

  const handleButtonClick = (buttonType) => {
    setSelectedButton(buttonType);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleKeyDown = (e) => {
    setSearchBar(e.target.value);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const searchValue = searchBar;
    const startDateValue = startDate;
    const endDateValue = endDate;

    console.log({ searchValue, startDateValue, endDateValue });

    if (startDateValue && endDateValue) {
      const start = new Date(startDateValue);
      const end = new Date(endDateValue);

      const filterDateDocumentList = documentList.filter((item) => {
        const printDate = new Date(item.printDate);
        return printDate >= start && printDate <= end;
      });

      const tempStudentList = JSON.parse(JSON.stringify(studentList));
      for (const student of tempStudentList) {
        student.purchases = student.purchases.filter((item) => {
          const purchaseDate = new Date(item.date);
          return purchaseDate >= start && purchaseDate <= end;
        });
      }

      const tempPrinterList = JSON.parse(JSON.stringify(printerList));
      for (const printer of tempPrinterList) {
        printer.maintains = printer.maintains.filter((item) => {
          const maintainDate = new Date(item.date);
          return maintainDate >= start && maintainDate <= end;
        });

        printer.refillPaper = printer.refillPaper.filter((item) => {
          const refillDate = new Date(item.date);
          return refillDate >= start && refillDate <= end;
        });
      }

      if (selectedPrinter) {
        const tempSelectedPrinter = tempPrinterList.find(
          (item) => item.id === selectedPrinter.id,
        );
        setSelectedPrinter(tempSelectedPrinter);
      }

      if (selectedStudent) {
        const tempSelectedStudent = tempStudentList.find(
          (item) => item.id === selectedStudent.id,
        );
        setSelectedStudent(tempSelectedStudent);
      }

      setFilteredStudentList(tempStudentList);
      setFilteredDocumentList(filterDateDocumentList);
      setFilteredPrinterList(tempPrinterList);
    } else {
      if (selectedPrinter) {
        const tempSelectedPrinter = printerList.find(
          (item) => item.id === selectedPrinter.id,
        );
        setSelectedPrinter(tempSelectedPrinter);
      }

      if (selectedStudent) {
        const tempSelectedStudent = studentList.find(
          (item) => item.id === selectedStudent.id,
        );
        setSelectedStudent(tempSelectedStudent);
      }

      setFilteredDocumentList(documentList);
      setFilteredStudentList(studentList);
      setFilteredPrinterList(printerList);
    }

    if (searchValue) {
      const searchValueArray = searchValue.split("_");
      const searchValueID = searchValueArray[0];
      const searchValuePrinterID = searchValueArray[1];
      const findSelectedStudent = filteredStudentList.find(
        (item) => item.id === searchValueID,
      );
      const findSelectedOfficer = officerList.find(
        (item) => item.id === searchValueID,
      );
      if (findSelectedStudent) {
        setSelectedButton("student");
        setSelectedStudent(findSelectedStudent);
      } else if (findSelectedOfficer) {
        setSelectedButton("officer");
        setSelectedOfficer(findSelectedOfficer);
        const findSelectedPrinter = filteredPrinterList.find(
          (item) => item.id === searchValuePrinterID,
        );
        if (searchValuePrinterID && findSelectedPrinter) {
          setSelectedPrinter(findSelectedPrinter);
        }
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mt-[30px] flex items-center justify-center">
        <span className="font-Ubuntu text-[36px] font-medium">Report</span>
      </div>

      <div className="mt-[30px] flex justify-center">
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
        <form onSubmit={handleSubmitForm} action="" className="flex">
          <div className="mr-[10px] mt-[10px]">
            <span className="font-Ubuntu text-[18px]">Search</span>
          </div>
          <div className="relative w-[431px]">
            <input
              type="text"
              className="h-[48px] w-full rounded-[16px] border border-[#A68BC1] p-2"
              value={searchBar}
              name="search"
              // onChange={handleStudentIDChange}
              onChange={handleKeyDown}
            />
            <img
              src="/Search_alt_fill.svg"
              alt="Search icon"
              className="absolute right-[10px] top-1/2 h-6 w-6 -translate-y-[14px] transform cursor-pointer"
              // onClick={handleSearch}
            />
          </div>
          <div className="ml-[30px] mt-[10px]">
            <span className="font-Ubuntu text-[18px]">From</span>
          </div>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            name="startDate"
            className="ml-[10px] h-[48px] w-[180px] rounded-[16px] border border-[#A68BC1] bg-[#A68BC133] p-2"
          />
          <div className="ml-[30px] mt-[10px]">
            <span className="font-Ubuntu text-[18px]">To</span>
          </div>
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            name="endDate"
            className="ml-[10px] h-[48px] w-[180px] rounded-[16px] border border-[#A68BC1] bg-[#A68BC133] p-2"
          />
          <button
            type="submit"
            className="ml-[20px] h-[48px] w-[180px] rounded-[16px] border border-[#A68BC1] bg-[#A68BC133] text-[18px]"
          >
            Search
          </button>
        </form>
        {/* <div className="ml-[50px]">
          <ExportButton onClick={() => setExportModalShow(true)} />
        </div> */}
      </div>

      {/* {selectedButton === "student" && (
        <StudentExport
          show={exportModalShow}
          onClose={() => setExportModalShow(false)}
        />
      )}
      {selectedButton === "officer" && (
        <PrinterExport
          show={exportModalShow}
          onClose={() => setExportModalShow(false)}
        />
      )} */}

      <div className="mt-[30px] flex-grow">
        {selectedButton === "student" && (
          <ViewStudentReport
            studentList={filteredStudentList}
            setStudentList={setFilteredStudentList}
            documentList={filteredDocumentList}
            setDocumentList={setFilteredDocumentList}
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
          />
        )}
        {selectedButton === "officer" && (
          <ViewOfficerReport
            officerList={officerList}
            setOfficerList={setOfficerList}
            printerList={filteredPrinterList}
            setPrinterList={setFilteredPrinterList}
            documentList={filteredDocumentList}
            setDocumentList={setFilteredDocumentList}
            selectedOfficer={selectedOfficer}
            setSelectedOfficer={setSelectedOfficer}
            selectedPrinter={selectedPrinter}
            setSelectedPrinter={setSelectedPrinter}
          />
        )}
      </div>
    </div>
  );
};

export default ViewReport;
