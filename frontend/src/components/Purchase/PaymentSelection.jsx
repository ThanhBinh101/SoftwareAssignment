import { useAppContext } from "../../hooks/useAppContext";
import { PRICE_AMOUNT } from "../../libs/constant";
import Title from "../Title";

const PaymentSelection = () => {
  const { setPrice } = useAppContext();

  const handleChangePrice = (price) => {
    setPrice(price);
  };

  return (
    <div className="mb-[60px]">
      <Title title={"Choose pay amount"} />  

      <div className="grid grid-cols-3 gap-[50px]">
        {PRICE_AMOUNT.map((price) => (
          <button
            key={price}
            className="rounded-[30px] border-[4px] border-success bg-[#ECF7EC] px-[70px] py-[30px] text-[24px]"
            onClick={() => handleChangePrice(price)}
          >
            {price.toLocaleString()} VND
          </button>
        ))}
      </div>
    </div>
  );
};
export default PaymentSelection;
