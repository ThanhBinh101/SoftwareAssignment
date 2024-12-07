import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeletePrinter from "../../../PopUp/DeletePrinter"

const List = ({ onSelectedPrinter }) => {
  const [selectedOfficer, setSelectedOfficer] = useState("2345678");
  const [selectedPrinter, setSelectedPrinter] = useState(null);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [printerToDelete, setPrinterToDelete] = useState("");
  const [officerData, setOfficerData] = useState([]);
  const [printerData, setPrinterData] = useState([]);

  // Fetch officer data
  useEffect(() => {
    const fetchOfficerData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/Officer");
        setOfficerData(response.data);
      } catch (err) {
        console.error("Error fetching officer data:", err);
      }
    };
    fetchOfficerData();
  }, []);

  // Fetch printer data for the selected officer
  useEffect(() => {
    const fetchPrinterData = async () => {
      if (selectedOfficer) {
        try {
          const allPrinters = (await axios.get("http://localhost:3000/Printer")).data;
          if(selectedOfficer.printers) {
              const filteredPrinters = allPrinters.filter((printer) =>
              selectedOfficer.printers.includes(printer.id)
            );
            setPrinterData(filteredPrinters);
          }

        } catch (err) {
          console.error("Error fetching printer data:", err);
        }
      } else {
        setPrinterData([]);
      }
    };
    fetchPrinterData();
  }, [selectedOfficer]);

  // Select an officer
  const handleSelectOfficer = (officer) => {
    setSelectedOfficer(officer);
    setSelectedPrinter(null); // Reset selected printer
  };

  // Select a printer
  const handleSelectPrinter = (printer) => {
    setSelectedPrinter((prevSelected) => (prevSelected === printer ? null : printer));
    onSelectedPrinter(printer);
  };

  // Delete a printer
  const handleDeleteClick = (printer) => {
    setPrinterToDelete(printer);
    setDeleteModalShow(true);
  };

  const handleDeleteConfirm = () => {
    console.log(`Deleted printer: ${printerToDelete.id}`);
    setDeleteModalShow(false);
    // Additional logic to delete the printer can go here
  };

  const handleDeleteCancel = () => {
    setDeleteModalShow(false);
  };

  return (
    <div className="flex space-x-4">
      {/* Officer List */}
      <div className="space-y-[5px] max-h-[500px] overflow-y-auto w-[170px]">
        {officerData.map((officer, index) => (
          <div key={index}>
            <div
              className={`flex items-center space-x-2 cursor-pointer w-[170px] text-[18px] h-[60px] rounded-tl-[8px] rounded-bl-[8px] rounded-tr-[30px] rounded-br-[30px] ${
                selectedOfficer === officer ? "bg-[#F7BCD633] text-[#A68BC1] font-bold" : "text-black font-bold hover:bg-[#A68BC133] hover:text-black"
              }`}
              onClick={() => handleSelectOfficer(officer)}
            >
              <span className="ml-[10px]">{officer.id}</span>
            </div>
            {index < officerData.length - 1 && (
              <hr className="border-t border-[#F7BCD6] mt-[5px] w-[147px]" />
            )}
          </div>
        ))}
      </div>

      {/* Printer List */}
      <div className="space-y-[5px] max-h-[500px] overflow-y-auto w-[170px]">
        {selectedOfficer && (
          <>
            {printerData.map((printer, printerIndex) => (
              <div key={printerIndex}>
                <div
                  className={`flex items-center space-x-2 cursor-pointer w-full text-[18px] h-[60px] rounded-tl-[8px] rounded-bl-[8px] rounded-tr-[30px] rounded-br-[30px] ${
                    selectedPrinter === printer ? "bg-[#F7BCD633] text-[#A68BC1] font-bold" : "text-black font-bold hover:bg-[#A68BC133] hover:text-black"
                  }`}
                  onClick={() => handleSelectPrinter(printer)}
                >
                  <span className="ml-[10px]">{printer.name || printer.id}</span>
                  <img
                    src={
                      selectedPrinter === printer
                        ? "/Close_round_fill_selected.svg"
                        : "/Close_round_fill.svg"
                    }
                    alt="Close"
                    style={{
                      width: "24px",
                      height: "24px",
                      marginLeft: "auto",
                      marginRight: "30px",
                    }}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the printer selection
                      handleDeleteClick(printer); // Show delete modal
                    }}
                  />
                </div>
                {printerIndex < printerData.length - 1 && (
                  <hr className="border-t border-[#F7BCD6] mt-[5px] w-[147px]" />
                )}
              </div>
            ))}
          </>
        )}
      </div>

      {/* Delete Printer Modal */}
      {deleteModalShow && (
        <DeletePrinter
          show={deleteModalShow}
          onClose={handleDeleteCancel}
          printerCode={printerToDelete.id} // Pass the printer code to be displayed
        />
      )}
    </div>
  );
};

export default List;
