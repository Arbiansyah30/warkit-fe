// src/components/DateFilter.tsx
import React, { useState } from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateFilter: React.FC<{
  onFilter: (startDate: Date, endDate: Date) => void;
}> = ({ onFilter }) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const handleApply = () => {
    onFilter(state[0].startDate, state[0].endDate);
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Select Date Range</button>
      {isOpen && (
        <div style={{ position: "absolute", zIndex: 1000 }}>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setState([{
                startDate: item.range1.startDate as Date,
                endDate: item.range1.endDate as Date
            }])}
            moveRangeOnFirstSelection={false}
            ranges={state}
          />
          <button onClick={handleApply}>Apply</button>
        </div>
      )}
    </div>
  );
};

export default DateFilter;
