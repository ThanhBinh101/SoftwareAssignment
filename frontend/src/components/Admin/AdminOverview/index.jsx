import AdminAvatar from "./AdminAvatar";
import AdminViewReportButton from "./AdminViewReportButton";
import Options from "./Options";

const AdminOverview = () => {
  return (
    <div className="mt-[80px] flex justify-center items-center">
      <div className="w-[1454px] bg-thirdary p-[40px] rounded-[25px] flex justify-between gap-[100px] mb-[120px]">
        <div className="font-light flex flex-row items-center ml-[100px] gap-[20px]">
            <div className="flex flex-col items-center">
                <AdminAvatar
                    imageUrl={"/user-logo-big.svg"}
                    adminName={"Nguyễn Tuấn Anh"}
                    adminID={"2252038"}
                />
                <div className="mt-[20px] bg-[#A68BC1] text-xl rounded-[25px] mt-[5px] w-[245px] flex items-center justify-center h-[52px]">
                    <AdminViewReportButton />
                </div>
            </div>

            <div>
                <Options />
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
