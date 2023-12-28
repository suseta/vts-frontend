import React, { useState } from 'react'
import './deviceDetails.css'
import navLogo from '../../navLogo.jpg'

const DeviceDetailsEntryForm = () => {
  const [deviceInfoData, setDeviceInfoData] = useState({
    imei_no: '',
    sim_no: '',
    sim_op: '',
    dvc_active_status: '',
    dvc_info: '',
    dvc_typ: '',
    dvc_mdl: '',
    dvc_mfg: '',
    dvc_lst_updt_ts: '',
    frmwr_ver: '',
    fuel_info: '',
    temp_info: '',
    RFID_info: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setDeviceInfoData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    fetch(`http://65.2.151.41:1410/api/v0/addDeviceInfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(deviceInfoData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success in Device Details Entry form:', data)
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
          <h2>Device Info Entry</h2>
          <div className='DeviceDetailsEntryForm'>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='imei_no'>IMEI No.:</label>
                <input
                  type='text'
                  id='imei_no'
                  name='imei_no'
                  required
                  value={deviceInfoData.imei_no}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='sim_no'>SIM No.:</label>
                <input
                  type='text'
                  id='sim_no'
                  name='sim_no'
                  value={deviceInfoData.sim_no}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='sim_op'>SIM Operator:</label>
                <select
                    className='form-select'
                    id='sim_op'
                    name='sim_op'
                    required
                    value={deviceInfoData.sim_op}
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
                    <option value=''>Claro Ecuador (internet.claro.com.ec)</option>
                    <option value=''>TRUPHONE (iot.truphone.com)</option>
                  </select>
              </div>
              <div className='form-group'>
                <label htmlFor='dvc_active_status'>Device Active Status:</label>
                <input
                  type='text'
                  id='dvc_active_status'
                  name='dvc_active_status'
                  value={deviceInfoData.dvc_active_status}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='dvc_info'>Device Info.:</label>
                <input
                  type='text'
                  id='dvc_info'
                  name='dvc_info'
                  value={deviceInfoData.dvc_info}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='dvc_typ'>Device Type:</label>
                <select
                    className='form-select'
                    id='dvc_typ'
                    name='dvc_typ'
                    required
                    value={deviceInfoData.dvc_typ}
                    onChange={handleChange}
                  >
                    <option value=''>Select</option>
                  </select>
              </div>
              <div className='form-group'>
                <label htmlFor='dvc_mdl'>Device Model Name:</label>
                <input
                  type='text'
                  id='dvc_mdl'
                  name='dvc_mdl'
                  value={deviceInfoData.dvc_mdl}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='dvc_mfg'>Manufacture Date:</label>
                <input
                  type='date'
                  id='dvc_mfg'
                  name='dvc_mfg'
                  value={deviceInfoData.dvc_mfg}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='dvc_lst_updt_ts'>Last Update:</label>
                <input
                  type='datetime'
                  id='dvc_lst_updt_ts'
                  name='dvc_lst_updt_ts'
                  value={deviceInfoData.dvc_lst_updt_ts}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='frmwr_ver'>Firmware Version:</label>
                <input
                  type='datetime'
                  id='frmwr_ver'
                  name='frmwr_ver'
                  value={deviceInfoData.frmwr_ver}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='fuel_info'>Fuel Info.:</label>
                <input
                  type='datetime'
                  id='fuel_info'
                  name='fuel_info'
                  value={deviceInfoData.fuel_info}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='temp_info'>Temperature Info.:</label>
                <input
                  type='datetime'
                  id='temp_info'
                  name='temp_info'
                  value={deviceInfoData.temp_info}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='RFID_info'>RFID Info.:</label>
                <input
                  type='datetime'
                  id='RFID_info'
                  name='RFID_info'
                  value={deviceInfoData.RFID_info}
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
    </div>
  )
}

export default DeviceDetailsEntryForm
