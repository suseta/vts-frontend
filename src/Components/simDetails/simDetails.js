import React, { useState } from 'react';
import './simDetails.css';
import SimRegistrationForm from './simRegistration';
import SimDeactivationForm from './simDeactivation';

const SimInfoPage = () => {
  const [activeTab, setActiveTab] = useState('registration');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <h1>SIM Management</h1>
      <div className="tab-buttons">
        <button
          className={`tab-button ${activeTab === 'registration' ? 'active' : ''}`}
          onClick={() => handleTabChange('registration')}
        >
          SIM Registration
        </button>
        <button
          className={`tab-button ${activeTab === 'deactivation' ? 'active' : ''}`}
          onClick={() => handleTabChange('deactivation')}
        >
          SIM Deactivation
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'registration' && <SimRegistrationForm />}
        {activeTab === 'deactivation' && <SimDeactivationForm />}
      </div>
    </div>
  );
};

export default SimInfoPage;
