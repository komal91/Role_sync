import React, { useState } from 'react';
import './App.css';
import { syncRoles } from './api';

function App() {
  const [customerRoles, setCustomerRoles] = useState('');
  const [syncResult, setSyncResult] = useState(null);

  const handleCustomerRolesChange = (event) => {
    setCustomerRoles(event.target.value);
  };

  const handleSyncRoles = () => {
    syncRoles(customerRoles.split('\n'))
      .then(result => {
        setSyncResult(result);
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
  };

  return (
    <div className="container">
      <h2>Role Synchronization</h2>
      <div>
        <label htmlFor="customerRoles">Customer Roles:</label>
        <textarea id="customerRoles" rows="5" value={customerRoles} onChange={handleCustomerRolesChange}></textarea>
      </div>
      <button onClick={handleSyncRoles}>Sync Roles</button>
      {syncResult && (
        <div>
          <h3>Sync Result:</h3>
          <div>
            <strong>Deleted Roles:</strong> {syncResult.deletedRoles.join(', ')}
          </div>
          <div>
            <strong>Added Roles:</strong> {syncResult.addedRoles.join(', ')}
          </div>
          <div>
            <strong>Unchanged Roles:</strong> {syncResult.unchangedRoles.join(', ')}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
