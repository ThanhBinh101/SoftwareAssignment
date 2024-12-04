import React from 'react';
import ReactDOM from 'react-dom';

const ExportModal = ({ show, onClose, title, subtitle, message, width, height }) => {
  if (!show) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div
        className="bg-[#A68BC1] rounded-[20px] shadow-lg p-8 flex flex-col justify-between"
        style={{
          width: width || "100%",  
          maxWidth: "90%",          
          height: height || "auto", 
          maxHeight: "90%",     
        }}
      >
        <div className="text-center text-white mb-6 mt-[10px]">
          <p className="text-[35px] font-Inter font-medium">{title}</p>
          <p className="text-[35px] font-Inter font-medium mt-2">{subtitle}</p>
        </div>

        <p className="text-white text-[24px] font-Inter text-center italic mb-8">{message}</p>

        <div className="flex justify-center space-x-[80px] mt-[10px]">
          <button
            onClick={onClose}
            className="bg-[#F5E1E9] text-[#A68BC1] w-[160px] h-[52px] rounded-full text-[25px] hover:bg-[#e3ccd7]"
          >
            Huỷ
          </button>
          <button
            onClick={() => {
              onClose();
            }}
            className=" bg-[#97D99D] text-white w-[160px] h-[52px] rounded-full text-[25px] hover:bg-[#85c68b]"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ExportModal;
