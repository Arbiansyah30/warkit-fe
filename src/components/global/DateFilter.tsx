// src/components/DateFilter.tsx
import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import { convertQueryParamsToObject } from "../../libs/helper";

const DateFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());

  const [isOpen, setIsOpen] = useState(false);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const handleReset = () => setSearchParams({});
  return (
    <div>
      <div className="flex items-center gap-2">
        {from && to && (
          <p className="text-white cursor-pointer " onClick={handleReset}>
            RESET
          </p>
        )}
        <button
          className="bg-white p-2 px-3 text-xs rounded-sm flex items-center gap-3"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p>Select Date Range</p>
          <IoMdArrowDropdown
            className={`hidden duration-300 text-md fill-current sm:block ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
      {isOpen && (
        <div className="relative">
          <div
            style={{
              position: "absolute",
              zIndex: 1000,
              right: "100px",
              top: "10px",
            }}
          >
            <DateRange
              editableDateInputs={true}
              onChange={(item) => {
                setSearchParams({
                  ...queryParams,
                  from: item.range1.startDate
                    ?.toISOString()
                    .split("T")[0] as string,
                  to: item.range1.endDate
                    ?.toISOString()
                    .split("T")[0] as string,
                });
                setIsOpen((prev) => !prev);
              }}
              moveRangeOnFirstSelection={false}
              ranges={[
                {
                  startDate: new Date(from || new Date()),
                  endDate: new Date(to || new Date()),
                },
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DateFilter;
