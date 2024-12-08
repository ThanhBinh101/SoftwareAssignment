import { useAppContext } from "../../hooks/useAppContext";
import WaitPrintingTable from "../WaitPrintingTable";
import UserAvatar from "./UserAvatar";
import UserOverviewButtonList from "./UserOverviewButtonList";
import UserRefillAnnoucement from "./UserRefillAnnoucement";

const UserOverview = ({student}) => {
  const { availablePaper } = useAppContext();

  return (
    <div className="mt-[80px] flex items-center justify-center">
      <div className="mb-[120px] flex w-[1454px] justify-between gap-[100px] rounded-[25px] bg-thirdary p-[45px]">
        <UserAvatar
          imageUrl={"/user-logo-big.svg"}
          username={student.name}
          userId={student.id}
        />

        <div className="flex flex-1 flex-col justify-between text-[28px]">
          <h3 className="font-bold">
            Page(s) available: <span className="text-secondary">{availablePaper}</span>
          </h3>

          <WaitPrintingTable />

          <UserOverviewButtonList id={student.id}/>

          <UserRefillAnnoucement
            remainingDay={10}
            refillDate={"January 10th, 2024"}
          />
        </div>
      </div>
    </div>
  );
};
export default UserOverview;
