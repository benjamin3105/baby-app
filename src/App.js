import { useEffect, useState, useRef } from 'react';
import './App.css'

function App() {
  const [date, setDate] = useState('')
  const [daysleft, setDaysLeft] = useState('')
  const [datesinrange, setDatesInRange] = useState([])
  const [weeks, setWeeks] = useState([])
  const today = new Date()
  const inputElement = useRef()

  function formatDate(date, format) {
    const map = {
        mm: date.getMonth() + 1,
        dd: date.getDate(),
        yyyy: date.getFullYear()
    }
    if(map.dd < 10) {
        map.dd = '0' + map.dd
    }
    return format.replace(/mm|dd|yyyy/gi, matched => map[matched])
  }

  function getDates (startDate, endDate) {
    const dates = []
    let currentDate = startDate
    const addDays = function (days) {
      const date = new Date(this.valueOf())
      date.setDate(date.getDate() + days)
      return date
    }
    while (currentDate <= endDate) {
      dates.push(currentDate)
      currentDate = addDays.call(currentDate, 1)
    }
    return dates
  }

  function splitIntoChunk(arr, chunk) {
    for (let i = 0; i < arr.length; i += chunk) {
        let tempArray;
        tempArray = arr.slice(i, i + chunk);
        const weeks = tempArray.map((d,i) => ( d.toLocaleDateString() ))
        console.log(weeks.map((w,i) => (i) ))
        setWeeks(weeks)
    }
  }

  const chunk = 7

  // calculate the days between today and chose date
  function calculateDays() {
    
    const [year, month, day] = inputElement.current.value.split('-')

    const newdate = { 
      day: day,
      month: month,
      year: year 
    }

    setDate(newdate) 
    
    // const start = new Date(formatDate(today, 'yyyy-mm-dd'))
    const start = new Date(today)
    const end = new Date(inputElement.current.value)

    const days = (start, end) => {
        let difference = end.getTime() - start.getTime()
        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24))
        return TotalDays
    }

    setDaysLeft(days(start, end))  
    
    const dates = getDates(start, end)

    // console.log(dates)

    setDatesInRange(dates.map((d,i) => { 

      const [day, month, year] = d.toLocaleDateString().split('/')

      const newdate = { 
        day: day,
        month: month,
        year: year 
      }

      return <li key={i}>{newdate.day}/{newdate.month}</li>

    }))
        
    splitIntoChunk(dates, chunk)


  }

  return (
    <div className="App">

      <input 
      type="date" 
      id="start" 
      name="baby-time"
      min={formatDate(today, 'yyyy-mm-dd')}  
      max="2025-12-31"
      ref={inputElement}
      onChange={calculateDays}
      />

      {/* <div className=''>{date ? `${date} is the most epic day!` : ''}</div>
      <div className=''>{daysleft ? `${daysleft} Days left!` : ''} </div> */}

      <div>date: {date.day}, {date.month}, {date.year}</div>
      <div>daysleft: {daysleft}</div>
      <div>datesinrange: {datesinrange}</div>
      <div>weeks: {weeks}</div>

    </div>
  )
}

export default App