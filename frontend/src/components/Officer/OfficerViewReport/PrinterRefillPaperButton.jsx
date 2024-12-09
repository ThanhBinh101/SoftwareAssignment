import { BUTTON_REFILL_PAPER } from "../../../libs/constant";
import Button from "../../Button";
import React, { useState } from "react";
import axios from "axios"; // Don't forget to import axios

const PrinterRefillPaperButton = ({ id }) => {
  const [showPopUp, setshowPopup] = useState(false);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddRefill = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (!id) {
      setError("Printer ID is required.");
      return;
    }
    setLoading(true); // Set loading state
    try {
      const response = await axios.post(`http://localhost:8386/refillPaper/${id}`, { amount: parseInt(amount, 10) });

      console.log("Refill added:", response.data);
      setshowPopup(false);
      setError(""); // Clear error message
    } catch (err) {
      setError("Error adding printer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        {BUTTON_REFILL_PAPER.map((button) => (
          <Button
            key={button.title}
            title={button.title}
            textColor={button.textColor}
            backgroundColor={button.backgroundColor} // Corrected typo
            width={"60"}
            onClickFunction={() => setshowPopup(true)} // Wrap in a function
          />
        ))}
      </div>

      {showPopUp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 w-1/3">
            <h2 className="text-center text-xl font-bold mb-4">Add Printer</h2>

            <form onSubmit={handleAddRefill}>
              <div className="mb-4">
                <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                  Printer ID
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1 p-2 w-full border rounded"
                  required
                />
              </div>
              {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setshowPopup(false)} // Corrected: Wrap in a function
                  className="bg-gray-300 text-gray-700 p-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white p-2 rounded"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Printer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PrinterRefillPaperButton;
