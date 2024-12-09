/* eslint-disable react/prop-types */
import { BUTTON_REFILL_PAPER } from "../../../libs/constant";
import Button from "../../Button";
import React, { useState } from "react";
import axios from "axios";

const PrinterRefillPaperButton = ({
  selectedPrinter,
  setSelectedPrinter,
  setStartDate,
  setEndDate,
  printerList,
  setPrinterList,
  filteredPrinterList,
  setFilteredPrinterList,
  id,
}) => {
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
      const response = await axios.post(
        `http://localhost:8386/refillPaper/${id}`,
        { amount: parseInt(amount, 10) },
      );
      console.log("Refill added:", response.data);
      const data = response.data.newRefill;

      const currentPrinter = printerList.find((item) => item.id === id);
      currentPrinter.refillPaper.push({ data: data.date, amount: data.amount });
      currentPrinter.paper = data.paper;

      const currentPrinterChange = JSON.parse(JSON.stringify(currentPrinter));

      setPrinterList(JSON.parse(JSON.stringify(printerList)));
      setFilteredPrinterList(JSON.parse(JSON.stringify(printerList)));
      setSelectedPrinter(currentPrinterChange);
      setStartDate("");
      setEndDate("");
      setshowPopup(false);
      setError(""); // Clear error message
    } catch (err) {
      console.log(err);
      setError("Error adding Refill. Please try again.");
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/3 rounded-lg bg-white p-8">
            <h2 className="mb-4 text-center text-xl font-bold">Refill Paper</h2>

            <form onSubmit={handleAddRefill}>
              <div className="mb-4">
                <label
                  htmlFor="id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Number of pages
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1 w-full rounded border p-2"
                  required
                />
              </div>
              {error && (
                <div className="mb-4 text-sm text-red-500">{error}</div>
              )}

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setshowPopup(false)} // Corrected: Wrap in a function
                  className="rounded bg-gray-300 p-2 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-green-500 p-2 text-white"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Pages"}
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
