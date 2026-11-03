import React from 'react'

const Texts = ({ items }) => {
  return (
    <div className='border-2 w-300 h-150 relative overflow-hidden'>
      {items.map((item) => (
        <span
          key={item.id}
          className='absolute whitespace-nowrap'
          style={{ left: `${item.x}px`, top: `${item.y}px` }}
        >
          
          <div className='border-2 bg-blue-100 p-1'>{item.text}</div>
        </span>
      ))}
    </div>
  )
}

export default Texts