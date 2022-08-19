import React from 'react'
import "../styles/App.css"

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const CircularProgressTimer = ({time,workDuration,breakDuration,workflag}) => {

    let min=Number(time.substring(0,2));
    let sec=Number(time.substring(3));
    let totTimeInSec=(min*60)+sec;
    let inputWorkTimeInSec=workDuration*60;
    let inputBreakTimeInSec=breakDuration*60;
    let deonminator=workflag?inputWorkTimeInSec:inputBreakTimeInSec;
    let percentTimeLeft=(totTimeInSec/deonminator)*100;

    return (

        <>

            <div id='pomodoro'>
                <CircularProgressbar value={percentTimeLeft} text={`${time}`} styles={buildStyles({
                    strokeLinecap:'butt',
                    textSize: "20px",
                    pathColor:totTimeInSec<=10?'red':'greenyellow',
                    trailColor:'white',
                    textColor:'white'

                })} />
            </div>

        </>
    )
};
export default CircularProgressTimer;