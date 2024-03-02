import React, { useState, Suspense, lazy } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from './Components/formDesign/navbar.js'
import Footer from './Components/formDesign/footer.js'

// Lazy-loaded components
const AssetEntryInfoForm = lazy(() =>
  import('./Components/assetEntryInfo/assetEntryInfo.js')
)
const AssetRegistrationForm = lazy(() =>
  import('./Components/assetRegistration/assetRegistration.js')
)
const AssetDeviceMappingForm = lazy(() =>
  import('./Components/assetDeviceMapping/assetDeviceMapping.js')
)
const AssetDriverMapping = lazy(() =>
  import('./Components/assetDriverMapping/assetDriverMapping.js')
)
const DeviceInfoForm = lazy(() =>
  import('./Components/deviceDetails/deviceDetails.js')
)
const SimInfoForm = lazy(() => import('./Components/simDetails/simDetails.js'))

const DriverRegistrationForm = lazy(() =>
  import('./Components/driverRegistration/driverRegistration.js')
)
const EntityRegistrationForm = lazy(() =>
  import('./Components/entityRegistration/entityRegistration.js')
)
const UserRegistrationForm = lazy(() =>
  import('./Components/userRegistration/userRegistration.js')
)
const PortDeviceMappingForm = lazy(() =>
  import('./Components/portDeviceMapping/portDeviceMapping.js')
)
const ServiceDataLogForm = lazy(() =>
  import('./Components/serviceDataLog/serviceDataLog.js')
)
const LiveGpsDataFetchPage = lazy(() =>
  import('./Components/liveGpsDataFetchPage/liveGpsDataFetchPage.js')
)

function App () {
  const [selectedForm, setSelectedForm] = useState(null)
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const navigate = useNavigate()

  const handleFormClick = formName => {
    setSelectedForm(formName)
    setDropdownOpen(false)
    navigate(formName)
  }

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen)
  }

  const closeDropdown = () => {
    setDropdownOpen(false)
  }

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
            <Route
              path='/sid=S01&sname=entityRegistration'
              element={<EntityRegistrationForm />}
            />
            <Route
              path='/sid=S02&sname=userRegistration'
              element={<UserRegistrationForm />}
            />
            <Route
              path='/sid=S03&sname=assetEntryInfo'
              element={<AssetEntryInfoForm />}
            />
            <Route
              path='/sid=S04&sname=assetRegistration'
              element={<AssetRegistrationForm />}
            />
            <Route
              path='/sid=S05&sname=assetDeviceMapping'
              element={<AssetDeviceMappingForm />}
            />
            <Route
              path='/sid=S06&sname=deviceInfo'
              element={<DeviceInfoForm />}
            />
            <Route
              path='/sid=S07&sname=driverRegistration'
              element={<DriverRegistrationForm />}
            />
            <Route
              path='/sid=S08&sname=assetDriverMapping'
              element={<AssetDriverMapping />}
            />
            <Route
              path='/sid=S09&sname=portDeviceMapping'
              element={<PortDeviceMappingForm />}
            />
            <Route
              path='/sid=S10&sname=serviceDataLog'
              element={<ServiceDataLogForm />}
            />
            <Route
              path='/sid=S11&sname=liveGpsDataFetchPage'
              element={<LiveGpsDataFetchPage />}
            />
            <Route path='/sid=S12&sname=simInfo' element={<SimInfoForm />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  )
}

export default App
