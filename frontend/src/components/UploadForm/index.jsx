import FileUpload from "./FileUpload";
import InputInformation from "./InputInformation";

const UploadForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target.pages);
  }

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
