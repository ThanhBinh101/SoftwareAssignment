import React, { useState } from 'react';
import DeletePrinter from "../../../PopUp/DeletePrinter"

const List = () => {
  const names = [
    "2345678", "2345679", "2345680", "2345681", "2345682",
    "2345683", "2345684", "2345685", "2345686", "2345687",
    "2345688", "2345689", "2345690", "2345691", "2345692",
    "2345693", "2345694"
  ];

  const printerData = {
    "2345678": ["Printer A1", "Printer A2", "Printer A3", "Printer A4", "Printer A5", "Printer A6", "Printer A7", "Printer A8", "Printer A9", "Printer A10"],
    "2345679": ["Printer B1", "Printer B2", "Printer B3", "Printer B4", "Printer B5", "Printer B6", "Printer B7", "Printer B8", "Printer B9", "Printer B10"],
    "2345680": ["Printer C1", "Printer C2", "Printer C3", "Printer C4", "Printer C5", "Printer C6", "Printer C7", "Printer C8", "Printer C9", "Printer C10"],
    "2345681": ["Printer D1", "Printer D2", "Printer D3", "Printer D4", "Printer D5", "Printer D6", "Printer D7", "Printer D8", "Printer D9", "Printer D10"],
    "2345682": ["Printer E1", "Printer E2", "Printer E3", "Printer E4", "Printer E5", "Printer E6", "Printer E7", "Printer E8", "Printer E9", "Printer E10"],
    "2345683": ["Printer F1", "Printer F2", "Printer F3", "Printer F4", "Printer F5", "Printer F6", "Printer F7", "Printer F8", "Printer F9", "Printer F10"],
    "2345684": ["Printer G1", "Printer G2", "Printer G3", "Printer G4", "Printer G5", "Printer G6", "Printer G7", "Printer G8", "Printer G9", "Printer G10"],
    "2345685": ["Printer H1", "Printer H2", "Printer H3", "Printer H4", "Printer H5", "Printer H6", "Printer H7", "Printer H8", "Printer H9", "Printer H10"],
    "2345686": ["Printer I1", "Printer I2", "Printer I3", "Printer I4", "Printer I5", "Printer I6", "Printer I7", "Printer I8", "Printer I9", "Printer I10"],
    "2345687": ["Printer J1", "Printer J2", "Printer J3", "Printer J4", "Printer J5", "Printer J6", "Printer J7", "Printer J8", "Printer J9", "Printer J10"],
    "2345688": ["Printer K1", "Printer K2", "Printer K3", "Printer K4", "Printer K5", "Printer K6", "Printer K7", "Printer K8", "Printer K9", "Printer K10"],
    "2345689": ["Printer L1", "Printer L2", "Printer L3", "Printer L4", "Printer L5", "Printer L6", "Printer L7", "Printer L8", "Printer L9", "Printer L10"],
    "2345690": ["Printer M1", "Printer M2", "Printer M3", "Printer M4", "Printer M5", "Printer M6", "Printer M7", "Printer M8", "Printer M9", "Printer M10"],
    "2345691": ["Printer N1", "Printer N2", "Printer N3", "Printer N4", "Printer N5", "Printer N6", "Printer N7", "Printer N8", "Printer N9", "Printer N10"],
    "2345692": ["Printer O1", "Printer O2", "Printer O3", "Printer O4", "Printer O5", "Printer O6", "Printer O7", "Printer O8", "Printer O9", "Printer O10"],
    "2345693": ["Printer P1", "Printer P2", "Printer P3", "Printer P4", "Printer P5", "Printer P6", "Printer P7", "Printer P8", "Printer P9", "Printer P10"],
    "2345694": ["Printer Q1", "Printer Q2", "Printer Q3", "Printer Q4", "Printer Q5", "Printer Q6", "Printer Q7", "Printer Q8", "Printer Q9", "Printer Q10"]
  };

  const [selectedName, setSelectedName] = useState("2345678");
  const [selectedPrinter, setSelectedPrinter] = useState("Printer A1");
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [printerToDelete, setPrinterToDelete] = useState("");

  const handleSelect = (name) => {
    setSelectedName((prevSelected) => (prevSelected === name ? null : name));
    setSelectedPrinter(null);
  };

  const handleSelectPrinter = (printer) => {
    setSelectedPrinter((prevSelected) => (prevSelected === printer ? null : printer));
  };

  const handleDeleteClick = (printer) => {
    setPrinterToDelete(printer);
    setDeleteModalShow(true);
  };

  const handleDeleteConfirm = () => {
    console.log(`Deleted printer: ${printerToDelete}`);
    setDeleteModalShow(false);
    // Additional logic to handle printer deletion can be added here
  };

  const handleDeleteCancel = () => {
    setDeleteModalShow(false);
  };

  return (
    <div className="flex space-x-4">
      <div className="space-y-[5px] max-h-[500px] overflow-y-auto w-[170px]">
        {names.map((name, index) => (
          <div key={index}>
            <div
              className={`flex items-center space-x-2 cursor-pointer w-[170px] text-[18px] h-[60px] rounded-tl-[8px] rounded-bl-[8px] rounded-tr-[30px] rounded-br-[30px] ${
                selectedName === name ? 'bg-[#F7BCD633] text-[#A68BC1] font-bold' : 'text-black font-bold hover:bg-[#A68BC133] hover:text-black'
              }`}
              onClick={() => handleSelect(name)}
            >
              <span className="ml-[10px]">{name}</span>
            </div>
            {index < names.length - 1 && (
              <hr className="border-t border-[#F7BCD6] mt-[5px] w-[147px]" />
            )}
          </div>
        ))}
      </div>

      <div className="space-y-[5px] max-h-[500px] overflow-y-auto w-[170px]">
        {selectedName && (
          <>
            {printerData[selectedName].map((printer, printerIndex) => (
              <div key={printerIndex}>
                <div
                  className={`flex items-center space-x-2 cursor-pointer w-full text-[18px] h-[60px] rounded-tl-[8px] rounded-bl-[8px] rounded-tr-[30px] rounded-br-[30px] ${
                    selectedPrinter === printer ? 'bg-[#F7BCD633] text-[#A68BC1] font-bold' : 'text-black font-bold hover:bg-[#A68BC133] hover:text-black'
                  }`}
                  onClick={() => handleSelectPrinter(printer)}
                >
                  <span className="ml-[10px]">{printer}</span>
                  <img
                    src={selectedPrinter === printer ? "/Close_round_fill_selected.svg" : "/Close_round_fill.svg"}
                    alt="Close"
                    style={{
                      width: '24px',
                      height: '24px',
                      marginLeft: 'auto',
                      marginRight: '30px',
                    }}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the printer selection
                      handleDeleteClick(printer); // Show delete modal
                    }}
                  />
                </div>
                {printerIndex < printerData[selectedName].length - 1 && (
                  <hr className="border-t border-[#F7BCD6] mt-[5px] w-[147px]" />
                )}
              </div>
            ))}
          </>
        )}
      </div>

      {/* DeletePrinter Modal */}
      {deleteModalShow && (
        <DeletePrinter
          show={deleteModalShow}
          onClose={handleDeleteCancel}
          printerCode={printerToDelete} // Pass the printer code to be displayed
        />
      )}
    </div>
  );
};

export default List;