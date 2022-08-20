import React, { Component, useEffect, useState } from "react";
import '../styles/App.css';
import CircularProgressTimer from "./CirculsarProgressTimer";

const App = () => {

  const [inputWorkTime, setInputWorkTime] = useState(25);
  const [inputBreakTime, setInputBreakTime] = useState(5);
  const [min, setMin] = useState(25);
  const [sec, setSec] = useState(0);
  const [message, setMessage] = useState("Work Time!");
  const [disableSet, setDisableSet] = useState(false);
  const [disableStart, setDisableStart] = useState(false);
  const [disableStop, setDisableStop] = useState(true);
  const [disableReset, setDisableReset] = useState(true);
  const [disableInput, setDisableInput] = useState(false);
  const [play, setPlay] = useState(false);
  const [displayTime, setDisplayTime] = useState("25:00");
  const [startFlag, setStartFlag] = useState(true);
  const [workflag, setWorkFlag] = useState(true);
  const[settedWorkTime,setSettedWorkTime]=useState(25);
  const[settedBreakTime,setSettedBreakTime]=useState(25); 


  useEffect(() => {
    
    if (play) {
      // console.log(min,sec);
      if (min == -1 && sec==58 ) {

        //if work time is going on then workflag is true
        if (workflag) {
          alert("work duration is over")
          setMessage("Break Time! Next session starts in:");
          workBreakswitch(inputBreakTime,workflag);
          
        }
        else {
          alert("break duration is over")
          setMessage("Work Time");
          workBreakswitch(inputWorkTime,workflag);
        }

      }

      if (sec >= 0 && !startFlag) {
        let timer = setInterval(() => {
          const showSec = sec < 10 ? "0" + sec : sec;
          const showMin = min < 10 ? "0" + min : min;
          setDisplayTime(`${showMin}:${showSec}`);
          setSec((sec)=>sec - 1);

        },1000)
        return () => clearInterval(timer);
      }
      else {
        setStartFlag(false);
        setMin((min)=>min - 1);
        setSec(59);

      }

    }

  }, [sec, play, min, displayTime, startFlag]);


  function workBreakswitch(newTime,workflag){
    setMin(newTime);
    setSec(0);
    if(newTime<10)
    setDisplayTime(`0${newTime}:00`)
    else
    setDisplayTime(`${newTime}:00`)
    setWorkFlag(!workflag);

    setStartFlag(true);
  }



  function set(event) {
    event.preventDefault();
    setStartFlag(true);
    setDisableReset(false);
    setDisableStop(true);

    if (inputWorkTime == 0 && inputBreakTime == 0) {
      reset();
      return;
    }

    const showMin = inputWorkTime < 10 ? "0" + inputWorkTime : inputWorkTime;
    setDisplayTime(`${showMin}:00`);
    setMin(inputWorkTime);
    setSec(0);
    setSettedWorkTime(inputWorkTime);
    setSettedBreakTime(inputBreakTime);

  }



  function validate(val) {
    if (val < 0)
      return '';
    return (val);
  }

  function start() {
    setDisableStop(false);
    setDisableInput(true);
    setDisableSet(true);
    setDisableStart(true);
    setDisableReset(false);
    setPlay(true);
  }
  function stop() {
    setDisableStop(true);
    setDisableInput(false);
    setDisableSet(false);
    setDisableStart(false)

    setPlay(false);
  }
  function reset() {
    stop();
    setDisableReset(true);
    setDisableStop(true);
    setMin(25);
    setSec(0);
    setInputWorkTime(25);
    setInputBreakTime(5);
    setDisplayTime("25:00");
    setMessage("Work Time");
    setStartFlag(true);
  }


  return (
    <div id="main">
      <h1 id="heading"> Pomodoro Timer</h1>
      <h3 id="message">{message}</h3>
      <CircularProgressTimer time={displayTime} workDuration={settedWorkTime} breakDuration={settedBreakTime} workflag={workflag}/>
      {/* <h1>{displayTime}</h1> */}
     
      <div className="controls">
        <button data-testid='start-btn' disabled={disableStart} onClick={start}>Start</button>
        <button data-testid='stop-btn' disabled={disableStop} onClick={stop} >Stop</button>
        <button data-testid='reset-btn' disabled={disableReset} onClick={reset}>Reset</button>
      </div>
      <div className="form">
        <form action="" onSubmit={set}>
          <label htmlFor="work-duration">Work Duration: </label>
          
          <input id="work-duration" type="number" data-testid='work-duration' value={inputWorkTime} placeholder="work duration" onChange={(e) => setInputWorkTime(validate(e.target.value))} disabled={disableInput} required />
          
          <label htmlFor="break-duration">Break Duration: </label>
          
          <input id="break-duration" type="number" data-testid='break-duration' value={inputBreakTime} placeholder="break duration" onChange={(e) => setInputBreakTime
          (validate(e.target.value))} disabled={disableInput} required/>
          
          <button data-testid='set-btn' disabled={disableSet} >Set</button>
        </form>
      </div>
    </div>


  )
}


export default App;
