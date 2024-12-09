import { WAITING_PRINTING_DOCUMENTS } from "../libs/constant";
import React, {useState, useEffect} from "react";
import axios from "axios";

const WaitPrintingTable = ({id}) => {
  const [docQueue, setQueue] = useState([]);

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const documentResponse = await axios.get(`http://localhost:3000/Document`);
        //const printerResponse = await axios.get(`http://localhost:3000/Printer`);
        const documents = documentResponse.data.filter((d) => d.studentID === id && d.status === "pending")
        if(!documents) documents = [];
        console.log(documents);
        setQueue(documents);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };
    fetchQueue();
  }, [])

  return (
    <div>
      <h3 className="text-secondary font-bold">Wait for printing:</h3>
      <table className="border-spacing-x-10 border-spacing-y-4 border-separate">
        <tbody>
          {docQueue?.length > 0 ? (docQueue.map((document, index) => (
            <tr key={document.id}>
              <td className="font-bold">
                {index + 1} {". "} {document.name}
              </td>
              <td>
                <div className="w-[30px] aspect-square">
                  <img
                    className="w-full"
                    src={
                      document.status === "printed"
                        ? "/complete-icon.svg"
                        : document.status === "fail"
                        ? "/fail-icon.svg"
                        : "/pending-icon.svg"
                    }
                    alt=""
                  />
                </div>
              </td>
            </tr>
          ))): (
            <tr>
              <td colSpan="3">No documents available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default WaitPrintingTable;
