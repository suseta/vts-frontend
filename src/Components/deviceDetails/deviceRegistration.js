import React, { useState, useEffect } from 'react'
import './deviceDetails.css'

import { ubuntuIP } from '../constantVariable'

let DeviceRegistration = () => {
  let initialState = {
    i_imei_no: '',
    s_dvc_typ: '',
    dvc_mdl_name: '',
    dvc_timezone: '',
    dvc_mfg_dt: '',
    dvc_add_dt: '',
    s_atd: '',
    is_ign_wr: false,
    is_air_wr: false
  }

  let [deviceInfo, setDeviceInfo] = useState({
    i_imei_no: '',
    s_dvc_typ: '',
    dvc_mdl_name: '',
    dvc_timezone: '',
    dvc_mfg_dt: '',
    dvc_add_dt: '',
    s_atd: '',
    is_ign_wr: false,
    is_air_wr: false
  })

  let [showToggleValue, setShowToggleValue] = useState(false)
  let toggleInfo = () => {
    setShowToggleValue(prevShowToggleValue => {
      setDeviceInfo(prevData => ({
        ...prevData,
        is_ign_wr: !prevShowToggleValue
      }))
      return !prevShowToggleValue
    })
  }

  let [showIsAirCon, setShowIsAirCon] = useState(false)
  let toggleAirInfo = () => {
    setShowIsAirCon(prevShowToggleValue => {
      setDeviceInfo(prevData => ({
        ...prevData,
        is_air_wr: !prevShowToggleValue
      }))
      return !prevShowToggleValue
    })
  }

  let [deviceType, setDeviceType] = useState({ data: [] })
  useEffect(() => {
    fetch(`${ubuntuIP}/api/v0/getDeviceTypeDetails`)
      .then(response => response.json())
      .then(data => {
        setDeviceType({ data })
      })
      .catch(error => {
        console.error('Error: ', error)
      })
  }, [])

  let [timezone, setTimezone] = useState({ data: [] })
  useEffect(() => {
    fetch(`${ubuntuIP}/api/v0/timezones`)
      .then(response => response.json())
      .then(data => {
        setTimezone({ data })
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

  // let handleChange = e => {
  //   let { name, value } = e.target
  //   setDeviceInfo(prevData => ({ ...prevData, [name]: value }))
  // }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeviceInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };




  const handleSubmit = e => {
    e.preventDefault();
    fetch(`${ubuntuIP}/api/v0/setDeviceDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(deviceInfo)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error occurred while saving device details.'); 
      }
      return response.json();
    })
    .then(data => {
      alert('Device details saved successfully!');
    })
    .catch(error => {
      alert(error.message); // Alert for catch block
    });
  }

  return (
    <div>
      <div className='wrapper'>
        <div className='container'>
          <h2>Device Registration</h2>
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
                <input
                  type='number'
                  id='i_imei_no'
                  name='i_imei_no'
                  required
                  value={deviceInfo.i_imei_no}
                  onChange={handleChange}
                />
              </div>

              {/* <div className='form-group'>
                <label
                  htmlFor='s_sim_no'
                  className={`required-label ${deviceInfo.s_sim_no ? 'required' : ''
                    }`}
                >
                  SIM No.:
                </label>
                <select
                  className='form-select'
                  id='s_sim_no'
                  name='s_sim_no'
                  required
                  value={deviceInfo.s_sim_no}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  {InactiveSimList.data && Array.isArray(InactiveSimList.data.data) ? (
                    InactiveSimList.data.data.map(simList => (
                      <option
                        key={simList.s_sim_no}
                        value={simList.s_sim_no}
                      >
                        {simList.s_sim_no}
                      </option>
                    ))
                  ) : (
                    <option value=''>
                      {InactiveSimList.data && InactiveSimList.data.message
                        ? InactiveSimList.data.message
                        : 'No entities available'}
                    </option>
                  )}
                </select>
              </div>
              {deviceInfo.s_sim_no && (
                <div className='form-group'>
                  <label
                    htmlFor='s_sim_op'
                    className={`required-label ${deviceInfo.s_sim_op ? 'required' : ''
                      }`}
                  >
                    SIM Operator:
                  </label>
                  <input
                    type='text'
                    id='s_sim_op'
                    name='s_sim_op'
                    className='form-control'
                    value={deviceInfo.s_sim_op}
                    readOnly
                  />
                </div>
              )} */}






              <div className='form-group'>
                <label
                  htmlFor='s_dvc_typ'
                  className={`required-label ${deviceInfo.s_dvc_typ ? 'required' : ''
                    }`}
                >
                  Device Type:
                </label>
                <select
                  className='form-select'
                  id='s_dvc_typ'
                  name='s_dvc_typ'
                  required
                  value={deviceInfo.s_dvc_typ}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  {deviceType.data && Array.isArray(deviceType.data.data) ? (
                    deviceType.data.data.map(device => (
                      <option
                        key={device.s_device_name}
                        value={device.s_device_id}
                      >
                        {device.s_device_name}
                      </option>
                    ))
                  ) : (
                    <option value=''>
                      {deviceType.data && deviceType.data.message
                        ? deviceType.data.message
                        : 'No devices available'}
                    </option>
                  )}
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='dvc_mdl_name'>Model Name:</label>
                <input
                  type='text'
                  id='dvc_mdl_name'
                  name='dvc_mdl_name'
                  value={deviceInfo.dvc_mdl_name}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='dvc_timezone'
                  className={`required-label ${deviceInfo.dvc_timezone ? 'required' : ''
                    }`}
                >
                  Timezone:
                </label>
                <select
                  className='form-select'
                  id='dvc_timezone'
                  name='dvc_timezone'
                  required
                  value={deviceInfo.dvc_timezone}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  {timezone.data && Array.isArray(timezone.data.data) ? (
                    timezone.data.data.map(tmz => (
                      <option key={tmz} value={tmz}>
                        {tmz}
                      </option>
                    ))
                  ) : (
                    <option value=''>
                      {timezone.data && timezone.data.message
                        ? timezone.data.message
                        : 'No timezones available'}
                    </option>
                  )}
                </select>
              </div>
              <div className='form-group'>
                <label
                  htmlFor='dvc_mfg_dt'
                  className={`required-label ${deviceInfo.dvc_mfg_dt ? 'required' : ''
                    }`}
                >
                  Manufacture Date:
                </label>
                <input
                  type='date'
                  id='dvc_mfg_dt'
                  name='dvc_mfg_dt'
                  value={deviceInfo.dvc_mfg_dt}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='dvc_add_dt'
                  className={`required-label ${deviceInfo.dvc_add_dt ? 'required' : ''
                    }`}
                >
                  Device Entry Date:
                </label>
                <input
                  type='date'
                  id='dvc_add_dt'
                  name='dvc_add_dt'
                  value={deviceInfo.dvc_add_dt}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='s_atd'>Attendance:</label>
                <select
                  id='s_atd'
                  name='s_atd'
                  value={deviceInfo.s_atd}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  <option value='RF'>RFID</option>
                  <option value='IB'>IButton</option>
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='is_ign_wr'>Ignition Wire Connected:</label>
                <input
                  type='checkbox'
                  id='is_ign_wr'
                  name='is_ign_wr'
                  checked={showToggleValue}
                  onChange={toggleInfo}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='is_air_wr'>Aircondition Wire Connected:</label>
                <input
                  type='checkbox'
                  id='is_air_wr'
                  name='is_air_wr'
                  checked={showIsAirCon}
                  onChange={toggleAirInfo}
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

export default DeviceRegistration
