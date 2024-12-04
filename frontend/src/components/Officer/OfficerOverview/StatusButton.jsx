
import React from 'react';

const StatusButton = ({ text, bgColor, textColor }) => {
  return (
    <div
      className={`w-[80px] h-[35px] rounded-[16px] text-[22px] font-medium`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {text}
    </div>
  );
};

export default StatusButton;

