import { useEffect, useState, useRef } from 'react';
import './App.css'
import moment from 'moment'
import { DatePicker } from 'antd'

const { RangePicker } = DatePicker

const dateFormat = 'DD-MM-YYYY'

function App() {
  const [date, setDate] = useState('')
  const [daysleft, setDaysLeft] = useState('')
  const [datesinrange, setDatesInRange] = useState([])
  const [weeks, setWeeks] = useState([])
  const today = new Date()
  const inputElement = useRef()


  // format the date to yyyy-mm-dd
  function formatDate(date, format) {

    const map = {
        mm: date.getMonth() + 1,
        dd: date.getDate(),
        // yy: date.getFullYear().toString().slice(-2),
        yyyy: date.getFullYear()
    }

    // add 0 to day < 10 e.g 6 becomes 06
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
          console.log(tempArray);
      }

  }

  const chunk = 7;
  const array = [1, 2, 3, 4, 5, 6, 7, 8];

  

  // calculate the days between today and chose date
  function calculateDays() {
    
    setDate(inputElement.current.value) 
    const date = inputElement.current.value
    
    const start = new Date(formatDate(today, 'yyyy-mm-dd'))
    const end = new Date(date)

    const days = (start, end) => {
        let difference = end.getTime() - start.getTime()
        // console.log(difference)
        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24))
        return TotalDays
    }

    setDaysLeft(days(start, end))  
    
    // Usage
    let getToday = new Date() //.toISOString().slice(0, 10)

    const dates = getDates(new Date(getToday), new Date(date))
    // console.log(dates)
    // dates.forEach(function (date) {
    //   const d = new Date(formatDate(date, 'yyyy-mm-dd'))
    //   console.log(d.toISOString().slice(0, 10))
    // })

    setDatesInRange(dates.map((d,i) => ( d.toLocaleDateString() )))
        
    


  }

  // useEffect(() => {
  //   setDatesInRange(['yo, yo'])
  //   console.log(datesinrange)
  // },[])
  
  if(date) {
    //console.log('There is a date!')
  }
  
  
  // useEffect(() => {
    
  // },[])
  
  // const onChange = (value, dateString) => {
  //   console.log(value);
  // }

  // function sliceIntoChunks(arr, chunkSize) {
  //     const res = [];
  //     for (let i = 0; i < arr.length; i += chunkSize) {
  //         const chunk = arr.slice(i, i + chunkSize);
  //         res.push(chunk);
  //     }
  //     return res;
  // }

  // const arr = [datesinrange];
  // console.log(sliceIntoChunks(arr, 7))


  
  function splitInWeeks() {
    splitIntoChunk(datesinrange, chunk)
  }
  
  



  return (
    <div className="App">

    <DatePicker 
    defaultValue={moment(formatDate(today, 'dd-mm-yyyy'), dateFormat)} 
    format={dateFormat}
    // onChange={onChange} 
    />


      <input 
      type="date" 
      id="start" 
      name="baby-time"
      min={formatDate(today, 'yyyy-mm-dd')}  
      max="2025-12-31"
      ref={inputElement}
      onChange={calculateDays}
      />

      {/* <button onClick={calculateDays}>How many days?</button> */}

      <button onClick={splitInWeeks}>Split</button>

      <div className=''>{date ? `${date} is the most epic day!` : ''}</div>
      <div className=''>{daysleft ? `${daysleft} Days left!` : ''} </div>

      {datesinrange}

      {weeks}

    </div>
  )
}

export default App