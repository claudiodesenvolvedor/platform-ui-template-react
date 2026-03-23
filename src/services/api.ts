import axios from 'axios'

const parsedTimeout = Number(import.meta.env.VITE_API_TIMEOUT)
const requestTimeout =
  Number.isFinite(parsedTimeout) && parsedTimeout > 0 ? parsedTimeout : 5000

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://localhost:5001/api',
  timeout: requestTimeout,
})
