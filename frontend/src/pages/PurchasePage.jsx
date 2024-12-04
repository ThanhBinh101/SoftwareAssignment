import PurchaseInformation from "../components/Purchase/PurchaseInformation";
import PurchasePayment from "../components/Purchase/PurchasePayment";

const PurchasePage = () => {
  return (
    <div className="px-10 pt-10">
      <div className="flex gap-[120px] items-start">
        <PurchaseInformation />
        <PurchasePayment />
      </div>
    </div>
  );
};
export default PurchasePage;
