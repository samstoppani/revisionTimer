import React, { Component } from 'react'

export class Header extends Component {
    render() {
        return (
            <div style={{display: 'flex'}}>
                <h1 style={headerStyle}>Revision Timer</h1>
            </div>
        )
    }
}

const headerStyle = {
    flex: 1,
    textAlign: 'center',
    backgroundColor: 'rgb(39, 57, 102)',
    color: 'rgba(239, 168, 61,1)',
    padding: '10px',
    fontSize: '40px',
    
}

export default Header
