import PaymentPopup from "./PaymentPopup";
import PaymentSelection from "./PaymentSelection";

const PurchasePayment = () => {
  return (
    <div className="flex-[4]">
      <PaymentSelection />
      <PaymentPopup />
    </div>
  );
};
export default PurchasePayment;
