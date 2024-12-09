/* eslint-disable react/prop-types */
import Table from "../../../Officer/Table"
import List from "./StudentList"
import { useState, useEffect } from 'react';
// import axios from "axios";

const StudentReport = ({
  studentList,
  setStudentList,
  documentList,
  setDocumentList,
  selectedStudent,
  setSelectedStudent
}) => {
  // const [selectedStudent, setSelectedStudent] = useState(null);
  const [matchDocs, setMatchDocs] = useState(null);
  const [purchases, setPurchases] = useState(null);

  useEffect(() => {
    if (selectedStudent) {
      const matchPurchases = studentList.find((item) => item.id === selectedStudent.id);
      setPurchases(matchPurchases.purchases);
    }
  }, [selectedStudent, purchases, studentList]);

  useEffect(() => {
    if (Array.isArray(documentList)) {
      if (selectedStudent) {
        const matchDocs = documentList.filter((doc) => doc.studentID === selectedStudent.id);
        setMatchDocs(matchDocs);
      } else {
        setMatchDocs([]); // Clear if no student is selected
      }
    } else {
      console.error("Expected an array, but got:", documentList);
      setMatchDocs([]); // Clear matchDocs if data is not an array
    }
  }, [selectedStudent, documentList]);
  

  return (
    <div className="">
      <div className="flex items-start mt-[30px] px-10 gap-[20px]"> 
        <div className="flex-1 mt-[20px]">
          <span className="text-[18px] font-inter font-semibold"> Student List</span>
          <div className="mt-[15px] w-full h-[500px]">
            <List 
              studentList={studentList}
              setStudentList={setStudentList}
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
            />
          </div>
        </div>
        
        {/* Render Print History table only if selectedStudent is available */}
        {selectedStudent && matchDocs && (
          <div className="flex-[4] h-full"> 
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
          <div className="flex-[3] h-full ">
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
