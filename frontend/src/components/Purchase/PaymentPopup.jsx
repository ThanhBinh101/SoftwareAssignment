import { useAppContext } from "../../hooks/useAppContext";
import { useState } from 'react';
import Button from "../Button";
import Title from "../Title";
import axios from "axios";
import { useParams } from "react-router-dom";

const PaymentPopup = () => {
  const { price, setPrice } = useAppContext();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const {id} = useParams(); 

  const handleCancelPrice = () => {
    setPrice(null);
  }

  const handlePurchase = () => {
    setShowConfirmDialog(true);
  }

  const handleConfirm = async (e) => {
    e.preventDefault();
    
    const data = {
      date: new Date().toISOString().split("T")[0],  // Get today's date in YYYY-MM-DD format
      amount: price,  // Assuming price is set in the component
      paper: (price/5000) * 10,  // Calculate paper from price
      id: id
    };
  
    console.log("Sending request data:", data);  // Log the data to ensure it's correct
  
    try {
      const response = await axios.post(`http://localhost:8386/Student`, data);
      console.log("Purchase successful:", response.data);
    } catch (error) {
      console.error("Error adding purchase. Please try again.", error.response || error);
    }
  
    setShowConfirmDialog(false);
  };
  

  const handleCancel = () => {
    console.log({id});
    setShowConfirmDialog(false);
  };

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
                onClickFunction={ handlePurchase}
              />
              <Button
                title={"Cancel"}
                backgroundColor={"thirdary"}
                textColor={"secondary"}
                onClickFunction={handleCancelPrice}
              />
            </div>
          </div>
          {/* Confirmation Dialog */}
          {showConfirmDialog && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
                <h2 className="text-xl font-bold mb-4">Confirm Payment</h2>
                <p className="mb-4">Are you sure to pay {price} for {price * 10} papers? </p>
                <div className="flex gap-4">
                  <Button
                    title={"Confirm"}
                    backgroundColor={"success"}
                    textColor={"white"}
                    onClickFunction={handleConfirm}
                  />
                  <Button
                    title={"Cancel"}
                    backgroundColor={"thirdary"}
                    textColor={"secondary"}
                    onClickFunction={handleCancel}
                  />
                </div>
              </div>
            </div>
          )}

        </>
      )}
    </div>
  );
};
export default PaymentPopup;
