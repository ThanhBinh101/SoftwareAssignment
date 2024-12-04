import React, {useState} from 'react';
import Table from "../../../Officer/Table"
import List from "./OfficerList"

const OfficerReport = () => {
  
  return (
    <div>
      <div className="flex items-start ml-[100px] mt-[30px] w-full h-full"> 
        <div className=" mt-[17px] mr-[10px]">
          <span className="text-[18px] font-inter font-semibold"> Employee List</span>

          <span className="text-[18px] ml-[66px] font-inter font-semibold">Printer List</span>

          <div className="mt-[15px] w-[400px] h-[500px]">
            <List />
          </div>
        </div>
      <div className =" w-[850px] ml-[5px]"> 
          <Table  
            title={<span className="text-lg font-semibold">{`Printer History`}</span>} 
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
              ["1", "1", "1","1","1"]
            ]}
            bgColor={'#F7BCD633'}
            titleColor={'black'}
            rowTextColor={'#A68BC1'}
            maxHeight="686px"
          /> 
        </div>
        
        <div className="ml-[50px] mr-[150px] h-full"> 
          <div className="w-[450px] h-[278px]">
            <Table
              className="p-3"
              title={<span className="text-lg font-semibold">{`Maintain History`}</span>} 
              tableCol={["Day", "Status"]} 
              colWidths={["250px","250px"]}
              tableRow={[
                ["1", "1"],
                ["1", "1"],
                ["1", "1"],
                ["1", "1"],
                ["1", "1"],
                ["1", "1"],
                ["1", "1"],
                ["1", "1"],
                ["1", "1"],
                ["1", "1"],
                ["1", "1"],
                ["1", "1"],
              ]}
              bgColor={'white'} 
              titleColor={'black'}
              rowTextColor={'#A68BC1'}
              maxHeight="278px"
            />
          </div>
          <div className="mt-[130px] mb-[100px] w-[450px] h-[278px]">
            <Table
              className="p-3"
              title={<span className="text-lg font-semibold">{`Refill History`}</span>} 
              tableCol={["Day", "Number of paper"]} 
              colWidths={["250px","250px"]}
              tableRow={[
                ["1", "1"],
                ["1", "1"],
                ["1", "1"],
                ["1", "1"],
                ["1", "1"],
                ["1", "1"],
                ["1", "1"],
                ["1", "1"],
                ["1", "1"],
                ["1", "1"],
                ["1", "1"],
                ["1", "1"],
                ["1", "1"],
                ["1", "1"],
                ["1", "1"],
              ]}
              bgColor="#FFEEE8"
              titleColor={'black'}
              rowTextColor={'#A68BC1'}
              maxHeight={"278px"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficerReport;
