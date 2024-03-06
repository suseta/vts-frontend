
import React, { useState, useEffect } from 'react'
import './simDetails.css'

import { ubuntuIP } from '../constantVariable'

let SimDeactivationForm = () => {
  let initialState = {
    s_sim_no: '',
    sim_dlt_dt:''
  }

  let [simInfo, setSimInfo] = useState({
    s_sim_no: '',
    sim_dlt_dt:''
  })

  let [activeSimList, setActiveSimList] = useState({ data: [] })
  useEffect(() => {
    fetch(`${ubuntuIP}/api/v0/getActiveSimDetails`)
      .then(response => response.json())
      .then(data => {
        setActiveSimList({ data })
      })
      .catch(error => {
        console.error('Error: ', error)
      })
  }, [])

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
    fetch(`${ubuntuIP}/api/v0/deActivateSimDetails`, {
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
          <h2>SIM Deactivation</h2>
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
                  <select
                    id='s_sim_no'
                    name='s_sim_no'
                    value={simInfo.s_sim_no}
                    onChange={handleChange}
                  >
                    <option value=''>Select</option>
                    {activeSimList.data && Array.isArray(activeSimList.data.data) ? (
                      activeSimList.data.data.map(simList => (
                        <option
                          key={simList.s_sim_no}
                          value={simList.s_sim_no}
                        >
                          {simList.s_sim_no}
                        </option>
                      ))
                    ) : (
                      <option value=''>
                        {activeSimList.data && activeSimList.data.message
                          ? activeSimList.data.message
                          : 'No entities available'}
                      </option>
                    )}
                  </select>
                </div>
                <div className='form-group'>
                <label 
                    htmlFor='sim_dlt_dt'
                    className={`required-label ${
                        simInfo.sim_dlt_dt ? 'required' : ''
                      }`}>
                        SIM Remove Date:
                </label>
                <input
                  type='date'
                  id='sim_dlt_dt'
                  name='sim_dlt_dt'
                  value={simInfo.sim_dlt_dt}
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

export default SimDeactivationForm
