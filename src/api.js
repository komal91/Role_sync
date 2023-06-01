import axios from 'axios';

export function syncRoles(customerRoles) {
  return axios.post('http://localhost:3000/sync-roles', { roles: customerRoles })
    .then(response => response.data)
    .catch(error => {
      console.error('Error:', error.message);
      throw error;
    });
}
