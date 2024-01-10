import React, { useState, useEffect } from 'react'
import './assetRegistration.css'
import navLogo from '../../navLogo.jpg'

let AssetRegistrationForm = () => {
  let [assetRegDetails, setAssetRegDetails] = useState({
    s_asset_id: '',
    s_asset_mk: '',
    s_asset_mdl: '',
    s_entity_id_and_name: '',
    s_trans_name: '',
    s_fuel_typ: '',
    s_asset_cap: '',
    s_asset_typ: '',
    s_site_loc: '',
    i_bat_volt: '',
    i_mileage: '',
    idle_time: '',
    reg_dt: '',
    mfg_yr: '',
    reg_vld_dt: '',
    gt_pass_vld_dt: '',
    ftns_crt_vld_dt: '',
    plt_crt_vld_dt: '',
    ins_vld_dt: '',
    state_permit_vld_dt: '',
    nat_permit_vld_dt: '',
    intrnat_permit_vld_dt: '',
    gds_permit_vld_dt: '',
    rd_permit_vld_dt: '',
    bat_pur_dt: '',
    bat_exp_dt: '',
    i_std_km: '',
    peso_lic_dt: '',
    rule_18_dt: '',
    rule_19_dt: '',
    s_fnd_dvc_id: ''
  })

  let currentDate = new Date().toISOString().split('T')[0]

  let currentYear = new Date().getFullYear()
  let yearList = Array.from({ length: 30 }, (_, index) => currentYear - index)

  let hourList = Array.from({ length: 24 }, (_, index) => index + 1)

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

  let [transporter, setTransporter] = useState({ data: [] })
  useEffect(() => {
    fetch('http://13.127.103.103:1410/api/v0/getAllTransporterName')
      .then(response => response.json())
      .then(data => {
        setTransporter({ data })
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

  let [assetCapacity, setAssetCapacity] = useState({ data: [] })
  useEffect(() => {
    fetch('http://13.127.103.103:1410/api/v0/getAssetCapacity')
      .then(response => response.json())
      .then(data => {
        setAssetCapacity({ data })
      })
      .catch(error => {
        console.error('Error: ', error)
      })
  }, [])

  let handleChange = e => {
    let { name, value, type, checked } = e.target
    setAssetRegDetails(prevData => ({
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
      body: JSON.stringify(assetRegDetails)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success in Asset Registration Form:', data)
        alert('Asset registered successfully!')
      })
      .catch(error => {
        console.error('Error:', error)
        alert('Error! Please try again.')
      })
    console.log('Asset registration form submitted:', assetRegDetails)
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
          <h2>Asset Registration</h2>
          <div className='AssetRegistrationForm'>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label
                  htmlFor='s_entity_id_and_name'
                  className={`required-label ${
                    assetRegDetails.s_entity_id_and_name ? 'required' : ''
                  }`}
                >
                  Entity:
                </label>
                <select
                  className='form-select'
                  id='s_entity_id_and_name'
                  name='s_entity_id_and_name'
                  required
                  value={assetRegDetails.s_entity_id_and_name}
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
                <label htmlFor='s_trans_name'>Associated Transporter:</label>
                <select
                  className='form-select'
                  id='s_trans_name'
                  name='s_trans_name'
                  required
                  value={assetRegDetails.s_trans_name}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  {transporter.data && Array.isArray(transporter.data.data) ? (
                    transporter.data.data.map(entity => (
                      <option
                        key={entity.s_trans_name}
                        value={entity.s_trans_name}
                      >
                        {entity.s_trans_name}
                      </option>
                    ))
                  ) : (
                    <option value=''>
                      {transporter.data && transporter.data.message
                        ? transporter.data.message
                        : 'No transporters available'}
                    </option>
                  )}
                </select>
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_asset_id'
                  className={`required-label ${
                    assetRegDetails.s_asset_id ? 'required' : ''
                  }`}
                >
                  Asset No.:
                </label>
                <input
                  type='text'
                  id='s_asset_id'
                  name='s_asset_id'
                  required
                  value={assetRegDetails.s_asset_id}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_asset_typ'
                  className={`required-label ${
                    assetRegDetails.s_asset_typ ? 'required' : ''
                  }`}
                >
                  Asset Type:
                </label>
                <select
                  className='form-select'
                  id='s_asset_typ'
                  name='s_asset_typ'
                  required
                  value={assetRegDetails.s_asset_typ}
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
                <label htmlFor='s_asset_cap'>Asset Capacity:</label>
                <select
                  className='form-select'
                  id='s_asset_cap'
                  name='s_asset_cap'
                  required
                  value={assetRegDetails.s_asset_cap}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  {assetCapacity.data &&
                  Array.isArray(assetCapacity.data.data) ? (
                    assetCapacity.data.data.map(type => (
                      <option key={type.s_asset_cap} value={type.s_asset_cap}>
                        {type.s_asset_cap}
                      </option>
                    ))
                  ) : (
                    <option value=''>
                      {assetCapacity.data && assetCapacity.data.message
                        ? assetCapacity.data.message
                        : 'No asset capacities available'}
                    </option>
                  )}
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='s_asset_mk'>Asset Make:</label>
                <input
                  type='text'
                  id='s_asset_mk'
                  name='s_asset_mk'
                  value={assetRegDetails.s_asset_mk}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='s_asset_mdl'>Asset Model:</label>
                <input
                  type='text'
                  id='s_asset_mdl'
                  name='s_asset_mdl'
                  value={assetRegDetails.s_asset_mdl}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_fuel_typ'
                  className={`required-label ${
                    assetRegDetails.s_fuel_typ ? 'required' : ''
                  }`}
                >
                  Fuel Type:
                </label>
                <select
                  id='s_fuel_typ'
                  name='s_fuel_typ'
                  value={assetRegDetails.s_fuel_typ}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  <option value='P'>Petrol</option>
                  <option value='D'>Diesel</option>
                  <option value='G'>Gas</option>
                  <option value='E'>EV</option>
                </select>
              </div>
              <div className='form-group'>
                <label
                  htmlFor='i_mileage'
                  className={`required-label ${
                    assetRegDetails.i_mileage ? 'required' : ''
                  }`}
                >
                  Mileage (KM/L):
                </label>
                <input
                  type='number'
                  id='i_mileage'
                  name='i_mileage'
                  value={assetRegDetails.i_mileage}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='idle_time'>Idle Time (Hour):</label>
                <select
                  id='idle_time'
                  name='idle_time'
                  value={assetRegDetails.idle_time}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  {hourList.map(hour => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='i_bat_volt'>Battery Volt:</label>
                <input
                  type='number'
                  id='i_bat_volt'
                  name='i_bat_volt'
                  value={assetRegDetails.i_bat_volt}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='mfg_yr'>Manufacture Year:</label>
                <select
                  id='mfg_yr'
                  name='mfg_yr'
                  value={assetRegDetails.mfg_yr}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  {yearList.map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='reg_dt'>Registration Date:</label>
                <input
                  type='date'
                  id='reg_dt'
                  name='reg_dt'
                  value={assetRegDetails.reg_dt || currentDate}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='reg_vld_dt'>Registration Validity:</label>
                <input
                  type='date'
                  id='reg_vld_dt'
                  name='reg_vld_dt'
                  value={assetRegDetails.reg_vld_dt || currentDate}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='ins_vld_dt'>Insurance Validity:</label>
                <input
                  type='date'
                  id='ins_vld_dt'
                  name='ins_vld_dt'
                  value={assetRegDetails.ins_vld_dt || currentDate}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='gt_pass_vld_dt'>Gate Pass Validity:</label>
                <input
                  type='date'
                  id='gt_pass_vld_dt'
                  name='gt_pass_vld_dt'
                  value={assetRegDetails.gt_pass_vld_dt || currentDate}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='bat_pur_dt'>Battery Purchase Date:</label>
                <input
                  type='date'
                  id='bat_pur_dt'
                  name='bat_pur_dt'
                  value={assetRegDetails.bat_pur_dt || currentDate}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='bat_exp_dt'>Battery Expiry Date:</label>
                <input
                  type='date'
                  id='bat_exp_dt'
                  name='bat_exp_dt'
                  value={assetRegDetails.bat_exp_dt || currentDate}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='peso_lic_dt'>PESO License:</label>
                <input
                  type='date'
                  id='peso_lic_dt'
                  name='peso_lic_dt'
                  value={assetRegDetails.peso_lic_dt || currentDate}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='plt_crt_vld_dt'>
                  Pollution Certificate Validity:
                </label>
                <input
                  type='date'
                  id='plt_crt_vld_dt'
                  name='plt_crt_vld_dt'
                  value={assetRegDetails.plt_crt_vld_dt || currentDate}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='ftns_crt_vld_dt'>
                  Fitness Certificate Validity:
                </label>
                <input
                  type='date'
                  id='ftns_crt_vld_dt'
                  name='ftns_crt_vld_dt'
                  value={assetRegDetails.ftns_crt_vld_dt || currentDate}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='rule_18_dt'>Rule 18:</label>
                <input
                  type='date'
                  id='rule_18_dt'
                  name='rule_18_dt'
                  value={assetRegDetails.rule_18_dt || currentDate}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='rule_19_dt'>Rule 19:</label>
                <input
                  type='date'
                  id='rule_19_dt'
                  name='rule_19_dt'
                  value={assetRegDetails.rule_19_dt || currentDate}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='i_std_km'>Standard KM/Day:</label>
                <input
                  type='number'
                  id='i_std_km'
                  name='i_std_km'
                  value={assetRegDetails.i_std_km}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='s_fnd_dvc_id'>FND Device Id:</label>
                <input
                  type='number'
                  id='s_fnd_dvc_id'
                  name='s_fnd_dvc_id'
                  value={assetRegDetails.s_fnd_dvc_id}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='s_site_loc'>Site(Location):</label>
                <input
                  type='number'
                  id='s_site_loc'
                  name='s_site_loc'
                  value={assetRegDetails.s_site_loc}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='state_permit_vld_dt'>
                  State Permit Validity:
                </label>
                <input
                  type='date'
                  id='state_permit_vld_dt'
                  name='state_permit_vld_dt'
                  value={assetRegDetails.state_permit_vld_dt || currentDate}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='nat_permit_vld_dt'>
                  National Permit Validity:
                </label>
                <input
                  type='date'
                  id='nat_permit_vld_dt'
                  name='nat_permit_vld_dt'
                  value={assetRegDetails.nat_permit_vld_dt || currentDate}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='intrnat_permit_vld_dt'>
                  International Permit Validity:
                </label>
                <input
                  type='date'
                  id='intrnat_permit_vld_dt'
                  name='intrnat_permit_vld_dt'
                  value={assetRegDetails.intrnat_permit_vld_dt || currentDate}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='gds_permit_vld_dt'>Goods Tax Validity:</label>
                <input
                  type='date'
                  id='gds_permit_vld_dt'
                  name='gds_permit_vld_dt'
                  value={assetRegDetails.gds_permit_vld_dt || currentDate}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='rd_permit_vld_dt'>Road Tax Validity:</label>
                <input
                  type='date'
                  id='rd_permit_vld_dt'
                  name='rd_permit_vld_dt'
                  value={assetRegDetails.rd_permit_vld_dt || currentDate}
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

export default AssetRegistrationForm
