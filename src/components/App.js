import React, { Component, useEffect, useState } from "react";
import '../styles/App.css';

const App = () => {

  const [inputworkTime,setInputWorkTime]=useState(25);
  const[inputBreakTime,setInputBreakTime]=useState(5);
  const [min, setMin] = useState(25);
  const [sec, setSec] = useState(0);
  const [message, setMessage] = useState("Work-Time");
  const[disableSet,setDisableSet]=useState(false);
  const[disableStart,setDisableStart]=useState(false);
  const[disableStop,setDisableStop]=useState(true);
  const[disableReset,setDisableReset]=useState(true);
  const[disableInput,setDisableInput]=useState(false);
  const[play,setPlay]=useState(false);

  
  useEffect(()=>{
    // if(min==inputworkTime)
    if(play){
      if(sec>=0){
        let timer=setInterval(()=>{      
          setSec(sec-1);
        },1000)
        return ()=>clearInterval(timer);
      }
      if(sec<0){
        setMin(min-1);
        setSec(9);
        
      }      
      
    }   
    
  },[sec,play,min]);

  const showMin = min < 10 ? "0" + min : min;
  const showSec = sec < 10 ? "0" + sec : sec;

  function set(event) {
    event.preventDefault();

    setDisableReset(false);
    setDisableStop(true);

    if(inputworkTime==0 && inputBreakTime==0){
      setInputWorkTime(25);
      setInputBreakTime(5); 
      return;     
    }
    setMin(inputworkTime);
    setSec(0);

  }
  


  function validate(val){    
    if(val<0)
    return'';
    return(val);
  }

  function start(){
    setDisableStop(false);
    setDisableInput(true);
    setDisableSet(true);
    setDisableStart(true);
    setDisableReset(false);
    setPlay(true);
  }
  function stop(){
    setDisableStop(true);
    setDisableInput(false);
    setDisableSet(false);
    setDisableStart(false)

    setPlay(false);
  }
  function reset(){
    setDisableReset(true);
    setDisableStop(true);
    setMin(25);
    setSec(0);
    setInputWorkTime(25);
    setInputBreakTime(5);
  }
  return (
    <div id="main">
      <h1>{showMin}:{showSec}</h1>
      <h3>{message}</h3>
      <div className="controls">
        <button data-testid='start-btn' disabled={disableStart} onClick={start}>Start</button>
        <button data-testid='stop-btn' disabled={disableStop} onClick={stop} >Stop</button>
        <button data-testid='reset-btn' disabled={disableReset} onClick={reset}>Reset</button>
      </div>
      <div className="form">
        <form action="">
          <input id="work-duration" type="number" data-testid='work-duration' value={inputworkTime} placeholder="work duration" onChange={(e)=>setInputWorkTime(validate(e.target.value))} disabled={disableInput}  />

          <input type="number" data-testid='break-duration' value={inputBreakTime} placeholder="break duration" onChange={(e)=>setInputBreakTime(validate(e.target.value))} disabled={disableInput}/>
          <button data-testid='set-btn' onClick={set} disabled={disableSet} >Set</button>
        </form>
      </div>
    </div>


  )
}


export default App;
