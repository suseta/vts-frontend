import React, { useState } from 'react'
import './serviceDataLog.css'
import { useNavigate } from 'react-router-dom'

let ServiceDataLogForm = () => {
  let navigate = useNavigate()

  let initialState = {
    i_imei_no: '',
    date: '',
    s_port_no: ''
  }

  let [serviceDataLog, setServiceDataLog] = useState({
    i_imei_no: '',
    date: '',
    s_port_no: ''
  })

  let [isPortFound, setIsPortFound] = useState(false)
  let [foundPort, setFoundPort] = useState(null)

  let resetForm = () => {
    setServiceDataLog(initialState)
  }

  let refreshPage = () => {
    window.location.reload()
  }

  let handleFindPort = () => {
    // logic need to be added here
    let port = '1234'
    setFoundPort(port)
    setIsPortFound(true)
  }

  let handleChange = e => {
    let { name, value, type, checked } = e.target
    setServiceDataLog(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  let handleSubmit = e => {
    e.preventDefault()
    fetch('http://13.201.79.110:1603/api/v0/getDataLog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(serviceDataLog)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success in Service Data Log Form:', data)
        alert('Data fetched successfully!')
      })
      .catch(error => {
        console.error('Error:', error)
        alert('Error! Please try again.')
      })
    console.log('Service Data Log form submitted:', serviceDataLog)
  }

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
                  className={`required-label ${
                    serviceDataLog.i_imei_no ? 'required' : ''
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
                  className={`required-label ${
                    serviceDataLog.date ? 'required' : ''
                  }`}
                >
                  Date:
                </label>
                <input
                  type='date'
                  id='date'
                  name='date'
                  value={serviceDataLog.date}
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
                  value={isPortFound ? foundPort : serviceDataLog.s_port_no}
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
          </div>
        </div>
      </div>
      {/*<div className='footer'>© 2023 NavitronicX. All rights reserved.</div>*/}
    </div>
  )
}

export default ServiceDataLogForm
