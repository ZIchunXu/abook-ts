import React, { useState, ChangeEvent } from 'react'
import PropTypes from 'prop-types'
import { DatePickerView } from 'zarm'
import dayjs from 'dayjs'

interface PopupDateProps {
    onSelect : (item: string) => void;
    mode : "time" | "date" | "month" | "year" | "datetime" | undefined;
}
export const PopupDate : React.FC<PopupDateProps> = ({ onSelect, mode}) => {
  const [now, setNow] = useState(new Date())
  const choseMonth = (item : Date | undefined) => {
    if (item != undefined) {
        setNow(item)
        if (mode == "month") {
          onSelect(dayjs(item).format('YYYY-MM'))
        } else if (mode == "date") {
          onSelect(dayjs(item).format('YYYY-MM-DD'))
        }
    }
  }


  return (
    < div className="modal" >
      <div className="content">
        <DatePickerView
          mode={mode}
          value={now}
          min="2018-1-13"
          onChange={choseMonth}
        />
      </div>
    </ div >
  );
}