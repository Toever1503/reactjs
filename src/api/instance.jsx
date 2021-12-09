import axios from 'axios';
const instance = axios.create({
  // baseURL: "https://618d287fedab980017fd5248.mockapi.io/api/v1"
  baseURL: "  http://localhost:3001",
});
export default instance;