import React, { Component } from 'react'

export class TimerDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: "00:00"
        }
    }
    render() {
        return (
            <div style={timerStyle1}>
                <h1><button id="time" style={timerStyle2} onClick={start}>{this.state.time}</button></h1>
            </div>
        )
    }
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}


function start() {
    var twentyFiveMinutes = 60 * 25,
        display = document.querySelector('#time');
    startTimer(twentyFiveMinutes, display);
};



const timerStyle1 = {
    display: 'grid',
    justifyItems: 'center', 
    alignItems: 'center',
    gridTemplateRows: '50px', 
    padding: '40px'

}

const timerStyle2 = {
    gridTemplateRows: '50px', 
    border: '5px solid rgb(255, 100, 127)',
    backgroundColor: 'black',
    color: 'white',
    padding: '30px',
    margin: '30px'

}


export default TimerDisplay
