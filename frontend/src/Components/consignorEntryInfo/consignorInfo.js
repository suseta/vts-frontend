import React, { useState } from 'react'
import './consignorInfo.css'
import navLogo from '../../navLogo.jpg'

const ConsignorEntryInfoForm = () => {
  const [consignor, setConsignor] = useState({
    s_consignor_id: '',
    s_consignor_name: ''
  })

  const [consignorInfoData, setConsignorInfoData] = useState({
    s_consignor_id: '',
    cus_entity_id: '',
    s_trans_id: '',
    s_start_pt: '',
    s_dst_pt: '',
    lat: '',
    lat_dir: '',
    long: '',
    long_dir: '',
    rad: '',
    s_cntct_prsn: '',
    cntct_prsn_no: ''
  })

  const handleChange = (e, container = 1) => {
    const { name, value } = e.target
    if (container === 1) {
      setConsignor(prevData => ({ ...prevData, [name]: value }))
    } else if (container === 2) {
      setConsignorInfoData(prevData => ({ ...prevData, [name]: value }))
    }
  }

  const handleSubmit = (e, container = 1) => {
    e.preventDefault()
    const postData = container === 1 ? consignor : consignorInfoData
    const endpoint = container === 1 ? 'setConsignor' : 'setConsignorInfoData'
    fetch(`http://65.2.151.41:1410/api/v0/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success in ${container} container form:', data)
        alert('Entity information saved successfully!')
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
          <div className='brand-text'>NavitronicX</div>
        </div>
      </div>
      <div className='wrapper'>
        <div className='container'>
          <div className='container'>
            <h2>Consignor Entry</h2>
            <div className='ConsignorEntryInfoForm'>
              <form onSubmit={e => handleSubmit(e, 1)}>
                <div className='form-group'>
                  <label htmlFor='s_consignor_id'>Consignor Id:</label>
                  <input
                    type='text'
                    id='s_consignor_id'
                    name='s_consignor_id'
                    required
                    value={consignor.s_consignor_id}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='s_consignor_name'>Consignor Name:</label>
                  <input
                    type='text'
                    id='s_consignor_name'
                    name='s_consignor_name'
                    value={consignor.s_consignor_name}
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
            <h2>Consignor Info Entry</h2>
            <div className='ConsignorEntryInfoForm'>
              <form onSubmit={e => handleSubmit(e, 2)}>
                <div className='form-group'>
                  <label htmlFor='s_consignor_id'>Consignor Id:</label>
                  <input
                    type='text'
                    id='s_consignor_id'
                    name='s_consignor_id'
                    required
                    value={consignorInfoData.s_consignor_id}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='cus_entity_id'>Customer/Entity Id:</label>
                  <input
                    type='text'
                    id='cus_entity_id'
                    name='cus_entity_id'
                    value={consignorInfoData.cus_entity_id}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='s_trans_id'>Transporter Id:</label>
                  <input
                    type='text'
                    id='s_trans_id'
                    name='s_trans_id'
                    value={consignorInfoData.s_trans_id}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='s_start_pt'>Starting Point:</label>
                  <input
                    type='text'
                    id='s_start_pt'
                    name='s_start_pt'
                    value={consignorInfoData.s_start_pt}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='s_dst_pt'>Destination Point:</label>
                  <input
                    type='text'
                    id='s_dst_pt'
                    name='s_dst_pt'
                    value={consignorInfoData.s_dst_pt}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='lat'>Latitude:</label>
                  <input
                    type='text'
                    id='lat'
                    name='lat'
                    value={consignorInfoData.lat}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='lat_dir'>Latitude Direction:</label>
                  <input
                    type='text'
                    id='lat_dir'
                    name='lat_dir'
                    value={consignorInfoData.lat_dir}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='long'>Longitude:</label>
                  <input
                    type='text'
                    id='long'
                    name='long'
                    value={consignorInfoData.long}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='long_dir'>Longitude Direction:</label>
                  <input
                    type='text'
                    id='long_dir'
                    name='long_dir'
                    value={consignorInfoData.long_dir}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='rad'>Radius:</label>
                  <input
                    type='text'
                    id='rad'
                    name='rad'
                    value={consignorInfoData.rad}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='s_cntct_prsn'>Contact Person:</label>
                  <input
                    type='text'
                    id='s_cntct_prsn'
                    name='s_cntct_prsn'
                    value={consignorInfoData.s_cntct_prsn}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='cntct_prsn_no'>
                    Contact Person Mobile No.:
                  </label>
                  <input
                    type='text'
                    id='cntct_prsn_no'
                    name='cntct_prsn_no'
                    value={consignorInfoData.cntct_prsn_no}
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

export default ConsignorEntryInfoForm
