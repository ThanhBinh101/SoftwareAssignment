import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import OfficerAvatar from "./OfficerAvatar";
import OfficerTable from "./OfficerTable"; 
import OfficerViewReportButton from "./OfficerViewReportButton";
import { PRINTER_MANAGEMENT_TITLE } from "../../../libs/constant";
import axios from "axios";
import { MdOutlineFlashOff } from "react-icons/md";

const OfficerOverview = () => {
  const { id } = useParams(); // Extracts 'id' from the URL
  const [officerData, setOfficerData] = useState(null);
  const [printerData, setPrinterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch officer data based on 'id' from the URL
  useEffect(() => {
    const fetchOfficerAndPrinters = async () => {
      setLoading(true);
      try {
        // Step 1: Fetch officer data
        const officerResponse = await axios.get(`http://localhost:3000/Officer/${id}`);
        const officer = officerResponse.data;
  
        if (!officer) {
          throw new Error("No officer data found.");
        }
  
        setOfficerData(officer);
  
        
        const printersResponse = await axios.get(`http://localhost:3000/Printer/`);
        const allPrinters = printersResponse.data;
  
        const matchingPrinters = allPrinters.filter((printer) =>
          officer.printers.includes(printer.id)
        );
  
        setPrinterData(matchingPrinters); // Save filtered printers
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchOfficerAndPrinters();
  }, [id]); // Re-fetch data when `id` changes
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mt-[80px] flex justify-center items-center">
      <div className="w-[1454px] h-[740px] bg-thirdary p-[45px] rounded-[25px] flex justify-between gap-[20px] mb-[120px]">
        <div className="mt-[50px] font-light flex flex-col items-center">
          <OfficerAvatar
            imageUrl={"/user-logo-big.svg"}
            officerName={officerData.name}
            officerID={officerData.id}
          />
          <div className="bg-[#A68BC1] text-xl rounded-[25px] mt-[5px] w-[245px] flex items-center justify-center h-[52px]">
            <OfficerViewReportButton 
              id = {officerData.id}
            />
          </div>
        </div>

        <div className="px-10">
          <div className="text-center w-[900px] h-[562px]">
          <OfficerTable
            title={'PRINTER MANAGEMENT LIST'}
            tableCol={PRINTER_MANAGEMENT_TITLE}
            bgColor={'white'}
            titleColor={'#A68BC1'}
            rowTextColor={'#A68BC1'}
            colWidths={["150px", "150px", "100px", "150px", "300px"]}
            printerData={printerData}
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficerOverview;
