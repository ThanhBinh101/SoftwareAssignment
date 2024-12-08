import React, { useState, useEffect } from "react";
import AdminAvatar from "./AdminAvatar";
import AdminViewReportButton from "./AdminViewReportButton";
import Options from "./Options";
import axios from "axios";

const AdminOverview = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch admin data from the API (replace with your actual API endpoint)
  useEffect(() => {
    axios.get("http://localhost:3000/Admin") // API endpoint to fetch admin data
      .then(response => {
        console.log("Admin data:", response.data);
        if (response.data && response.data && response.data.length > 0) {
          setAdminData(response.data[0]); //  Assuming you want the first admin
        } else {
          setError("No admin data found.");
        }
      })
      .catch(error => {
        console.error("Error fetching admin data:", error);
        setError("Failed to fetch admin data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mt-[80px] flex justify-center items-center overflow-hidden">
      <div className="w-[1454px] bg-thirdary p-[40px] rounded-[25px] flex justify-between gap-[100px] mb-[120px]">
        <div className="font-light flex flex-row items-center ml-[100px] gap-[20px]">
          <div className="flex flex-col items-center">
            <AdminAvatar
              imageUrl={"/user-logo-big.svg"}
              adminName={adminData.accounts[0].name} // Displaying the admin's name dynamically
              adminID={adminData.accounts[0].id}  // Displaying the admin's ID dynamically
            />
            <div className="mt-[20px] bg-[#A68BC1] text-xl rounded-[25px] mt-[5px] w-[245px] flex items-center justify-center h-[52px]">
              <AdminViewReportButton />
            </div>
          </div>

          <div>
             <Options adminData={adminData}/>  
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
