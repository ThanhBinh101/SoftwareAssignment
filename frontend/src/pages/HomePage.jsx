import "../App.css";
import Table from "../components/Table";
import UserOverview from "../components/UserOverview";
import { PRINT_HISTORY_TABLE_TITLE, PURCHASE_HISTORY_TITLE } from "../libs/constant";

function HomePage() {
  return (
    <>
      <UserOverview />

      <div className="px-10">
        <h3 className="text-[36px] text-secondary font-bold text-center mb-[45px]">
          HISTORY
        </h3>

        <div className="flex gap-[180px]">
          <div className="flex-[3]">
            <Table
              title={'Print History'}
              tableCol={PRINT_HISTORY_TABLE_TITLE}
              bgColor={'thirdary'}
            />
          </div>
          <div className="flex-[2]">
            <Table
              title={"Purchase History"}
              tableCol={PURCHASE_HISTORY_TITLE}
              bgColor={'[#FDF8FB]'}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
