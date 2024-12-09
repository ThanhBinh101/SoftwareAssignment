import React, { useEffect, useState } from "react";
import { BUTTON_TURNOFF_PRINTER } from "../../../libs/constant";
import Button from "../../Button";
import axios from "axios";

const TurnOffPrinterButton = ({id}) => {
  const [title, setTitle] = useState();
  const [status, setStatus] = useState();

  useEffect(()=>{
    const fetchPrinterStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Printer/${id}`);
        setStatus(response.data.status);
        setTitle(status == "On"? "Turn Off Printer" : "Turn On Printer")
      } catch (error) {
        console.log(error);
      }
    };
    fetchPrinterStatus();
  }, [status])

  const switchPrinter = async (e) => {
    e.preventDefault();
    if (!id) {
      setError("Printer ID is required.");
      return;
    }
    try {
      const response = await axios.put(`http://localhost:8386/switchPrinter/${id}`);
      console.log("Switch successfully", response.data);
      setStatus(status == "On" ? "Off" : "On");
      setTitle(status == "On"? "Turn Off Printer" : "Turn On Printer")
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex justify-between bg-[#A68BC1]" >
      {BUTTON_TURNOFF_PRINTER.map((button) => (
        <Button
          key={button.title}
          title={title}
          textColor={button.textColor}
          backgroundColor={'button.backgroundColor'}
          width={"60"}
          onClickFunction={switchPrinter}
        />
      ))}
    </div>
  );
};

export default TurnOffPrinterButton;
