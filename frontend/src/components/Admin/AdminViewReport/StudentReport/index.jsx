import Table from "../../../Officer/Table"
import List from "./StudentList"
import React, { useState, useEffect } from 'react';
import axios from "axios";

const StudentReport = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [matchDocs, setMatchDocs] = useState(null);
  let purchases = null;
  console.log(selectedStudent);
  if(selectedStudent) {
    purchases = selectedStudent.purchases;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Document`);
        console.log("Response Data:", response.data); // Debugging
        const allDocs = response.data;
  
        if (Array.isArray(allDocs)) {
          if (selectedStudent) {
            const matchDocs = allDocs.filter((doc) => doc.studentID === selectedStudent.id);
            setMatchDocs(matchDocs);
          } else {
            setMatchDocs([]); // Clear if no student is selected
          }
        } else {
          console.error("Expected an array, but got:", allDocs);
          setMatchDocs([]); // Clear matchDocs if data is not an array
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
  
    fetchData();
  }, [selectedStudent]);
  

  return (
    <div>
      <div className="flex items-start ml-[100px] mt-[30px] w-full h-full"> 
        <div className="mt-[17px] mr-[50px]">
          <span className="text-[18px] font-inter font-semibold"> Student List</span>
          <div className="mt-[15px] w-[170px] h-[500px]">
            <List onSelectStudent={setSelectedStudent}/>
          </div>
        </div>
        
        {/* Render Print History table only if selectedStudent is available */}
        {selectedStudent && matchDocs && (
          <div className="ml-[50px] w-[850px] h-full"> 
            <Table  
              title={<span className="text-lg font-semibold">{`Print History`}</span>} 
              tableCol={["Date", "Finish Day", "File", "Printer", "Number of Paper"]} 
              tableRow={matchDocs.map((item) => [
                item.printDate,
                item.finishDate,
                item.name,
                item.printerID,
                item.paper
              ])}
              bgColor={'#FFEEE8'}
              titleColor={'black'}
              rowTextColor={'#A68BC1'}
              maxHeight="686px"
            /> 
          </div>
        )}
        
        {/* Render Purchase History table only if selectedStudent and selectedStudent.purchases are available */}

        {selectedStudent && purchases && purchases.length > 0 ? (
          <div className="ml-[50px] w-[500px] h-full mr-[150px]">
            <Table
              title={<span className="text-lg font-semibold">{`Purchase History`}</span>}
              tableCol={["Date", "Number of Paper", "Total"]}
              colWidths={["150px", "200px", "150px"]}
              tableRow={purchases.map((item) => [
                item.date,
                item.paper,
                item.amount
              ])}
              bgColor={'#F7BCD61A'}
              titleColor={'black'}
              rowTextColor={'#A68BC1'}
              maxHeight="686px"
            />
          </div>
        ) : (
          <div className="ml-[50px] w-[500px] h-full mr-[150px]">
            <p>No purchases found for the selected student.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default StudentReport;
