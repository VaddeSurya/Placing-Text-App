import axios from 'axios'
import { API_URL } from '../config'

const api = axios.create({
  baseURL: API_URL,   
})

export async function getItems() {
  const res = await api.get('/items')
  return res.data    
} 

export async function createItem(x, y, text) {
  try {
    const res = await api.post('/new', { x, y, text }) 
    return res.data 
  } catch (err) {
    throw new Error(err.response?.data?.error || 'Could not save item')
  }
}