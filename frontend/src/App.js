// src/App.js
import React from 'react'
// import AssetRegistrationForm from './Components/assetRegistration/assetRegistration'
// import TransporterCreationForm from './Components/transporterCreation/transporterCreation'
// import DeviceEntryForm from './Components/deviceEntry/deviceEntry'
// import PlantLocEntryInfoForm from './Components/plantLocationEntryInfo/plantLocInfo'
// import AssetInfoForm from './Components/entityAssetInfo/entityAssetInfo'
// import EntityCreationForm from './Components/entityCreation/entityCreation'
import AssetEntryInfoForm from './Components/assetEntryInfo/assetEntryInfo'
// import ConsigneeEntryInfoForm from './Components/consigneeEntryInfo/consigneeInfo'
// import ConsignorEntryInfoForm from './Components/consignorEntryInfo copy/consignorInfo'
// import DriverEntryForm from './Components/driverDetails/driverEntry'

function App () {
  return (
    <div className='App'>
      {/*<AssetRegistrationForm />*/}
      {/* <EntityCreationForm /> */}
      {/* <DriverEntryForm/> */}
      <AssetEntryInfoForm/>
      {/*<ConsigneeEntryInfoForm/>*/}
      {/*<ConsignorEntryInfoForm/>*/}
      {/* <TransporterCreationForm /> */}
      {/* <PlantLocEntryInfoForm/> */}
      {/* <DeviceEntryForm/> */}
    </div>
  )
}

export default App
