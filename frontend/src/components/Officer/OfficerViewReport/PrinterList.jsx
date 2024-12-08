/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

const PrinterList = ({
  officer,
  setOfficer,
  printerList,
  setPrinterList,
  selectedPrinter,
  setSelectedPrinter,
  setStartDate,
  setEndDate
}) => {
  // const [selectedPrinter, setSelectedPrinter] = useState([]);
  const [printerData, setPrinterData] = useState([]);

  // const { id } = useParams();

  useEffect(() => {
    if (officer) {
      const matchingPrinters = printerList.filter((printer) =>
        officer.printers.includes(printer.id),
      );

      setPrinterData(matchingPrinters);
    }

    // const fetchData = async () => {
    //   try {
    //     // Step 1: Fetch officer data
    //     const officerResponse = await axios.get(
    //       `http://localhost:3000/Officer/${id}`,
    //     );
    //     const officer = officerResponse.data;

    //     if (!officer) {
    //       throw new Error("No officer data found.");
    //     }

    //     // Step 2: Fetch all printers
    //     const printersResponse = await axios.get(
    //       `http://localhost:3000/Printer/`,
    //     );
    //     const allPrinters = printersResponse.data;

    //     // Step 3: Filter printers based on officer's printersID
    //     const matchingPrinters = allPrinters.filter((printer) =>
    //       officer.printers.includes(printer.id),
    //     );

    //     setPrinterData(matchingPrinters);
    //   } catch (err) {
    //     console.error("Error fetching data:", err);
    //   }
    // };
    // fetchData();
  }, [officer, printerList]); // Use the dependency array to fetch data when the ID changes

  const handleSelect = (printer) => {
    console.log(printer);
    setSelectedPrinter(printer); // Store only the ID
    setStartDate("");
    setEndDate("");
    // onSelectPrinter(printerId); // Pass only the ID to the parent component
  };

  return (
    <div>
      <div className="max-h-[500px] space-y-[5px] overflow-y-auto">
        {printerData.map((printer, index) => (
          <div key={index}>
            <div
              className={`flex h-[60px] w-[170px] cursor-pointer items-center space-x-2 rounded-bl-[8px] rounded-br-[30px] rounded-tl-[8px] rounded-tr-[30px] text-[18px] ${
                selectedPrinter?.id === printer.id
                  ? "bg-[#F7BCD633] font-bold text-[#A68BC1]"
                  : "font-bold text-black hover:bg-[#A68BC133] hover:text-black"
              }`}
              onClick={() => handleSelect(printer)} // Pass only the ID
            >
              <span className="ml-[10px]">{printer.id}</span>
            </div>
            {index < printerData.length - 1 && (
              <hr className="mt-[5px] w-[147px] border-t border-[#F7BCD6]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrinterList;