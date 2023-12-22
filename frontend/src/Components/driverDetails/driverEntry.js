import React, { useState, useEffect } from 'react'
import './driverEntry.css'
import navLogo from '../../navLogo.jpg'

const DriverEntryForm = () => {
  const [formData, setFormData] = useState({
    s_driver_id: '',
    s_driver_img_path: '',
    s_license_img_path: '',
    s_entity_name: '',
    s_driver_name: '',
    i_mobile_no: '',
    s_driver_email: '',
    s_driver_address: '',
    s_license_no: '',
    s_driver_city: '',
    i_driver_pincode: '',
    license_validity_date: '',
    s_smart_card_no: '',
    s_state_name: '',
    s_country_name: '',
    s_hazard_certificate: '',
    hazard_validity_date: '',
    medical_test_date: '',
    product_training_date: '',
    driver_active_status: '',
    s_remarks: '',
    ddt_expiry_date: '',
    cab_validity_date: '',
    s_license_verification_covid: ''
  })

  const [entityLists, setEntityLists] = useState([])

  useEffect(() => {
    fetch('your_api_endpoint')
      .then(response => response.json())
      .then(data => {
        setEntityLists(data)
      })
      .catch(error => {
        console.error('Error fetching options:', error)
      })
  }, [])

  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('')
  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState('')

  useEffect(() => {
    // Replace 'https://api.example.com/countries' with the actual API endpoint for countries
    const countriesUrl = 'https://api.example.com/countries'

    const fetchCountries = async () => {
      try {
        const response = await fetch(countriesUrl)
        if (response.ok) {
          const data = await response.json()
          setCountries(data)
        } else {
          console.error('Failed to fetch countries:', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching countries:', error.message)
      }
    }

    fetchCountries()
  }, [])

  // Fetch the list of cities when the selected country changes
  useEffect(() => {
    if (selectedCountry) {
      // Replace 'https://api.example.com/cities' with the actual API endpoint for cities
      const citiesUrl = `https://api.example.com/cities?country=${selectedCountry}`

      const fetchCities = async () => {
        try {
          const response = await fetch(citiesUrl)
          if (response.ok) {
            const data = await response.json()
            setCities(data)
          } else {
            console.error('Failed to fetch cities:', response.statusText)
          }
        } catch (error) {
          console.error('Error fetching cities:', error.message)
        }
      }

      fetchCities()
    }
  }, [selectedCountry])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleImageChange = (e, fieldName) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: reader.result,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = e => {
    e.preventDefault()
    fetch('http://65.2.151.41:1410/api/v0/addVehicle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success in Asset Registration Form:', data)
        alert('Asset registration done successfully!')
      })
      .catch(error => {
        console.error('Error:', error)
        alert('Error! Please try again.')
      })
    console.log('Asset registration form submitted:', formData)
  }

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
                  <label htmlFor='s_entity_name' className='mandatory'>
                    Entity:
                  </label>
                  <select
                    className='form-select'
                    id='s_entity_name'
                    name='s_entity_name'
                    required
                    value={formData.s_entity_name}
                    onChange={handleChange}
                  >
                    <option value=''>Select</option>
                    {entityLists.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor='s_driver_name' className='mandatory'>
                    Driver Name:
                  </label>
                  <input
                    type='text'
                    id='s_driver_name'
                    name='s_driver_name'
                    required
                    value={formData.s_driver_name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='s_driver_id'>Driver ID:</label>
                  <input
                    type='text'
                    id='s_driver_id'
                    name='s_driver_id'
                    value={formData.s_driver_id}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='s_driver_address' className='mandatory'>Address:</label>
                  <input
                    type='text'
                    id='s_driver_address'
                    name='s_driver_address'
                    value={formData.s_driver_address}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='s_driver_email'>Email:</label>
                  <input
                    type='text'
                    id='s_driver_email'
                    name='s_driver_email'
                    value={formData.s_driver_email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='i_mobile_no' className='mandatory'>Mobile No.:</label>
                  <input
                    type='text'
                    id='i_mobile_no'
                    name='i_mobile_no'
                    value={formData.i_mobile_no}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='s_country_name' className='mandatory'>Country:</label>
                  <select
                    id="s_country_name"
                    name="s_country_name"
                    value={formData.s_country_name}
                    onChange={handleChange}
                  >
                  <option value="">Select</option>
                  <option value="country1">India</option>
                  <option value="country2">Nepal</option>
                  <option value="country1">Bhutan</option>
                </select>
                </div>
                <div>
                  <label htmlFor='s_state_name' className='mandatory'>State:</label>
                  <select
                    id="s_state_name"
                    name="s_state_name"
                    value={formData.s_state_name}
                    onChange={handleChange}
                  >
                  <option value="">Select</option>
                  <option value="state1">State 1</option>
                </select>
                </div>
                <div>
                  <label htmlFor='s_driver_city' className='mandatory'>City:</label>
                  <input
                    type='text'
                    id='s_driver_city'
                    name='s_driver_city'
                    value={formData.s_driver_city}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='i_driver_pincode' className='mandatory'>Pincode:</label>
                  <input
                    type='text'
                    id='i_driver_pincode'
                    name='i_driver_pincode'
                    value={formData.i_driver_pincode}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='s_smart_card_no'>Smart Card:</label>
                  <input
                    type='text'
                    id='s_smart_card_no'
                    name='s_smart_card_no'
                    value={formData.s_smart_card_no}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='s_hazard_certificate'>
                    Hazardous Certificate:
                  </label>
                  <input
                    type='text'
                    id='s_hazard_certificate'
                    name='s_hazard_certificate'
                    value={formData.s_hazard_certificate}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='hazard_validity_date'>
                    Hazardous Validity:
                  </label>
                  <input
                    type='date'
                    id='hazard_validity_date'
                    name='hazard_validity_date'
                    value={formData.hazard_validity_date}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='medical_test_date'>Medical Test:</label>
                  <input
                    type='date'
                    id='medical_test_date'
                    name='medical_test_date'
                    value={formData.medical_test_date}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='cab_validity_date'>Cab Validity:</label>
                  <input
                    type='date'
                    id='cab_validity_date'
                    name='cab_validity_date'
                    value={formData.cab_validity_date}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='product_training_date'>
                    Product Training:
                  </label>
                  <input
                    type='date'
                    id='product_training_date'
                    name='product_training_date'
                    value={formData.product_training_date}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='s_license_no'>License Number:</label>
                  <input
                    type='text'
                    id='s_license_no'
                    name='s_license_no'
                    value={formData.s_license_no}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='license_validity_date'>
                    License Validity:
                  </label>
                  <input
                    type='date'
                    id='license_validity_date'
                    name='license_validity_date'
                    value={formData.license_validity_date}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='ddt_expiry_date'>DDT Expiry:</label>
                  <input
                    type='date'
                    id='ddt_expiry_date'
                    name='ddt_expiry_date'
                    value={formData.ddt_expiry_date}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='s_remarks'>Remarks:</label>
                  <input
                    type='text'
                    id='s_remarks'
                    name='s_remarks'
                    value={formData.s_remarks}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='s_license_verification_covid'>
                    Covid-19 Status:
                  </label>
                  <select
                    id='s_license_verification_covid'
                    name='s_license_verification_covid'
                    value={formData.s_license_verification_covid}
                    onChange={handleChange}
                  >
                    <option value='Y'>Done</option>
                    <option value='N'>Not Done</option>
                    <option value='P'>Partially Done</option>
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
                    <option value='A'>Active</option>
                    <option value='I'>Inactive</option>
                  </select>
                </div>
                <div>
                <label htmlFor='s_driver_img_path'>Driver Photo:</label>
                <input
                  type='file'
                  accept='image/*'
                  id='s_driver_img_path'
                  name='s_driver_img_path'
                  onChange={(e) => handleImageChange(e, 's_driver_img_path')}
                />
              </div>
              <div>
                <label htmlFor='s_license_img_path'>License Photo:</label>
                <input
                  type='file'
                  accept='image/*'
                  id='s_license_img_path'
                  name='s_license_img_path'
                  onChange={(e) => handleImageChange(e, 's_license_img_path')}
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
