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
            <button onClick={() => handleFormClick('entityCreation')}>
              Entity Registration
            </button>
            <button onClick={() => handleFormClick('transporterCreation')}>
              Transporter Registration
            </button>
            <button onClick={() => handleFormClick('assetEntryInfo')}>
              Asset Info Entry
            </button>
            <button onClick={() => handleFormClick('assetRegistration')}>
              Asset Registration
            </button>
            <button onClick={() => handleFormClick('assetDeviceMapping')}>
              Asset Device Mapping
            </button>
            <button onClick={() => handleFormClick('assetDriverMapping')}>
              Asset Driver Mapping
            </button>
            <button onClick={() => handleFormClick('deviceEntry')}>
              Device Entry
            </button>
            <button onClick={() => handleFormClick('driverRegistration')}>
              Driver Registration
            </button>
            <button onClick={() => handleFormClick('portDeviceMapping')}>
              Port Device Mapping
            </button>
            <button onClick={() => handleFormClick('serviceDataLog')}>
              Service Data Log
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
