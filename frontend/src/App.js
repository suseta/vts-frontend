import React, { useState, useEffect, Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/formDesign/navbar.js'
import Footer from './Components/formDesign/footer.js'

const AssetEntryInfoForm = lazy(() =>
  import('./Components/assetEntryInfo/assetEntryInfo')
)
const AssetRegistrationForm = lazy(() =>
  import('./Components/assetRegistration/assetRegistration')
)
const AssetDeviceMappingForm = lazy(() =>
  import('./Components/assetDeviceMapping/assetDeviceMapping')
)
const AssetDriverMappingForm = lazy(() =>
  import('./Components/assetDriverMapping/assetDriverMapping')
)
const DeviceEntryForm = lazy(() =>
  import('./Components/deviceEntry/deviceEntry')
)
const DriverRegistrationForm = lazy(() =>
  import('./Components/driverRegistration/driverRegistration')
)
const EntityCreationForm = lazy(() =>
  import('./Components/entityCreation/entityCreation')
)
const TransporterCreationForm = lazy(() =>
  import('./Components/transporterCreation/transporterCreation')
)
const PortDeviceMappingForm = lazy(() =>
  import('./Components/portDeviceMapping/portDeviceMapping')
)
const ServiceDataLogForm = lazy(() =>
  import('./Components/serviceDataLog/serviceDataLog')
)

function App () {
  const [selectedForm, setSelectedForm] = useState(null)
  const [formComponent, setFormComponent] = useState(null)
  const [isDropdownOpen, setDropdownOpen] = useState(false)

  const handleFormClick = formName => {
    setSelectedForm(formName)
    setDropdownOpen(false)
  }

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen)
  }

  const closeDropdown = () => {
    setDropdownOpen(false)
  }

  useEffect(() => {
    if (selectedForm) {
      const importForm = async () => {
        try {
          const module = await import(
            `./Components/${selectedForm}/${selectedForm}`
          )
          const FormComponent = module.default
          setFormComponent(<FormComponent />)
        } catch (error) {
          console.error('Error loading component:', error)
        }
      }

      importForm()
    }
  }, [selectedForm])

  return (
    <div className='App'>
      <Navbar
        toggleDropdown={toggleDropdown}
        closeDropdown={closeDropdown}
        handleFormClick={handleFormClick}
        isDropdownOpen={isDropdownOpen}
      />

      <div className='content-container'>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/entityCreation' element={<EntityCreationForm />} />
            <Route
              path='/transporterCreation'
              element={<TransporterCreationForm />}
            />
            <Route path='/assetEntryInfo' element={<AssetEntryInfoForm />} />
            <Route
              path='/assetRegistration'
              element={<AssetRegistrationForm />}
            />
            <Route
              path='/assetDeviceMapping'
              element={<AssetDeviceMappingForm />}
            />
            <Route path='/deviceEntry' element={<DeviceEntryForm />} />
            <Route
              path='/driverRegistration'
              element={<DriverRegistrationForm />}
            />
            <Route
              path='/assetDriverMapping'
              element={<AssetDriverMappingForm />}
            />
            <Route
              path='/portDeviceMapping'
              element={<PortDeviceMappingForm />}
            />
            <Route
              path='/serviceDataLogForm'
              element={<ServiceDataLogForm />}
            />
          </Routes>
          {formComponent}
        </Suspense>
      </div>
      <Footer />
    </div>
  )
}

export default App
