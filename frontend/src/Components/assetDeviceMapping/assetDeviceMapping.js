import React, { useState, useEffect } from 'react'
import './assetDeviceMapping.css'
import navLogo from '../../navLogo.jpg'

let AssetDeviceMapping = () => {
  let [assetDeviceMapping, setAssetDeviceMapping] = useState({
    s_entity_id: '',
    s_entity_id_and_name: '',
    s_ad_mp_pur: '',
    asset_dvc_mp_dt: '',
    s_dvc_typ: '',
    s_asset_id: '',
    s_asset_typ: '',
    i_nw_imei_no: '',
    i_old_imei_no: '',
    s_trk_typ: '',
    s_old_sim_no: '',
    s_nw_sim_no: '',
    s_sim_op: '',
    s_mx_spd: '',
    s_crct_spd: '',
    s_svr_eng_name: '',
    s_svr_eng_mail: '',
    s_svr_eng_mb_no: ''
  })

  let currentDate = new Date().toISOString().split('T')[0]

  let [entityMap, setEntityMap] = useState({ data: [] })
  useEffect(() => {
    fetch('http://13.127.103.103:1410/api/v0/getAllEntityNameList')
      .then(response => response.json())
      .then(data => {
        setEntityMap({ data })
      })
      .catch(error => {
        console.error('Error: ', error)
      })
  }, [])

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

  let [assetType, setAssetType] = useState({ data: [] })
  useEffect(() => {
    fetch('http://13.127.103.103:1410/api/v0/getAssetType')
      .then(response => response.json())
      .then(data => {
        setAssetType({ data })
      })
      .catch(error => {
        console.error('Error: ', error)
      })
  }, [])

  let handleChange = e => {
    let { name, value, type, checked } = e.target
    setAssetDeviceMapping(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  let handleSubmit = e => {
    e.preventDefault()
    fetch('http://13.127.103.103:1410/api/v0/setEntityInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(assetDeviceMapping)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success in Asset-Device Mapping Form:', data)
        alert('Asset-device mapped successfully!')
      })
      .catch(error => {
        console.error('Error:', error)
        alert('Error! Please try again.')
      })
    console.log('Asset-device mapping form submitted:', assetDeviceMapping)
  }

  return (
    <div>
      <div class='navbar'>
        <div class='logo-container'>
          <img src={navLogo} alt='Logo' class='logo' />
          <div className='brand-text'>NavitronicX</div>
        </div>
      </div>
      <div className='wrapper'>
        <div className='container'>
          <h2>Asset Device Mapping</h2>
          <div className='AssetDeviceMapping'>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label
                  htmlFor='s_entity_id_and_name'
                  className={`required-label ${
                    assetDeviceMapping.s_entity_id_and_name ? 'required' : ''
                  }`}
                >
                  Entity:
                </label>
                <select
                  className='form-select'
                  id='s_entity_id_and_name'
                  name='s_entity_id_and_name'
                  required
                  value={assetDeviceMapping.s_entity_id_and_name}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  {entityMap.data && Array.isArray(entityMap.data.data) ? (
                    entityMap.data.data.map(entity => (
                      <option
                        key={entity.s_entity_id}
                        value={entity.s_entity_name}
                      >
                        {entity.s_entity_name}
                      </option>
                    ))
                  ) : (
                    <option value=''>
                      {entityMap.data && entityMap.data.message
                        ? entityMap.data.message
                        : 'No entities available'}
                    </option>
                  )}
                </select>
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_asset_id'
                  className={`required-label ${
                    assetDeviceMapping.s_asset_id ? 'required' : ''
                  }`}
                >
                  Asset No.:
                </label>
                <input
                  type='text'
                  id='s_asset_id'
                  name='s_asset_id'
                  required
                  value={assetDeviceMapping.s_asset_id}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_asset_typ'
                  className={`required-label ${
                    assetDeviceMapping.s_asset_typ ? 'required' : ''
                  }`}
                >
                  Asset Type:
                </label>
                <select
                  className='form-select'
                  id='s_asset_typ'
                  name='s_asset_typ'
                  required
                  value={assetDeviceMapping.s_asset_typ}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  {assetType.data && Array.isArray(assetType.data.data) ? (
                    assetType.data.data.map(type => (
                      <option key={type.s_asset_typ} value={type.s_asset_typ}>
                        {type.s_asset_typ}
                      </option>
                    ))
                  ) : (
                    <option value=''>
                      {assetType.data && assetType.data.message
                        ? assetType.data.message
                        : 'No asset types available'}
                    </option>
                  )}
                </select>
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_ad_mp_pur'
                  className={`required-label ${
                    assetDeviceMapping.s_ad_mp_pur ? 'required' : ''
                  }`}
                >
                  Purpose:
                </label>
                <select
                  className='form-select'
                  id='s_ad_mp_pur'
                  name='s_ad_mp_pur'
                  required
                  value={assetDeviceMapping.s_ad_mp_pur}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  <option value='DU'>Device Un-map</option>
                  <option value='NI'>New Installation</option>
                  <option value='SC'>SIM Change</option>
                  <option value='UC'>Unit Change</option>
                </select>
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_dvc_typ'
                  className={`required-label ${
                    assetDeviceMapping.s_dvc_typ ? 'required' : ''
                  }`}
                >
                  Device Type:
                </label>
                <select
                  className='form-select'
                  id='s_dvc_typ'
                  name='s_dvc_typ'
                  required
                  value={assetDeviceMapping.s_dvc_typ}
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
                <label
                  htmlFor='asset_dvc_mp_dt'
                  className={`required-label ${
                    assetDeviceMapping.asset_dvc_mp_dt ? 'required' : ''
                  }`}
                >
                  Asset Device Map Date:
                </label>
                <input
                  type='date'
                  id='asset_dvc_mp_dt'
                  name='asset_dvc_mp_dt'
                  value={assetDeviceMapping.asset_dvc_mp_dt}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='i_nw_imei_no'
                  className={`required-label ${
                    assetDeviceMapping.i_nw_imei_no ? 'required' : ''
                  }`}
                >
                  New Device Id:
                </label>
                <input
                  type='number'
                  id='i_nw_imei_no'
                  name='i_nw_imei_no'
                  value={assetDeviceMapping.i_nw_imei_no}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='i_old_imei_no'
                  className={`required-label ${
                    assetDeviceMapping.i_old_imei_no ? 'required' : ''
                  }`}
                >
                  Existing Device Id:
                </label>
                <input
                  type='number'
                  id='i_old_imei_no'
                  name='i_old_imei_no'
                  value={assetDeviceMapping.i_old_imei_no}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_trk_typ'
                  className={`required-label ${
                    assetDeviceMapping.s_trk_typ ? 'required' : ''
                  }`}
                >
                  Track Type:
                </label>
                <select
                  className='form-select'
                  id='s_trk_typ'
                  name='s_trk_typ'
                  required
                  value={assetDeviceMapping.s_trk_typ}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  <option value='I'>I</option>
                  <option value='L'>L</option>
                  <option value='R'>R</option>
                  <option value='S'>S</option>
                  <option value='T'>T</option>
                </select>
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_old_sim_no'
                  className={`required-label ${
                    assetDeviceMapping.s_old_sim_no ? 'required' : ''
                  }`}
                >
                  Old SIM No.:
                </label>
                <input
                  type='number'
                  id='s_old_sim_no'
                  name='s_old_sim_no'
                  required
                  value={assetDeviceMapping.s_old_sim_no || currentDate}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_nw_sim_no'
                  className={`required-label ${
                    assetDeviceMapping.s_nw_sim_no ? 'required' : ''
                  }`}
                >
                  New SIM No.:
                </label>
                <input
                  type='number'
                  id='s_nw_sim_no'
                  name='s_nw_sim_no'
                  required
                  value={assetDeviceMapping.s_nw_sim_no || currentDate}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_sim_op'
                  className={`required-label ${
                    assetDeviceMapping.s_sim_op ? 'required' : ''
                  }`}
                >
                  SIM Operator:
                </label>
                <select
                  className='form-select'
                  id='s_sim_op'
                  name='s_sim_op'
                  required
                  value={assetDeviceMapping.s_sim_op}
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
                  htmlFor='s_mx_spd'
                  className={`required-label ${
                    assetDeviceMapping.s_mx_spd ? 'required' : ''
                  }`}
                >
                  Max Speed:
                </label>
                <input
                  type='number'
                  id='s_mx_spd'
                  name='s_mx_spd'
                  value={assetDeviceMapping.s_mx_spd}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_crct_spd'
                  className={`required-label ${
                    assetDeviceMapping.s_crct_spd ? 'required' : ''
                  }`}
                >
                  Corrected Speed:
                </label>
                <input
                  type='number'
                  id='s_crct_spd'
                  name='s_crct_spd'
                  value={assetDeviceMapping.s_crct_spd}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_svr_eng_name'
                  className={`required-label ${
                    assetDeviceMapping.s_svr_eng_name ? 'required' : ''
                  }`}
                >
                  Service Engineer Name:
                </label>
                <input
                  type='text'
                  id='s_svr_eng_name'
                  name='s_svr_eng_name'
                  required
                  value={assetDeviceMapping.s_svr_eng_name}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_svr_eng_mail'
                  className={`required-label ${
                    assetDeviceMapping.s_svr_eng_mail ? 'required' : ''
                  }`}
                >
                  Service Engineer Mail:
                </label>
                <input
                  type='text'
                  id='s_svr_eng_mail'
                  name='s_svr_eng_mail'
                  required
                  value={assetDeviceMapping.s_svr_eng_mail}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_svr_eng_mb_no'
                  className={`required-label ${
                    assetDeviceMapping.s_svr_eng_mb_no ? 'required' : ''
                  }`}
                >
                  Service Engineer Mobile No.:
                </label>
                <input
                  type='number'
                  id='s_svr_eng_mb_no'
                  name='s_svr_eng_mb_no'
                  value={assetDeviceMapping.s_svr_eng_mb_no}
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

export default AssetDeviceMapping
