import React, { useState } from "react";
import axios from "axios";

const AddPrinterModal = ({ onClose }) => {
  const [id, setId] = useState("");  // For printer ID
  const [location, setLocation] = useState("");  // For printer location
  const [officerID, setOfficerID] = useState("");  // For officer ID
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddPrinter = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log({id, location, officerID})

    try {
      const response = await axios.post("http://localhost:8386/Printer", {
        id: id,
        location: location,
        officerID: officerID,
        status: "Off",
        paper: 0,
        queue: [],
        maintains: [],
        refillPaper: []
      });

      console.log("Printer added:", response.data);
      onClose();
    } catch (err) {
      setError("Error adding printer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 w-1/3">
        <h2 className="text-center text-xl font-bold mb-4">Add Printer</h2>

        <form onSubmit={handleAddPrinter}>
          <div className="mb-4">
            <label htmlFor="id" className="block text-sm font-medium text-gray-700">Printer ID</label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="officerID" className="block text-sm font-medium text-gray-700">Officer ID</label>
            <input
              type="text"
              id="officerID"
              value={officerID}
              onChange={(e) => setOfficerID(e.target.value)}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>

          {/* Error message */}
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}  // Close modal
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
  );
};

export default AddPrinterModal;
