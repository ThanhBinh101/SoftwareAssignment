import { useState, useEffect } from "react";
import ExportButton from "./ExportButton";
import PrinterRefillPaperButton from "./PrinterRefillPaperButton";
import PrinterMaintainButton from "./PrinterMaintainButton";
import TurnOffPrinterButton from "./TurnOffPrinter";
import PrinterList from "./PrinterList";
import Table from "../Table";
import PrinterExport from "../../PopUp/PrinterReportExport";
import MaintainPrinter from "../../PopUp/MaintainPrinter";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewReport = () => {
  const { id } = useParams();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchBar, setSearchBar] = useState("");
  // const [studentID, setStudentID] = useState("");
  // const [exportModalShow, setExportModalShow] = useState(false);
  const [maintainModalShow, setMaintainModalShow] = useState(false);
  const [selectedPrinter, setSelectedPrinter] = useState(null);
  const [matchingDocs, setMatchingDocs] = useState([]);
  const [maintainHis, setMaintainHis] = useState([]);
  const [refillHis, setRefillHis] = useState([]);
  const [filteredMatchingDocs, setFilteredMatchingDocs] = useState([]);
  const [filteredMaintainHis, setFilteredMaintainHis] = useState([]);
  const [filteredRefillHis, setFilteredRefillHis] = useState([]);
  const [officer, setOfficer] = useState([]);
  const [printerList, setPrinterList] = useState([]);
  const [filteredPrinterList, setFilteredPrinterList] = useState([]);

  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);
  // const handleStudentIDChange = (e) => setStudentID(e.target.value);
  // const handleSearch = () => console.log("Searching for:", studentID);

  const handleSearch = (e) => {
    setSearchBar(e.target.value);
    // if (e.key === "Enter") handleSearch();
  };

  // const handleExportClick = () => setExportModalShow(true);
  // const handleExportClose = () => setExportModalShow(false);

  const handleMaintainClick = () => {
    console.log("Maintain button clicked");
    setMaintainModalShow(true);
  };

  const handleMaintainClose = () => {
    console.log("Closing maintain modal");
    setMaintainModalShow(false);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    // if (!searchBar && !selectedPrinter) {
    //   alert("Bạn chưa chọn máy in");
    // }

    const startDateValue = startDate;
    const endDateValue = endDate;
    const searchValue = searchBar;
    console.log({ startDateValue, endDateValue, searchValue });
    console.log({ maintainHis, refillHis, matchingDocs });
    if (startDate && endDate) {
      const start = new Date(startDateValue);
      const end = new Date(endDateValue);

      const tempPrinterList = JSON.parse(JSON.stringify(printerList));
      for (const printer of tempPrinterList) {
        printer.maintains = printer.maintains.filter((item) => {
          const maintainDate = new Date(item.date);
          return maintainDate >= start && maintainDate <= end;
        })

        printer.refillPaper = printer.refillPaper.filter((item) => {
          const refillDate = new Date(item.date);
          return refillDate >= start && refillDate <= end;
        })
      }
      setFilteredPrinterList(tempPrinterList);

      const tempMaintainHis = maintainHis.filter((item) => {
        const maintainDate = new Date(item.date);
        return maintainDate >= start && maintainDate <= end;
      });
      setFilteredMaintainHis(tempMaintainHis);

      const tempRefillHis = refillHis.filter((item) => {
        const refillDate = new Date(item.date);
        return refillDate >= start && refillDate <= end;
      })
      setFilteredRefillHis(tempRefillHis);

      console.log({matchingDocs});
      const tempMatchingDocs = matchingDocs.filter((item) => {
        const date = new Date(item.printDate);
        return date >= start && date <= end;
      })
      console.log(tempMatchingDocs);
      setFilteredMatchingDocs(tempMatchingDocs);
    }

    if (searchValue) {
      const filteredPrinter = printerList.find(
        (printer) => printer.id === searchValue,
      );
      // console.log({filteredPrinter});
      if (officer.printers.includes(filteredPrinter.id)) {
        setSelectedPrinter(filteredPrinter);
        setStartDate("");
        setEndDate("");
      }
    }
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
    const fetchOfficerData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Officer/${id}`);
        setOfficer(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfficerData();
  }, [id]);

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
    const fetchPrinterHistory = async () => {
      if (selectedPrinter) {
        try {
          const history = selectedPrinter.history || []; // Store the fetched history data

          const allDocs = (await axios.get(`http://localhost:3000/Document`))
            .data;

          // Assuming history contains document IDs that can be matched with the documents
          const matchings = allDocs.filter(
            (doc) => history.some((item) => item === doc.id), // Compare item.documentID with doc.id
          );
          setMatchingDocs(matchings); // Set the filtered documents
          setMaintainHis(selectedPrinter.maintains);
          setRefillHis(selectedPrinter.refillPaper);
          setFilteredMatchingDocs(matchings);
          setFilteredMaintainHis(selectedPrinter.maintains);
          setFilteredRefillHis(selectedPrinter.refillPaper);
        } catch (err) {
          console.error("Error fetching printer history:", err);
        }
      }
    };

    fetchPrinterHistory();
  }, [selectedPrinter]);

  return (
    <div className="overflow-hidden">
      <div className="mt-[30px] flex items-center justify-center">
        <span className="font-Ubuntu text-[36px] font-medium">Report</span>
      </div>

      <div className="mt-[30px] flex justify-center">
        
        <form onSubmit={handleSubmitForm} action="" className="flex">
          <div className="ml-[30px] mr-[10px] mt-[10px]">
            <span className="font-Ubuntu text-[18px]">From</span>
          </div>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="h-[48px] w-[180px] rounded-[16px] border border-[#A68BC1] bg-[#A68BC133] p-2"
          />
          <div className="ml-[30px] mr-[10px] mt-[10px]">
            <span className="font-Ubuntu text-[18px]">To</span>
          </div>
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            className="h-[48px] w-[180px] rounded-[16px] border border-[#A68BC1] bg-[#A68BC133] p-2"
          />
          <button type="submit" className="ml-[20px] h-[48px] w-[180px] rounded-[16px] border border-[#A68BC1] bg-[#A68BC133] text-[18px]">Search</button>
        </form>

        {/* <div className="ml-[50px]">
          <ExportButton onClick={handleExportClick} />
        </div>

        <PrinterExport show={exportModalShow} onClose={handleExportClose} /> */}
      </div>

      <div className="ml-[30px] mt-[30px] flex h-full w-full">
        <div className="mt-[20px]">
          <span className="font-inter text-[18px] font-semibold">
            Printer List
          </span>
          <div className="mt-[30px] h-[500px] w-[170px]">
            <PrinterList
              officer={officer}
              setOfficer={setOfficer}
              printerList={filteredPrinterList}
              setPrinterList={setFilteredPrinterList}
              selectedPrinter={selectedPrinter}
              setSelectedPrinter={setSelectedPrinter}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          </div>
        </div>

        <div className="ml-[50px] mr-[30px] mt-[30px]">
          <div className="mt-[20px] flex h-[669px] w-[360px] justify-center rounded-[30px] border-2 border-[#A68BC1] bg-[#FFEEE8]">
            
            {selectedPrinter ? <div className="mt-[50px]">
              <div className="mb-[20px] text-2xl font-bold">
                <span className="underline">Location:</span>
                <span> </span>
                <span className="text-[#A68BC1]">
                  {selectedPrinter ? selectedPrinter.id : "No printer"}
                </span>
              </div>
              <div className="mb-[20px] text-2xl font-bold">
                <span className="underline">Next maintain day:</span>
                <span> </span>
                <span className="text-[#A68BC1]">{selectedPrinter.nextMaintain}</span>
              </div>
              <div className="mb-[20px] text-2xl font-bold">
                <span className="underline">Available paper:</span>
                <span> </span>
                <span className="text-[#A68BC1]">
                  {" "}
                  {selectedPrinter ? selectedPrinter.paper : ""}
                </span>
              </div>
              <div className="mb-[20px] text-2xl font-bold">
                <span className="underline">Status:</span>
                <span> </span>
                <span className="text-[#A68BC1]">
                  {selectedPrinter ? selectedPrinter.status : ""}
                </span>
              </div>
              <div className="mb-[50px] mt-[150px]">
                <div className="flex w-full flex-col items-center">
                  <div className="mt-[25px] flex h-[52px] w-[245px] items-center justify-center rounded-[25px] bg-[#97D99D] text-xl">
                  <PrinterRefillPaperButton id={selectedPrinter.id}/>
                  </div>
                  <div className="mt-[25px] flex h-[52px] w-[245px] items-center justify-center rounded-[25px] bg-[#FEC8D8] text-xl">
                    <PrinterMaintainButton id={selectedPrinter.id} />
                  </div>
                  <MaintainPrinter
                    show={maintainModalShow}
                    onClose={handleMaintainClose}
                    printerCode={selectedPrinter}
                    time="10:00 AM ngày 2/11/2024"
                  />
                  <div className="mt-[25px] flex h-[52px] w-[245px] items-center justify-center rounded-[25px] bg-[#A68BC1] text-xl">
                    <TurnOffPrinterButton id = {selectedPrinter.id} />
                  </div>
                </div>
              </div>
            </div> : <div>"Select Printer"</div> }
          </div>
        </div>

        <div className="w-[720px]">
          <Table
            title={
              <span className="text-lg font-semibold">{`Printer History`}</span>
            }
            tableCol={[
              "Date",
              "Finish Day",
              "File",
              "Student",
              "Number of Paper",
            ]}
            tableRow={filteredMatchingDocs.map((item) => [
              item.printDate,
              item.finishDate,
              item.name,
              item.studentID,
              item.paper,
            ])}
            bgColor={"#F7BCD633"}
            titleColor={"black"}
            rowTextColor={"#A68BC1"}
            maxHeight="586px"
          />
        </div>

        <div className="ml-[20px] h-full">
          <div className="h-[278px] w-[380px]">
            <Table
              title={
                <span className="text-lg font-semibold">{`Maintain History`}</span>
              }
              tableCol={["Day", "Status"]}
              tableRow={filteredMaintainHis.map((item) => [item.date, item.status])}
              bgColor={"white"}
              titleColor={"black"}
              rowTextColor={"#A68BC1"}
              maxHeight="228px"
            />
          </div>
          <div className="mb-[100px] mt-[80px] h-[278px] w-[380px]">
            <Table
              title={
                <span className="text-lg font-semibold">{`Refill History`}</span>
              }
              tableCol={["Day", "Number"]}
              tableRow={filteredRefillHis.map((item) => [item.date, item.amount])}
              bgColor="#FFEEE8"
              titleColor={"black"}
              rowTextColor={"#A68BC1"}
              maxHeight={"228px"}
            />
          </div>
        </div>
      </div>

      {/* {exportModalShow && ( 
        <PrinterExport onClose={handleExportClose} />
      )} */}
    </div>
  );
};

export default ViewReport;