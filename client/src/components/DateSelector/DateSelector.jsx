import React, { useEffect, useState } from "react";
import Select from "react-select";
import { DateInput, DateField } from "./DateSelectorStyles";

export default function DateSelector({
  setFieldValue,
  value,
  customDropdown,
  onChange,
}) {
  const defaultDay = value ? value.getDate() : 1;
  const defaultMonth = value ? value.getMonth() : 1;
  const defaultYear = value ? value.getFullYear() : 2000;
  // Date values
  const [day, setDay] = useState(defaultDay);
  const [month, setMonth] = useState(defaultMonth);
  const [year, setYear] = useState(defaultYear);

  // Join the day, month and year values intoa string to be used for validation
  // const joinDate = () => {
  //     return year + "-" + month.value + "-" + day;
  // };

  useEffect(() => {
    console.log("Onchange");

    // if (onChange) onChange(new Date(year, month, day));
    setFieldValue("date", new Date(year, month, day));
  }, [day, month, year, setFieldValue]);
  // const months = [
  //   { label: "January", value: 1 },
  //   { label: "February", value: "02" },
  //   { label: "March", value: "03" },
  //   { label: "April", value: "04" },
  //   { label: "May", value: "05" },
  //   { label: "June", value: "06" },
  //   { label: "July", value: "07" },
  //   { label: "August", value: "08" },
  //   { label: "September", value: "09" },
  //   { label: "October", value: "10" },
  //   { label: "November", value: "11" },
  //   { label: "December", value: "12" },
  // ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthOptions = months.map((month, idx) => ({
    label: month,
    value: idx,
  }));

  // Run joinDate whenever a change in the values are detected
  // useEffect(() => {
  //     joinDate();
  // }, [joinDate, day, month, year]);

  return (
    <DateInput>
      <DateField
        value={day}
        placeholder="DD"
        onChange={e => setDay(e.target.value)}
      />
      <Select
        value={monthOptions[month]}
        onChange={e => setMonth(e.value)}
        options={monthOptions}
        placeholder="Month"
        styles={customDropdown}
      />
      <DateField
        value={year}
        onChange={e => setYear(e.target.value)}
        placeholder="YYYY"
      />
    </DateInput>
  );
}
