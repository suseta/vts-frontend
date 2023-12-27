import React, { useState } from 'react'
import './entityAssetInfo.css'
import navLogo from '../../navLogo.jpg'

const AssetCusEntityInfoForm = () => {
  const [assetInfoData, setAssetInfoData] = useState({
    s_fuel_typ: '',
    s_asset_typ: '',
    s_asset_cap: ''
  })

  const [cusEntityInfoData, setCusEntityInfoData] = useState({
    cus_entity_id: '',
    cus_entity_name: '',
    cus_entity_typ: '',
    cus_entity_active_status: '',
    cus_parent_entity_id: '',
    cus_imdt_parent_entity_id: ''
  })

  const handleChange = (e, container = 1) => {
    const { name, value } = e.target
    if (container === 1) {
      setAssetInfoData(prevData => ({ ...prevData, [name]: value }))
    } else if (container === 2) {
      setCusEntityInfoData(prevData => ({ ...prevData, [name]: value }))
    }
  }

  const handleSubmit = (e, container = 1) => {
    e.preventDefault()
    const postData = container === 1 ? assetInfoData : cusEntityInfoData
    const endpoint =
      container === 1 ? 'AddAssetInfoData' : 'AddCusEntityInfoData'
    fetch('http://65.2.151.41:1410/api/v0/${endpoint}', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success in ${container} container form:', data)
        alert('Asset information saved successfully!')
      })
      .catch(error => {
        console.error('Error:', error)
        alert('Error! Please try again.')
      })
    console.log('${container} container form saved:', postData)
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
        <div className='container'>
          <div className='container'>
            <h2>Asset Info Entry</h2>
            <div className='AssetCusEntityInfoForm'>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor='s_fuel_typ'>Fuel Type:</label>
                  <input
                    type='text'
                    id='s_fuel_typ'
                    name='s_fuel_typ'
                    required
                    value={assetInfoData.s_fuel_typ}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='s_asset_typ'>Asset Type:</label>
                  <input
                    type='text'
                    id='s_asset_typ'
                    name='s_asset_typ'
                    value={assetInfoData.s_asset_typ}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='s_asset_cap'>Asset Capacity:</label>
                  <input
                    type='text'
                    id='s_asset_cap'
                    name='s_asset_cap'
                    value={assetInfoData.s_asset_cap}
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
            <h2>Customer/Entity Entry</h2>
            <div className='AssetCusEntityInfoForm'>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor='cus_entity_id'>Customer/Entity Id:</label>
                  <input
                    type='text'
                    id='cus_entity_id'
                    name='cus_entity_id'
                    required
                    value={cusEntityInfoData.cus_entity_id}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='cus_entity_name'>Customer/Entity Name:</label>
                  <input
                    type='text'
                    id='cus_entity_name'
                    name='cus_entity_name'
                    value={cusEntityInfoData.cus_entity_name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='cus_entity_typ'>Customer/Entity Type:</label>
                  <input
                    type='text'
                    id='cus_entity_typ'
                    name='cus_entity_typ'
                    value={cusEntityInfoData.cus_entity_typ}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='cus_entity_active_status'>
                    Customer/Entity Active Status:
                  </label>
                  <input
                    type='text'
                    id='cus_entity_active_status'
                    name='cus_entity_active_status'
                    value={cusEntityInfoData.cus_entity_active_status}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='cus_parent_entity_id'>
                    Parent Customer/Entity Id:
                  </label>
                  <input
                    type='text'
                    id='cus_parent_entity_id'
                    name='cus_parent_entity_id'
                    value={cusEntityInfoData.cus_parent_entity_id}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='cus_imdt_parent_entity_id'>
                    Immediate Customer/Parent Entity Name:
                  </label>
                  <input
                    type='text'
                    id='cus_imdt_parent_entity_id'
                    name='cus_imdt_parent_entity_id'
                    value={cusEntityInfoData.cus_imdt_parent_entity_id}
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

export default AssetCusEntityInfoForm
