import React, { useState, useEffect } from 'react'
import './entityCreation.css'
import navLogo from '../../navLogo.jpg'

const EntityCreationForm = () => {
  const [entityRegDetails, setEntityRegDetails] = useState({
    s_entity_id: '',
    s_entity_name: '',
    s_prnt_entity: '',
    s_entity_typ: '',
    s_entity_grp: '',
    s_entity_mail: '',
    s_entity_pass: '',
    s_entity_mb_no: '',
    s_entity_add: '',
    s_entity_pin: '',
    s_entity_state: '',
    s_entity_city: '',
    b_is_billing: '',
    s_billing_name: '',
    s_billing_typ: '',
    s_billing_md: '',
    s_billing_svr_chrg: '',
    s_msr_unit: '',
    s_gst_no: '',
    s_sap_code: '',
    s_pan_no: '',
    s_svr_typ: '',
    s_mb_actv: '',
    i_ovr_spd_lmt: '',
    s_rep_wp: '',
    s_frc_entity: '',
    b_is_fnd: '',
    s_fnd_rt: ''
  })

  const [entityMap, setEntityMap] = useState([])
  useEffect(() => {
    fetch('http://65.2.31.11:1410/api/v0/setEntityInfo')
      .then(response => response.json())
      .then(data => {
        setEntityMap(data)
      })
      .catch(error => {
        console.error('Error fetching options:', error)
      })
  }, [])

  const [stateList, setStateList] = useState([])
  useEffect(() => {
    fetch('your_api_endpoint')
      .then(response => response.json())
      .then(data => {
        setStateList(data)
      })
      .catch(error => {
        console.error('Error fetching options:', error)
      })
  }, [])

  const [cityList, setCityList] = useState([])
  useEffect(() => {
    fetch('your_api_endpoint')
      .then(response => response.json())
      .then(data => {
        setCityList(data)
      })
      .catch(error => {
        console.error('Error fetching options:', error)
      })
  }, [])

  const [sapCodes, setSapCodes] = useState([])
  useEffect(() => {
    fetch('your_api_endpoint')
      .then(response => response.json())
      .then(data => {
        setSapCodes(data)
      })
      .catch(error => {
        console.error('Error fetching options:', error)
      })
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    setEntityRegDetails(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    fetch('http://65.2.151.41:1410/api/v0/addEntity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entityRegDetails)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success in Entity Registration Form:', data)
        alert('Entity registration done successfully!')
      })
      .catch(error => {
        console.error('Error:', error)
        alert('Error! Please try again.')
      })
    console.log('Entity registration form submitted:', entityRegDetails)
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
          <h2>Entity Creation Form</h2>
          <div className='EntityCreationForm'>
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
                    entityRegDetails.s_entity_name ? 'required' : ''
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
                  {entityMap.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_entity_typ'
                  className={`required-label ${
                    entityRegDetails.s_entity_name ? 'required' : ''
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
                    entityRegDetails.s_entity_name ? 'required' : ''
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
                  <option value='Active'>Attendance</option>
                  <option value='Inactive'>Card</option>
                  <option value='Inactive'>GPS</option>
                  <option value='Inactive'>Fuel Sensor</option>
                  <option value='Inactive'>Both</option>
                </select>
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_entity_mail'
                  className={`required-label ${
                    entityRegDetails.s_entity_name ? 'required' : ''
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
                    entityRegDetails.s_entity_name ? 'required' : ''
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
                    entityRegDetails.s_entity_name ? 'required' : ''
                  }`}
                >
                  Password:
                </label>
                <input
                  type='text'
                  id='s_entity_pass'
                  name='s_entity_pass'
                  value={entityRegDetails.s_entity_pass}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_entity_mb_no'
                  className={`required-label ${
                    entityRegDetails.s_entity_name ? 'required' : ''
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
                    entityRegDetails.s_entity_name ? 'required' : ''
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
                    entityRegDetails.s_entity_name ? 'required' : ''
                  }`}
                >
                  Pincode:
                </label>
                <input
                  type='text'
                  id='s_entity_pin'
                  name='s_entity_pin'
                  value={entityRegDetails.s_entity_pin}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_entity_state'
                  className={`required-label ${
                    entityRegDetails.s_entity_name ? 'required' : ''
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
                  {stateList.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_entity_city'
                  className={`required-label ${
                    entityRegDetails.s_entity_name ? 'required' : ''
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
                  {cityList.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
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
                        entityRegDetails.s_entity_name ? 'required' : ''
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
                    entityRegDetails.s_entity_name ? 'required' : ''
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
                  required
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
                    entityRegDetails.s_entity_name ? 'required' : ''
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
                <label htmlFor='s_prnt_entity'>Replicate Waypoint:</label>
                <select
                  className='form-select'
                  id='s_prnt_entity'
                  name='s_prnt_entity'
                  required
                  value={entityRegDetails.s_prnt_entity}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  {entityMap.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='s_prnt_entity'>Force Entity Map:</label>
                <select
                  className='form-select'
                  id='s_prnt_entity'
                  name='s_prnt_entity'
                  required
                  value={entityRegDetails.s_prnt_entity}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  {entityMap.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
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

export default EntityCreationForm
