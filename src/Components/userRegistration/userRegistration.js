import React, { useState, useEffect } from 'react'
import './userRegistration.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import { ubuntuIP } from '../../Components/constantVariable'

let UserRegistrationForm = () => {
  let initialState = {
    s_entity_id: '',
    s_entity_id_and_name: '',
    s_user_type:'',
    s_trans_id: '',
    s_trans_name: '',
    trans_tmz: '',
    s_trans_add: '',
    s_trans_mail: '',
    s_trans_mb_no: '',
    s_trans_usr: '',
    s_trans_pass: '',
    s_trans_cnf_pass: '',
    s_trans_inact_tm: '',
    s_trans_start_dt: null,
    s_trans_due_dt: null,
    s_trans_ext_dt: null,
    s_trans_act_status: '',
    s_trans_pan: '',
    s_vh_sub_sync: '',
    s_vh_sub_end: '',
    b_is_bank: false,
    s_trans_bnk: '',
    s_trans_brn: '',
    s_trans_acc_no: '',
    s_trans_ifsc_cd: ''
  }

  let currentDate = new Date().toISOString().split('T')[0]
  let defaultEndDate = () => {
    let oneYearLater = new Date()
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1)
    return oneYearLater.toISOString().split('T')[0]
  }

  let [userRegDetails, setUserRegDetails] = useState({
    s_entity_id: '',
    s_entity_id_and_name: '',
    s_user_type:'',
    s_trans_id: '',
    s_trans_name: '',
    trans_tmz: '',
    s_trans_add: '',
    s_trans_mail: '',
    s_trans_mb_no: '',
    s_trans_usr: '',
    s_trans_pass: '',
    s_trans_cnf_pass: '',
    s_trans_inact_tm: '',
    s_trans_start_dt: null,
    s_trans_due_dt: null,
    s_trans_ext_dt: null,
    s_trans_act_status: '',
    s_trans_pan: '',
    s_vh_sub_sync: '',
    s_vh_sub_end: '',
    b_is_bank: false,
    s_trans_bnk: '',
    s_trans_brn: '',
    s_trans_acc_no: '',
    s_trans_ifsc_cd: ''
  })

  let [showBankingInfo, setShowBankingInfo] = useState(false)
  let toggleBankingInfo = () => {
    setShowBankingInfo(!showBankingInfo)
  }

  let [showPassword, setShowPassword] = useState(false)
  let togglePassword = () => {
    setShowPassword(!showPassword)
  }

  let [showConfirmPassword, setShowConfirmPassword] = useState(false)
  let toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }
  let handleNameChange = (e, s_entity_id1) => {
    let { name, value } = e.target
    if (name === 's_entity_id_and_name') {
      setUserRegDetails(prevData => ({
        ...prevData,
        s_entity_id_and_name: value,
        s_entity_id: s_entity_id1
      }))
    }
  }
  let [entityNames, setEntityNames] = useState({ data: [] })
  useEffect(() => {
    fetch(`${ubuntuIP}/api/v0/getAllEntityNameList`)
      .then(response => response.json())
      .then(data => {
        setEntityNames({ data })
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

  let [passwordMatch, setPasswordMatch] = useState(true)

  let resetForm = () => {
    setUserRegDetails(initialState)
  }

  let refreshPage = () => {
    window.location.reload()
  }

  let handleChange = e => {
    let { name, value, type, checked } = e.target
    if (name === 's_trans_cnf_pass') {
      let match = value === userRegDetails.s_trans_pass
      setPasswordMatch(match)
    }
    setUserRegDetails(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  const handleSubmit = e => {
    e.preventDefault();
    fetch(`${ubuntuIP}/api/v0/setUserInfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userRegDetails)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error occurred while creating user.'); 
      }
      return response.json();
    })
    .then(data => {
      alert('User created successfully!');
    })
    .catch(error => {
      alert(error.message); 
    });
  }

  return (
    <div>
      <div className='wrapper'>
        <div className='container'>
          <h2>User Creation Form</h2>
          <div className='UserRegistrationForm'>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label
                  htmlFor='s_entity_id_and_name'
                  className={`required-label ${
                    userRegDetails.s_entity_id_and_name ? 'required' : ''
                  }`}
                >
                  Entity:
                </label>
                <select
                  className='form-select'
                  id='s_entity_id_and_name'
                  name='s_entity_id_and_name'
                  required
                  value={userRegDetails.s_entity_id_and_name}
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
                  htmlFor='s_user_type'
                  className={`required-label ${
                    userRegDetails.s_user_type ? 'required' : ''
                  }`}
                >
                  User Role:
                </label>
                <select
                  id='s_user_type'
                  name='s_user_type'
                  required
                  value={userRegDetails.s_user_type}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  <option value='plant'>Plant</option>
                  <option value='department'>Department</option>
                  <option value='transporter'>Transporter</option>
                  <option value='truckOwner'>Truck Owner</option>
                  <option value='user'>User</option>
                </select>
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_trans_id'
                  className={`required-label ${
                    userRegDetails.s_trans_id ? 'required' : ''
                  }`}
                >
                  User Id:
                </label>
                <input
                  type='text'
                  id='s_trans_id'
                  name='s_trans_id'
                  required
                  value={userRegDetails.s_trans_id}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_trans_name'
                  className={`required-label ${
                    userRegDetails.s_trans_name ? 'required' : ''
                  }`}
                >
                  Name:
                </label>
                <input
                  type='text'
                  id='s_trans_name'
                  name='s_trans_name'
                  required
                  value={userRegDetails.s_trans_name}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_trans_add'
                  className={`required-label ${
                    userRegDetails.s_trans_add ? 'required' : ''
                  }`}
                >
                  Address:
                </label>
                <input
                  type='text'
                  id='s_trans_add'
                  name='s_trans_add'
                  required
                  value={userRegDetails.s_trans_add}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_trans_mail'
                  className={`required-label ${
                    userRegDetails.s_trans_mail ? 'required' : ''
                  }`}
                >
                  Mail Id:
                </label>
                <input
                  type='text'
                  id='s_trans_mail'
                  name='s_trans_mail'
                  required
                  value={userRegDetails.s_trans_mail}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_trans_mb_no'
                  className={`required-label ${
                    userRegDetails.s_trans_mb_no ? 'required' : ''
                  }`}
                >
                  Mobile No.:
                </label>
                <input
                  type='number'
                  id='s_trans_mb_no'
                  name='s_trans_mb_no'
                  required
                  value={userRegDetails.s_trans_mb_no}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='trans_tmz'
                  className={`required-label ${
                    userRegDetails.trans_tmz ? 'required' : ''
                  }`}
                >
                  Timezone:
                </label>
                <select
                  className='form-select'
                  id='trans_tmz'
                  name='trans_tmz'
                  required
                  value={userRegDetails.trans_tmz}
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
                  htmlFor='s_trans_usr'
                  className={`required-label ${
                    userRegDetails.s_trans_usr ? 'required' : ''
                  }`}
                >
                  Username:
                </label>
                <input
                  type='text'
                  id='s_trans_usr'
                  name='s_trans_usr'
                  required
                  value={userRegDetails.s_trans_usr}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_trans_pass'
                  className={`required-label ${
                    userRegDetails.s_trans_pass ? 'required' : ''
                  }`}
                >
                  Password:
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='s_trans_pass'
                  name='s_trans_pass'
                  required
                  value={userRegDetails.s_trans_pass}
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
                  htmlFor='s_trans_cnf_pass'
                  className={`required-label ${
                    userRegDetails.s_trans_cnf_pass ? 'required' : ''
                  }`}
                >
                  Confirm Password:
                </label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id='s_trans_cnf_pass'
                  name='s_trans_cnf_pass'
                  required
                  value={userRegDetails.s_trans_cnf_pass}
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
                {passwordMatch && userRegDetails.s_trans_cnf_pass && (
                  <p className='success-message'>Password matched!</p>
                )}
                {!passwordMatch && (
                  <p className='error-message'>Password didn't match!</p>
                )}
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_trans_inact_tm'
                  className={`required-label ${
                    userRegDetails.s_trans_inact_tm ? 'required' : ''
                  }`}
                >
                  Inactive Time:
                </label>
                <select
                  id='s_trans_inact_tm'
                  name='s_trans_inact_tm'
                  required
                  value={userRegDetails.s_trans_inact_tm}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  {/* <option value='1/2'>1/2</option> */}
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
                <label htmlFor='s_trans_start_dt'>Subscription Date:</label>
                <input
                  type='date'
                  id='s_trans_start_dt'
                  name='s_trans_start_dt'
                  value={userRegDetails.s_trans_start_dt || currentDate}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='s_trans_due_dt'>Subscription Due Date:</label>
                <input
                  type='date'
                  id='s_trans_due_dt'
                  name='s_trans_due_dt'
                  value={userRegDetails.s_trans_due_dt || defaultEndDate}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='s_trans_ext_dt'>
                  Subscription Extension Date:
                </label>
                <input
                  type='date'
                  id='s_trans_ext_dt'
                  name='s_trans_ext_dt'
                  value={userRegDetails.s_trans_ext_dt || defaultEndDate}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='s_trans_act_status'>Active Status:</label>
                <select
                  id='s_trans_act_status'
                  name='s_trans_act_status'
                  value={userRegDetails.s_trans_act_status}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  <option value='Y'>Yes</option>
                  <option value='N'>No</option>
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='s_trans_pan'>PAN Card No.:</label>
                <input
                  type='text'
                  id='s_trans_pan'
                  name='s_trans_pan'
                  value={userRegDetails.s_trans_pan}
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
                  value={userRegDetails.s_vh_sub_sync}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  <option value='Y'>Yes</option>
                  <option value='N'>No</option>
                </select>
                <p className='small-info'>
                  (All vehicles subscription will start when user subscription
                  starts)
                </p>
              </div>
              <div className='form-group'>
                <label htmlFor='s_vh_sub_end'>
                  All Vehicle Subscription End:
                </label>
                <select
                  id='s_vh_sub_end'
                  name='s_vh_sub_end'
                  value={userRegDetails.s_vh_sub_end}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  <option value='Y'>Yes</option>
                  <option value='N'>No</option>
                </select>
                <p className='small-info'>
                  (All vehicles subscription will end when user subscription
                  ends)
                </p>
              </div>
              <div className='form-group'>
                <label htmlFor='b_is_bank'>Banking Details:</label>
                <input
                  type='checkbox'
                  id='b_is_bank'
                  name='b_is_bank'
                  value={userRegDetails.b_is_bank}
                  checked={showBankingInfo}
                  onChange={toggleBankingInfo}
                />
              </div>
              {showBankingInfo && (
                <>
                  <div className='form-group'>
                    <label
                      htmlFor='s_trans_bnk'
                      className={`required-label ${
                        userRegDetails.s_trans_bnk ? 'required' : ''
                      }`}
                    >
                      Bank Name:
                    </label>
                    <input
                      type='text'
                      id='s_trans_bnk'
                      name='s_trans_bnk'
                      required
                      value={userRegDetails.s_trans_bnk}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label
                      htmlFor='s_trans_brn'
                      className={`required-label ${
                        userRegDetails.s_trans_brn ? 'required' : ''
                      }`}
                    >
                      Branch Name:
                    </label>
                    <input
                      type='text'
                      id='s_trans_brn'
                      name='s_trans_brn'
                      required
                      value={userRegDetails.s_trans_brn}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label
                      htmlFor='s_trans_acc_no'
                      className={`required-label ${
                        userRegDetails.s_trans_acc_no ? 'required' : ''
                      }`}
                    >
                      Account No.:
                    </label>
                    <input
                      type='number'
                      id='s_trans_acc_no'
                      name='s_trans_acc_no'
                      required
                      value={userRegDetails.s_trans_acc_no}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label
                      htmlFor='s_trans_ifsc_cd'
                      className={`required-label ${
                        userRegDetails.s_trans_ifsc_cd ? 'required' : ''
                      }`}
                    >
                      IFSC Code:
                    </label>
                    <input
                      type='text'
                      id='s_trans_ifsc_cd'
                      name='s_trans_ifsc_cd'
                      required
                      value={userRegDetails.s_trans_ifsc_cd}
                      onChange={handleChange}
                    />
                  </div>
                </>
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
export default UserRegistrationForm
