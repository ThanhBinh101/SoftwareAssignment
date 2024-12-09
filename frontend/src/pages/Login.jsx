import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "./../components/Button";

function Login() {
  const navigate = useNavigate(); // Get the navigate function
  const [bkID, setBkID] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    // Validation for empty fields
    if (!bkID || !password) {
      alert("BKnetID and Password are required!");
      return;
    }

    try {
      // Admin login check
      if (bkID === "Admin" && password === "1") {
        navigate(`/adminHomepage`);
        return;
      }

      // Student login check
      let response = await axios.get(`http://localhost:3000/Student/${bkID}`).catch(() => null);
      if (response && response.data.password === password) {
        navigate(`/studentHomepage/${bkID}`);
        return;
      }

      // Officer login check
      response = await axios.get(`http://localhost:3000/Officer/${bkID}`).catch(() => null);
      if (response && response.data.password === password) {
        navigate(`/officerHomepage/${bkID}`);
        return;
      }

      // If no match found
      alert("Invalid credentials. Please try again!");
    } catch (err) {
      console.error("Error during login:", err);
      alert("An error occurred during login. Please try again.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="flex w-[1454px] h-[660px] justify-between rounded-[25px] bg-thirdary p-[45px]">
        <img
          src="/logo-school.png"
          alt="School Logo"
          className="h-[340px] flex-none mx-auto my-auto pl-[100px]"
        />
        <div className="flex-auto flex flex-col items-center justify-center">
          <h3 className="text-[36px] text-secondary font-bold text-center mb-[45px] w-[600px] pl-[200px]">
            SMART PRINTING
          </h3>
          <div className="flex">
            <h4 className="text-[20px] font-bold text-center mb-[45px] w-[200px]">BKnetID</h4>
            <input
              name="bkID"
              className="h-[40px] rounded-[4px] w-[480px]"
              onChange={(e) => setBkID(e.target.value)}
            />
          </div>
          <div className="flex">
            <h4 className="text-[20px] font-bold text-center mb-[45px] w-[200px]">Password</h4>
            <input
              name="password"
              className="h-[40px] rounded-[4px] w-[480px]"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="pl-[200px] flex items-center justify-center">
            <Button
              title="Submit"
              backgroundColor="success"
              textColor="white"
              onClickFunction={submit}
              type="submit"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
