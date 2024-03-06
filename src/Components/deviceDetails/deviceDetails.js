import React, { useState } from 'react';
import './deviceDetails.css';
import DeviceRegistration from './deviceRegistration';
import DeviceDeactivation from './deviceDeactivation';

const DeviceInfoPage = () => {
  const [activeTab, setActiveTab] = useState('registration');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div>
      <h1>Device Management</h1>
      <div className="tab-buttons">
      <button
        className={`tab-button ${activeTab === 'registration' ? 'active' : ''}`}
        onClick={() => handleTabChange('registration')}
      >
        Device Registration
      </button>
      <button
        className={`tab-button ${activeTab === 'deactivation' ? 'active' : ''}`}
        onClick={() => handleTabChange('deactivation')}
      >
        Device Deactivation
      </button>
    </div>
    <div className="tab-content">
      {activeTab === 'registration' && <DeviceRegistration />}
      {activeTab === 'deactivation' && <DeviceDeactivation />}
    </div>
  </div>
);
};

export default DeviceInfoPage;

