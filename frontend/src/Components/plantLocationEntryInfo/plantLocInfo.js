import React, { useState } from 'react'
import './plantLocInfo.css'
import navLogo from '../../navLogo.jpg'

const PlantLocEntryInfoForm = () => {
  const [plantLocData, setPlantLocData] = useState({
    s_loc_pin: '',
    s_loc_name: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setPlantLocData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    fetch(`http://65.2.151.41:1410/api/v0/addPlantLocationInfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(plantLocData)
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
          <h2>Plant Location Info Entry</h2>
          <div className='PlantLocEntryInfoForm'>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor='s_loc_pin'>Pincode:</label>
                <input
                  type='text'
                  id='s_loc_pin'
                  name='s_loc_pin'
                  required
                  value={plantLocData.s_loc_pin}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor='s_loc_name'>Location Name:</label>
                <input
                  type='text'
                  id='s_loc_name'
                  name='s_loc_name'
                  value={plantLocData.s_loc_name}
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

export default PlantLocEntryInfoForm
