import React, { useEffect, useState } from "react";
import Select from "react-select";
import { DateInput, DateField } from "./DateSelectorStyles";

export default function DateSelector({ value, customDropdown, onChange }) {
  // Date values
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // Join the day, month and year values intoa string to be used for validation
  // const joinDate = () => {
  //     return year + "-" + month.value + "-" + day;
  // };

  useEffect(() => {
    if (value) {
      setDay(value.getDate());
      setMonth(value.getMonth());
      setYear(value.getFullYear());
      console.log(value.prototype);
    }
  }, []);
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

  useEffect(() => {
    if (onChange) onChange(new Date(year, month, day));
  }, [day, month, year]);

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
