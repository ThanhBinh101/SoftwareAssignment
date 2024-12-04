import React, { useState } from 'react';

const PrinterList = ({ onSelectPrinter }) => {
  const printerNames = ["306B1.1", "306B1.2", "306B1.3", "306B1.4", "306B1.5", "306B1.6", "306B1.7", "306B1.8", "306B1.9", "306B1.10", "306B1.11"];
  const [selectedPrinter, setSelectedPrinter] = useState(null);

  const handleSelect = (printerName) => {
    setSelectedPrinter(printerName);
    onSelectPrinter(printerName); 
  };

  return (
    <div>
      <div className="space-y-[5px] max-h-[500px] overflow-y-auto">
        {printerNames.map((printerName, index) => (
          <div key={index}>
            <div
              className={`flex items-center space-x-2 cursor-pointer w-[170px] text-[18px] h-[60px] rounded-tl-[8px] rounded-bl-[8px] rounded-tr-[30px] rounded-br-[30px]  ${
                selectedPrinter === printerName ? 'bg-[#F7BCD633] text-[#A68BC1] font-bold' : 'text-black font-bold hover:bg-[#A68BC133] hover:text-black'
              }`}
              onClick={() => handleSelect(printerName)}
            >
              <span className="ml-[10px]">
                {printerName}
              </span>
            </div>
            {index < printerNames.length - 1 && (
              <hr className="border-t border-[#F7BCD6] mt-[5px] w-[147px]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrinterList;
