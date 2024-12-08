import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaRegFolderOpen } from "react-icons/fa";
import { useAppContext } from "../../hooks/useAppContext";
import { FaRegFileAlt } from "react-icons/fa";
// import { WARNING_FILE } from "../../libs/constant";

const FileUpload = () => {
  const {
    fileUpload,
    setFileUpload,
    // setIsOpenPopup,
    // setPopupType,
    // setPopupMessage,
  } = useAppContext();

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        // Do something with the files
        const filenameExt = acceptedFiles[0].name.split(".").pop();
        acceptedFiles[0].filenameExt = filenameExt;
        setFileUpload(acceptedFiles[0]);
      } else {
        // Popup Error
        // setIsOpenPopup(true);
        // setPopupType("error");
        // setPopupMessage(WARNING_FILE);
      }
    },
    [setFileUpload],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // Config accept file
    // accept: {
    //   "image/png": [".png"],
    // },
  });

  return (
    <div className="flex-1">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className="flex h-[800px] w-full items-center justify-center rounded-[30px] bg-thirdary">
            <div className="flex flex-col items-center justify-center">
              <FaRegFolderOpen className="text-[80px] text-secondary" />
              <div className="font-bold">Put the file in here...</div>
              <p className="italic">to upload to the system</p>
            </div>
          </div>
        ) : (
          <div className="flex h-[800px] w-full items-center justify-center rounded-[30px] bg-thirdary">
            <div className="flex flex-col items-center justify-center">
              {fileUpload ? (
                <>
                  <FaRegFileAlt className="text-[80px] text-secondary" />
                  <div className="mt-6 text-[25px] italic">
                    {fileUpload.name}
                  </div>
                </>
              ) : (
                <>
                  <IoCloudUploadOutline className="text-[80px] text-secondary" />
                  <div className="font-bold">Drag & drop to uploads</div>
                  <p className="italic underline">
                    or click to upload from device
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default FileUpload;
