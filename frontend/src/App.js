import React, { useState, useEffect, Suspense, lazy } from 'react'
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
const DeviceEntryForm = lazy(() =>
  import('./Components/deviceEntry/deviceEntry.js')
)
const DriverRegistrationForm = lazy(() =>
  import('./Components/driverRegistration/driverRegistration.js')
)
const EntityCreationForm = lazy(() =>
  import('./Components/entityCreation/entityCreation.js')
)
const TransporterCreationForm = lazy(() =>
  import('./Components/transporterCreation/transporterCreation.js')
)
const PortDeviceMappingForm = lazy(() =>
  import('./Components/portDeviceMapping/portDeviceMapping.js')
)
const ServiceDataLogForm = lazy(() =>
  import('./Components/serviceDataLog/serviceDataLog.js')
)

function App() {
  const [selectedForm, setSelectedForm] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleFormClick = (formName) => {
    setSelectedForm(formName);
    setDropdownOpen(false);
    navigate(formName);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <div className="App">
      <Navbar
        toggleDropdown={toggleDropdown}
        closeDropdown={closeDropdown}
        handleFormClick={handleFormClick}
        isDropdownOpen={isDropdownOpen}
      />

      <div className="content-container">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/entityCreation" element={<EntityCreationForm />} />
            <Route
              path="/transporterCreation"
              element={<TransporterCreationForm />}
            />
            <Route path="/assetEntryInfo" element={<AssetEntryInfoForm />} />
            <Route
              path="/assetRegistration"
              element={<AssetRegistrationForm />}
            />
            <Route
              path="/assetDeviceMapping"
              element={<AssetDeviceMappingForm />}
            />
            <Route path="/deviceEntry" element={<DeviceEntryForm />} />
            <Route
              path="/driverRegistration"
              element={<DriverRegistrationForm />}
            />
            <Route
              path="/assetDriverMapping"
              element={<AssetDriverMapping />}
            />
            <Route
              path="/portDeviceMapping"
              element={<PortDeviceMappingForm />}
            />
            <Route
              path="/serviceDataLogForm"
              element={<ServiceDataLogForm />}
            />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}


export default App
