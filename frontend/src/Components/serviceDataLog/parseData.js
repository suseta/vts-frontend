// // parseData.js

// import React, { useState } from 'react';
// import { ubuntuIP } from '../../Components/constantVariable';
// import './parseData.css'; // Import your CSS file for styling

// const ParseData = ({ rowData, s_imei_no, onClose }) => {
//   const [formData, setFormData] = useState(rowData.s_raw_pkt);
//   const [packetType, setPacketType] = useState('');
//   const [fetchedData, setFetchedData] = useState([]);
//   const [fetchAttempted, setFetchAttempted] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const queryString = `?i_imei_no=${s_imei_no}&deviceId=${packetType}&s_raw_pkt=${formData}`;
//     fetch(`${ubuntuIP}/api/v0/getParsedData${queryString}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//       .then(response => response.json())
//       .then(data => {
//         setFetchedData(data.data);
//         console.log("fetched data", data.data);
//         alert('Data fetched successfully!')
//       })
//       .catch(error => {
//         console.error('Error:', error);
//         alert('Error! Please try again.');
//       })
//       .finally(() => {
//         setFetchAttempted(true); // Set fetchAttempted to true after fetch attempt
//       });
//   };

//   return (
//     <div className="modal modal-small">
//       <div className="modal-content">
//         <select value={packetType} onChange={(e) => setPacketType(e.target.value)}>
//           <option value="">Select Packet Type</option>
//           <option value="Rudra">Rudra</option>
//           <option value="NVR">NVR</option>
//         </select>
//         <input type="text" value={formData} onChange={(e) => setFormData(e.target.value)} />
//         <button onClick={handleSubmit}>Submit</button>
//         <div className="table-container">
//           {(fetchAttempted && Object.keys(fetchedData).length === 0) ? (
//             <p>Parsed data is not available.</p>
//           ) : (
//             <table>
//               <thead>
//                 <tr>
//                   {Object.keys(fetchedData).map((key, index) => (
//                     <th key={index}>{key}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   {Object.values(fetchedData).map((value, index) => (
//                     <td key={index}>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
//                   ))}
//                 </tr>
//               </tbody>
//             </table>
//           )}
//         </div>
//         <button onClick={onClose}>Close</button>
//       </div>
//     </div>
//   );
// };

// export default ParseData;



import React, { useState, useEffect } from 'react';
import { ubuntuIP } from '../../Components/constantVariable';
import './parseData.css'; // Import your CSS file for styling

const ParseData = ({ rowData, s_imei_no, onClose }) => {
  const [formData, setFormData] = useState(rowData.s_raw_pkt);
  const [packetType, setPacketType] = useState('');
  const [fetchedData, setFetchedData] = useState([]);
  const [fetchAttempted, setFetchAttempted] = useState(false);

  useEffect(() => {
    // Add event listener when component mounts
    document.addEventListener('click', handleClickOutside);
    return () => {
      // Remove event listener when component unmounts
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    // Close the modal if the click is outside of the modal content
    if (!e.target.closest('.modal-content')) {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryString = `?i_imei_no=${s_imei_no}&deviceId=${packetType}&s_raw_pkt=${formData}`;
    fetch(`${ubuntuIP}/api/v0/getParsedData${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setFetchedData(data.data);
        console.log("fetched data", data.data);
        alert('Data fetched successfully!')
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error! Please try again.');
      })
      .finally(() => {
        setFetchAttempted(true); // Set fetchAttempted to true after fetch attempt
      });
  };

  return (
    <div className="modal modal-small">
      <div className="modal-content">
        <select value={packetType} onChange={(e) => setPacketType(e.target.value)}>
          <option value="">Select Packet Type</option>
          <option value="Rudra">Rudra</option>
          <option value="NVR">NVR</option>
        </select>
        <input type="text" value={formData} onChange={(e) => setFormData(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
        <div className="table-container">
          {(fetchAttempted && Object.keys(fetchedData).length === 0) ? (
            <p>Parsed data is not available.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  {Object.keys(fetchedData).map((key, index) => (
                    <th key={index}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {Object.values(fetchedData).map((value, index) => (
                    <td key={index}>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ParseData;
