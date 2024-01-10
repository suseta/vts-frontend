import React, { useState, useEffect } from 'react'
import './deviceEntry.css'
import navLogo from '../../navLogo.jpg'

let DeviceEntryForm = () => {
  let [deviceInfo, setDeviceInfo] = useState({
    i_imei_no: '',
    s_sim_no: '',
    s_sim_op: '',
    s_dvc_typ: '',
    dvc_mdl_name: '',
    dvc_timezone: '',
    dvc_mfg_dt: '',
    dvc_add_dt: '',
    dvc_dlt_dt: '',
    s_atd: '',
    s_dvc_status: '',
    is_ign_wr: '',
    is_air_wr: ''
  })

  let [deviceType, setDeviceType] = useState({ data: [] })
  useEffect(() => {
    fetch('http://13.127.103.103:1410/api/v0/deviceTypes')
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
    fetch('http://13.127.103.103:1410/api/v0/timezones')
      .then(response => response.json())
      .then(data => {
        setTimezone({ data })
      })
      .catch(error => {
        console.error('Error: ', error)
      })
  }, [])

  let handleChange = e => {
    let { name, value } = e.target
    setDeviceInfo(prevData => ({ ...prevData, [name]: value }))
  }

  let handleSubmit = e => {
    e.preventDefault()
    fetch(`http://65.2.151.41:1410/api/v0/addDeviceInfo`, {
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
      <div class='navbar'>
        <div class='logo-container'>
          <img src={navLogo} alt='Logo' class='logo' />
          <div class='brand-text'>NavitronicX</div>
        </div>
      </div>
      <div className='wrapper'>
        <div className='container'>
          <h2>Device Entry Form</h2>
          <div className='DeviceEntryForm'>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label
                  htmlFor='i_imei_no'
                  className={`required-label ${
                    deviceInfo.i_imei_no ? 'required' : ''
                  }`}
                >
                  IMEI No.:
                </label>
                <input
                  type='text'
                  id='i_imei_no'
                  name='i_imei_no'
                  required
                  value={deviceInfo.i_imei_no}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_sim_no'
                  className={`required-label ${
                    deviceInfo.s_sim_no ? 'required' : ''
                  }`}
                >
                  SIM No.:
                </label>
                <input
                  type='text'
                  id='s_sim_no'
                  name='s_sim_no'
                  value={deviceInfo.s_sim_no}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_sim_op'
                  className={`required-label ${
                    deviceInfo.s_sim_op ? 'required' : ''
                  }`}
                >
                  SIM Operator:
                </label>
                <select
                  className='form-select'
                  id='s_sim_op'
                  name='s_sim_op'
                  required
                  value={deviceInfo.s_sim_op}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  <option value=''>Airtel GPRS (airtelgprs.com)</option>
                  <option value=''>Airtel IOT (airteliot.com)</option>
                  <option value=''>Vodafone WWW (www)</option>
                  <option value=''>Vodafone IOT (iot.com)</option>
                  <option value=''>Idea Internet (internet)</option>
                  <option value=''>Idea isafe (isafe)</option>
                  <option value=''>BSNL (bsnl))</option>
                  <option value=''>Jio (jio)</option>
                  <option value=''>onSAT (onSAT)</option>
                  <option value=''>Caburn Telecom (intelligence.m2m)</option>
                  <option value=''>DIGI (diginet)</option>
                  <option value=''>PWCC (public.pccwglobal.hktdcp)</option>
                  <option value=''>GTT (internet.cellinkgy.com)</option>
                  <option value=''>Digicel (web.digicelgy.com)</option>
                  <option value=''>
                    Claro Ecuador (internet.claro.com.ec)
                  </option>
                  <option value=''>TRUPHONE (iot.truphone.com)</option>
                </select>
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_dvc_typ'
                  className={`required-label ${
                    deviceInfo.s_dvc_typ ? 'required' : ''
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
                      <option key={device} value={device}>
                        {device}
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
                  className={`required-label ${
                    deviceInfo.dvc_timezone ? 'required' : ''
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
                        : 'No entities available'}
                    </option>
                  )}
                </select>
              </div>
              <div className='form-group'>
                <label
                  htmlFor='dvc_mfg_dt'
                  className={`required-label ${
                    deviceInfo.dvc_mfg_dt ? 'required' : ''
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
                  className={`required-label ${
                    deviceInfo.dvc_add_dt ? 'required' : ''
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
                <label htmlFor='dvc_dlt_dt'>Device Remove Date:</label>
                <input
                  type='datetime'
                  id='dvc_dlt_dt'
                  name='dvc_dlt_dt'
                  value={deviceInfo.dvc_dlt_dt}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_dvc_status'
                  className={`required-label ${
                    deviceInfo.s_dvc_status ? 'required' : ''
                  }`}
                >
                  Device Active Status:
                </label>
                <select
                  id='s_dvc_status'
                  name='s_dvc_status'
                  value={deviceInfo.s_dvc_status}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  <option value='A'>Active</option>
                  <option value='IA'>Inactive</option>
                </select>
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_atd'
                  className={`required-label ${
                    deviceInfo.s_atd ? 'required' : ''
                  }`}
                >
                  Attendance:
                </label>
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
                  value={deviceInfo.is_ign_wr}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='is_air_wr'>Aircondition Wire Connected:</label>
                <input
                  type='checkbox'
                  id='is_air_wr'
                  name='is_air_wr'
                  value={deviceInfo.is_air_wr}
                  onChange={handleChange}
                />
              </div>
              <div class='form-buttons'>
                <button type='submit'>Save</button>
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

export default DeviceEntryForm
