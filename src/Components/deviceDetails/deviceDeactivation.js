import React, { useState, useEffect } from 'react'
import './deviceDetails.css'

import { ubuntuIP } from '../constantVariable'

let DeviceDeactivation = () => {
  let initialState = {
    i_imei_no: '',
    dvc_dlt_dt: null
  }

  let [deviceInfo, setDeviceInfo] = useState({
    i_imei_no: '',
    dvc_dlt_dt: null,
  })

  let [registerDevice, setRegisterDevice] = useState({ data: [] })
  useEffect(() => {
    fetch(`${ubuntuIP}/api/v0/getActiveDeviceDetails`)
      .then(response => response.json())
      .then(data => {
        setRegisterDevice({ data });
      })
      .catch(error => {
        console.error('Error: ', error)
      })
  }, [])

  let resetForm = () => {
    setDeviceInfo(initialState)
  }

  let refreshPage = () => {
    window.location.reload()
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeviceInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  let handleSubmit = e => {
    e.preventDefault()
    fetch(`${ubuntuIP}/api/v0/deActivateDeviceDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(deviceInfo)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success in Device Entry form:', data)
        alert('Device details saved successfully!')
      })
      .catch(error => {
        console.error('Error:', error)
        alert('Error! Please try again.')
      })
  }

  return (
    <div>
      <div className='wrapper'>
        <div className='container'>
          <h2>Device Deactivation</h2>
          <div className='DeviceInfoForm'>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label
                  htmlFor='i_imei_no'
                  className={`required-label ${deviceInfo.i_imei_no ? 'required' : ''
                    }`}
                >
                  IMEI No.:
                </label>
                <select
                  id='i_imei_no'
                  name='i_imei_no'
                  required
                  value={deviceInfo.i_imei_no}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  {registerDevice.data && Array.isArray(registerDevice.data.data) ? (
                    registerDevice.data.data.map(deviceDataInfo => (
                      <option
                        key={deviceDataInfo.i_imei_no}
                        value={deviceDataInfo.i_imei_no}
                      >
                        {deviceDataInfo.i_imei_no}
                      </option>
                    ))
                  ) : (
                    <option value=''>
                      {registerDevice.data && registerDevice.data.message
                        ? registerDevice.data.message
                        : 'No entities available'}
                    </option>
                  )}
                </select>
              </div>
              <div className='form-group'>
                <label
                  htmlFor='dvc_dlt_dt'
                  className={`required-label ${deviceInfo.dvc_dlt_dt ? 'required' : ''
                    }`}
                >
                  Device Remove Date:
                </label>
                <input
                  type='date'
                  id='dvc_dlt_dt'
                  name='dvc_dlt_dt'
                  value={deviceInfo.dvc_dlt_dt}
                  onChange={handleChange}
                />
              </div>
              <div class='form-buttons'>
                <button type='submit'>Save</button>
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
    </div>
  )
}

export default DeviceDeactivation
