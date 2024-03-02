import React, { useState } from 'react'
import './serviceDataLog.css'
import { ubuntuIP } from '../../Components/constantVariable'
import ParseData from './parseData'

let ServiceDataLogForm = () => {

  let initialState = {
    i_imei_no: '',
    reqDate: '',
    s_port_no: ''
  }

  let [serviceDataLog, setServiceDataLog] = useState({
    i_imei_no: '',
    reqDate: '',
    s_port_no: ''
  })

  let [isPortFound, setIsPortFound] = useState(false)
  let [foundPort, setFoundPort] = useState(null)
  let [tableData, setTableData] = useState(null);

  let resetForm = () => {
    setServiceDataLog(initialState);
    setIsPortFound(false);
    setFoundPort(null);
    setTableData(null);
  }

  let refreshPage = () => {
    window.location.reload()
  }

  let handleFindPort = (e) => {
    e.preventDefault()
    if (serviceDataLog.i_imei_no) {
      fetch(
        `${ubuntuIP}/api/v0/getLatestAccessPortByImei?i_imei_no=${serviceDataLog.i_imei_no}`
      )
        .then(response => response.json())
        .then(data => {
          if (data.data && data.data.length > 0 && data.data[0].s_last_port_no) {
            setFoundPort(data.data[0].s_last_port_no)
            setIsPortFound(true)
            setServiceDataLog(prevData => ({
              ...prevData,
              s_port_no: data.data[0].s_last_port_no
            }))
          } else {
            setFoundPort(null);
            setIsPortFound(false);
            alert('No Port Found For the Input IMEI Number!')
          }
        })
        .catch(error => {
          console.error('Error: ', error)
        })
    }
  }


  let handleChange = e => {
    let { name, value, type, checked } = e.target
    setTableData(null);
    setServiceDataLog(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  let handleSubmit = e => {
    e.preventDefault()
    const queryString = `?i_imei_no=${serviceDataLog.i_imei_no}&reqDate=${serviceDataLog.reqDate}&s_port_no=${serviceDataLog.s_port_no}`;
    fetch(`${ubuntuIP}/api/v0/getServiceDataLog${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setTableData(data);
        if (data.data && data.data.length > 0) {
          alert('Data fetched successfully!')
        }
        else {
          alert('No Data Found For This IMEI Number On The Specified Date')
        }
      })
      .catch(error => {
        console.error('Error:', error)
        alert('Error! Please try again.')
      })
  }

  const [selectedRowData, setSelectedRowData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleLinkButtonClick = (rowData) => {
    setSelectedRowData(rowData);
    setShowModal(true);
  };

  return (
    <div>
      <div className='wrapper'>
        <div className='container'>
          <h2>Service Data Log</h2>
          <div className='ServiceDataLogForm'>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label
                  htmlFor='i_imei_no'
                  className={`required-label ${serviceDataLog.i_imei_no ? 'required' : ''
                    }`}
                >
                  Device Id/IMEI No.:
                </label>
                <input
                  type='number'
                  id='i_imei_no'
                  name='i_imei_no'
                  value={serviceDataLog.i_imei_no}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='date'
                  className={`required-label ${serviceDataLog.reqDate ? 'required' : ''
                    }`}
                >
                  Date:
                </label>
                <input
                  type='date'
                  id='date'
                  name='reqDate'
                  value={serviceDataLog.reqDate}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_port_no'
                  className={`required-label ${isPortFound ? 'required' : ''}`}
                >
                  Port No.:
                </label>
                <input
                  type='number'
                  id='s_port_no'
                  name='s_port_no'
                  value={isPortFound ? foundPort : ''}
                  onChange={handleChange}
                />
                <button
                  type='button'
                  className='find-port-button'
                  onClick={handleFindPort}
                >
                  Find Port
                </button>
              </div>
              <div class='form-buttons'>
                <button type='submit'>Submit</button>
                <button
                  type='button'
                  className='cancel-button'
                  onClick={() => {
                    resetForm()
                  }}
                >
                  Cancel
                </button>
                <button
                  type='button'
                  className='refresh-button'
                  onClick={refreshPage}
                >
                  Refresh
                </button>
              </div>
            </form>
            <div style={{ height: '20px' }}></div>
            <div className="table-container" style={{ display: 'flex', justifyContent: 'center' }}>
              {tableData && tableData.data && tableData.data.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Parse Data</th>
                      <th>Raw Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.data.map((item, index) => (
                      <tr key={index}>
                        <td><button onClick={() => handleLinkButtonClick(item)}>Click</button></td>
                        <td>{item.s_raw_pkt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                tableData ? <p>No data available for the requested information.</p> : null
              )}
            </div>
            {showModal && (
              <ParseData rowData={selectedRowData} s_imei_no={serviceDataLog.i_imei_no} onClose={() => setShowModal(false)} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceDataLogForm
