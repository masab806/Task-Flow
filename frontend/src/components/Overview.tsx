import React from 'react'
import TaskCard from './TaskCard'

const Overview = () => {
  return (
    <div className='grid grid-cols-3 gap-3'>
      <TaskCard/>
      <TaskCard/>
      <TaskCard/>
    
    </div>
  )
}

export default Overview