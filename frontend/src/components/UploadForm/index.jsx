import { useParams } from "react-router-dom";
import { useAppContext } from "../../hooks/useAppContext";
import FileUpload from "./FileUpload";
import InputInformation from "./InputInformation";

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

  console.log(id);

  const handleSubmit = (e) => {
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
      id: Date.now(),
      name: fileUpload.name,
      printDate: new Date().toISOString().split("T")[0],
      finishDate: new Date().toISOString().split("T")[0],
      paper: Math.floor(Math.random() * 10) + 1,
      studentID: id,
      printerID: printerIDCheck,
    };

    console.log(data);

    //Tạo document mới ở chỗ này
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
