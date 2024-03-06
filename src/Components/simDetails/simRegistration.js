import React, { useState, useEffect } from 'react'
import './simDetails.css'

import { ubuntuIP } from '../constantVariable'

let SimInfoForm = () => {
  let initialState = {
    s_sim_no: '',
    s_sim_op: '',
    sim_add_dt: ''
  }

  let [simInfo, setSimInfo] = useState({
    s_sim_no: '',
    s_sim_op: '',
    sim_add_dt: ''
  })

  let resetForm = () => {
    setSimInfo(initialState)
  }

  let refreshPage = () => {
    window.location.reload()
  }

  let handleChange = e => {
    let { name, value } = e.target
    setSimInfo(prevData => ({ ...prevData, [name]: value }))
  }

  let handleSubmit = e => {
    e.preventDefault()
    fetch(`${ubuntuIP}/api/v0/registerSimDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(simInfo)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success in SIM Entry form:', data)
        alert('SIM details saved successfully!')
      })
      .catch(error => {
        console.error('Error:', error)
        alert('Error! Please try again.')
      })
  }

  return (
    <div>
      <div className='wrapper'>
        <div className='container'>
          <h2>SIM Registration</h2>
          <div className='SimInfoForm'>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label
                  htmlFor='s_sim_no'
                  className={`required-label ${
                    simInfo.s_sim_no ? 'required' : ''
                  }`}
                >
                  SIM No.:
                </label>
                <input
                  type='number'
                  id='s_sim_no'
                  name='s_sim_no'
                  value={simInfo.s_sim_no}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_sim_op'
                  className={`required-label ${
                    simInfo.s_sim_op ? 'required' : ''
                  }`}
                >
                  SIM Operator:
                </label>
                <select
                  className='form-select'
                  id='s_sim_op'
                  name='s_sim_op'
                  required
                  value={simInfo.s_sim_op}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  <option value='Airtel Gprs'>
                    Airtel Gprs (airtelgprs.com)
                  </option>
                  <option value='Airtel Iot'>Airtel Iot (airteliot.com)</option>
                  <option value='Vodafone www'>Vodafone www (www)</option>
                  <option value='Vodafone Iot'>Vodafone Iot (iot.com)</option>
                  <option value='Idea Internet'>
                    Idea Internet (internet)
                  </option>
                  <option value='Idea isafe'>Idea isafe (isafe)</option>
                  <option value='Bsnl'>Bsnl (bsnl)</option>
                  <option value='Jio'>Jio (jio)</option>
                  <option value='onSAT'>onSAT (onSAT)</option>
                  <option value='Caburn Telecom'>
                    Caburn Telecom (intelligence.m2m)
                  </option>
                  <option value='DIGI'>DIGI (diginet)</option>
                  <option value='PWCC'>PWCC (public.pccwglobal.hktdcp)</option>
                  <option value='GTT'>GTT (internet.cellinkgy.com)</option>
                  <option value='Digicel'>Digicel (web.digicelgy.com)</option>
                  <option value='Claro Ecuador'>
                    Claro Ecuador (internet.claro.com.ec)
                  </option>
                  <option value='TRUPHONE'>TRUPHONE (iot.truphone.com)</option>
                </select>
              </div>
              <div className='form-group'>
                <label
                  htmlFor='sim_add_dt'
                  className={`required-label ${
                    simInfo.sim_add_dt ? 'required' : ''
                  }`}
                >
                  SIM Entry Date:
                </label>
                <input
                  type='date'
                  id='sim_add_dt'
                  name='sim_add_dt'
                  value={simInfo.sim_add_dt}
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

export default SimInfoForm
