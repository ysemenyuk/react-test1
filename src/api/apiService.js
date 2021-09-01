import axios from 'axios';

const BASE_URL = 'http://localhost:3005';

export const usersService = {
  login: async (values) => await axios.post(`${BASE_URL}/auth/login`, values),
};

export const contactsService = {
  getAll: async () => await axios.get(`${BASE_URL}/contacts`),
  createOne: async (values) => await axios.post(`${BASE_URL}/contacts`, values),
  updateOne: async (values) => await axios.put(`${BASE_URL}/contacts/${values.id}`, values),
  deleteOne: async (id) => await axios.delete(`${BASE_URL}/contacts/${id}`),
};
