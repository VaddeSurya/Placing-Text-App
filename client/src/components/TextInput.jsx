import React, { useState } from 'react'

const TextInput = ({ onSave, onInvalid }) => {
  const [xVal, setXval] = useState('')
  const [yVal, setYval] = useState('')
  const [text, setText] = useState('')

  const handleSave = async () => {
    const x = Number(xVal)
    const y = Number(yVal)

    if (xVal === '' || yVal === '' || isNaN(x) || isNaN(y)) {
      onInvalid('Enter numbers for x and y.')
      return
    }
    if (text.trim() === '') {
      onInvalid('Enter some text.')
      return
    }

    const ok = await onSave(x, y, text)
    if (ok) {
      setXval('')
      setYval('')
      setText('')
    }
  }

  return (
    <div className='flex flex-col gap-3 w-40'>
      <label>x</label>
      <input
        placeholder='Enter x'
        className='border-2'
        type='number'
        value={xVal}
        onChange={(e) => setXval(e.target.value)}
      />
      <label>y</label>
      <input
        placeholder='Enter y'
        className='border-2'
        type='number'
        value={yVal}
        onChange={(e) => setYval(e.target.value)}
      />
      <label className='mt-8'>text</label>
      <input
        placeholder='Enter Text'
        className='border-2 w-40 h-11'
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSave()}
      />
      <button
        onClick={handleSave}
        className='border-2 cursor-pointer w-25 bg-blue-600 text-white rounded-2xl'
      >
        Save
      </button>
    </div>
  )
}

export default TextInput