import React from "react"

const JumpArrow = props => {
  const { height, width } = props
  return (
    <>
      <svg width={width} height={height} viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.0611 3.27362C7.03448 3.20498 6.99458 3.14227 6.94367 3.08909L4.1477 0.293116C4.09556 0.240978 4.03366 0.19962 3.96554 0.171403C3.89742 0.143185 3.82441 0.128662 3.75067 0.128662C3.60176 0.128662 3.45894 0.187818 3.35364 0.293116C3.30151 0.345255 3.26015 0.407152 3.23193 0.475274C3.20371 0.543396 3.18919 0.616409 3.18919 0.690144C3.18919 0.839058 3.24835 0.981874 3.35364 1.08717L5.19898 2.92692H0.954702C0.806394 2.92692 0.664161 2.98584 0.559292 3.0907C0.454423 3.19557 0.395508 3.33781 0.395508 3.48611C0.395508 3.63442 0.454423 3.77665 0.559292 3.88152C0.664161 3.98639 0.806394 4.04531 0.954702 4.04531H5.19898L3.35364 5.88506C3.30123 5.93704 3.25963 5.99889 3.23124 6.06703C3.20285 6.13517 3.18824 6.20826 3.18824 6.28208C3.18824 6.3559 3.20285 6.42899 3.23124 6.49714C3.25963 6.56528 3.30123 6.62713 3.35364 6.67911C3.40563 6.73152 3.46748 6.77312 3.53562 6.80151C3.60376 6.8299 3.67685 6.84452 3.75067 6.84452C3.82449 6.84452 3.89758 6.8299 3.96572 6.80151C4.03387 6.77312 4.09571 6.73152 4.1477 6.67911L6.94367 3.88314C6.99458 3.82996 7.03448 3.76725 7.0611 3.69861C7.11703 3.56247 7.11703 3.40976 7.0611 3.27362Z"
          fill="#1F4173"
        />
      </svg>
    </>
  )
}

export default JumpArrow
