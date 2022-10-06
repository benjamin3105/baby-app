import { useEffect, useState, useRef } from 'react';
import './App.css'

function App() {

  const [date, setDate] = useState('')
  const [daysleft, setDaysLeft] = useState('')
  const chosenDate = useRef()

  const today = new Date()

  function formatDate(date, format) {
    const map = {
        mm: date.getMonth() + 1,
        dd: date.getDate(),
        // yy: date.getFullYear().toString().slice(-2),
        yyyy: date.getFullYear()
    }

    // add 0 to day < 10
    if(map.dd < 10) {
        map.dd = '0' + map.dd
    }

    return format.replace(/mm|dd|yyyy/gi, matched => map[matched])
  }

  function calculateDays() {
    
    const start = new Date(formatDate(today, 'yyyy-mm-dd'))
    const end = new Date(date)

    const days = (start, end) =>{
        let difference = end.getTime() - start.getTime()
        console.log(difference)
        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24))
        return TotalDays
    }
    setDaysLeft(days(start, end))
    
  }

  return (
    <div className="App">

      <div className=''>{date} is the most epic day!</div>
      <div className=''>{daysleft} Days left!</div>

      <input 
      
      type="date" 
      id="start" 
      name="baby-time"
      min={formatDate(today, 'yyyy-mm-dd')}  
      max="2025-12-31"
      onChange={(e) => setDate(e.target.value)}
      />

      <button onClick={calculateDays}>How many days?</button>

    </div>
  )
}

export default App