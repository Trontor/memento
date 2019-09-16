import React, {useState, useEffect} from "react";
import Select from "react-select";
import { DateInput, DateField } from "./DateSelectorStyles";
import moment from 'moment'

export default function DateSelector({customDropdown}){
  //Hooks for date values
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");

  const joinDate = () => {
    console.log(year + '-' + month.value + '-' + day);
  }

  const months = [
    { label: "January", value: "01"},
    { label: "February", value: "02"},
    { label: "March", value: "03"},
    { label: "April", value: "04"},
    { label: "May", value: "05"},
    { label: "June", value: "06"},
    { label: "July", value: "07"},
    { label: "August", value: "08"},
    { label: "September", value: "09"},
    { label: "October", value: "10"},
    { label: "November", value: "11"},
    { label: "December", value: "12"}
  ]

  useEffect(()=> {
    joinDate()
  }, [day, month, year])

  return(
    <DateInput>
      <DateField
        value={day}
        placeholder="DD"
        onChange={e => setDay(e.target.value)}/>
      <Select
        value={month}
        onChange={e => setMonth(e)}
        options={months}
        placeholder="Month"
        styles={customDropdown}/>
      <DateField
        value={year}
        onChange={e => setYear(e.target.value)}
        placeholder="YYYY"/>
    </DateInput>
  )
}