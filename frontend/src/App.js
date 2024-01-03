// src/App.js
import React from 'react'
// import VendorCreationForm from './Components/vendorCreation/vendorCreation'
// import DeviceDetailsEntryForm from './Components/deviceDetails/deviceDetails'
// import PlantLocEntryInfoForm from './Components/plantLocationEntryInfo/plantLocInfo'
// import AssetRegistrationForm from './Components/assetDetails/assetRegistration'
// import AssetInfoForm from './Components/entityAssetInfo/entityAssetInfo'
import EntityCreationForm from './Components/entityCreation/entityCreation'
// import AssetEntryInfoForm from './Components/assetEntryInfo/assetInfo'
// import ConsigneeEntryInfoForm from './Components/consigneeEntryInfo/consigneeInfo'
// import ConsignorEntryInfoForm from './Components/consignorEntryInfo copy/consignorInfo'

function App () {
  return (
    <div className='App'>
      {/*<AssetRegistrationForm/>*/}
      <EntityCreationForm />
      {/*<DriverEntryForm/>*/}
      {/*<AssetEntryInfoForm/>*/}
      {/*<ConsigneeEntryInfoForm/>*/}
      {/*<ConsignorEntryInfoForm/>*/}
      {/*<VendorCreationForm/>*/}
      {/*<PlantLocEntryInfoForm/>*/}
      {/*<DeviceDetailsEntryForm/>*/}
    </div>
  )
}

export default App
