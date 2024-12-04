import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const CustomModal = ({ show, onClose, title, subtitle, message, width, height, confirmText, onConfirm }) => {
  if (!show) return null;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div
        className="bg-[#A68BC1] rounded-[20px] shadow-lg p-8 flex flex-col justify-between"
        style={{
          width: width || "600px",
          maxWidth: "90%",
          height: height || "400px",
          maxHeight: "90%",
        }}
      >
        <div className="text-center text-white mt-[20px]">
          <p className="text-[35px] font-Inter font-medium">{title}</p>
          <p className="text-[45px] font-Inter font-medium mt-[5px]">{subtitle}</p>
        </div>

        <p className="text-white text-[30px] font-Inter text-center italic mb-[30px]">{message}</p>


        <div className="flex justify-center space-x-[80px] mt-[10px]">
          <button
            onClick={onClose}
            className="bg-[#FFEEE8] text-[#A68BC1] w-[160px] h-[52px] rounded-full text-[25px] hover:bg-[#e3ccd7]"
          >
            Huỷ
          </button>
          <button
            onClick={() => {
              onConfirm && onConfirm(); // Call the onConfirm function if it exists
              onClose();
            }}
            className="bg-[#97D99D] text-white w-[160px] h-[52px] rounded-full text-[25px] hover:bg-[#85c68b]"
          >
            {confirmText || "Xác nhận"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

const MaintainPrinter = ({ show, onClose, printerCode, time, timeColor }) => {
  const content = {
    title: "Bạn đã bảo dưỡng máy in",
    subtitle: `${printerCode}`,
    message: (
      <>
        Lúc <span className={`font-medium ${timeColor || 'text-[#FFEEE8]'}`}>{time}</span>
      </>
    ),
  };

  return (
    <CustomModal
      show={show}
      onClose={onClose}
      title={content.title}
      subtitle={content.subtitle}
      message={content.message}
      onConfirm={() => console.log(`Maintaining printer: ${printerCode}`)}
    />
  );
};


export default MaintainPrinter;
