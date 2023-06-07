import axios from 'axios'

const clientAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // baseURL: 'http://localhost:3333',
})

export default clientAPI
