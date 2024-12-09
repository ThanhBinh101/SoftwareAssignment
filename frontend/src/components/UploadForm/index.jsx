import { useParams } from "react-router-dom";
import { useAppContext } from "../../hooks/useAppContext";
import FileUpload from "./FileUpload";
import InputInformation from "./InputInformation";
import axios from "axios";

const UploadForm = () => {
  const {
    pagesSelection,
    setPagesSelection,
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
    listPrinter,
    setListPrinter,
  } = useAppContext();

  const { id } = useParams();

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!fileUpload) {
      alert("Vui lòng upload file");
      return;
    }

    let printerIDCheck = printerID;

    if (printerID === "auto") {
      printerIDCheck =
        listPrinter[Math.floor(Math.random() * listPrinter.length)].id;
    }

    const data = {
      name: fileUpload.name,
      paper: Math.floor(Math.random() * 10) + 1,
      studentID: id,
      printerID: printerIDCheck,
    };
    try {
      const response = await axios.post(`http://localhost:8386/addDocument`, data);
      console.log("Document added:", response.data);
    } catch (err) {
      console.log(err.message);
    }

  };

  return (
    <form className="flex gap-[60px]" onSubmit={handleSubmit}>
      {/* File Upload */}
      <FileUpload />
      {/* Input Information */}
      <InputInformation />
    </form>
  );
};
export default UploadForm;
