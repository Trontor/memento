import React from "react";
import { Graph, Months, Days, Squares } from "./ContributionGridStyles";
import moment from "moment";
import { theme } from "theme";

/** Math */
const getMonthNum = val => (val % 12) + 1;
const currentYear = new Date().getFullYear();
const getDaysInMonth = monthNum => {
  return moment(`${currentYear}-${monthNum}`, "YYYY-MM").daysInMonth();
};
const validateCellIndex = i => {
  const cellMonth = getMonthNum(i);
  const daysInMonth = getDaysInMonth(cellMonth);
  const cellDay = Math.floor(i / 12 + 1);
  return cellDay > daysInMonth ? "hidden" : "visible";
};

export default function ContributionGrid() {
  return (
    <Graph>
      <Months>
        {[...Array(31)].map((x, i) => (
          <li key={i}>{i + 1}</li>
        ))}
      </Months>
      <Days>
        {moment.monthsShort().map(month => (
          <li>{month}</li>
        ))}
      </Days>
      <Squares>
        {[...Array(372)].map((x, i) => (
          <li
            style={{
              backgroundColor: theme.palette.main,
              opacity: 1,
              visibility: validateCellIndex(i),
            }}
            key={i}
          />
        ))}
      </Squares>
    </Graph>
  );
}
