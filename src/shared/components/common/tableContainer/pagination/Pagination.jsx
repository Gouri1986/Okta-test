import React, { useEffect, useState } from "react";
import { PaginationLeftArrow, PaginationRightArrow } from "./assets";
import "./pagination.css";

const Pagination = () => {
  const totalNumbers = 12;
  const [selectedPageNumber, setSelectedPageNumber] = useState(1);
  const [showingPageNumbersRange, setShowingPageNumbersRange] = useState([]);

  const getArrayOfNumbers = (factor = 0) => {
    setShowingPageNumbersRange(
      new Array(totalNumbers)
        .fill("")
        .map((_, index) =>
          index === totalNumbers - 1 ? index + 1 : index + factor + 1
        )
    );
  };

  useEffect(() => {
    getArrayOfNumbers();
  }, []);

  return (
    <div className="pagination-container">
      <div className="pagination-left-button">
        <PaginationLeftArrow />
      </div>
      <div className="pagination-numbers">
        {showingPageNumbersRange.map((number) => {
          return (
            (number < showingPageNumbersRange[5] ||
              number === showingPageNumbersRange[totalNumbers - 1]) && (
              <div
                onClick={() =>
                  number === showingPageNumbersRange[4]
                    ? getArrayOfNumbers(4)
                    : setSelectedPageNumber(number)
                }
                className={
                  selectedPageNumber === number
                    ? "page-number-selected"
                    : "page-number"
                }
              >
                {number === showingPageNumbersRange[4] ? (
                  <span>...</span>
                ) : (
                  <span>{number}</span>
                )}
              </div>
            )
          );
        })}
      </div>
      <div className="pagination-right-button">
        <PaginationRightArrow />
      </div>
    </div>
  );
};

export default Pagination;
