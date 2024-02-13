import React, { useState, useEffect } from 'react'
import './entityRegistration.css'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

let EntityRegistrationForm = () => {
  let navigate = useNavigate()

  let initialState = {
    s_entity_id: '',
    s_entity_name: '',
    s_prnt_entity: '',
    s_entity_typ: '',
    s_entity_grp: '',
    s_entity_mail: '',
    s_entity_pass: '',
    s_entity_cnf_pass: '',
    s_entity_mb_no: '',
    s_entity_add: '',
    s_entity_pin: '',
    s_entity_country: '',
    s_entity_state: '',
    s_entity_city: '',
    entity_tmz: '',
    b_is_billing: false,
    s_billing_name: '',
    s_billing_typ: '',
    s_billing_md: '',
    s_billing_svr_chrg: 0,
    s_msr_unit: '',
    s_gst_no: '',
    s_sap_code: '',
    s_pan_no: '',
    s_svr_typ: '',
    s_mb_actv: '',
    i_ovr_spd_lmt: 50,
    s_rep_wp: '',
    s_frc_entity_map: '',
    b_is_fnd: false,
    s_fnd_rt: ''
  }

  let [entityRegDetails, setEntityRegDetails] = useState({
    s_entity_id: '',
    s_entity_name: '',
    s_prnt_entity: '',
    s_entity_typ: '',
    s_entity_grp: '',
    s_entity_mail: '',
    s_entity_pass: '',
    s_entity_cnf_pass: '',
    s_entity_mb_no: '',
    s_entity_add: '',
    s_entity_pin: '',
    s_entity_country: '',
    s_entity_state: '',
    s_entity_city: '',
    entity_tmz: '',
    b_is_billing: false,
    s_billing_name: '',
    s_billing_typ: '',
    s_billing_md: '',
    s_billing_svr_chrg: 0,
    s_msr_unit: '',
    s_gst_no: '',
    s_sap_code: '',
    s_pan_no: '',
    s_svr_typ: '',
    s_mb_actv: '',
    i_ovr_spd_lmt: 50,
    s_rep_wp: '',
    s_frc_entity_map: '',
    b_is_fnd: false,
    s_fnd_rt: ''
  })

  let [timezone, setTimezone] = useState({ data: [] })
  useEffect(() => {
    fetch('http://13.201.79.110:1410/api/v0/timezones')
      .then(response => response.json())
      .then(data => {
        setTimezone({ data })
      })
      .catch(error => {
        console.error('Error: ', error)
      })
  }, [])

  let [showPassword, setShowPassword] = useState(false)
  let togglePassword = () => {
    setShowPassword(!showPassword)
  }

  let [showConfirmPassword, setShowConfirmPassword] = useState(false)
  let toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  let [entityMap, setEntityMap] = useState({ data: [] })
  useEffect(() => {
    fetch('http://13.201.79.110:1410/api/v0/getAllEntityNameList')
      .then(response => response.json())
      .then(data => {
        setEntityMap({ data })
      })
      .catch(error => {
        console.error('Error: ', error)
      })
  }, [])

  let [stateList, setStateList] = useState([{ state: [] }])

  useEffect(() => {
    if (entityRegDetails.s_entity_country) {
      fetch(
        `http://13.201.79.110:1410/api/v0/getAllState?s_entity_countryName=${entityRegDetails.s_entity_country}`
      )
        .then(response => response.json())
        .then(data => {
          setStateList(data)
        })
        .catch(error => {
          console.error('Error: ', error)
        })
    }
  }, [entityRegDetails.s_entity_country])

  let [cityList, setCityList] = useState([{ city: [] }])
  useEffect(() => {
    if (entityRegDetails.s_entity_state) {
      let url = `http://13.201.79.110:1410/api/v0/getAllCity?s_entity_countryName=${entityRegDetails.s_entity_country}&s_entity_state=${entityRegDetails.s_entity_state}`
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setCityList(data)
        })
        .catch(error => {
          console.error('Error: ', error)
        })
    }
  }, [entityRegDetails.s_entity_state, entityRegDetails.s_entity_country])

  let [sapCodes, setSapCodes] = useState([])
  useEffect(() => {
    fetch('api')
      .then(response => response.json())
      .then(data => {
        setSapCodes(data)
      })
      .catch(error => {
        console.error('Error: ', error)
      })
  }, [])

  let [passwordMatch, setPasswordMatch] = useState(true)

  let resetForm = () => {
    setEntityRegDetails(initialState)
  }

  let refreshPage = () => {
    window.location.reload()
  }

  let handleChange = e => {
    let { name, value, type, checked } = e.target
    if (name === 's_entity_cnf_pass') {
      let match = value === entityRegDetails.s_entity_pass
      setPasswordMatch(match)
    }
    setEntityRegDetails(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  let handleSubmit = e => {
    e.preventDefault()
    fetch('http://13.201.79.110:1410/api/v0/setEntityInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entityRegDetails)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success in Entity Registration Form:', data)
        alert('Entity created successfully!')
      })
      .catch(error => {
        console.error('Error:', error)
        alert('Error! Please try again.')
      })
    console.log('Entity registration form submitted:', entityRegDetails)
  }

  return (
    <div>
      <div className='wrapper'>
        <div className='container'>
          <h2>Entity Registration Form</h2>
          <div className='EntityRegistrationForm'>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label
                  htmlFor='s_entity_name'
                  className={`required-label ${
                    entityRegDetails.s_entity_name ? 'required' : ''
                  }`}
                >
                  Entity Name:
                </label>
                <input
                  type='text'
                  id='s_entity_name'
                  name='s_entity_name'
                  required
                  value={entityRegDetails.s_entity_name}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_prnt_entity'
                  className={`required-label ${
                    entityRegDetails.s_prnt_entity ? 'required' : ''
                  }`}
                >
                  Parent Entity Name:
                </label>
                <select
                  className='form-select'
                  id='s_prnt_entity'
                  name='s_prnt_entity'
                  required
                  value={entityRegDetails.s_prnt_entity}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  {entityMap.data && Array.isArray(entityMap.data.data) ? (
                    entityMap.data.data.map(entity => (
                      <option
                        key={entity.s_entity_name}
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
                  htmlFor='s_entity_typ'
                  className={`required-label ${
                    entityRegDetails.s_entity_typ ? 'required' : ''
                  }`}
                >
                  Entity Type:
                </label>
                <select
                  id='s_entity_typ'
                  name='s_entity_typ'
                  value={entityRegDetails.s_entity_typ}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  <option value='ASA'>Attendance System Admin</option>
                  <option value='CNR'>Consignor</option>
                  <option value='CNE'>Consignee</option>
                  <option value='ES'>Employee Service</option>
                  <option value='LS'>Lite Services</option>
                  <option value='T'>Transporter</option>
                </select>
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_entity_grp'
                  className={`required-label ${
                    entityRegDetails.s_entity_grp ? 'required' : ''
                  }`}
                >
                  Entity Group:
                </label>
                <select
                  id='s_entity_grp'
                  name='s_entity_grp'
                  value={entityRegDetails.s_entity_grp}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  <option value='ATD'>Attendance</option>
                  <option value='C'>Card</option>
                  <option value='GPS'>GPS</option>
                  <option value='FS'>Fuel Sensor</option>
                  <option value='B'>Both</option>
                </select>
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_entity_mail'
                  className={`required-label ${
                    entityRegDetails.s_entity_mail ? 'required' : ''
                  }`}
                >
                  Approached By (Mail Id):
                </label>
                <input
                  type='text'
                  id='s_entity_mail'
                  name='s_entity_mail'
                  value={entityRegDetails.s_entity_mail}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_entity_id'
                  className={`required-label ${
                    entityRegDetails.s_entity_id ? 'required' : ''
                  }`}
                >
                  Entity/User Id:
                </label>
                <input
                  type='text'
                  id='s_entity_id'
                  name='s_entity_id'
                  value={entityRegDetails.s_entity_id}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_entity_pass'
                  className={`required-label ${
                    entityRegDetails.s_entity_pass ? 'required' : ''
                  }`}
                >
                  Password:
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='s_entity_pass'
                  name='s_entity_pass'
                  value={entityRegDetails.s_entity_pass}
                  onChange={handleChange}
                />
                <button
                  type='button'
                  onClick={togglePassword}
                  style={{
                    marginLeft: '1px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: showPassword ? 'green' : 'grey'
                  }}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </button>
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_entity_cnf_pass'
                  className={`required-label ${
                    entityRegDetails.s_entity_cnf_pass ? 'required' : ''
                  }`}
                >
                  Confirm Password:
                </label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id='s_entity_cnf_pass'
                  name='s_entity_cnf_pass'
                  required
                  value={entityRegDetails.s_entity_cnf_pass}
                  onChange={handleChange}
                />
                <button
                  type='button'
                  onClick={toggleConfirmPassword}
                  style={{
                    marginLeft: '1px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: showConfirmPassword ? 'green' : 'grey'
                  }}
                >
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEye : faEyeSlash}
                  />
                </button>
                {passwordMatch && entityRegDetails.s_entity_cnf_pass && (
                  <p className='success-message'>Password matched!</p>
                )}
                {!passwordMatch && (
                  <p className='error-message'>Password didn't match!</p>
                )}
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_entity_mb_no'
                  className={`required-label ${
                    entityRegDetails.s_entity_mb_no ? 'required' : ''
                  }`}
                >
                  Contact No.:
                </label>
                <input
                  type='text'
                  id='s_entity_mb_no'
                  name='s_entity_mb_no'
                  value={entityRegDetails.s_entity_mb_no}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_entity_add'
                  className={`required-label ${
                    entityRegDetails.s_entity_add ? 'required' : ''
                  }`}
                >
                  Address:
                </label>
                <input
                  type='text'
                  id='s_entity_add'
                  name='s_entity_add'
                  value={entityRegDetails.s_entity_add}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_entity_pin'
                  className={`required-label ${
                    entityRegDetails.s_entity_pin ? 'required' : ''
                  }`}
                >
                  Pincode:
                </label>
                <input
                  type='number'
                  id='s_entity_pin'
                  name='s_entity_pin'
                  value={entityRegDetails.s_entity_pin}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_entity_country'
                  className={`required-label ${
                    entityRegDetails.s_entity_country ? 'required' : ''
                  }`}
                >
                  Country:
                </label>
                <select
                  id='s_entity_country'
                  name='s_entity_country'
                  required
                  value={entityRegDetails.s_entity_country}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  <option value='BT'>Bhutan</option>
                  <option value='CN'>China</option>
                  <option value='IN'>India</option>
                  <option value='NP'>Nepal</option>
                </select>
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_entity_state'
                  className={`required-label ${
                    entityRegDetails.s_entity_state ? 'required' : ''
                  }`}
                >
                  State:
                </label>
                <select
                  className='form-select'
                  id='s_entity_state'
                  name='s_entity_state'
                  required
                  value={entityRegDetails.s_entity_state}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  {stateList && Array.isArray(stateList.state) ? (
                    stateList.state.map(state => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))
                  ) : (
                    <option value=''>
                      {stateList && stateList.message
                        ? stateList.message
                        : 'No states available'}
                    </option>
                  )}
                </select>
              </div>

              <div className='form-group'>
                <label
                  htmlFor='s_entity_city'
                  className={`required-label ${
                    entityRegDetails.s_entity_city ? 'required' : ''
                  }`}
                >
                  City:
                </label>
                <select
                  className='form-select'
                  id='s_entity_city'
                  name='s_entity_city'
                  required
                  value={entityRegDetails.s_entity_city}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  {cityList && Array.isArray(cityList.city) ? (
                    cityList.city.map(city => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))
                  ) : (
                    <option value=''>
                      {cityList && cityList.message
                        ? cityList.message
                        : 'No cities available'}
                    </option>
                  )}
                </select>
              </div>
              <div className='form-group'>
                <label
                  htmlFor='entity_tmz'
                  className={`required-label ${
                    entityRegDetails.entity_tmz ? 'required' : ''
                  }`}
                >
                  Timezone:
                </label>
                <select
                  className='form-select'
                  id='entity_tmz'
                  name='entity_tmz'
                  required
                  value={entityRegDetails.entity_tmz}
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
                <label htmlFor='b_is_billing'>Billing:</label>
                <input
                  type='checkbox'
                  id='b_is_billing'
                  name='b_is_billing'
                  value={entityRegDetails.b_is_billing}
                  onChange={handleChange}
                />
              </div>
              {entityRegDetails.b_is_billing && (
                <>
                  <div className='form-group'>
                    <label htmlFor='s_billing_svr_chrg'>Service Charge:</label>
                    <input
                      type='text'
                      id='s_billing_svr_chrg'
                      name='s_billing_svr_chrg'
                      value={entityRegDetails.s_billing_svr_chrg}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label
                      htmlFor='s_billing_name'
                      className={`required-label ${
                        entityRegDetails.s_billing_name ? 'required' : ''
                      }`}
                    >
                      Billing Name:
                    </label>
                    <input
                      type='text'
                      id='s_billing_name'
                      name='s_billing_name'
                      value={entityRegDetails.s_billing_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}
              <div className='form-group'>
                <label htmlFor='s_billing_name'>Billing Name:</label>
                <input
                  type='text'
                  id='s_billing_name'
                  name='s_billing_name'
                  value={entityRegDetails.s_billing_name}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='s_billing_typ'>Billing Type:</label>
                <select
                  id='s_billing_typ'
                  name='s_billing_typ'
                  value={entityRegDetails.s_billing_typ}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  <option value='DNSC'>DVR/NVR Service Charges</option>
                  <option value='GSC'>GPS Service Charges</option>
                  <option value='HC'>Hiring Charges/Trip</option>
                  <option value='ES'>Service For Rental Unit Per Month</option>
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='s_billing_md'>Billing Mode:</label>
                <select
                  id='s_billing_md'
                  name='s_billing_md'
                  value={entityRegDetails.s_billing_md}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  <option value='AB'>Advance Billing</option>
                  <option value='FN'>Fort Night</option>
                  <option value='MEB'>Month End Billing</option>
                  <option value='MTOM'>More Than One Month</option>
                  <option value='T'>Trial</option>
                </select>
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_msr_unit'
                  className={`required-label ${
                    entityRegDetails.s_msr_unit ? 'required' : ''
                  }`}
                >
                  Measurement Unit:
                </label>
                <select
                  id='s_msr_unit'
                  name='s_msr_unit'
                  value={entityRegDetails.s_msr_unit}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  <option value='KM'>Kilometer (KM)</option>
                  <option value='M'>Meter (M)</option>
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='s_gst_no'>GST No.:</label>
                <input
                  type='text'
                  id='s_gst_no'
                  name='s_gst_no'
                  value={entityRegDetails.s_gst_no}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='s_sap_code'>SAP Code:</label>
                <select
                  className='form-select'
                  id='s_sap_code'
                  name='s_sap_code'
                  value={entityRegDetails.s_sap_code}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  {sapCodes.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='s_pan_no'>PAN Card No.:</label>
                <input
                  type='text'
                  id='s_pan_no'
                  name='s_pan_no'
                  value={entityRegDetails.s_pan_no}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='s_svr_typ'>Service Type:</label>
                <select
                  id='s_svr_typ'
                  name='s_svr_typ'
                  value={entityRegDetails.s_svr_typ}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  <option value='D'>Default</option>
                  <option value='L'>Lite</option>
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='s_mb_actv'>Mobile Activation:</label>
                <select
                  id='s_mb_actv'
                  name='s_mb_actv'
                  value={entityRegDetails.s_mb_actv}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  <option value='Y'>Yes</option>
                  <option value='N'>No</option>
                </select>
              </div>
              <div className='form-group'>
                <label
                  htmlFor='i_ovr_spd_lmt'
                  className={`required-label ${
                    entityRegDetails.i_ovr_spd_lmt ? 'required' : ''
                  }`}
                >
                  Overspeed Limit:
                </label>
                <input
                  type='number'
                  id='i_ovr_spd_lmt'
                  name='i_ovr_spd_lmt'
                  value={entityRegDetails.i_ovr_spd_lmt}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='s_rep_wp'>Replicate Waypoint:</label>
                <select
                  className='form-select'
                  id='s_rep_wp'
                  name='s_rep_wp'
                  value={entityRegDetails.s_rep_wp}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  {entityMap.data && Array.isArray(entityMap.data.data) ? (
                    entityMap.data.data.map(entity => (
                      <option
                        key={entity.s_entity_name}
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
                <label htmlFor='s_frc_entity_map'>Force Entity Map:</label>
                <select
                  className='form-select'
                  id='s_frc_entity_map'
                  name='s_frc_entity_map'
                  value={entityRegDetails.s_frc_entity_map}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  {entityMap.data && Array.isArray(entityMap.data.data) ? (
                    entityMap.data.data.map(entity => (
                      <option
                        key={entity.s_entity_name}
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
                <label htmlFor='b_is_billing'>FND Rate:</label>
                <input
                  type='checkbox'
                  id='b_is_fnd'
                  name='b_is_fnd'
                  value={entityRegDetails.b_is_fnd}
                  onChange={handleChange}
                />
              </div>
              {entityRegDetails.b_is_fnd && (
                <div className='form-group'>
                  <label htmlFor='s_fnd_rt'>FND Rate:</label>
                  <input
                    type='number'
                    id='s_fnd_rt'
                    name='s_fnd_rt'
                    value={entityRegDetails.s_fnd_rt}
                    onChange={handleChange}
                  />
                </div>
              )}
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

export default EntityRegistrationForm
