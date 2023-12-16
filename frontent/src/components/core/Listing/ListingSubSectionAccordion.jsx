import React from 'react'

const ListingSubSectionAccordion = ({subSec}) => {
  return (
    <div>
    <div className="flex justify-between py-2">
      <div className={`flex items-center gap-2`}>
        <span>
        ⛰️
        </span>
        <p>{subSec.title}</p>
      </div>
    </div>
  </div>
  )
}

export default ListingSubSectionAccordion
