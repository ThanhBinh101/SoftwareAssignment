import React, { useState } from 'react';
import StatusButton from './StatusButton'; // Assuming you have a StatusButton component

const OfficerTable = ({ title, tableCol, bgColor, titleColor, rowTextColor, colWidths, printerData }) => {
  const [printerStatuses, setPrinterStatuses] = useState(printerData);

  // Function to toggle status and update the backend (if applicable)
  const toggleStatus = async (index, printerId) => {
    // Toggle the status locally without changing other printer data
    const updatedStatuses = printerStatuses.map((printer, i) => {
      if (i === index) {
        const newStatus = printer.status === 'On' ? 'Off' : printer.status === 'Off' ? 'On' : printer.status;
        
        // Create a new printer object with the updated status
        return { ...printer, status: newStatus };
      }
      return printer;
    });

    // Update the state with the new statuses
    setPrinterStatuses(updatedStatuses);

    // Optionally send the updated status to the backend
    // Example of sending the update to the backend:
    try {
      const response = await fetch('http://localhost:3001/api/update-printer-status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          printerId,
          status: updatedStatuses[index].status,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update printer status on the server');
      }
    } catch (error) {
      console.error('Error updating printer status:', error);
      // Handle any error (e.g., show a notification to the user)
    }
  };

  return (
    <div>
      <div className="text-[32px] font-inter font-medium text-center mb-[20px]" style={{ color: titleColor }}>
        {title}
      </div>
      <div className={`bg-${bgColor} p-[40px] border-[2px] border-secondary rounded-[20px]`}>
        <table className="w-full border-collapse text-[16px]">
          <thead>
            <tr className="border-b-[2px] border-secondary" style={{ color: rowTextColor }}>
              {tableCol.map((item, index) => (
                <th
                  className={`p-3 ${index + 1 === tableCol.length ? '' : 'border-r-[2px] border-secondary'}`}
                  key={item}
                  style={{ width: colWidths ? colWidths[index] : 'auto' }}
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {printerStatuses.map((printer, index) => (
              <tr key={printer.id} className="border-b-[2px] border-[#F7BCD6]" style={{ color: rowTextColor }}>
                <td className="p-3 border-r-[2px] border-secondary">{printer.id}</td>
                <td className="p-3 border-r-[2px] border-secondary">{printer.location}</td>
                <td className="p-3 border-r-[2px] border-secondary">{printer.paper}</td>
                <td className="p-3 border-r-[2px] border-secondary">
                  <div className="ml-[20px]">
                    <StatusButton
                      text={printer.status}
                      bgColor={printer.status === 'On' ? '#97D99D' : printer.status === 'Off' ? '#A68BC1' : '#FFEEE8'}
                      textColor={printer.status === 'Using' ? '#A68BC1' : 'white'}
                    />
                  </div>
                </td>
                <td className="ml-[30px] flex items-center w-full">
                  <button
                    onClick={() => toggleStatus(index, printer.id)}
                    className={`underline text-[20px] font-medium font-Ubuntu 
                      ${printer.status === 'Using' ? 'text-[#F7BCD6]' : printer.status === 'On' ? 'text-[#A68BC1]' : 'text-[#97D99D]'}`}
                  >
                    <span>
                      {printer.status === 'Using' ? 'View the queue' : printer.status === 'On' ? 'Turn off printer' : 'Turn on printer'}
                    </span>
                  </button>

                  <button className="ml-auto mr-[50px] p-3">
                    <img src="/Eye_fill.svg" alt="View" />
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={tableCol.length} className="p-[1px]"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OfficerTable;
