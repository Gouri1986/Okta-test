import React from "react";

function Views({
  type,
  selectedViewType,
  setSelectedViewType,
  viewTypes,
  applicableType,
}) {
  return (
    <>
      <div className='flex-r-ac'>
        {type && (
          <div className='fw-600 f-14 fc-secondary mr-10'>
            View<span> {type} </span>by
          </div>
        )}
        <div className='bdr-r-10 bg-violet-container shw-violet p-5 flex-r'>
          {viewTypes?.map((type, index) => (
            <div
              onClick={() => setSelectedViewType(index)}
              className={`${
                selectedViewType === index ? "switch-selected" : "switch"
              } switch pl-15 pr-15 pt-5 pb-5 mr-5 cp`}
            >
              {type}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Views;
