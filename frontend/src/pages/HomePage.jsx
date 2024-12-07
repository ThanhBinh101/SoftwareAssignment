import { useState , useEffect} from "react";
import "../App.css";
import Table from "../components/Table";
import UserOverview from "../components/UserOverview";
import { PRINT_HISTORY_TABLE_TITLE, PURCHASE_HISTORY_TITLE } from "../libs/constant";
import { useParams } from "react-router-dom";
import axios from "axios";

function HomePage() {
  const { id } = useParams();
  const [studentData, setStudentData] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Student/${id}`);
        setStudentData(response.data);

        const allDocs = (await axios.get(`http://localhost:3000/Document`)).data;
        const matchings = allDocs.filter((doc) => 
          studentData.some((item) => item.id === doc.studentID) 
        );
        setHistory[matchings];

      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data.");
      }
    };

      fetchStudent();
    }, [id]);


  return (
    <>
      {studentData && <UserOverview student = {studentData}/>}

      <div className="px-10">
        <h3 className="text-[36px] text-secondary font-bold text-center mb-[45px]">
          HISTORY
        </h3>

        <div className="flex gap-[180px]">
          <div className="flex-[3]">
            <Table
              title={'Print History'}
              tableCol={PRINT_HISTORY_TABLE_TITLE}
              bgColor={'thirdary'}
              data = {history}
            />
          </div>
          {studentData && <div className="flex-[2]">
            <Table
              title={"Purchase History"}
              tableCol={PURCHASE_HISTORY_TITLE}
              bgColor={'[#FDF8FB]'}
              data = {studentData.purchases}
            />
          </div>}
        </div>
      </div>
    </>
  );
}

export default HomePage;
