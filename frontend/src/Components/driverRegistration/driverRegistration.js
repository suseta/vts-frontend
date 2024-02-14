import React, { useState, useEffect } from 'react'
import './driverRegistration.css'
import { useNavigate } from 'react-router-dom'
import dotenv from 'dotenv'

dotenv.config()
const ubuntuIP = process.env.ubuntuIP

let DriverRegistrationForm = () => {
  let navigate = useNavigate()

  let initialState = {
    s_drv_id: '',
    s_entity_id_and_name: '',
    s_drv_name: '',
    s_entity_id: '',
    s_drv_mail: '',
    s_drv_mb_no: '',
    s_drv_add: '',
    s_drv_cntry: '',
    s_drv_state: '',
    s_drv_city: '',
    s_drv_pin: '',
    s_lic_no: '',
    lic_vld_dt: null,
    s_smart_crd_no: '',
    s_hzrd_crt_no: '',
    hzrd_vld_dt: null,
    med_tst_dt: null,
    prd_trn_dt: null,
    ddt_exp_dt: null,
    cab_vld_dt: null,
    s_drv_rmk: '',
    s_covid_status: '',
    s_drv_img_path: '',
    s_drv_lic_img_path: ''
  }

  let [driverRegDetails, setDriverRegDetails] = useState({
    s_drv_id: '',
    s_entity_id_and_name: '',
    s_drv_name: '',
    s_entity_id: '',
    s_drv_mail: '',
    s_drv_mb_no: '',
    s_drv_add: '',
    s_drv_cntry: '',
    s_drv_state: '',
    s_drv_city: '',
    s_drv_pin: '',
    s_lic_no: '',
    lic_vld_dt: null,
    s_smart_crd_no: '',
    s_hzrd_crt_no: '',
    hzrd_vld_dt: null,
    med_tst_dt: null,
    prd_trn_dt: null,
    ddt_exp_dt: null,
    cab_vld_dt: null,
    s_drv_rmk: '',
    s_covid_status: '',
    s_drv_img_path: '',
    s_drv_lic_img_path: ''
  })

  let currentDate = new Date().toISOString().split('T')[0]

  let [entityMap, setEntityMap] = useState({ data: [] })
  useEffect(() => {
    fetch(`${ubuntuIP}/api/v0/getAllEntityNameList`)
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
    if (driverRegDetails.s_drv_cntry) {
      fetch(
        `${ubuntuIP}/api/v0/getAllState?s_entity_countryName=${driverRegDetails.s_drv_cntry}`
      )
        .then(response => response.json())
        .then(data => {
          setStateList(data)
        })
        .catch(error => {
          console.error('Error: ', error)
        })
    }
  }, [driverRegDetails.s_drv_cntry])

  let [cityList, setCityList] = useState([{ city: [] }])
  useEffect(() => {
    if (driverRegDetails.s_drv_state) {
      let url = `${ubuntuIP}/api/v0/getAllCity?s_entity_countryName=${driverRegDetails.s_drv_cntry}&s_entity_state=${driverRegDetails.s_drv_state}`
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
  }, [driverRegDetails.s_drv_state, driverRegDetails.s_drv_cntry])

  let handleFileChange = (e, s_entity_id1) => {
    let { name, value } = e.target
    if (name === 's_entity_id_and_name') {
      setDriverRegDetails(prevData => ({
        ...prevData,
        s_entity_id_and_name: value,
        s_entity_id: s_entity_id1
      }))
    }
  }

  let [profilePic, setProfilePic] = useState(null)
  let handleDriverChange = e => {
    setProfilePic(e.target.files[0])
  }

  let [licensePic, setLicensePic] = useState(null)
  let handleLicenseChange = e => {
    setLicensePic(e.target.files[0])
  }

  let resetForm = () => {
    setDriverRegDetails(initialState)
  }

  let refreshPage = () => {
    window.location.reload()
  }

  let handleChange = e => {
    let { name, value } = e.target
    setDriverRegDetails(prevData => ({ ...prevData, [name]: value }))
  }

  let handleSubmit = async e => {
    e.preventDefault()
    let driverRegDetailsObj = new FormData()
    for (let key in driverRegDetails) {
      driverRegDetailsObj.append(key, driverRegDetails[key])
    }
    driverRegDetailsObj.append('s_drv_img_path', profilePic)
    driverRegDetailsObj.append('s_drv_lic_img_path', licensePic)
    try {
      let response = await fetch(`${ubuntuIP}/api/v0/addDriver`, {
        method: 'POST',
        body: driverRegDetailsObj
      })
      if (response.ok) {
        let data = await response.json()
        console.log('Success in Driver Registration Form:', data)
        alert('Driver registration done successfully!')
      } else {
        console.error('Error:', response.statusText)
        alert('Error! Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error! Please try again.')
    }
    console.log('Driver registration form submitted:', driverRegDetails)
  }

  return (
    <div>
      <div className='wrapper'>
        <div className='container'>
          <h2>Driver Registration</h2>
          <div className='DriverRegistrationForm'>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label
                  htmlFor='s_entity_id_and_name'
                  className={`required-label ${
                    driverRegDetails.s_entity_id_and_name ? 'required' : ''
                  }`}
                >
                  Entity:
                </label>
                <select
                  className='form-select'
                  id='s_entity_id_and_name'
                  name='s_entity_id_and_name'
                  required
                  value={driverRegDetails.s_entity_id_and_name}
                  onChange={e => {
                    let selectedEntity = entityMap.data.data.find(
                      entity => entity.s_entity_name === e.target.value
                    )
                    handleFileChange(e, selectedEntity?.s_entity_id)
                  }}
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
                  htmlFor='s_drv_id'
                  className={`required-label ${
                    driverRegDetails.s_drv_id ? 'required' : ''
                  }`}
                >
                  Driver Id:
                </label>
                <input
                  type='text'
                  id='s_drv_id'
                  name='s_drv_id'
                  value={driverRegDetails.s_drv_id}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_drv_name'
                  className={`required-label ${
                    driverRegDetails.s_drv_name ? 'required' : ''
                  }`}
                >
                  Driver Name:
                </label>
                <input
                  type='text'
                  id='s_drv_name'
                  name='s_drv_name'
                  value={driverRegDetails.s_drv_name}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_drv_mail'
                  className={`required-label ${
                    driverRegDetails.s_drv_mail ? 'required' : ''
                  }`}
                >
                  Mail Id:
                </label>
                <input
                  type='text'
                  id='s_drv_mail'
                  name='s_drv_mail'
                  value={driverRegDetails.s_drv_mail}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_drv_mb_no'
                  className={`required-label ${
                    driverRegDetails.s_drv_mb_no ? 'required' : ''
                  }`}
                >
                  Mobile No.:
                </label>
                <input
                  type='number'
                  id='s_drv_mb_no'
                  name='s_drv_mb_no'
                  value={driverRegDetails.s_drv_mb_no}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_drv_add'
                  className={`required-label ${
                    driverRegDetails.s_drv_add ? 'required' : ''
                  }`}
                >
                  Address:
                </label>
                <input
                  type='text'
                  id='s_drv_add'
                  name='s_drv_add'
                  value={driverRegDetails.s_drv_add}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_drv_pin'
                  className={`required-label ${
                    driverRegDetails.s_drv_pin ? 'required' : ''
                  }`}
                >
                  Pincode:
                </label>
                <input
                  type='number'
                  id='s_drv_pin'
                  name='s_drv_pin'
                  value={driverRegDetails.s_drv_pin}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_drv_cntry'
                  className={`required-label ${
                    driverRegDetails.s_drv_cntry ? 'required' : ''
                  }`}
                >
                  Country:
                </label>
                <select
                  id='s_drv_cntry'
                  name='s_drv_cntry'
                  required
                  value={driverRegDetails.s_drv_cntry}
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
                  htmlFor='s_drv_state'
                  className={`required-label ${
                    driverRegDetails.s_drv_state ? 'required' : ''
                  }`}
                >
                  State:
                </label>
                <select
                  className='form-select'
                  id='s_drv_state'
                  name='s_drv_state'
                  required
                  value={driverRegDetails.s_drv_state}
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
                  htmlFor='s_drv_city'
                  className={`required-label ${
                    driverRegDetails.s_drv_city ? 'required' : ''
                  }`}
                >
                  City:
                </label>
                <select
                  className='form-select'
                  id='s_drv_city'
                  name='s_drv_city'
                  required
                  value={driverRegDetails.s_drv_city}
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
                <label htmlFor='s_smart_crd_no'>Smart Card No.:</label>
                <input
                  type='number'
                  id='s_smart_crd_no'
                  name='s_smart_crd_no'
                  value={driverRegDetails.s_smart_crd_no}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='s_hzrd_crt_no'>
                  Hazardous Certificate No.:
                </label>
                <input
                  type='number'
                  id='s_hzrd_crt_no'
                  name='s_hzrd_crt_no'
                  value={driverRegDetails.s_hzrd_crt_no}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='hzrd_vld_dt'>Hazardous Certificate Date:</label>
                <input
                  type='date'
                  id='hzrd_vld_dt'
                  name='hzrd_vld_dt'
                  value={driverRegDetails.hzrd_vld_dt || currentDate}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='med_tst_dt'>Medical Test:</label>
                <input
                  type='date'
                  id='med_tst_dt'
                  name='med_tst_dt'
                  value={driverRegDetails.med_tst_dt || currentDate}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='prd_trn_dt'>Product Training Date:</label>
                <input
                  type='date'
                  id='prd_trn_dt'
                  name='prd_trn_dt'
                  value={driverRegDetails.prd_trn_dt || currentDate}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='s_covid_status'>Covid-19 Status:</label>
                <select
                  id='s_covid_status'
                  name='s_covid_status'
                  value={driverRegDetails.s_covid_status}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  <option value='D'>Done</option>
                  <option value='PD'>Partially done</option>
                  <option value='N'>Not done</option>
                </select>
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_lic_no'
                  className={`required-label ${
                    driverRegDetails.s_lic_no ? 'required' : ''
                  }`}
                >
                  License No.:
                </label>
                <input
                  type='number'
                  id='s_lic_no'
                  name='s_lic_no'
                  value={driverRegDetails.s_lic_no}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='lic_vld_dt'
                  className={`required-label ${
                    driverRegDetails.lic_vld_dt ? 'required' : ''
                  }`}
                >
                  License Validity:
                </label>
                <input
                  type='date'
                  id='lic_vld_dt'
                  name='lic_vld_dt'
                  value={driverRegDetails.lic_vld_dt || currentDate}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='ddt_exp_dt'>DDT Expiry:</label>
                <input
                  type='date'
                  id='ddt_exp_dt'
                  name='ddt_exp_dt'
                  value={driverRegDetails.ddt_exp_dt || currentDate}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='cab_vld_dt'>Cab Validity:</label>
                <input
                  type='date'
                  id='cab_vld_dt'
                  name='cab_vld_dt'
                  value={driverRegDetails.cab_vld_dt || currentDate}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='s_drv_rmk'>Remarks:</label>
                <input
                  type='text'
                  id='s_drv_rmk'
                  name='s_drv_rmk'
                  value={driverRegDetails.s_drv_rmk}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='s_drv_img_path'>Driver Image:</label>
                <input
                  type='file'
                  id='s_drv_img_path'
                  name='s_drv_img_path'
                  accept='image/*'
                  onChange={e => handleDriverChange(e)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='s_drv_lic_img_path'>
                  Driver License Image:
                </label>
                <input
                  type='file'
                  id='s_drv_lic_img_path'
                  name='s_drv_lic_img_path'
                  accept='image/*'
                  onChange={e => handleLicenseChange(e)}
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

export default DriverRegistrationForm
