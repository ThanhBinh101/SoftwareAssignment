import React, {useState, useEffect} from 'react';
import Table from "../../../Officer/Table"
import List from "./OfficerList"
import axios from 'axios';

const OfficerReport = () => {
  const [selectedPrinter, setSelectedPrinter] = useState(null);
  const [matchingDocs, setMatchingDocs] = useState([]);
  const [maintainHis, setMaintainHis] = useState([])
  const [refillHis, setRefillHis] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        if(selectedPrinter) {
          const history = selectedPrinter.history || [];
          const allDocs = (await axios.get(`http://localhost:3000/Document`)).data;
          const matchings = allDocs.filter((doc) => 
            history.some((item) => item === doc.id) 
          );
          setMatchingDocs(matchings);
          setMaintainHis(selectedPrinter.maintains);
          setRefillHis(selectedPrinter.refillPaper);
        }
      } catch (err) {
        console.error("Error fetching officer data:", err);
      }
    };
    fetchData();
  }, [selectedPrinter]);

  return (
    <div>
      <div className="flex items-start ml-[100px] mt-[30px] w-full h-full"> 
        <div className=" mt-[17px] mr-[10px]">
          <span className="text-[18px] font-inter font-semibold"> Employee List</span>

          <span className="text-[18px] ml-[66px] font-inter font-semibold">Printer List</span>

          <div className="mt-[15px] w-[400px] h-[500px]">
            <List onSelectedPrinter = {setSelectedPrinter}/>
          </div>
        </div>
      <div className =" w-[850px] ml-[5px]"> 
          <Table  
            title={<span className="text-lg font-semibold">{`Printer History`}</span>} 
            tableCol={["Date", "Finish Day", "File", "Printer", "Number of Paper"]} 
            tableRow={matchingDocs.map((item) => [
              item.printDate,
              item.finishDate,
              item.name,
              item.studentID,
              item.paper
            ])}
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
              tableRow={maintainHis.map((item)=>[
                item.date,
                item.status
              ])}
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
              tableRow={refillHis.map((item)=>[
                item.date,
                item.amount
              ])}
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
