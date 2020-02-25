



import React, { Component } from 'react'

export class TimerBar extends Component {
    render() {
        return (
            <div style={timerBarStyle}>
                <button style={buttonStyle}>Pomodoro</button>
                <button style={buttonStyle}>Short Break</button>
                <button style={buttonStyle}>Long Break</button>
            </div>
        )
    }
}

const timerBarStyle = {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    gridTemplateRows: '50px',
    gridGap: '20px',
    padding: '20px'
}

const buttonStyle = {
    backgroundColor: 'rgb(160, 210, 110)',
    fontSize: '20px',
}


export default TimerBar

