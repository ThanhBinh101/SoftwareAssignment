import React from 'react';

const Table = ({ title, tableCol, tableRow, bgColor, titleColor, rowTextColor, maxHeight, colWidths }) => {
  return (
    <div>
      <div className="text-[32px] font-inter font-medium mb-[3px]" style={{ color: titleColor }}>
        {title}
      </div>
      <div className={`bg-[${bgColor}] p-[40px] border-[2px] border-secondary rounded-[20px]`}>
        <div style={{ maxHeight: maxHeight, overflowY: 'auto' }}>
          <table className="w-full mb-[20px] border-collapse text-[16px]">
            <thead>
              <tr className="border-b-[2px] border-secondary" style={{ color: rowTextColor }}>
                {tableCol.map((item, index) => (
                  <th
                    className={`p-4 ${index + 1 === tableCol.length ? "" : "border-r-[2px] border-secondary"}`}
                    key={item}
                    style={{ width: colWidths ? colWidths[index] : "auto" }}
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.isArray(tableRow) && tableRow.length > 0 ? (
                tableRow.map((row, rowIndex) => (
                  <tr 
                    className={`border-b-[2px] ${rowIndex === tableRow.length - 1 ? 'border-[#A68BC1]' : 'border-[#F7BCD6]'}`} 
                    style={{ color: rowTextColor }} 
                    key={rowIndex}
                  >
                    {row.map((cell, cellIndex) => (
                      <td 
                        className={`p-4 ${cellIndex + 1 === row.length ? "" : "border-r-[2px] border-secondary"}`} 
                        key={cellIndex}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={tableCol.length} className="text-center p-4">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
