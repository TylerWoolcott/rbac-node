import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

//singleton: instance that remembers the data throughout the instance being used until turned off

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
})

api.interceptors.response.use((res) => res, (error) => {
  if (error.response.status === 401) {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }
  return Promise.reject(error)
})

//best practice to store token
//bridge between fe and be
//dont need to recreate axios instance each time
//create auth service next time
