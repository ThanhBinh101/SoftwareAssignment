import React from "react";
import Button from "../../Button";
import { BUTTON_CHOOSE_OFFICER } from "../../../libs/constant";

const OfficerButton = ({ isSelected, onClick }) => {
  return (
    <div
      className={`flex items-center justify-center w-[120px] h-[48px] border-2 border-[#A68BC1] rounded-[16px] text-[18px] ${
        isSelected ? "bg-[#A68BC1] text-white" : "bg-[#FFFFFF] text-[#A68BC1]"
      } officer-button`}
      onClick={onClick}
    >
      {BUTTON_CHOOSE_OFFICER.map((button) => (
        <Button
          key={button.title}
          title={button.title}
          textColor={isSelected ? "white" : button.textColor} 
        />
      ))}
    </div>
  );
};

export default OfficerButton;
