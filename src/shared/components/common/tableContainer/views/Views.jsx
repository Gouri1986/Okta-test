import React from 'react'

function Views() {
  return (
    <>
        <div className='flex-r-ac'>
            <div className='fw-600 f-14 fc-secondary mr-10'>View<span> Complaince </span>by</div>
            <div className='bdr-r-10 bg-violet-container shw-violet p-5 flex-r'>
              <div className='switch pl-15 pr-15 pt-5 pb-5 mr-5'>Control ID</div>
              <div className='switch pl-15 pr-15 pt-5 pb-5'>Resource ID</div>
            </div>
        </div>
    </>
  )
}

export default Views


