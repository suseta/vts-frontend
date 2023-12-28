import React, { useState } from 'react'
import './entityInfo.css'
import navLogo from '../../navLogo.jpg'

const EntityEntryInfoForm = () => {
  const [cusEntityInfoData, setCusEntityInfoData] = useState({
    cus_entity_id: '',
    cus_entity_name: '',
    cus_entity_typ: '',
    cus_entity_active_status: '',
    cus_parent_entity_id: '',
    cus_imdt_parent_entity_id: ''
  })

  const [subCusEntityInfoData, setSubCusEntityInfoData] = useState({
    sub_cus_entity_id: '',
    sub_cus_entity_name: '',
    sub_cus_entity_typ: '',
    sub_cus_entity_active_status: '',
    sub_cus_parent_entity_id: '',
    sub_cus_imdt_parent_entity_id: ''
  })

  const handleChange = (e, container = 1) => {
    const { name, value } = e.target
    if (container === 1) {
      setCusEntityInfoData(prevData => ({ ...prevData, [name]: value }))
    } else if (container === 2) {
      setSubCusEntityInfoData(prevData => ({ ...prevData, [name]: value }))
    }
  }

  const handleSubmit = (e, container = 1) => {
    e.preventDefault()
    const postData = container === 1 ? cusEntityInfoData : subCusEntityInfoData
    const endpoint =
      container === 1 ? 'AddCusEntityInfoData' : 'AddSubCusEntityInfoData'
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
            <h2>Customer/Entity Entry</h2>
            <div className='EntityEntryInfoForm'>
              <form onSubmit={e => handleSubmit(e, 1)}>
                <div className='form-group'>
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
                <div className='form-group'>
                  <label htmlFor='cus_entity_name'>Customer/Entity Name:</label>
                  <input
                    type='text'
                    id='cus_entity_name'
                    name='cus_entity_name'
                    value={cusEntityInfoData.cus_entity_name}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='cus_entity_typ'>Customer/Entity Type:</label>
                  <input
                    type='text'
                    id='cus_entity_typ'
                    name='cus_entity_typ'
                    value={cusEntityInfoData.cus_entity_typ}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='cus_entity_active_status'>
                    Customer/Entity Active Status:
                  </label>
                  <select
                    id='cus_entity_active_status'
                    name='cus_entity_active_status'
                    value={cusEntityInfoData.cus_entity_active_status}
                    onChange={handleChange}
                  >
                  <option value=''>Select</option>
                    <option value='Active'>Active</option>
                    <option value='Inactive'>Inactive</option>
                  </select>
                </div>
                <div className='form-group'>
                  <label htmlFor='cus_parent_entity_id'>
                    Parent Entity Id:
                  </label>
                  <input
                    type='text'
                    id='cus_parent_entity_id'
                    name='cus_parent_entity_id'
                    value={cusEntityInfoData.cus_parent_entity_id}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='cus_imdt_parent_entity_id'>
                    Immediate Parent Entity Name:
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
          <div className='container'>
            <h2>Sub-Entity Entry</h2>
            <div className='EntityEntryInfoForm'>
              <form onSubmit={e => handleSubmit(e, 2)}>
                <div className='form-group'>
                  <label htmlFor='sub_cus_entity_id'>Sub-Entity Id:</label>
                  <input
                    type='text'
                    id='sub_cus_entity_id'
                    name='sub_cus_entity_id'
                    required
                    value={subCusEntityInfoData.sub_cus_entity_id}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='sub_cus_entity_name'>Sub-Entity Name:</label>
                  <input
                    type='text'
                    id='sub_cus_entity_name'
                    name='sub_cus_entity_name'
                    value={subCusEntityInfoData.sub_cus_entity_name}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='sub_cus_entity_typ'>Sub-Entity Type:</label>
                  <input
                    type='text'
                    id='sub_cus_entity_typ'
                    name='sub_cus_entity_typ'
                    value={subCusEntityInfoData.sub_cus_entity_typ}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='sub_cus_entity_active_status'>
                    Sub-Entity Active Status:
                  </label>
                  <select
                    id='sub_cus_entity_active_status'
                    name='sub_cus_entity_active_status'
                    value={subCusEntityInfoData.sub_cus_entity_active_status}
                    onChange={handleChange}
                  >
                  <option value=''>Select</option>
                    <option value='Active'>Active</option>
                    <option value='Inactive'>Inactive</option>
                  </select>
                </div>
                <div className='form-group'>
                  <label htmlFor='sub_cus_parent_entity_id'>
                    Parent Sub-Entity Id:
                  </label>
                  <input
                    type='text'
                    id='sub_cus_parent_entity_id'
                    name='sub_cus_parent_entity_id'
                    value={subCusEntityInfoData.sub_cus_parent_entity_id}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='sub_cus_imdt_parent_entity_id'>
                    Immediate Parent Sub-Entity Name:
                  </label>
                  <input
                    type='text'
                    id='sub_cus_imdt_parent_entity_id'
                    name='sub_cus_imdt_parent_entity_id'
                    value={subCusEntityInfoData.sub_cus_imdt_parent_entity_id}
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

export default EntityEntryInfoForm
