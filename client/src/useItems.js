import { useEffect, useState } from 'react'
import { getItems, createItem } from './api/itemApi'

const SERVER_DOWN = 'Could not reach the server. Is the backend running on port 3000?'

const toMessage = (err) =>
  err.message === 'Failed to fetch' ? SERVER_DOWN : err.message

export default function useItems() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getItems()
      .then(setItems)
      .catch(() => setError(SERVER_DOWN))
  }, [])

  const addItem = async (x, y, text) => {
    try {
      const item = await createItem(x, y, text)
      setItems((prev) => [...prev, item])
      setError('')
      return true
    } catch (err) {
      setError(toMessage(err))
      return false
    }
  }

  return { items, error, setError, addItem }
}