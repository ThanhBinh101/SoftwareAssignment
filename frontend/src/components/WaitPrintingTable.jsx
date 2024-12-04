import { WAITING_PRINTING_DOCUMENTS } from "../libs/constant";

const WaitPrintingTable = () => {
  return (
    <div>
      <h3 className="text-secondary font-bold">Wait for printing:</h3>
      <table className="border-spacing-x-10 border-spacing-y-4 border-separate">
        <tbody>
          {WAITING_PRINTING_DOCUMENTS.map((document, index) => (
            <tr key={document.id}>
              <td className="font-bold">
                {index + 1} {document.title}
              </td>
              <td>306B1</td>
              <td>
                <div className="w-[30px] aspect-square">
                  <img
                    className="w-full"
                    src={
                      document.status === "success"
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
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default WaitPrintingTable;
