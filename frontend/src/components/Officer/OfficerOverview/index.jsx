import OfficerAvatar from "./OfficerAvatar";
import OfficerTable from "./OfficerTable"; 
import OfficerViewReportButton from "./OfficerViewReportButton";
import { PRINTER_MANAGEMENT_TITLE } from "../../../libs/constant";

const OfficerOverview = () => {
  return (
    <div className="mt-[80px] flex justify-center items-center">
      <div className="w-[1454px] h-[740px] bg-thirdary p-[45px] rounded-[25px] flex justify-between gap-[20px] mb-[120px]">
        <div className=" mt-[50px] font-light flex flex-col items-center">
          <OfficerAvatar
            imageUrl={"/user-logo-big.svg"}
            officerName={"Nguyễn Tuấn Anh"}
            officerID={"2252038"}
          />
          <div className="bg-[#A68BC1] text-xl rounded-[25px] mt-[5px] w-[245px] flex items-center justify-center h-[52px]">
            <OfficerViewReportButton />
          </div>

        </div>

        <div className="px-10">
          <div className="text-center w-[900px] h-[562px]">
            <OfficerTable
              title={'PRINTER MANAGEMENT LIST'}
              tableCol={PRINTER_MANAGEMENT_TITLE}
              bgColor={'white'}
              titleColor={'#A68BC1'}
              rowTextColor={'#A68BC1'}
              colWidths={["150px", "150px", "100px", "150px", "300px"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficerOverview;
