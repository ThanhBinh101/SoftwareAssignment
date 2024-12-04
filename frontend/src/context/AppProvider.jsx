import { useState } from "react";
import { AppContext } from "../hooks/useAppContext";

// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
  //User State

  const [availablePaper, setAvailablePaper] = useState(10);

  //End User State

  //Upload Page State

  const [printerID, setPrinterID] = useState("auto");
  const [pagesSelection, setPagesSelection] = useState("all");
  const [rangeSelectionStartPage, setRangeSelectionStartPage] = useState(0);
  const [rangeSelectionEndPage, setRangeSelectionEndPage] = useState(0);
  const [selection, setSelection] = useState([]);
  const [copiesNumber, setCopiesNumber] = useState(1);
  const [paperSize, setPaperSize] = useState("A4");
  const [orientation, setOrientation] = useState("portrait");
  const [fileUpload, setFileUpload] = useState(null);

  //End Upload Page State

  //Purchase State

  const [price, setPrice] = useState(null);

  //End Purchase State

  //Popup State

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  //End Popup State

  return (
    <AppContext.Provider
      value={{
        availablePaper,
        setAvailablePaper,
        pagesSelection,
        setPagesSelection,
        rangeSelectionStartPage,
        setRangeSelectionStartPage,
        rangeSelectionEndPage,
        setRangeSelectionEndPage,
        selection,
        setSelection,
        printerID,
        setPrinterID,
        copiesNumber,
        setCopiesNumber,
        paperSize,
        setPaperSize,
        orientation,
        setOrientation,
        fileUpload,
        setFileUpload,
        isOpenPopup,
        setIsOpenPopup,
        popupType,
        setPopupType,
        popupMessage,
        setPopupMessage,
        price,
        setPrice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
