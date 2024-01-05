import React, { useState } from 'react'
import './assetEntryInfo.css'
import navLogo from '../../navLogo.jpg'

let AssetEntryInfoForm = () => {
  let [assetData, setAssetData] = useState({
    s_asset_typ: '',
    s_asset_cap: ''
  })

  let handleChange = e => {
    let { name, value } = e.target
    setAssetData(prevData => ({ ...prevData, [name]: value }))
  }

  let handleSubmit = e => {
    e.preventDefault()
    fetch(`http://65.2.151.41:1410/api/v0/setAssetInfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(assetData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success in Asset Entry Info form:', data)
        alert('Asset information saved successfully!')
      })
      .catch(error => {
        console.error('Error:', error)
        alert('Error! Please try again.')
      })
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
          <h2>Asset Info Entry (Information Insert For Dropdown)</h2>
          <div className='AssetEntryInfoForm'>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='s_asset_typ'>Asset Type:</label>
                <input
                  type='text'
                  id='s_asset_typ'
                  name='s_asset_typ'
                  value={assetData.s_asset_typ}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='s_asset_cap'>Asset Capacity:</label>
                <input
                  type='text'
                  id='s_asset_cap'
                  name='s_asset_cap'
                  value={assetData.s_asset_cap}
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
  )
}

export default AssetEntryInfoForm
