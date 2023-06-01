const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3001',
  credentials: true, // access-control-allow-credentials: true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Define the mapping between customer-roles and bc-roles
const roleMapping = {
  "001 - Admin": "BC_ADMIN",
  "002 - Clinical personnel": "BC_CLINICAL",
  "003 - Warehouse personnel": "BC_WAREHOUSE",
};

// Current roles in the memory
let currentRoles = ["BC_ADMIN", "BC_CLINICAL"];

// Route to handle role synchronization
app.post('/sync-roles', (req, res) => {
  const { roles } = req.body;

  // Determine the outcome of the synchronization
  const deletedRoles = currentRoles.filter(role => !roles.includes(role));
  const addedRoles = roles.filter(role => !currentRoles.includes(role));
  const unchangedRoles = roles.filter(role => currentRoles.includes(role));

  // Update currentRoles with new roles
  currentRoles = roles;

  // Map customer roles to bc-roles
  const mappedDeletedRoles = deletedRoles.map(role => roleMapping[role]);
  const mappedAddedRoles = addedRoles.map(role => roleMapping[role]);
  const mappedUnchangedRoles = unchangedRoles.map(role => roleMapping[role]);

  // Send the synchronization result
  const syncResult = {
    deletedRoles: mappedDeletedRoles,
    addedRoles: mappedAddedRoles,
    unchangedRoles: mappedUnchangedRoles
  };
  res.json(syncResult);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
