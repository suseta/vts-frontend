import React, { useState } from 'react'
import './portDeviceMapping.css'
import { useNavigate } from 'react-router-dom'

const ubuntuIP = process.env.ubuntuIP

let PortDeviceMappingForm = () => {
  let navigate = useNavigate()

  let initialState = {
    i_imei_no: '',
    i_port_no: '',
    prt_dvc_mp_dt: '',
    prt_dvc_unmp_dt: ''
  }

  let [portDeviceMapping, setPortDeviceMapping] = useState({
    i_imei_no: '',
    i_port_no: '',
    prt_dvc_mp_dt: '',
    prt_dvc_unmp_dt: ''
  })

  let resetForm = () => {
    setPortDeviceMapping(initialState)
  }

  let refreshPage = () => {
    window.location.reload()
  }

  let handleChange = e => {
    let { name, value, type, checked } = e.target
    setPortDeviceMapping(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  let handleSubmit = e => {
    e.preventDefault()
    fetch(`${ubuntuIP}/api/v0/setPortDeviceMapping`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(portDeviceMapping)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success in Port-Device Mapping Form:', data)
        alert('Port-device mapped successfully!')
      })
      .catch(error => {
        console.error('Error:', error)
        alert('Error! Please try again.')
      })
    console.log('Port-device mapping form submitted:', portDeviceMapping)
  }

  return (
    <div>
      <div className='wrapper'>
        <div className='container'>
          <h2>Port Device Mapping</h2>
          <div className='PortDeviceMappingForm'>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label
                  htmlFor='i_imei_no'
                  className={`required-label ${
                    portDeviceMapping.i_imei_no ? 'required' : ''
                  }`}
                >
                  Device Id/IMEI No.:
                </label>
                <input
                  type='number'
                  id='i_imei_no'
                  name='i_imei_no'
                  required
                  value={portDeviceMapping.i_imei_no}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='i_port_no'
                  className={`required-label ${
                    portDeviceMapping.i_port_no ? 'required' : ''
                  }`}
                >
                  Port No.:
                </label>
                <input
                  type='number'
                  id='i_port_no'
                  name='i_port_no'
                  required
                  value={portDeviceMapping.i_port_no}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='prt_dvc_mp_dt'
                  className={`required-label ${
                    portDeviceMapping.prt_dvc_mp_dt ? 'required' : ''
                  }`}
                >
                  Mapping Date:
                </label>
                <input
                  type='date'
                  id='prt_dvc_mp_dt'
                  name='prt_dvc_mp_dt'
                  required
                  value={portDeviceMapping.prt_dvc_mp_dt}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='prt_dvc_unmp_dt'>Un-mapping Date:</label>
                <input
                  type='date'
                  id='prt_dvc_unmp_dt'
                  name='prt_dvc_unmp_dt'
                  value={portDeviceMapping.prt_dvc_unmp_dt}
                  onChange={handleChange}
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

export default PortDeviceMappingForm
