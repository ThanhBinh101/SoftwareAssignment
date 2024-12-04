import React, { useState } from 'react';

const List = () => {
  const names = [
    "2345678", "2345679", "2345680", "2345681", "2345682",
    "2345683", "2345684", "2345685", "2345686", "2345687",
    "2345688", "2345689", "2345690", "2345691", "2345692",
    "2345693", "2345694"
  ];
  const [selectedName, setSelectedName] = useState("2345678");

  const handleSelect = (name) => {
    setSelectedName(name);
  };

  return (
    <div>
      <div className="space-y-[5px] max-h-[500px] overflow-y-auto">
        {names.map((name, index) => (
          <div key={index}>
            <div
              className={`flex items-center space-x-2 cursor-pointer w-[170px] text-[18px] h-[60px] rounded-tl-[8px] rounded-bl-[8px] rounded-tr-[30px] rounded-br-[30px]  ${
                selectedName === name ? 'bg-[#F7BCD633] text-[#A68BC1] font-bold' : 'text-black font-bold hover:bg-[#A68BC133] hover:text-black'
              }`}
              onClick={() => handleSelect(name)}
            >
              <span className="ml-[10px]">
                {name}
              </span>
            </div>
            {index < names.length - 1 && (
              <hr className="border-t border-[#F7BCD6] mt-[5px] w-[147px]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};



export default List;


