import React, { useState, useEffect } from 'react';
import axios from 'axios';

const List = ({ onSelectStudent }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Student`);
        console.log("Fetched Students:", response.data);
        setStudentList(response.data); // Set studentList with the response data
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const handleSelect = (student) => {
    setSelectedStudent(student);
    onSelectStudent(student); // Pass the selected student to the parent component
  };

  return (
    <div>
      <div className="space-y-[5px] max-h-[500px] overflow-y-auto">
        {studentList.map((student, index) => (
          <div key={index}>
            <div
              className={`flex items-center space-x-2 cursor-pointer w-[170px] text-[18px] h-[60px] rounded-tl-[8px] rounded-bl-[8px] rounded-tr-[30px] rounded-br-[30px]  ${
                selectedStudent && selectedStudent.id === student.id ? 'bg-[#F7BCD633] text-[#A68BC1] font-bold' : 'text-black font-bold hover:bg-[#A68BC133] hover:text-black'
              }`}
              onClick={() => handleSelect(student)}
            >
              <span className="ml-[10px]">
                {student.id}
              </span>
            </div>
            {index < studentList.length - 1 && (
              <hr className="border-t border-[#F7BCD6] mt-[5px] w-[147px]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
