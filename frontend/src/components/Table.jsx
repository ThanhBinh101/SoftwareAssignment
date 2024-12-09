/* eslint-disable react/prop-types */
const Table = ({ title, tableCol, bgColor , data}) => {
  return (
    <div>
      <div className="text-[28px] font-bold ">{title}</div>
      {/* Table 1 */}
      <div className={`bg-${bgColor} p-[40px] border-[2px] border-secondary rounded-[20px]`}>
        <table className="w-full border-collapse text-[16px]">
          <thead>
            <tr className="border-b-[2px] border-secondary">
              {tableCol.map((item, index) => (
                <th className={`p-2 ${index + 1 === tableCol.length ? "" : "border-r-[2px] border-secondary"}`} key={item}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b-[2px] border-secondary">
              <td className="p-2 border-r-[2px] border-secondary">1</td>
              <td className="p-2 border-r-[2px] border-secondary">1</td>
              <td className="p-2 border-r-[2px] border-secondary">1</td>
              <td className="p-2 border-r-[2px] border-secondary">1</td>
              <td className="p-2 ">1</td>
            </tr>
            <tr className="border-b-[2px] border-secondary">
              <td className="p-2 border-r-[2px] border-secondary">1</td>
              <td className="p-2 border-r-[2px] border-secondary">1</td>
              <td className="p-2 border-r-[2px] border-secondary">1</td>
              <td className="p-2 border-r-[2px] border-secondary">1</td>
              <td className="p-2 ">1</td>
            </tr>
            <tr className="border-b-[2px] border-secondary">
              <td className="p-2 border-r-[2px] border-secondary">1</td>
              <td className="p-2 border-r-[2px] border-secondary">1</td>
              <td className="p-2 border-r-[2px] border-secondary">1</td>
              <td className="p-2 border-r-[2px] border-secondary">1</td>
              <td className="p-2 ">1</td>
            </tr>
            <tr className="border-b-[2px] border-secondary">
              <td className="p-2 border-r-[2px] border-secondary">1</td>
              <td className="p-2 border-r-[2px] border-secondary">1</td>
              <td className="p-2 border-r-[2px] border-secondary">1</td>
              <td className="p-2 border-r-[2px] border-secondary">1</td>
              <td className="p-2 ">1</td>
            </tr>
            <tr className="border-b-[2px] border-secondary">
              <td className="p-2 border-r-[2px] border-secondary">1</td>
              <td className="p-2 border-r-[2px] border-secondary">1</td>
              <td className="p-2 border-r-[2px] border-secondary">1</td>
              <td className="p-2 border-r-[2px] border-secondary">1</td>
              <td className="p-2 ">1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Table;
