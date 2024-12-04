import { useAppContext } from "../../hooks/useAppContext";
import Button from "../Button";
import Title from "../Title";

const PaymentPopup = () => {
  const { price, setPrice } = useAppContext();

  const handleCancelPrice = () => {
    setPrice(null);
  }

  return (
    <div>
      {price && (
        <>
          <Title title={"Detail Payment"} />
          <div className="flex items-center justify-between rounded-[30px] border-[8px] border-success px-[80px] py-[38px]">
            <div className="w-[70%] text-[60px] font-bold">
              {price.toLocaleString()} VND
            </div>
            <div className="flex w-[30%] flex-col gap-5 text-[24px]">
              <Button
                title={"Purchase"}
                backgroundColor={"success"}
                textColor={"white"}
              />
              <Button
                title={"Cancel"}
                backgroundColor={"thirdary"}
                textColor={"secondary"}
                onClickFunction={handleCancelPrice}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default PaymentPopup;
