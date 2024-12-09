import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BUTTON_USER_OVERVIEW } from "../../libs/constant";
import Button from "../Button";

const UserOverviewButtonList = ({id}) => {
  const navigate = useNavigate()
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState("");
  const [paper, setPaper] = useState(0);
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const navClick = (link) => {
      console.log(link);
      if(link == "/document") {
        setShowPopup(true);
      } else {
        navigate(`${link}/${id}`)
      }
  };

  const handleAddDocument = async(e) => {
    e.preventDefault();
    setError("");
    console.log({name, paper})

    try {
      const response = await axios.post(`http://localhost:8386/addDocument`, {
        name: name,
        paper: paper,
        studentID: id,
        location: location
      });
      console.log("Document added:", response.data);
      setShowPopup(false);
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <><div className="flex justify-between">
      {BUTTON_USER_OVERVIEW.map((button) => (
          <Button
            key={button.title}
            title={button.title}
            textColor={button.textColor}
            backgroundColor={button.backgroundColor}
            width={"60"}
            onClickFunction={() => navClick(button.link)}
          />
      ))}
    </div>
    {showPopup && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-lg p-8 w-1/3">
          <h2 className="text-center text-xl font-bold mb-4">Add Document to Print</h2>

          <form onSubmit={handleAddDocument}>
            <div className="mb-4">
              <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 p-2 w-full border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                Number of Paper
              </label>
              <input
                type="number"
                id="paper"
                value={paper}
                onChange={(e) => setPaper(Number(e.target.value))}
                className="mt-1 p-2 w-full border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 p-2 w-full border rounded"
                required
              />
            </div>
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setShowPopup(false)} // Corrected: Wrap in a function
                className="bg-gray-300 text-gray-700 p-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded"
              >
                {"Confirm Print"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
    </>
  );
};
export default UserOverviewButtonList;
