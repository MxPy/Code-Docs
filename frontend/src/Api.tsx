import axios from "axios";

const api = axios.create({
  baseURL: 'http://192.168.33.6:8000/'
});

export default api;