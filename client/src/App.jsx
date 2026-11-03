import React from 'react'
import TextInput from './components/TextInput'
import Texts from './components/Texts'
import useItems from './useItems'

const App = () => {
  const { items, error, setError, addItem } = useItems()

  return (
    <div className='m-50'>
      <div className='flex gap-30'>
        <TextInput onSave={addItem} onInvalid={setError} />
        <Texts items={items} />
      </div>
      {error && <p className='text-red-600 mt-4'>{error}</p>}
    </div>
  )
}

export default App