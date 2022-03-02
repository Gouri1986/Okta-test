import React from "react"

const ComplianceActionButton = ({ type, label, dark, onClick }) => {
  return (
    <div
      className={`pl-20 pr-20 ${
        dark ? "bg-black flex-r-jc-ac p-8  bdr-r-8" : "bg-secondary flex-r-jc-ac p-8  bdr-r-8 wp-100"
      }`}
      onClick={onClick}
    >
      {type === "copy" ? (
        <svg
          className="mr-5"
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.6727 7.32841C17.6628 7.2413 17.6438 7.15547 17.6158 7.07237V6.98703C17.5702 6.88952 17.5094 6.7999 17.4356 6.72151L11.7459 1.03177C11.6675 0.958009 11.5779 0.89719 11.4804 0.851596C11.4521 0.847575 11.4234 0.847575 11.395 0.851596C11.2987 0.79635 11.1923 0.760886 11.0821 0.747284H7.24154C6.48703 0.747284 5.76343 1.04701 5.22992 1.58053C4.6964 2.11404 4.39667 2.83765 4.39667 3.59215V4.54044H3.44838C2.69388 4.54044 1.97027 4.84017 1.43676 5.37368C0.903242 5.9072 0.603516 6.6308 0.603516 7.38531V16.8682C0.603516 17.6227 0.903242 18.3463 1.43676 18.8798C1.97027 19.4133 2.69388 19.7131 3.44838 19.7131H11.0347C11.7892 19.7131 12.5128 19.4133 13.0463 18.8798C13.5798 18.3463 13.8796 17.6227 13.8796 16.8682V15.9199H14.8279C15.5824 15.9199 16.306 15.6202 16.8395 15.0867C17.373 14.5532 17.6727 13.8296 17.6727 13.075V7.38531C17.6727 7.38531 17.6727 7.38531 17.6727 7.32841ZM11.983 3.98095L14.4391 6.43702H12.9313C12.6798 6.43702 12.4386 6.33711 12.2607 6.15927C12.0829 5.98143 11.983 5.74023 11.983 5.48873V3.98095ZM11.983 16.8682C11.983 17.1197 11.8831 17.3609 11.7052 17.5387C11.5274 17.7166 11.2862 17.8165 11.0347 17.8165H3.44838C3.19688 17.8165 2.95568 17.7166 2.77784 17.5387C2.6 17.3609 2.50009 17.1197 2.50009 16.8682V7.38531C2.50009 7.13381 2.6 6.89261 2.77784 6.71477C2.95568 6.53693 3.19688 6.43702 3.44838 6.43702H4.39667V13.075C4.39667 13.8296 4.6964 14.5532 5.22992 15.0867C5.76343 15.6202 6.48703 15.9199 7.24154 15.9199H11.983V16.8682ZM15.7761 13.075C15.7761 13.3265 15.6762 13.5677 15.4984 13.7456C15.3206 13.9234 15.0794 14.0233 14.8279 14.0233H7.24154C6.99004 14.0233 6.74884 13.9234 6.571 13.7456C6.39316 13.5677 6.29325 13.3265 6.29325 13.075V3.59215C6.29325 3.34065 6.39316 3.09945 6.571 2.92161C6.74884 2.74377 6.99004 2.64386 7.24154 2.64386H10.0864V5.48873C10.0864 6.24324 10.3861 6.96684 10.9197 7.50036C11.4532 8.03387 12.1768 8.3336 12.9313 8.3336H15.7761V13.075Z"
            fill="#FFBE55"
          />
        </svg>
      ) : null}
      <span className={` ${dark ? "fc-white" : "fc-secondary"} f-14 lh-2.1 fw-500`}>{label}</span>
    </div>
  )
}

export default ComplianceActionButton
