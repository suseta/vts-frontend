import React, { useState, useEffect } from 'react'
import './assetDriverMapping.css'
import { useNavigate } from 'react-router-dom'
import Navbar from '../formDesign/navbar'
import Footer from '../formDesign/footer'

let AssetDriverMappingForm = () => {
  let navigate = useNavigate()

  let initialState = {
    s_entity_id: '',
    s_entity_id_and_name: '',
    s_asset_id: '',
    s_drv1_name: '',
    s_drv2_name: ''
  }

  let [assetDriverMapping, setAssetDriverMapping] = useState({
    s_entity_id: '',
    s_entity_id_and_name: '',
    s_asset_id: '',
    s_drv1_name: '',
    s_drv2_name: ''
  })

  const handleNameChange = (e, s_entity_id1) => {
    let { name, value } = e.target
    if (name === 's_entity_id_and_name') {
      setAssetDriverMapping(prevData => ({
        ...prevData,
        s_entity_id_and_name: value,
        s_entity_id: s_entity_id1
      }))
    }
  }

  let [entityNames, setEntityNames] = useState({ data: [] })
  useEffect(() => {
    fetch('http://13.201.79.110:1410/api/v0/getAllEntityNameList')
      .then(response => response.json())
      .then(data => {
        setEntityNames({ data })
      })
      .catch(error => {
        console.error('Error: ', error)
      })
  }, [])

  let [assetNo, setAssetNo] = useState({ data: [] })
  useEffect(() => {
    if (assetDriverMapping.s_entity_id) {
      fetch(
        `http://13.201.79.110:1410/api/v0/getVehicleDetails?s_entity_id=${assetDriverMapping.s_entity_id}`
      )
        .then(response => response.json())
        .then(data => {
          setAssetNo({ data })
        })
        .catch(error => {
          console.error('Error: ', error)
        })
    }
  }, [assetDriverMapping.s_entity_id])

  let [driverName, setDriverName] = useState({ data: [] })
  useEffect(() => {
    if (assetDriverMapping.s_entity_id) {
      fetch(
        `http://13.201.79.110:1410/api/v0/getDriverDetails?s_entity_id=${assetDriverMapping.s_entity_id}`
      )
        .then(response => response.json())
        .then(data => {
          setDriverName({ data })
        })
        .catch(error => {
          console.error('Error: ', error)
        })
    }
  }, [assetDriverMapping.s_entity_id])

  let resetForm = () => {
    setAssetDriverMapping(initialState)
  }

  let refreshPage = () => {
    window.location.reload()
  }

  let handleChange = e => {
    let { name, value, type, checked } = e.target
    setAssetDriverMapping(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  let handleSubmit = e => {
    e.preventDefault()
    fetch('http://13.201.79.110:1410/api/v0/setAssetDriverMapping', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(assetDriverMapping)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success in Asset Driver Mapping Form:', data)
        alert('Asset driver mapped successfully!')
      })
      .catch(error => {
        console.error('Error:', error)
        alert('Error! Please try again.')
      })
    console.log('Asset driver mapping form submitted:', assetDriverMapping)
  }

  return (
    <div>
      <div className='wrapper'>
        <div className='container'>
          <h2>Asset Driver Mapping</h2>
          <div className='AssetDriverMappingForm'>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label
                  htmlFor='s_entity_id_and_name'
                  className={`required-label ${
                    assetDriverMapping.s_entity_id_and_name ? 'required' : ''
                  }`}
                >
                  Entity:
                </label>
                <select
                  className='form-select'
                  id='s_entity_id_and_name'
                  name='s_entity_id_and_name'
                  required
                  value={assetDriverMapping.s_entity_id_and_name}
                  onChange={e => {
                    const selectedEntity = entityNames.data.data.find(
                      entity => entity.s_entity_name === e.target.value
                    )
                    handleNameChange(e, selectedEntity?.s_entity_id)
                  }}
                >
                  <option value=''>Select</option>
                  {entityNames.data && Array.isArray(entityNames.data.data) ? (
                    entityNames.data.data.map(entity => (
                      <option
                        key={entity.s_entity_id}
                        value={entity.s_entity_name}
                      >
                        {entity.s_entity_name}
                      </option>
                    ))
                  ) : (
                    <option value=''>
                      {entityNames.data && entityNames.data.message
                        ? entityNames.data.message
                        : 'No entities available'}
                    </option>
                  )}
                </select>
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_asset_id'
                  className={`required-label ${
                    assetDriverMapping.s_asset_id ? 'required' : ''
                  }`}
                >
                  Asset No.:
                </label>
                <select
                  className='form-select'
                  id='s_asset_id'
                  name='s_asset_id'
                  required
                  value={assetDriverMapping.s_asset_id}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  {assetNo.data && Array.isArray(assetNo.data.data) ? (
                    assetNo.data.data.map(asset => (
                      <option key={asset.s_asset_id} value={asset.s_asset_id}>
                        {asset.s_asset_id}
                      </option>
                    ))
                  ) : (
                    <option value=''>
                      {assetNo.data && assetNo.data.message
                        ? assetNo.data.message
                        : 'No assets available'}
                    </option>
                  )}
                </select>
              </div>
              <div className='form-group'>
                <label
                  htmlFor='s_drv1_name'
                  className={`required-label ${
                    assetDriverMapping.s_drv1_name ? 'required' : ''
                  }`}
                >
                  Driver-1 Name:
                </label>
                <select
                  className='form-select'
                  id='s_drv1_name'
                  name='s_drv1_name'
                  required
                  value={assetDriverMapping.s_drv1_name}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  {driverName.data && Array.isArray(driverName.data.data) ? (
                    driverName.data.data.map(drv => (
                      <option key={drv.s_drv_id} value={drv.s_drv_name}>
                        {drv.s_drv_name}
                      </option>
                    ))
                  ) : (
                    <option value=''>
                      {driverName.data && driverName.data.message
                        ? driverName.data.message
                        : 'No drivers available'}
                    </option>
                  )}
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='s_drv2_name'>Driver-2 Name:</label>
                <select
                  className='form-select'
                  id='s_drv2_name'
                  name='s_drv2_name'
                  required
                  value={assetDriverMapping.s_drv2_name}
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  {driverName.data && Array.isArray(driverName.data.data) ? (
                    driverName.data.data.map(drv => (
                      <option key={drv.s_drv_id} value={drv.s_drv_name}>
                        {drv.s_drv_name}
                      </option>
                    ))
                  ) : (
                    <option value=''>
                      {driverName.data && driverName.data.message
                        ? driverName.data.message
                        : 'No drivers available'}
                    </option>
                  )}
                </select>
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
      <Footer />
    </div>
  )
}

export default AssetDriverMappingForm
