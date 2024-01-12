import React, { useState, useEffect } from 'react'
import './driverEntry.css'
import navLogo from '../../navLogo.jpg'

const DriverEntryForm = () => {
  const [formData, setFormData] = useState({
      s_entity_id:'',
      s_entity_id_and_name:'',
      s_drv_id:'',
      s_drv_name:'',
      s_drv_mb_no:'',
      s_drv_mail:'',
      s_drv_add:'',
      s_lic_no:'',
      s_drv_city:'',
      s_drv_pin:'',
      lic_vld_dt:'',
      s_smart_crd_no:'',
      s_drv_cntry:'',
      s_drv_state:'',      
      s_hzrd_crt_no:'',
      hzrd_vld_dt:'',
      med_tst_dt:'',
      prd_trn_dt:'',
      driver_active_status:'',
      s_drv_rmk:'',
      ddt_exp_dt:'',
      cab_vld_dt:'',
      s_covid_status:''
  })

  const handleNameChange = (e, s_entity_id1) => {
    let { name, value } = e.target;
    if (name === 's_entity_id_and_name') {
      setFormData(prevData => ({
            ...prevData,
            s_entity_id_and_name: value,
            s_entity_id: s_entity_id1
        }));
    }
  };

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

  let [stateList, setStateList] = useState([{ state: [] }])
  useEffect(() => {
    if (formData.s_drv_cntry) {
      const citiesUrl = `http://13.201.79.110:1410/api/v0/getAllState?s_entity_countryName=${formData.s_drv_cntry}`
      const fetchCities = async () => {
        try {
          const response = await fetch(citiesUrl)
          if (response.ok) {
            const data = await response.json()
            setStateList(data)
          } else {
            console.error('Failed to fetch cities:', response.statusText)
          }
        } catch (error) {
          console.error('Error fetching cities:', error.message)
        }
      }

      fetchCities()
    }
  }, [formData.s_drv_cntry])

  

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  } 
  const [profilePic, setProfilePic] = useState(null);
  const handleDriverChange = (e) => {
      setProfilePic(e.target.files[0]);
  };

  const [licensePic, setLicensePic] = useState(null);
  const handleLicenseChange = (e) => {
    setLicensePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    for (const key in formData) {
      formDataObj.append(key, formData[key]);
    }
    formDataObj.append('s_drv_img_path', profilePic);
    formDataObj.append('s_drv_lic_img_path', licensePic);
  try {
      const response = await fetch('http://13.201.79.110:1410/api/v0/addDriver', {
        method: 'POST',
        body: formDataObj,
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Success in Asset Registration Form:', data);
        alert('Asset registration done successfully!');
      } else {
        console.error('Error:', response.statusText);
        alert('Error! Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error! Please try again.');
    }
    console.log('Asset registration form submitted:', formData);
  };

  return (
    <div>
      <div class='navbar'>
        <div class='logo-container'>
          <img src={navLogo} alt='Logo' class='logo' />
          <div class='brand-text'>NavitronicX</div>
        </div>
        <div class='menu-container'>
          <div class='menu-bar'>
            <div class='dropdown'>
              <button class='dropbtn'>Menu</button>
              <div class='dropdown-content'>
                <a href='#'>Page 1</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='wrapper'>
        <div className='container'>
          <div className='container'>
            <h2>Driver Entry</h2>
            <div className='DriverForm'>
              <form onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor='s_entity_id_and_name'
                  className={`required-label ${
                    setFormData.s_entity_id_and_name ? 'required' : ''
                  }`}
                >
                  Entity:
                </label>
                <select
                  className='form-select'
                  id='s_entity_id_and_name'
                  name='s_entity_id_and_name'
                  required
                  value={setFormData.s_entity_id_and_name}
                  onChange={(e) => {
                    const selectedEntity = entityNames.data.data.find(entity => entity.s_entity_name === e.target.value);
                    handleNameChange(e, selectedEntity?.s_entity_id);
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
                <div>
                  <label htmlFor='s_drv_name' className='mandatory'>
                    Driver Name:
                  </label>
                  <input
                    type='text'
                    id='s_drv_name'
                    name='s_drv_name'
                    required
                    value={formData.s_drv_name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='s_drv_id'>Driver ID:</label>
                  <input
                    type='text'
                    id='s_drv_id'
                    name='s_drv_id'
                    value={formData.s_drv_id}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='s_drv_add' className='mandatory'>Address:</label>
                  <input
                    type='text'
                    id='s_drv_add'
                    name='s_drv_add'
                    value={formData.s_drv_add}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='s_drv_mail'>Email:</label>
                  <input
                    type='text'
                    id='s_drv_mail'
                    name='s_drv_mail'
                    value={formData.s_drv_mail}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='s_drv_mb_no' className='mandatory'>Mobile No.:</label>
                  <input
                    type='text'
                    id='s_drv_mb_no'
                    name='s_drv_mb_no'
                    value={formData.s_drv_mb_no}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='s_drv_cntry' className='mandatory'>Country:</label>
                  <select
                    id="s_drv_cntry"
                    name="s_drv_cntry"
                    value={formData.s_drv_cntry}
                    onChange={handleChange}
                  >
                  <option value="">Select</option>
                  <option value='BT'>Bhutan</option>
                  <option value='IN'>India</option>
                  <option value='NP'>Nepal</option>
                </select>
                </div>
                <div>
                  <label htmlFor='s_drv_state' className='mandatory'>State:</label>
                  <select
                    id="s_drv_state"
                    name="s_drv_state"
                    value={formData.s_drv_state}
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
                <div>
                  <label htmlFor='s_drv_city' className='mandatory'>City:</label>
                  <input
                    type='text'
                    id='s_drv_city'
                    name='s_drv_city'
                    value={formData.s_drv_city}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='s_drv_pin' className='mandatory'>Pincode:</label>
                  <input
                    type='text'
                    id='s_drv_pin'
                    name='s_drv_pin'
                    value={formData.s_drv_pin}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='s_smart_crd_no'>Smart Card:</label>
                  <input
                    type='text'
                    id='s_smart_crd_no'
                    name='s_smart_crd_no'
                    value={formData.s_smart_crd_no}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='s_hzrd_crt_no'>
                    Hazardous Certificate:
                  </label>
                  <input
                    type='text'
                    id='s_hzrd_crt_no'
                    name='s_hzrd_crt_no'
                    value={formData.s_hzrd_crt_no}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='hzrd_vld_dt'>
                    Hazardous Validity:
                  </label>
                  <input
                    type='date'
                    id='hzrd_vld_dt'
                    name='hzrd_vld_dt'
                    value={formData.hzrd_vld_dt}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='med_tst_dt'>Medical Test:</label>
                  <input
                    type='date'
                    id='med_tst_dt'
                    name='med_tst_dt'
                    value={formData.med_tst_dt}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='cab_vld_dt'>Cab Validity:</label>
                  <input
                    type='date'
                    id='cab_vld_dt'
                    name='cab_vld_dt'
                    value={formData.cab_vld_dt}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='prd_trn_dt'>
                    Product Training:
                  </label>
                  <input
                    type='date'
                    id='prd_trn_dt'
                    name='prd_trn_dt'
                    value={formData.prd_trn_dt}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='s_lic_no'>License Number:</label>
                  <input
                    type='text'
                    id='s_lic_no'
                    name='s_lic_no'
                    value={formData.s_lic_no}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='lic_vld_dt'>
                    License Validity:
                  </label>
                  <input
                    type='date'
                    id='lic_vld_dt'
                    name='lic_vld_dt'
                    value={formData.lic_vld_dt}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='ddt_exp_dt'>DDT Expiry:</label>
                  <input
                    type='date'
                    id='ddt_exp_dt'
                    name='ddt_exp_dt'
                    value={formData.ddt_exp_dt}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='s_drv_rmk'>Remarks:</label>
                  <input
                    type='text'
                    id='s_drv_rmk'
                    name='s_drv_rmk'
                    value={formData.s_drv_rmk}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='s_covid_status'>
                    Covid-19 Status:
                  </label>
                  <select
                    id="s_covid_status"
                    name="s_covid_status"
                    value={formData.s_covid_status}
                    onChange={handleChange}
                  >
                    <option value=''>Select</option>
                    <option value='Done'>Done</option>
                    <option value='Not Done'>Not Done</option>
                    <option value='Partially Done'>Partially Done</option>
                  </select>
                </div>
                <div>
                  <label htmlFor='driver_active_status'>
                    Driver Active Status:
                  </label>
                  <select
                    id='driver_active_status'
                    name='driver_active_status'
                    value={formData.driver_active_status}
                    onChange={handleChange}
                  > 
                    <option value=''>Select</option>
                    <option value='Active'>Active</option>
                    <option value='Inactive'>Inactive</option>
                  </select>
                </div>
                <div>
                <label htmlFor='s_drv_img_path'>Driver Photo:</label>
                <input
                  type='file'
                  accept='image/*'
                  id='s_drv_img_path'
                  name='s_drv_img_path'
                  onChange={(e) => handleDriverChange(e)}
                />
              </div>
              <div>
                <label htmlFor='s_drv_lic_img_path'>License Photo:</label>
                <input
                  type='file'
                  accept='image/*'
                  id='s_drv_lic_img_path'
                  name='s_drv_lic_img_path'
                  onChange={(e) => handleLicenseChange(e)}
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
    </div>
  )
}

export default DriverEntryForm
