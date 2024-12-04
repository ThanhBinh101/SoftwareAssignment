import React from 'react';
import Table from "../../../Officer/Table"
import List from "./StudentList"
const StudentReport = () => {
  return (
    <div>
      <div className="flex items-start ml-[100px] mt-[30px] w-full h-full"> 
        <div className=" mt-[17px] mr-[50px]">
          <span className="text-[18px] font-inter font-semibold"> Student List</span>
          <div className="mt-[15px] w-[170px] h-[500px]">
            <List />
          </div>
        </div>
        <div className ="ml-[50px] w-[850px] h-full"> 
          <Table  
            title={<span className="text-lg font-semibold">{`Print History`}</span>} 
            tableCol={["Date", "Finish Day", "File", "Printer", "Number of Paper"]} 
            tableRow={[
              ["1", "1", "1","1","1"],
              ["1", "1", "1","1","1"],
              ["1", "1", "1","1","1"],
              ["1", "1", "1","1","1"],
              ["1", "1", "1","1","1"],
              ["1", "1", "1","1","1"],
              ["1", "1", "1","1","1"],
              ["1", "1", "1","1","1"],
              ["1", "1", "1","1","1"],
              ["1", "1", "1","1","1"],
              ["1", "1", "1","1","1"],
              ["1", "1", "1","1","1"],
              ["1", "1", "1","1","1"],
              ["1", "1", "1","1","1"],
              ["1", "1", "1","1","1"],
              ["1", "1", "1","1","1"],
              ["1", "1", "1","1","1"],
              ["1", "1", "1","1","1"],
              ["1", "1", "1","1","1"],
              ["1", "1", "1","1","1"],
              ["1", "1", "1","1","1"],
              ["1", "1", "1","1","1"],
            ]}
            bgColor={'#FFEEE8'}
            titleColor={'black'}
            rowTextColor={'#A68BC1'}
            maxHeight="686px"
          /> 
        </div>
        
        <div className="ml-[50px] w-[500px] h-full mr-[150px]"> 
          <Table  
            title={<span className="text-lg font-semibold">{`Purchase History`}</span>} 
            tableCol={["Date", "Number of Paper", "Total"]} 
            colWidths={["150px","200px","150px"]}
            tableRow={[
              ["1","1","1"],
              ["1","1","1"],
              ["1","1","1"],
              ["1","1","1"],
              ["1","1","1"],
              ["1","1","1"],
              ["1","1","1"],
              ["1","1","1"],
              ["1","1","1"],
              ["1","1","1"],
              ["1","1","1"],
              ["1","1","1"],
              ["1","1","1"],
              ["1","1","1"],
              ["1","1","1"],
              ["1","1","1"],
              ["1","1","1"],
              ["1","1","1"],
              ["1","1","1"],
              ["1","1","1"],
            ]}
            bgColor={'#F7BCD61A'}  
            titleColor={'black'}
            rowTextColor={'#A68BC1'}
            maxHeight="686px"
          /> 
        </div>

      </div>
    </div>
  );
};

export default StudentReport;
