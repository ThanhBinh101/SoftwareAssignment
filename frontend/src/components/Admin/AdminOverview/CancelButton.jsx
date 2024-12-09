import Button from "../../Button";
import React, {useState, useEffect} from "react";
import AddPrinterModal from "./AddPrinter";

const AddPrinterButton = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex justify-between">
      <Button
          title="Add Printer"
          backgroundColor="#F7BCD6"
          textColor="white"
          onClickFunction={handleOpenModal}
      />
      {showModal && <AddPrinterModal onClose={handleCloseModal} />}
    </div>
  );
};
export default AddPrinterButton;
