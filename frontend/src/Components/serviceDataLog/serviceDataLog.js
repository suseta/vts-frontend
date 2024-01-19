import React, { useState } from 'react'
import './serviceDataLog.css'
import navLogo from '../../navLogo.jpg'
import Swal from 'sweetalert2'

let ServiceDataLogForm = () => {
  let [serviceDataLog, setServiceDataLog] = useState({
    i_imei_no: '',
    date: '',
    s_port_no: ''
  })

  let [isFormMinimized, setFormMinimized] = useState(false)
  const toggleFormMinimizer = () => {
    setFormMinimized(!isFormMinimized)
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
    fetch('http://13.127.103.103:1410/api/v0/getDataLog', {
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
      <div className={`navbar ${isFormMinimized ? 'minimized' : ''}`}>
        {/*<div class='navbar'>*/}
        <div class='logo-container'>
          <img src={navLogo} alt='Logo' class='logo' />
          <div className='brand-text'>NavitronicX</div>
          {/*</div>*/}
        </div>
        <div
          className={`form-minimizer ${isFormMinimized ? 'minimized' : ''}`}
          onClick={toggleFormMinimizer}
        >
          {isFormMinimized ? '+' : '-'}
        </div>
      </div>
      {/*<div className='wrapper'>
  <div className='container'>*/}
      <div className={`wrapper ${isFormMinimized ? 'minimized' : ''}`}>
        <div className={`container ${isFormMinimized ? 'minimized' : ''}`}>
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
                  type='text'
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
                  className={`required-label ${
                    serviceDataLog.s_port_no ? 'required' : ''
                  }`}
                >
                  Port No.:
                </label>
                <input
                  type='number'
                  id='s_port_no'
                  name='s_port_no'
                  value={serviceDataLog.s_port_no}
                  onChange={handleChange}
                />
              </div>
              <div class='form-buttons'>
                <button type='submit'>Submit</button>
                <button type='button' className='cancel-button'>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='footer'>© 2023 NavitronicX. All rights reserved.</div>
    </div>
  )
}

export default ServiceDataLogForm
