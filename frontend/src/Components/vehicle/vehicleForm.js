import React, { useState, useEffect } from 'react'
import './vehicleForm.css'
import navLogo from '../../navLogo.jpg'

const VehicleForm = () => {
  const [formData, setFormData] = useState({
    s_entity_identity: '',
    s_transporter_id: '',
    s_asset_id: '',
    s_asset_name: '',
    imei_number: '',
    s_asset_type: '',
    s_fuel_type: '',
    i_tare_weight: '',
    i_gross_weight: '',
    s_asset_model: '',
    vahan_update_date: '',
    capacity_name: '',
    s_vendor_name: '',
    registration_date: '',
    mfg_dt: '',
    rc_validity_date: '',
    gate_pass: '',
    fitness_certificate_date: '',
    polution_certificate_date: '',
    isurance_validity_date: '',
    state_permit_date: '',
    international_permit_date: '',
    goods_permit_date: '',
    road_permit_date: '',
    battery_purchase_date: '',
    battery_expiry_date: '',
    i_standard_km: '',
    peso_license_date: '',
    rule_18: '',
    rule_19: '',
    s_driver_name: '',
    s_billing_remark: '',
    s_customer_remark: '',
    s_fnd_device_id: '',
    s_site_location: '',
    s_national_certificate_no: '',
    national_test_date: '',
    national_validity_date: '',
    vehicle_active_status: '',
    i_seating_capacity: ''
  })

  const [entityIdentityOptions, setEntityIdentityOptions] = useState([])

  useEffect(() => {
    // Fetch options from your API
    fetch('your_api_endpoint')
      .then(response => response.json())
      .then(data => {
        // Assuming data is an array of options
        setEntityIdentityOptions(data)
      })
      .catch(error => {
        console.error('Error fetching options:', error)
      })
  }, [])

  const [assetTypes, setAssetTypes] = useState([])

  useEffect(() => {
    // Fetch asset types from API when the component mounts
    fetch('YOUR_API_ENDPOINT_FOR_ASSET_TYPES')
      .then(response => response.json())
      .then(data => setAssetTypes(data))
      .catch(error => console.error('Error fetching asset types:', error))
  }, [])

  const [fuelTypes, setFuelTypes] = useState([])

  useEffect(() => {
    // Fetch asset types from API when the component mounts
    fetch('YOUR_API_ENDPOINT_FOR_ASSET_TYPES')
      .then(response => response.json())
      .then(data => setFuelTypes(data))
      .catch(error => console.error('Error fetching asset types:', error))
  }, [])

  const [capacityNames, setCapacityNames] = useState([])

  useEffect(() => {
    // Fetch asset types from API when the component mounts
    fetch('YOUR_API_ENDPOINT_FOR_ASSET_TYPES')
      .then(response => response.json())
      .then(data => setCapacityNames(data))
      .catch(error => console.error('Error fetching asset types:', error))
  }, [])

  const [associatedTransporterNames, setAssociatedTransporterNames] = useState([])

  useEffect(() => {
    // Fetch asset types from API when the component mounts
    fetch('YOUR_API_ENDPOINT_FOR_ASSET_TYPES')
      .then(response => response.json())
      .then(data => setAssociatedTransporterNames(data))
      .catch(error => console.error('Error fetching asset types:', error))
  }, [])

  const [manufacturingYears, setManufacturingYears] = useState([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsArray = Array.from({ length: currentYear - 1989 }, (_, index) => currentYear - index);
    setManufacturingYears(yearsArray);
  }, []);

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    fetch('http://65.2.151.41:1410/api/v0/addVehicle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data)
        alert('Form submitted successfully!')
      })
      .catch(error => {
        console.error('Error:', error)
        alert('Error submitting form. Please try again.')
      })
    console.log('Form submitted:', formData)
  }

  return (
    <div>
      <div className='navbar'>
        <img src={navLogo} alt='Logo' className='logo' />
        <a href='#'>NavitronicX</a>
      </div>
      <div className='container'>
        <div className='VehicleForm'>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='s_entity_identity' className='mandatory'>
                Entity:
              </label>
              <select
                className='form-select'
                id='s_entity_identity'
                name='s_entity_identity'
                required
                value={formData.s_entity_identity}
                onChange={handleChange}
              >
                <option value=''>Select</option>
                {entityIdentityOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor='s_asset_type' className='mandatory'>
                Asset Type:
              </label>
              <select
                className='form-select'
                id='s_asset_type'
                name='s_asset_type'
                required
                value={formData.s_asset_type}
                onChange={handleChange}
              >
                <option value=''>Select</option>
                {assetTypes.map(assetType => (
                  <option key={assetType.id} value={assetType.id}>
                    {assetType.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor='s_fuel_type'>
                Fuel Type:
              </label>
              <select
                className='form-select'
                id='s_fuel_type'
                name='s_fuel_type'
                required
                value={formData.s_fuel_type}
                onChange={handleChange}
              >
                <option value=''>Select</option>
                {fuelTypes.map(fuelType => (
                  <option key={fuelType.id} value={fuelType.id}>
                    {fuelType.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor='capacity_name'>Asset Capacity:</label>
              <select
                className='form-select'
                id='capacity_name'
                name='capacity_name'
                required
                value={formData.capacity_name}
                onChange={handleChange}
              >
                <option value=''>Select</option>
                {capacityNames.map(capacityName => (
                  <option key={capacityName.id} value={capacityName.id}>
                    {capacityName.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor='s_transporter_id'>
                Associated Transporter Name:
              </label>
              <select
                className='form-select'
                id='s_transporter_id'
                name='s_transporter_id'
                required
                value={formData.s_transporter_id}
                onChange={handleChange}
              >
                <option value=''>Select</option>
                {associatedTransporterNames.map(associatedTransporterName => (
                  <option key={associatedTransporterName.id} value={associatedTransporterName.id}>
                    {associatedTransporterName.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
            <label htmlFor='mfg_dt'>Manufacturing Date:</label>
            <select
          className='form-select'
          id='mfg_dt'
          name='mfg_dt'
          value={formData.mfg_dt}
          onChange={handleChange}
        >
          <option value=''>Select</option>
          {manufacturingYears.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
          </div>
            <div>
              <label htmlFor='s_asset_id' className='mandatory'>
                Asset ID:
              </label>
              <input
                type='text'
                id='s_asset_id'
                name='s_asset_id'
                required
                value={formData.s_asset_id}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='s_asset_name'>Asset Name:</label>
              <input
                type='text'
                id='s_asset_name'
                name='s_asset_name'
                value={formData.s_asset_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='imei_number'>IMEI Number:</label>
              <input
                type='text'
                id='imei_number'
                name='imei_number'
                value={formData.imei_number}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='i_tare_weight'>Tare Weight:</label>
              <input
                type='number'
                id='i_tare_weight'
                name='i_tare_weight'
                value={formData.i_tare_weight}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='i_gross_weight'>Gross Weight:</label>
              <input
                type='number'
                id='i_gross_weight'
                name='i_gross_weight'
                value={formData.i_gross_weight}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='s_asset_model'>Asset Model:</label>
              <input
                type='text'
                id='s_asset_model'
                name='s_asset_model'
                value={formData.s_asset_model}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='s_vendor_name'>Vendor Name:</label>
              <input
                type='text'
                id='s_vendor_name'
                name='s_vendor_name'
                value={formData.s_vendor_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='registration_date'>Registration Date:</label>
              <input
                type='date'
                id='registration_date'
                name='registration_date'
                value={formData.registration_date}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='rc_validity_date'>RC Validity Date:</label>
              <input
                type='date'
                id='rc_validity_date'
                name='rc_validity_date'
                value={formData.rc_validity_date}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='gate_pass'>Gate Pass:</label>
              <input
                type='date'
                id='gate_pass'
                name='gate_pass'
                value={formData.gate_pass}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor='fitness_certificate_date'>
                Fitness Certificate Date:
              </label>
              <input
                type='date'
                id='fitness_certificate_date'
                name='fitness_certificate_date'
                value={formData.fitness_certificate_date}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor='polution_certificate_date'>
                Pollution Certificate Date:
              </label>
              <input
                type='date'
                id='polution_certificate_date'
                name='polution_certificate_date'
                value={formData.polution_certificate_date}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor='isurance_validity_date'>
                Insurance Validity Date:
              </label>
              <input
                type='date'
                id='isurance_validity_date'
                name='isurance_validity_date'
                value={formData.isurance_validity_date}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor='state_permit_date'>State Permit Date:</label>
              <input
                type='date'
                id='state_permit_date'
                name='state_permit_date'
                value={formData.state_permit_date}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor='international_permit_date'>
                International Permit Date:
              </label>
              <input
                type='date'
                id='international_permit_date'
                name='international_permit_date'
                value={formData.international_permit_date}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor='goods_permit_date'>Goods Permit Date:</label>
              <input
                type='date'
                id='goods_permit_date'
                name='goods_permit_date'
                value={formData.goods_permit_date}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor='road_permit_date'>Road Permit Date:</label>
              <input
                type='date'
                id='road_permit_date'
                name='road_permit_date'
                value={formData.road_permit_date}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='battery_purchase_date'>
                Battery Purchase Date:
              </label>
              <input
                type='date'
                id='battery_purchase_date'
                name='battery_purchase_date'
                value={formData.battery_purchase_date}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='battery_expiry_date'>Battery Expiry Date:</label>
              <input
                type='date'
                id='battery_expiry_date'
                name='battery_expiry_date'
                value={formData.battery_expiry_date}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='i_standard_km'>Standard Kilometers:</label>
              <input
                type='number'
                id='i_standard_km'
                name='i_standard_km'
                value={formData.i_standard_km}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='peso_license_date'>PESO License Date:</label>
              <input
                type='date'
                id='peso_license_date'
                name='peso_license_date'
                value={formData.peso_license_date}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor='rule_18'>Rule 18 Implementation Date:</label>
              <input
                type='date'
                id='rule_18'
                name='rule_18'
                value={formData.rule_18}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor='rule_19'>Rule 19 Implementation Date:</label>
              <input
                type='date'
                id='rule_19'
                name='rule_19'
                value={formData.rule_19}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor='s_driver_name'>Driver Name:</label>
              <input
                type='text'
                id='s_driver_name'
                name='s_driver_name'
                value={formData.s_driver_name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor='s_billing_remark'>Billing Remark:</label>
              <input
                type='text'
                id='s_billing_remark'
                name='s_billing_remark'
                value={formData.s_billing_remark}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='s_customer_remark'>Customer Remark:</label>
              <input
                type='text'
                id='s_customer_remark'
                name='s_customer_remark'
                value={formData.s_customer_remark}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor='s_fnd_device_id'>FND Device ID:</label>
              <input
                type='text'
                id='s_fnd_device_id'
                name='s_fnd_device_id'
                value={formData.s_fnd_device_id}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor='s_site_location'>Site Location:</label>
              <input
                type='text'
                id='s_site_location'
                name='s_site_location'
                value={formData.s_site_location}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor='s_national_certificate_no'>
                National Certificate Number:
              </label>
              <input
                type='text'
                id='s_national_certificate_no'
                name='s_national_certificate_no'
                value={formData.s_national_certificate_no}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='national_test_date'>National Test Date:</label>
              <input
                type='date'
                id='national_test_date'
                name='national_test_date'
                value={formData.national_test_date}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor='national_validity_date'>
                National Validity Date:
              </label>
              <input
                type='date'
                id='national_validity_date'
                name='national_validity_date'
                value={formData.national_validity_date}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor='vehicle_active_status'>
                Vehicle Active Status:
              </label>
              <select
                id='vehicle_active_status'
                name='vehicle_active_status'
                value={formData.vehicle_active_status}
                onChange={handleChange}
              >
                <option value='Y'>Active</option>
                <option value='N'>Inactive</option>
              </select>
            </div>

            <div>
              <label htmlFor='i_seating_capacity'>Seating Capacity:</label>
              <input
                type='number'
                id='i_seating_capacity'
                name='i_seating_capacity'
                value={formData.i_seating_capacity}
                onChange={handleChange}
              />
            </div>
            <div class='form-buttons'>
              <button type='submit'>Save</button>
              <button type='button' class='cancel-button'>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default VehicleForm
