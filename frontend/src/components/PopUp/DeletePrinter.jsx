import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

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

        <p className="text-white text-[24px] font-Inter text-center italic mb-[30px]">{message}</p>


        <div className="flex justify-center space-x-[80px] mt-[10px]">
          <button
            onClick={onClose}
            className="bg-[#FFEEE8] text-[#A68BC1] w-[160px] h-[52px] rounded-full text-[25px] hover:bg-[#e3ccd7]"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="bg-[#97D99D] text-white w-[160px] h-[52px] rounded-full text-[25px] hover:bg-[#85c68b]"
          >
            {confirmText || "Concac"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};


const DeletePrinter = ({ show, onClose, printerCode }) => {
  //const [deleteModalShow, setDeleteModalShow] = useState(false);

  const content = {
    title: "Delete Printer",
    subtitle: `${printerCode}`, 
    message: "Sau khi bấm xác nhận sẽ không thể hoàn lại",
  };

  const handleConfirm = async () => {
    axios
      .delete(`http://localhost:8386/Printer/${printerCode}`)
      .then((response) => {
        console.log(response.data.message); // Successful deletion message
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting printer:", error);
        //setDeleteModalShow(false);
      });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        {onConfirm && handleConfirm()}
        onClose(); 
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]); 

  return (
    <CustomModal
      show={show}
      onClose={onClose}
      onConfirm={handleConfirm}
      title={content.title}
      subtitle={content.subtitle}
      message={content.message}
      width="600px"
      height="400px"
    />
  );
}

export default DeletePrinter;
