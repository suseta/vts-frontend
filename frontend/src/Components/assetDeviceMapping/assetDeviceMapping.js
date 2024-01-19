import React, { useState, useEffect } from 'react'
import './assetDeviceMapping.css'
import navLogo from '../../navLogo.jpg'

let AssetDeviceMappingForm = () => {
  let [assetDeviceMapping, setAssetDeviceMapping] = useState({
    s_entity_id: '',
    s_entity_id_and_name: '',
    s_ad_mp_pur: '',
    asset_dvc_mp_dt: null,
    s_dvc_typ: '',
    s_prd_typ: '',
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

  // let handleNameChange = (e, s_entity_id1) => {
  //   let { name, value } = e.target
  //   if (name === 's_entity_id_and_name') {
  //     setAssetDeviceMapping(prevData => ({
  //       ...prevData,
  //       s_entity_id_and_name: value,
  //       s_entity_id: s_entity_id1
  //     }))
  //   }
  // }

  let [entityNames, setEntityNames] = useState({ data: [] })
  useEffect(() => {
    fetch('http://13.201.79.110:1410/api/v0/getAllEntityNameList')
      .then(response => response.json())
      .then(data => {
        setEntityNames({ data })
      })
      .catch(error => {
        console.error('Error: ', error)
      })
  }, [])

  let [assetList, setassetList] = useState({ data: [] })
  let [selectedEntity, setSelectedEntity] = useState('')
  useEffect(() => {
    if (selectedEntity) {
      fetch(
        `http://13.201.79.110:1410/api/v0/getVehicleDetails?s_entity_id=${selectedEntity}`
      )
        .then(response => response.json())
        .then(data => {
          setassetList({ data })
        })
        .catch(error => {
          console.error('Error: ', error)
        })
    }
  }, [selectedEntity])

  let [deviceType, setDeviceType] = useState({ data: [] })
  useEffect(() => {
    fetch('http://13.201.79.110:1410/api/v0/getDeviceTypeDetails')
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
    fetch('http://13.201.79.110:1410/api/v0/getAssetTypeDetails')
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

  let handleNameChange = (e, s_entity_id1) => {
    let { name, value } = e.target
    if (name === 's_entity_id_and_name') {
      setAssetDeviceMapping(prevData => ({
        ...prevData,
        s_entity_id_and_name: value,
        s_entity_id: s_entity_id1
      }))
      setSelectedEntity(s_entity_id1)
    }
  }

  let handleSubmit = e => {
    e.preventDefault()
    fetch('http://13.201.79.110:1410/api/v0/setAssetDeviceMapping', {
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
          <div className='AssetDeviceMappingForm'>
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
                  onChange={e => {
                    let selectedEntity = entityNames.data.data.find(
                      entity => entity.s_entity_name === e.target.value
                    )
                    handleNameChange(e, selectedEntity?.s_entity_id)
                  }}
                >
                  <option value=''>Select</option>
                  {entityNames.data && Array.isArray(entityNames.data.data) ? (
                    entityNames.data.data.map(entity => (
                      <option
                        key={entity.s_entity_id}
                        value={entity.s_entity_name}
                      >
                        {entity.s_entity_name}
                      </option>
                    ))
                  ) : (
                    <option value=''>
                      {entityNames.data && entityNames.data.message
                        ? entityNames.data.message
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
                <select
                  className='form-select'
                  id='s_asset_id'
                  name='s_asset_id'
                  required
                  value={assetDeviceMapping.s_asset_id}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  {assetList.data && Array.isArray(assetList.data.data) ? (
                    assetList.data.data.map(asset => (
                      <option key={asset.s_asset_id} value={asset.s_asset_id}>
                        {asset.s_asset_id}
                      </option>
                    ))
                  ) : (
                    <option value=''>
                      {assetList.data && assetList.data.message
                        ? assetList.data.message
                        : 'No assets available'}
                    </option>
                  )}
                </select>
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
                  htmlFor='s_prd_typ'
                  className={`required-label ${
                    assetDeviceMapping.s_prd_typ ? 'required' : ''
                  }`}
                >
                  Product Type:
                </label>
                <select
                  className='form-select'
                  id='s_prd_typ'
                  name='s_prd_typ'
                  required
                  value={assetDeviceMapping.s_prd_typ}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  <option value='D'>DVR</option>
                  <option value='G'>GPS</option>
                  <option value='N'>NVR</option>
                  <option value='S'>SIM</option>
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
                <label htmlFor='i_nw_imei_no'>
                  New Device Id:
                  {assetDeviceMapping.s_ad_mp_pur !== 'DU' ? (
                    <span
                      className={`required-label ${
                        assetDeviceMapping.i_nw_imei_no ? 'required' : ''
                      }`}
                    ></span>
                  ) : null}
                </label>
                <input
                  type='number'
                  id='i_nw_imei_no'
                  name='i_nw_imei_no'
                  required={assetDeviceMapping.s_ad_mp_pur !== 'DU'}
                  value={assetDeviceMapping.i_nw_imei_no}
                  onChange={handleChange}
                  disabled={assetDeviceMapping.s_ad_mp_pur === 'DU'}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='i_old_imei_no'>
                  Existing Device Id:
                  {assetDeviceMapping.s_ad_mp_pur !== 'NI' &&
                  assetDeviceMapping.s_ad_mp_pur !== 'DU' &&
                  assetDeviceMapping.s_ad_mp_pur !== 'UC' ? (
                    <span
                      className={`required-label ${
                        assetDeviceMapping.i_old_imei_no ? 'required' : ''
                      }`}
                    ></span>
                  ) : null}
                </label>
                <input
                  type='number'
                  id='i_old_imei_no'
                  name='i_old_imei_no'
                  value={assetDeviceMapping.i_old_imei_no}
                  onChange={handleChange}
                  required={
                    assetDeviceMapping.s_ad_mp_pur !== 'NI' &&
                    assetDeviceMapping.s_ad_mp_pur !== 'DU' &&
                    assetDeviceMapping.s_ad_mp_pur !== 'UC'
                  }
                  disabled={assetDeviceMapping.s_ad_mp_pur === 'NI'}
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
                <label htmlFor='s_old_sim_no'>
                  Old SIM No.:
                  {assetDeviceMapping.s_ad_mp_pur !== 'NI' &&
                  assetDeviceMapping.s_ad_mp_pur !== 'UC' ? (
                    <span
                      className={`required-label ${
                        assetDeviceMapping.s_old_sim_no ? 'required' : ''
                      }`}
                    ></span>
                  ) : null}
                </label>
                <input
                  type='number'
                  id='s_old_sim_no'
                  name='s_old_sim_no'
                  required={
                    assetDeviceMapping.s_ad_mp_pur !== 'NI' &&
                    assetDeviceMapping.s_ad_mp_pur !== 'UC'
                  }
                  value={assetDeviceMapping.s_old_sim_no || currentDate}
                  onChange={handleChange}
                  disabled={
                    assetDeviceMapping.s_ad_mp_pur === 'NI' ||
                    assetDeviceMapping.s_ad_mp_pur === 'UC'
                  }
                />
              </div>
              <div className='form-group'>
                <label htmlFor='s_nw_sim_no'>
                  New SIM No.:
                  {assetDeviceMapping.s_ad_mp_pur !== 'DU' ? (
                    <span
                      className={`required-label ${
                        assetDeviceMapping.s_nw_sim_no ? 'required' : ''
                      }`}
                    ></span>
                  ) : null}
                </label>
                <input
                  type='number'
                  id='s_nw_sim_no'
                  name='s_nw_sim_no'
                  required={assetDeviceMapping.s_ad_mp_pur !== 'DU'}
                  value={assetDeviceMapping.s_nw_sim_no || currentDate}
                  onChange={handleChange}
                  disabled={assetDeviceMapping.s_ad_mp_pur === 'DU'}
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
                  <option value='Airtel Gprs'>
                    Airtel GPRS (airtelgprs.com)
                  </option>
                  <option value='Airtel Iot'>Airtel IOT (airteliot.com)</option>
                  <option value='Vodafone www'>Vodafone WWW (www)</option>
                  <option value='Vodafone Iot'>Vodafone IOT (iot.com)</option>
                  <option value='Idea Internet'>
                    Idea Internet (internet)
                  </option>
                  <option value='Idea isafe'>Idea isafe (isafe)</option>
                  <option value='Bsnl'>BSNL (bsnl))</option>
                  <option value='Jio'>Jio (jio)</option>
                  <option value='onSAT'>onSAT (onSAT)</option>
                  <option value='Caburn Telecom'>
                    Caburn Telecom (intelligence.m2m)
                  </option>
                  <option value='DIGI'>DIGI (diginet)</option>
                  <option value='PWCC'>PWCC (public.pccwglobal.hktdcp)</option>
                  <option value='GTT'>GTT (internet.cellinkgy.com)</option>
                  <option value='Digicel'>Digicel (web.digicelgy.com)</option>
                  <option value='Claro Ecuador'>
                    Claro Ecuador (internet.claro.com.ec)
                  </option>
                  <option value='TRUPHONE'>TRUPHONE (iot.truphone.com)</option>
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

export default AssetDeviceMappingForm
