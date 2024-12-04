import { FaFile } from "react-icons/fa";
import { ALLOWED_FILE_TYPE } from "../libs/constant";

import UploadForm from "../components/UploadForm";

const UploadPage = () => {
  return (
    <>
      <div className="px-40 pt-10">
        <h3 className="mb-[20px] text-[28px] font-bold">File format</h3>
        <div className="mb-[30px] flex gap-12">
          {ALLOWED_FILE_TYPE.map((item) => (
            <div className="flex items-center" key={item.title}>
              <div className="mr-3 flex aspect-square items-center justify-center rounded-full bg-secondary p-[15px] text-[30px] text-white">
                <FaFile className="" />
              </div>
              <div className="text-[24px]">
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-[20px] italic text-slate-400">
                  {item.fileExtension}
                </p>
              </div>
            </div>
          ))}
        </div>
        <UploadForm />
      </div>
    </>
  );
};
export default UploadPage;
