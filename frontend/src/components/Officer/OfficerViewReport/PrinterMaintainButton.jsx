import { BUTTON_MAINTAIN } from "../../../libs/constant";
import Button from "../../Button";
import React, { useState } from "react";
import axios from "axios";

const PrinterMaintainButton = ({id}) => {
  const [showPopUp, setshowPopup] = useState(false);
  const [status, setStatus] = useState("");
  const [maintain, setMaintain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddMaintain = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (!id) {
      setError("Printer ID is required.");
      return;
    }
    setLoading(true); // Set loading state
    try {
      const response = await axios.post(`http://localhost:8386/maintainPrinter/${id}`, { status: status, maintain: maintain });
      console.log("Maintain successfully", response.data);
      setshowPopup(false);
      setError(""); // Clear error message
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <div className="flex justify-between text-[#957DAD]">
      {BUTTON_MAINTAIN.map((button) => (
        <Button
          key={button.title}
          title={button.title}
          textColor={button.textColor}
          backgroundColor={'button.backgroundColor'}
          width={"60"}
          onClickFunction={() => setshowPopup(true)}
        />
      ))}
    </div>
    {showPopUp && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-lg p-8 w-1/3">
          <h2 className="text-center text-xl font-bold mb-4">Maintain Printer {id}</h2>

          <form onSubmit={handleAddMaintain}>
            <div className="mb-4">
              <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <input
                type="text"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 p-2 w-full border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                Next Maintain Day
              </label>
              <input
                type="date"
                id="maintain"
                value={maintain}
                onChange={(e) => setMaintain(e.target.value)}
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
                {loading ? "Adding..." : "Confirm maintained"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
    </div>
  );
};
export default PrinterMaintainButton;
