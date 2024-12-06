import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";

const PrinterList = ({ onSelectPrinter }) => {
  const [selectedPrinter, setSelectedPrinter] = useState([]);
  const [printerData, setPrinterData] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Fetch officer data
        const officerResponse = await axios.get(`http://localhost:3000/Officer/${id}`);
        const officer = officerResponse.data;

        if (!officer) {
          throw new Error("No officer data found.");
        }

        // Step 2: Fetch all printers
        const printersResponse = await axios.get(`http://localhost:3000/Printer/`);
        const allPrinters = printersResponse.data;

        // Step 3: Filter printers based on officer's printersID
        const matchingPrinters = allPrinters.filter((printer) =>
          officer.printers.includes(printer.id)
        );

        setPrinterData(matchingPrinters);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [id]); // Use the dependency array to fetch data when the ID changes

  const handleSelect = (printerId) => {
    setSelectedPrinter(printerId); // Store only the ID
    onSelectPrinter(printerId);     // Pass only the ID to the parent component
  };

  return (
    <div>
      <div className="space-y-[5px] max-h-[500px] overflow-y-auto">
        {printerData.map((printer, index) => (
          <div key={index}>
            <div
              className={`flex items-center space-x-2 cursor-pointer w-[170px] text-[18px] h-[60px] rounded-tl-[8px] rounded-bl-[8px] rounded-tr-[30px] rounded-br-[30px]  ${
                selectedPrinter === printer ? 'bg-[#F7BCD633] text-[#A68BC1] font-bold' : 'text-black font-bold hover:bg-[#A68BC133] hover:text-black'
              }`}
              onClick={() => handleSelect(printer)} // Pass only the ID
            >
              <span className="ml-[10px]">
                {printer.id}
              </span>
            </div>
            {index < printerData.length - 1 && (
              <hr className="border-t border-[#F7BCD6] mt-[5px] w-[147px]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrinterList;
