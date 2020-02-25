import React, { Component } from 'react'

export class CommandBar extends Component {
    render() {
        return (
            <div style={timerBarStyle}>     
                <button style={buttonStyle1}>Start</button>
                <button style={buttonStyle2}>Stop</button>
                <button style={buttonStyle3}>Reset</button>
                
            </div>
        )
    }
}

const timerBarStyle = {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    gridTemplateRows: '50px',
    gridGap: '80px',
    padding: '20px 50px'
}

const buttonStyle1 = {
    backgroundColor: 'rgb(160, 210, 110)',
    fontSize: '20px',
    borderRadius: '20px'
}

const buttonStyle2 = {
    backgroundColor: 'rgb(255, 90, 90)',
    fontSize: '20px',
    borderRadius: '20px'
}

const buttonStyle3 = {
    backgroundColor: 'rgb(220, 210, 110)',
    fontSize: '20px',
    borderRadius: '20px'
}


export default CommandBar
