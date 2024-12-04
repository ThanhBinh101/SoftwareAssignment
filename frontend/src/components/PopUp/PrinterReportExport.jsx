import React, { useEffect } from 'react';
import ExportModal from './PopUp'; 
const PrinterExport = ({ show, onClose }) => {
  const content = {
    title: "Xuất thành công",
    subtitle: "Báo cáo Máy in",
    message: "Bấm xác nhận để tải file xuống",
  };
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
  return (
    <ExportModal
      show={show}
      onClose={onClose}
      title={content.title}
      subtitle={content.subtitle}
      message={content.message}
      width="600px"
      height="400px"
    />
  );
}

export default PrinterExport;
