/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
// import axios from 'axios';
import DeletePrinter from "../../../PopUp/DeletePrinter";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { FaCircleChevronLeft } from "react-icons/fa6";
import axios from "axios";

const List = ({
  officerList,
  setOfficerList,
  printerList,
  setPrinterList,
  selectedOfficer,
  setSelectedOfficer,
  selectedPrinter,
  setSelectedPrinter,
}) => {
  // const [selectedOfficer, setSelectedOfficer] = useState("2345678");
  // const [selectedPrinter, setSelectedPrinter] = useState(null);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [printerToDelete, setPrinterToDelete] = useState("");
  // const [officerData, setOfficerData] = useState([]);
  const [printerData, setPrinterData] = useState([]);
  const [deletePrinter, setDeletePrinter] = useState({
    id: "",
    status: false,
    confirmStatus: false,
  });

  // Fetch officer data
  // useEffect(() => {
  //   const fetchOfficerData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/Officer");
  //       setOfficerData(response.data);
  //     } catch (err) {
  //       console.error("Error fetching officer data:", err);
  //     }
  //   };
  //   fetchOfficerData();
  // }, []);

  // Fetch printer data for the selected officer
  useEffect(() => {
    if (selectedOfficer) {
      try {
        if (selectedOfficer.printers) {
          const filteredPrinters = printerList.filter((printer) =>
            selectedOfficer.printers.includes(printer.id),
          );
          setPrinterData(filteredPrinters);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setPrinterData([]);
    }

    // const fetchPrinterData = async () => {
    //   if (selectedOfficer) {
    //     try {
    //       const allPrinters = (await axios.get("http://localhost:3000/Printer")).data;
    //       if(selectedOfficer.printers) {
    //           const filteredPrinters = allPrinters.filter((printer) =>
    //           selectedOfficer.printers.includes(printer.id)
    //         );
    //         setPrinterData(filteredPrinters);
    //       }

    //     } catch (err) {
    //       console.error("Error fetching printer data:", err);
    //     }
    //   } else {
    //     setPrinterData([]);
    //   }
    // };
    // fetchPrinterData();
  }, [selectedOfficer, printerList]);

  useEffect(() => {
    const deletePrinterFunc = async () => {
      if (deletePrinter.status === true) {
        const response = await axios.delete(
          `http://localhost:8386/Printer/${deletePrinter.id}`,
        );
        console.log(response);
        if (response.status === 200) {
          const newPrinterList = printerList.filter(
            (item) => item.id !== deletePrinter.id,
          );
          setPrinterList(newPrinterList);
          setDeletePrinter({
            id: "",
            status: false,
            confirmStatus: false,
          });
        }
      }
    };

    deletePrinterFunc();
  }, [deletePrinter, printerList, setPrinterList]);

  // Select an officer
  const handleSelectOfficer = (officer) => {
    setSelectedOfficer(officer);
    setSelectedPrinter(null); // Reset selected printer
  };

  // Select a printer
  const handleSelectPrinter = (printer) => {
    // setSelectedPrinter((prevSelected) => (prevSelected === printer ? null : printer));
    if (selectedPrinter && printer.id !== selectedPrinter.id) {
      setDeletePrinter({
        id: "",
        status: false,
        confirmStatus: false,
      });
    }
    setSelectedPrinter(printer);

    // onSelectedPrinter(printer);
  };

  // Delete a printer
  // const handleDeleteClick = (printer) => {
  //   setPrinterToDelete(printer);
  //   setDeleteModalShow(true);
  // };

  // const handleDeleteConfirm = () => {
  //   console.log(`Deleted printer: ${printerToDelete.id}`);
  //   setDeleteModalShow(false);
  //   // Additional logic to delete the printer can go here
  // };

  // const handleDeleteCancel = () => {
  //   setDeleteModalShow(false);
  // };
  const handleDeletePrinter = (selectedDeletePrinter) => {
    setDeletePrinter({
      id: selectedDeletePrinter.id,
      status: false,
      confirmStatus: true,
    });
  };

  const handleToggleDeletePrinter = (confirmDeleteStatus) => {
    if (!confirmDeleteStatus) {
      setDeletePrinter({
        id: "",
        status: false,
        confirmStatus: false,
      });
      return;
    }

    setDeletePrinter({
      id: deletePrinter.id,
      status: true,
      confirmStatus: confirmDeleteStatus,
    });
  };

  return (
    <div className="flex space-x-4">
      {/* Officer List */}
      <div className="max-h-[500px] w-[170px] space-y-[5px] overflow-y-auto">
        {officerList &&
          officerList.map((officer, index) => (
            <div key={index}>
              <div
                className={`flex h-[60px] w-[170px] cursor-pointer items-center space-x-2 rounded-bl-[8px] rounded-br-[30px] rounded-tl-[8px] rounded-tr-[30px] text-[18px] ${
                  selectedOfficer === officer
                    ? "bg-[#F7BCD633] font-bold text-[#A68BC1]"
                    : "font-bold text-black hover:bg-[#A68BC133] hover:text-black"
                }`}
                onClick={() => handleSelectOfficer(officer)}
              >
                <span className="ml-[10px]">{officer.id}</span>
              </div>
              {index < officerList.length - 1 && (
                <hr className="mt-[5px] w-[147px] border-t border-[#F7BCD6]" />
              )}
            </div>
          ))}
      </div>

      {/* Printer List */}
      <div className="max-h-[500px] w-[170px] space-y-[5px] overflow-y-auto">
        {selectedOfficer && (
          <>
            {printerData.map((printer, printerIndex) => (
              <div key={printerIndex}>
                <div
                  className={`flex h-[60px] w-full cursor-pointer items-center justify-between space-x-2 rounded-bl-[8px] rounded-br-[30px] rounded-tl-[8px] rounded-tr-[30px] px-[10px] text-[18px] ${
                    selectedPrinter?.id === printer.id
                      ? "bg-[#F7BCD633] font-bold text-[#A68BC1]"
                      : "font-bold text-black hover:bg-[#A68BC133] hover:text-black"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectPrinter(printer);
                  }}
                >
                  <span className="w-[50%]">{printer.name || printer.id}</span>
                  {/* <img
                    src={
                      selectedPrinter === printer
                        ? "/Close_round_fill_selected.svg"
                        : "/Close_round_fill.svg"
                    }
                    alt="Close"
                    style={{
                      width: "24px",
                      height: "24px",
                      marginLeft: "auto",
                      marginRight: "10px",
                    }}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the printer selection
                      handleDeleteClick(printer); // Show delete modal
                    }}
                  /> */}
                  <FaCircleXmark
                    className={`${selectedPrinter?.id === printer.id && deletePrinter.confirmStatus ? "hidden" : "block"} flex-1`}
                    onClick={(e) => {
                      // e.stopPropagation();
                      handleDeletePrinter(printer);
                    }}
                  />
                  <FaCircleChevronLeft
                    className={`${selectedPrinter?.id === printer.id && deletePrinter.confirmStatus ? "block" : "hidden"} flex-1`}
                    onClick={(e) => {
                      // e.stopPropagation();
                      handleToggleDeletePrinter(false);
                    }}
                  />
                  <FaCheckCircle
                    className={`${selectedPrinter?.id === printer.id && deletePrinter.confirmStatus ? "block" : "hidden"} flex-1`}
                    onClick={(e) => {
                      // e.stopPropagation();
                      handleToggleDeletePrinter(true);
                    }}
                  />
                </div>
                {printerIndex < printerData.length - 1 && (
                  <hr className="mt-[5px] w-[147px] border-t border-[#F7BCD6]" />
                )}
              </div>
            ))}
          </>
        )}
      </div>

      {/* Delete Printer Modal */}
      {/* {deleteModalShow && (
        <DeletePrinter
          show={deleteModalShow}
          onClose={handleDeleteCancel}
          printerCode={printerToDelete.id} // Pass the printer code to be displayed
        />
      )} */}
    </div>
  );
};

export default List;
