import axios from 'axios';

export default class ApiService {
  async get(url, config) {
    try {
      return await axios.get(url, config);
    } catch (error) {
      return error;
    }
  }

  async post(url, data, config) {
    try {
      return await axios.post(url, data, config);
    } catch (error) {
      return error;
    }
  }

  async put(url, data, config) {
    try {
      return await axios.put(url, data, config);
    } catch (error) {
      return error;
    }
  }

  async delete(url, config) {
    try {
      return await axios.delete(url, config);
    } catch (error) {
      return error;
    }
  }
}
