import axios from 'axios'

// console.log(process.env.NEXT_PUBLIC_API_URL)

const clientAPI = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
  baseURL: 'http://localhost:3333',
})

export default clientAPI
