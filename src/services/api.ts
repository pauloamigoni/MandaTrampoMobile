import axios from 'axios';

const api = axios.create({
  baseURL: 'http://www.mandatrampo.com.br:3333',
});

export default api;
