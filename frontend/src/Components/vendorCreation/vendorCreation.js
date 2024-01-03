import React, { useState, useEffect } from 'react'
import './vendorCreation.css'
import navLogo from '../../navLogo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const VendorCreationForm = () => {
  const currentDate = new Date().toISOString().split('T')[0]
  const defaultEndDate = () => {
    const oneYearLater = new Date()
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1)
    return oneYearLater.toISOString().split('T')[0]
  }

  const [vendorRegDetails, setVendorRegDetails] = useState({
    s_vdr_id: '',
    s_vdr_name: '',
    s_entity_name: '',
    vdr_tmz: '',
    s_vdr_add: '',
    s_vdr_mail: '',
    s_vdr_mb_no: '',
    s_vdr_usr: '',
    s_vdr_pass: '',
    s_vdr_cnf_pass: '',
    s_vdr_inact_tm: '',
    s_vdr_start_dt: '',
    s_vdr_due_dt: defaultEndDate(),
    s_vdr_ext_dt: defaultEndDate(),
    s_vdr_act_status: '',
    s_vdr_pan: '',
    s_vh_sub_sync: '',
    s_vh_sub_end: '',
    b_is_bank: false,
    s_vdr_bnk: '',
    s_vdr_brn: '',
    s_vdr_acc_no: '',
    s_vdr_ifsc_cd: ''
  })

  const [showBankingInfo, setShowBankingInfo] = useState(false)
  const toggleBankingInfo = () => {
    setShowBankingInfo(!showBankingInfo)
  }

  const [showPassword, setShowPassword] = useState(false)
  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const [entityMap, setEntityMap] = useState({ data: [] })
  useEffect(() => {
    fetch('http://65.2.31.11:1410/api/v0/getAllEntityNameList')
      .then(response => response.json())
      .then(data => {
        setEntityMap({ data })
      })
      .catch(error => {
        console.error('Error: ', error)
      })
  }, [])

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setVendorRegDetails(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    fetch('http://65.2.31.11:1410/api/v0/setEntityInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(vendorRegDetails)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success in Vendor Creation Form:', data)
        alert('Vendor created successfully!')
      })
      .catch(error => {
        console.error('Error:', error)
        alert('Error! Please try again.')
      })
    console.log('Vendor creation form submitted:', vendorRegDetails)
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
          <h2>Transporter/Vendor Creation Form</h2>
          <div className='VendorCreationForm'>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label
                  htmlFor='s_entity_name'
                  className={`required-label ${
                    vendorRegDetails.s_entity_name ? 'required' : ''
                  }`}
                >
                  Entity:
                </label>
                <select
                  className='form-select'
                  id='s_entity_name'
                  name='s_entity_name'
                  required
                  value={vendorRegDetails.s_entity_name}
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
                  htmlFor='s_vdr_id'
                  className={`required-label ${
                    vendorRegDetails.s_vdr_id ? 'required' : ''
                  }`}
                >
                  Vendor Id:
                </label>
                <input
                  type='text'
                  id='s_vdr_id'
                  name='s_vdr_id'
                  required
                  value={vendorRegDetails.s_vdr_id}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_vdr_name'
                  className={`required-label ${
                    vendorRegDetails.s_vdr_name ? 'required' : ''
                  }`}
                >
                  Vendor Name:
                </label>
                <input
                  type='text'
                  id='s_vdr_name'
                  name='s_vdr_name'
                  required
                  value={vendorRegDetails.s_vdr_name}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_vdr_add'
                  className={`required-label ${
                    vendorRegDetails.s_vdr_add ? 'required' : ''
                  }`}
                >
                  Address:
                </label>
                <input
                  type='text'
                  id='s_vdr_add'
                  name='s_vdr_add'
                  required
                  value={vendorRegDetails.s_vdr_add}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_vdr_mail'
                  className={`required-label ${
                    vendorRegDetails.s_vdr_mail ? 'required' : ''
                  }`}
                >
                  Mail Id:
                </label>
                <input
                  type='text'
                  id='s_vdr_mail'
                  name='s_vdr_mail'
                  required
                  value={vendorRegDetails.s_vdr_mail}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_vdr_mb_no'
                  className={`required-label ${
                    vendorRegDetails.s_vdr_mb_no ? 'required' : ''
                  }`}
                >
                  Mobile No.:
                </label>
                <input
                  type='number'
                  id='s_vdr_mb_no'
                  name='s_vdr_mb_no'
                  required
                  value={vendorRegDetails.s_vdr_mb_no}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='vdr_tmz'
                  className={`required-label ${
                    vendorRegDetails.vdr_tmz ? 'required' : ''
                  }`}
                >
                  Timezone:
                </label>
                <input
                  type='text'
                  id='vdr_tmz'
                  name='vdr_tmz'
                  required
                  value={vendorRegDetails.vdr_tmz}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_vdr_usr'
                  className={`required-label ${
                    vendorRegDetails.s_vdr_usr ? 'required' : ''
                  }`}
                >
                  Username:
                </label>
                <input
                  type='text'
                  id='s_vdr_usr'
                  name='s_vdr_usr'
                  required
                  value={vendorRegDetails.s_vdr_usr}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_vdr_pass'
                  className={`required-label ${
                    vendorRegDetails.s_vdr_pass ? 'required' : ''
                  }`}
                >
                  Password:
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='s_vdr_pass'
                  name='s_vdr_pass'
                  required
                  value={vendorRegDetails.s_vdr_pass}
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
                  htmlFor='s_vdr_cnf_pass'
                  className={`required-label ${
                    vendorRegDetails.s_vdr_cnf_pass ? 'required' : ''
                  }`}
                >
                  Confirm Password:
                </label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id='s_vdr_cnf_pass'
                  name='s_vdr_cnf_pass'
                  required
                  value={vendorRegDetails.s_vdr_cnf_pass}
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
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_vdr_inact_tm'
                  className={`required-label ${
                    vendorRegDetails.s_vdr_inact_tm ? 'required' : ''
                  }`}
                >
                  Inactive Time:
                </label>
                <select
                  id='s_vdr_inact_tm'
                  name='s_vdr_inact_tm'
                  required
                  value={vendorRegDetails.s_vdr_inact_tm}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  <option value='1/2'>1/2</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='12'>12</option>
                  <option value='24'>24</option>
                  <option value='48'>48</option>
                </select>
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_vdr_start_dt'
                  className={`required-label ${
                    vendorRegDetails.s_vdr_start_dt ? 'required' : ''
                  }`}
                >
                  Subscription Date:
                </label>
                <input
                  type='date'
                  id='s_vdr_start_dt'
                  name='s_vdr_start_dt'
                  value={vendorRegDetails.s_vdr_start_dt || currentDate}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_vdr_due_dt'
                  className={`required-label ${
                    vendorRegDetails.s_vdr_due_dt ? 'required' : ''
                  }`}
                >
                  Subscription Due Date:
                </label>
                <input
                  type='date'
                  id='s_vdr_due_dt'
                  name='s_vdr_due_dt'
                  value={vendorRegDetails.s_vdr_due_dt || currentDate}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='s_vdr_ext_dt'>
                  Subscription Extension Date:
                </label>
                <input
                  type='date'
                  id='s_vdr_ext_dt'
                  name='s_vdr_ext_dt'
                  value={vendorRegDetails.s_vdr_ext_dt || currentDate}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='s_vdr_act_status'>Active Status:</label>
                <select
                  id='s_vdr_act_status'
                  name='s_vdr_act_status'
                  value={vendorRegDetails.s_vdr_act_status}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  <option value='Y'>Yes</option>
                  <option value='N'>No</option>
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='s_vdr_pan'>PAN Card No.:</label>
                <input
                  type='text'
                  id='s_vdr_pan'
                  name='s_vdr_pan'
                  value={vendorRegDetails.s_vdr_pan}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='s_vh_sub_sync'>
                  All Vehicle Subscription Start:
                </label>
                <select
                  id='s_vh_sub_sync'
                  name='s_vh_sub_sync'
                  value={vendorRegDetails.s_vh_sub_sync}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  <option value='Y'>Yes</option>
                  <option value='N'>No</option>
                </select>
                <p className='small-info'>
                  (All vehicles subscription will start when transporter
                  subscription starts)
                </p>
              </div>
              <div className='form-group'>
                <label htmlFor='s_vh_sub_end'>
                  All Vehicle Subscription End:
                </label>
                <select
                  id='s_vh_sub_end'
                  name='s_vh_sub_end'
                  value={vendorRegDetails.s_vh_sub_end}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  <option value='Y'>Yes</option>
                  <option value='N'>No</option>
                </select>
                <p className='small-info'>
                  (All vehicles subscription will end when transporter
                  subscription ends)
                </p>
              </div>
              <div className='form-group'>
                <label htmlFor='b_is_bank'>Banking Details:</label>
                <input
                  type='checkbox'
                  id='b_is_bank'
                  name='b_is_bank'
                  value={vendorRegDetails.b_is_bank}
                  checked={showBankingInfo}
                  onChange={toggleBankingInfo}
                />
              </div>
              {showBankingInfo && (
                <>
                  <div className='form-group'>
                    <label
                      htmlFor='s_vdr_bnk'
                      className={`required-label ${
                        vendorRegDetails.s_vdr_bnk ? 'required' : ''
                      }`}
                    >
                      Bank Name:
                    </label>
                    <input
                      type='text'
                      id='s_vdr_bnk'
                      name='s_vdr_bnk'
                      required
                      value={vendorRegDetails.s_vdr_bnk}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label
                      htmlFor='s_vdr_brn'
                      className={`required-label ${
                        vendorRegDetails.s_vdr_brn ? 'required' : ''
                      }`}
                    >
                      Branch Name:
                    </label>
                    <input
                      type='text'
                      id='s_vdr_brn'
                      name='s_vdr_brn'
                      required
                      value={vendorRegDetails.s_vdr_brn}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label
                      htmlFor='s_vdr_acc_no'
                      className={`required-label ${
                        vendorRegDetails.s_vdr_acc_no ? 'required' : ''
                      }`}
                    >
                      Account No.:
                    </label>
                    <input
                      type='number'
                      id='s_vdr_acc_no'
                      name='s_vdr_acc_no'
                      required
                      value={vendorRegDetails.s_vdr_acc_no}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label
                      htmlFor='s_vdr_ifsc_cd'
                      className={`required-label ${
                        vendorRegDetails.s_vdr_ifsc_cd ? 'required' : ''
                      }`}
                    >
                      IFSC Code:
                    </label>
                    <input
                      type='text'
                      id='s_vdr_ifsc_cd'
                      name='s_vdr_ifsc_cd'
                      required
                      value={vendorRegDetails.s_vdr_ifsc_cd}
                      onChange={handleChange}
                    />
                  </div>
                </>
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

export default VendorCreationForm
