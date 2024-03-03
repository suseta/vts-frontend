import React from 'react'
import navLogo from '../../navLogo.jpg'
import './navbar.css'

const Navbar = ({
  isDropdownOpen = false,
  toggleDropdown,
  closeDropdown,
  handleFormClick
}) => {
  return (
    <div className='navbar-main'>
      <div className='logo-container'>
        <img src={navLogo} alt='Logo' className='logo' />
        <div className='brand-text'>
          <span>NavitronicX</span>
        </div>
      </div>
      <div
        className='menu-container'
        onMouseEnter={toggleDropdown}
        onMouseLeave={closeDropdown}
      >
        <button className='menu-button'>Menu</button>
        {isDropdownOpen && (
          <div className='dropdown-content'>
            <button
              onClick={() =>
                handleFormClick('sid=S01&sname=entityRegistration')
              }
            >
              Entity Registration
            </button>
            <button
              onClick={() =>
                handleFormClick('sid=S02&sname=userRegistration')
              }
            >
              User Registration
            </button>
            <button
              onClick={() => handleFormClick('sid=S03&sname=assetEntryInfo')}
            >
              Asset Info Entry
            </button>
            <button
              onClick={() => handleFormClick('sid=S04&sname=assetRegistration')}
            >
              Asset Registration
            </button>
            <button
              onClick={() => handleFormClick('sid=S12&sname=simInfo')}
            >
              SIM Registration
            </button>
            <button
              onClick={() =>
                handleFormClick('sid=S05&sname=assetDeviceMapping')
              }
            >
              Asset Device Mapping
            </button>
            <button onClick={() => handleFormClick('sid=S06&sname=deviceInfo')}>
            Device Registration
            </button>
            <button
              onClick={() =>
                handleFormClick('sid=S07&sname=driverRegistration')
              }
            >
              Driver Registration
            </button>
            <button
              onClick={() =>
                handleFormClick('sid=S08&sname=assetDriverMapping')
              }
            >
              Asset Driver Mapping
            </button>
            <button
              onClick={() => handleFormClick('sid=S09&sname=portDeviceMapping')}
            >
              Port Device Mapping
            </button>
            <button
              onClick={() => handleFormClick('sid=S10&sname=serviceDataLog')}
            >
              Service Data Log
            </button>
            <button
              onClick={() => handleFormClick('sid=S11&sname=liveGpsDataFetchPage')}
            >
              Live GPS Data
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
