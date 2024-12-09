/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Table from "../../../Officer/Table";
import List from "./OfficerList";
import axios from "axios";

const OfficerReport = ({
  officerList,
  setOfficerList,
  printerList,
  setPrinterList,
  documentList,
  setDocumentList,
  selectedOfficer,
  setSelectedOfficer,
  selectedPrinter,
  setSelectedPrinter,
}) => {
  const [matchingDocs, setMatchingDocs] = useState([]);
  const [maintainHis, setMaintainHis] = useState([]);
  const [refillHis, setRefillHis] = useState([]);

  useEffect(() => {
    if (selectedPrinter) {
      const history = selectedPrinter.history || [];
      const matchings = documentList.filter((doc) =>
        history.some((item) => item === doc.id),
      );
      setMatchingDocs(matchings);
      setMaintainHis(selectedPrinter.maintains);
      setRefillHis(selectedPrinter.refillPaper);
    }
  }, [selectedPrinter, documentList]);

  return (
    <div className="  ">
      <div className="mt-[30px] flex h-full w-full  items-start px-10 gap-[20px]">
        <div className="mt-[20px] flex-[1]">
          <span className="font-inter text-[18px] font-semibold">
            {" "}
            Employee List
          </span>

          <span className="font-inter ml-[66px] text-[18px] font-semibold">
            Printer List
          </span>

          <div className="mt-[15px] h-[500px] w-[400px]">
            <List
              officerList={officerList}
              setOfficerList={setOfficerList}
              printerList={printerList}
              setPrinterList={setPrinterList}
              selectedOfficer={selectedOfficer}
              setSelectedOfficer={setSelectedOfficer}
              selectedPrinter={selectedPrinter}
              setSelectedPrinter={setSelectedPrinter}
            />
          </div>
        </div>
        <div className="flex-[7 ]">
          <Table
            title={
              <span className="text-lg font-semibold">{`Printer History`}</span>
            }
            tableCol={[
              "Date",
              "Finish Day",
              "File",
              "Printer",
              "Number of Paper",
            ]}
            tableRow={matchingDocs.map((item) => [
              item.printDate,
              item.finishDate,
              item.name,
              item.studentID,
              item.paper,
            ])}
            bgColor={"#F7BCD633"}
            titleColor={"black"}
            rowTextColor={"#A68BC1"}
            maxHeight="686px"
          />
        </div>
        <div className="flex-[4] h-full">
          <div className="h-[280px] w-full">
            <Table
              className="p-3"
              title={
                <span className="text-lg font-semibold">{`Maintain History`}</span>
              }
              tableCol={["Day", "Status"]}
              colWidths={["250px", "250px"]}
              tableRow={maintainHis.map((item) => [item.date, item.status])}
              bgColor={"white"}
              titleColor={"black"}
              rowTextColor={"#A68BC1"}
              maxHeight="278px"
            />
          </div>
          <div className="mb-[100px] mt-[150px] h-[280px] w-full">
            <Table
              className="p-3"
              title={
                <span className="text-lg font-semibold">{`Refill History`}</span>
              }
              tableCol={["Day", "Number of paper"]}
              colWidths={["250px", "250px"]}
              tableRow={refillHis.map((item) => [item.date, item.amount])}
              bgColor="#FFEEE8"
              titleColor={"black"}
              rowTextColor={"#A68BC1"}
              maxHeight={"278px"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficerReport;
