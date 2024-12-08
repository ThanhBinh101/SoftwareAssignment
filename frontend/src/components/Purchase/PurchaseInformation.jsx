import { useEffect } from "react";
import Title from "../Title";

const PurchaseInformation = () => {
  return (
    <div className="flex-[3]">
      <Title title={"Purchase Paper"} />

      <div className="mb-[60px] rounded-[30px] border-[8px] border-secondary px-[100px] py-[50px] text-center text-[28px] font-bold">
        Price <span className="text-secondary">5.000</span> VND /{" "}
        <span className="text-secondary">10</span> A4 paper
      </div>

      <div className="rounded-[30px] bg-thirdary px-10 py-36 text-[28px] font-bold ">
        <div className="mb-[30px]">
          <div>
            Page(s) available: <span className="text-secondary">10</span>
          </div>
          <div>
            Next refill in <span>10 days</span> (<span>January 10th, 2024</span>
            )
          </div>
        </div>
        <div>
          <div className="italic underline">Size convert</div>
          <ul>
            <li>
              A3 paper = <span className="text-secondary">2</span> A4 paper
            </li>
            <li>
              A2 paper = <span className="text-secondary">4</span> A4 paper
            </li>
            <li>
              A1 paper = <span className="text-secondary">8</span> A4 paper
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default PurchaseInformation;
