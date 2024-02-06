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
            <Route path="/sid=S01&sname=entityCreation" element={<EntityCreationForm />} />
            <Route
              path="/sid=S02&sname=transporterCreation"
              element={<TransporterCreationForm />}
            />
            <Route path="/sid=S03&sname=assetEntryInfo" element={<AssetEntryInfoForm />} />
            <Route
              path="/sid=S04&sname=assetRegistration"
              element={<AssetRegistrationForm />}
            />
            <Route
              path="/sid=S05&sname=assetDeviceMapping"
              element={<AssetDeviceMappingForm />}
            />
            <Route path="/sid=S06&sname=deviceEntry" element={<DeviceEntryForm />} />
            <Route
              path="/sid=S07&sname=driverRegistration"
              element={<DriverRegistrationForm />}
            />
            <Route
              path="/sid=S08&sname=assetDriverMapping"
              element={<AssetDriverMapping />}
            />
            <Route
              path="/sid=S09&sname=portDeviceMapping"
              element={<PortDeviceMappingForm />}
            />
            <Route
              path="/sid=S10&sname=serviceDataLogForm"
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
