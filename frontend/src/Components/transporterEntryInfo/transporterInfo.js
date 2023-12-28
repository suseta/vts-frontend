import React, { useState } from 'react'
import './transporterInfo.css'
import navLogo from '../../navLogo.jpg'

const TransporterEntryInfoForm = () => {
  const [transporterData, setTransporterData] = useState({
    s_trans_id: '',
    s_trans_name: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setTransporterData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    fetch(`http://65.2.151.41:1410/api/v0/addTransporterInfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transporterData)
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
          <h2>Transporter Info Entry</h2>
          <div className='TransporterEntryInfoForm'>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor='s_trans_id'>Transporter Id:</label>
                <input
                  type='text'
                  id='s_trans_id'
                  name='s_trans_id'
                  required
                  value={transporterData.s_trans_id}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor='s_trans_name'>Transporter Name:</label>
                <input
                  type='text'
                  id='s_trans_name'
                  name='s_trans_name'
                  value={transporterData.s_trans_name}
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

export default TransporterEntryInfoForm
