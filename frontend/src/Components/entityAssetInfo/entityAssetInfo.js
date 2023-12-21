import React, { useState } from 'react'
import './entityAssetInfo.css'
import navLogo from '../../navLogo.jpg'

const AssetInfoForm = () => {
  const [formData, setFormData] = useState({
    fuel_type: '',
    asset_type: '',
    asset_capacity: ''
  })

  const [formData1, setFormData1] = useState({
    s_entity_id: '',
    s_entity_name: '',
    s_entity_type: '',
    s_transporter_id: '',
    s_transporter_name: '',
    s_customer_id: '',
    s_customer_name: '',
    s_customer_type: '',
    s_parent_entity_id: '',
    s_immediate_parent_entity_name: '',
    i_user_id: '',
    s_user_type: ''
  })

  const handleChange = (e, container = 1) => {
    const { name, value } = e.target
    if (container === 1) {
      setFormData(prevData => ({ ...prevData, [name]: value }))
    } else if (container === 2) {
      setFormData1(prevData => ({ ...prevData, [name]: value }))
    }
  }

  const handleSubmit = (e, container = 1) => {
    e.preventDefault()
    const postData = container === 1 ? formData : formData1
    const endpoint = container === 1 ? 'AddAssetInfo' : 'AnotherEndpoint'
    fetch('http://65.2.151.41:1410/api/v0/${endpoint}', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success in Container ${container} Form:', data)
        alert('Asset information saved successfully!')
      })
      .catch(error => {
        console.error('Error:', error)
        alert('Error! Please try again.')
      })
    console.log('Container ${container} Form saved:', postData)
  }

  return (
    <div>
      <div class='navbar'>
        <div class='logo-container'>
          <img src={navLogo} alt='Logo' class='logo' />
          <div class='brand-text'>NavitronicX</div>
        </div>
      </div>
      <div className='wrapper'>
        <div className='scrollable-container'>
          <div className='container'>
            <h2>Asset Info Entry</h2>
            <div className='AssetInfoForm'>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor='fuel_type'>Fuel Type:</label>
                  <input
                    type='text'
                    id='fuel_type'
                    name='fuel_type'
                    required
                    value={formData.fuel_type}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='asset_type'>Asset Type:</label>
                  <input
                    type='text'
                    id='asset_type'
                    name='asset_type'
                    value={formData.asset_type}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='asset_capacity'>Asset Capacity:</label>
                  <input
                    type='text'
                    id='asset_capacity'
                    name='asset_capacity'
                    value={formData.asset_capacity}
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
          <div className='container'>
            <h2>Entity Entry</h2>
            <div className='AssetInfoForm'>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor='s_entity_id'>Entity ID:</label>
                  <input
                    type='text'
                    id='s_entity_id'
                    name='s_entity_id'
                    required
                    value={formData.s_entity_id}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='s_entity_name'>Entity Name:</label>
                  <input
                    type='text'
                    id='s_entity_name'
                    name='s_entity_name'
                    value={formData.s_entity_name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='s_entity_type'>Entity Type:</label>
                  <input
                    type='text'
                    id='s_entity_type'
                    name='s_entity_type'
                    value={formData.s_entity_type}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='s_transporter_id'>Transporter ID:</label>
                  <input
                    type='text'
                    id='s_transporter_id'
                    name='s_transporter_id'
                    value={formData.s_transporter_id}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='s_transporter_name'>Transporter Name:</label>
                  <input
                    type='text'
                    id='s_transporter_name'
                    name='s_transporter_name'
                    value={formData.s_transporter_name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='s_entity_type'>Entity Type:</label>
                  <input
                    type='text'
                    id='s_entity_type'
                    name='s_entity_type'
                    value={formData.s_entity_type}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='s_customer_id'>Customer ID:</label>
                  <input
                    type='text'
                    id='s_customer_id'
                    name='s_customer_id'
                    value={formData.s_customer_id}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='s_customer_name'>Customer Name:</label>
                  <input
                    type='text'
                    id='s_customer_name'
                    name='s_customer_name'
                    value={formData.s_customer_name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='s_customer_type'>Customer Type:</label>
                  <input
                    type='text'
                    id='s_customer_type'
                    name='s_customer_type'
                    value={formData.s_customer_type}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='s_parent_entity_id'>Parent Entity ID:</label>
                  <input
                    type='text'
                    id='s_parent_entity_id'
                    name='s_parent_entity_id'
                    value={formData.s_parent_entity_id}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='s_immediate_parent_entity_name'>
                    Immediate Parent Entity Name:
                  </label>
                  <input
                    type='text'
                    id='s_immediate_parent_entity_name'
                    name='s_immediate_parent_entity_name'
                    value={formData.s_immediate_parent_entity_name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='i_user_id'>User ID:</label>
                  <input
                    type='text'
                    id='i_user_id'
                    name='i_user_id'
                    value={formData.i_user_id}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='s_user_type'>User Type:</label>
                  <input
                    type='text'
                    id='s_user_type'
                    name='s_user_type'
                    value={formData.s_user_type}
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
      </div>
    </div>
  )
}

export default AssetInfoForm
