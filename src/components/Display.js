import React, { Component } from 'react';

export class Display extends Component {
    constructor() {
        super()
        this.state = {
            time: 1500000,    // 5000 for 5 seconds
            breakTime: 300000,
            sessionTime: 1500000,
            stop: true,
            type: "pomodoro",
            session: true,
        }
        
        this.pomodoroSetUp = this.pomodoroSetUp.bind(this)
        this.shortSetUp = this.shortSetUp.bind(this)
        this.longSetUp = this.longSetUp.bind(this)

        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)

        this.downSession = this.downSession.bind(this)
        this.upSession = this.upSession.bind(this)

        this.downBreak = this.downBreak.bind(this)
        this.upBreak = this.upBreak.bind(this)

        this.updateTime= this.updateTime.bind(this)
        this.updateBreakTime= this.updateBreakTime.bind(this)
        this.updateSessionTime= this.updateSessionTime.bind(this)
    }

    pomodoroSetUp() {
      var self = this;
      this.setState(()=> {
        return {
          type: "pomodoro"
        }
      })
      setTimeout(function() {
        self.resetTimer()
        self.setState(()=> {
          return {
            session: true
          }
        })
      },10)
    }

    shortSetUp() {
      var self = this;
      this.setState(()=> {
        return {
          type: "short",
        }
      })
      
      setTimeout(function() {
        self.resetTimer()
        self.setState(()=> {
          return {
            session: false
          }
        })
      },10)
    }

    longSetUp() {
      var self = this;
      this.setState(()=> {
        return {
          type: "long",
        }
      })
      setTimeout(function() {
        self.resetTimer()
        self.setState(()=> {
          return {
            session: false
          }
        })
      },10)
    }
    
    updateTime(distance) {
        var minutes = Math.floor((distance % (1000 * 60 * 60) / (1000 * 60)))
        var seconds = Math.floor((distance % (1000 * 60) / (1000)))
        
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.getElementById("demo").innerHTML = minutes + ":" + seconds;
    }

    updateBreakTime(distance) {
      var minutes = Math.floor((distance % (1000 * 60 * 60) / (1000 * 60)))
      var seconds = Math.floor((distance % (1000 * 60) / (1000)))
      
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      document.getElementById("breakLength").innerHTML = minutes;
    }
    
    updateSessionTime(distance) {
      var minutes = Math.floor((distance % (1000 * 60 * 60) / (1000 * 60)))
      var seconds = Math.floor((distance % (1000 * 60) / (1000)))
      
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      document.getElementById("sessionLength").innerHTML = minutes;
    }

    startTimer() {
          
      // for 25 min timer, distance = 1500000 [25 * 60 * 1000]
      // for 5 min timer, distance = 300000 [5 * 60 * 1000]
      // for 10 min timer, distance = 600000 [10 * 60 * 1000]

      var self = this;
      
      if (this.state.session) {
        var distance = this.state.time;   // change to sessionTime
      } else {
        var distance = this.state.time;
      }
      
      this.setState(()=> {
        return {
          stop: false
        }
      })
      
      var x = setInterval(function() {
            
        if (self.state.stop === true) {
          clearInterval(x);
          return self.updateTime(distance);
        }

        self.updateTime(distance)
            
        distance = distance - 10;
        
        self.setState( prevState => {
          return {
            time: prevState.time - 10
          }
        })
        
        
        if (distance < 0) {
          clearInterval(x);
          self.stopTimer()
          self.setState((prevState) => {
            return {
              session: !prevState.session,
              time: prevState.session ? prevState.breakTime : prevState.sessionTime
            }
          })
          // might need to setTimeout for above
          var audio = new Audio('alarm.mp3')
          audio.play()
          self.startTimer()
        }
      }, 10);
    }
      
    stopTimer() {
      this.setState(()=> {
        return {
          stop: true
        }
      })
      this.updateTime(this.state.time)
    }  
    
    resetTimer() {
      var self = this;
      this.stopTimer()

      this.setState (() => {
        return {
          session: true
        }
      })
      
      if (this.state.type === "pomodoro") {
        setTimeout( function() {
          self.updateTime(self.state.sessionTime)   // <<<< 1500000 to the session length time
          self.setState(()=> {
            return {
              time: self.state.sessionTime
            }
          })
        },10)
        
      } else if (this.state.type === "short") {
        setTimeout( function() {
          self.updateTime(300000)
          self.setState(()=> {
            return {
              time: 300000,
              session: false
            }
          })
        },10)
        
      } else if (this.state.type === "long") {
        setTimeout( function() {
          self.updateTime(600000)
          self.setState(()=> {
            return {
              time: 600000,
              session: false
            }
          })
        },10)
      }  
    }  
    
    downBreak() {
      var self = this;
      if (!this.state.stop) {
        this.resetTimer()
      }
      setTimeout(function() {
        if (self.state.breakTime < 0) {
        self.setState({
          breakTime: 0,
          })
        }
      },10)
      this.setState( prevState => {
        return {
          breakTime: prevState.breakTime - 60000,
          // time: prevState.time - 60000
        }
      })
      setTimeout(function() {
        self.updateBreakTime(self.state.breakTime)
        // self.updateTime(self.state.time)
      },10)
    }

    upBreak() {
      if (!this.state.stop) {
        this.resetTimer()
      }
      var self = this;
      this.setState( prevState => {
        return {
          breakTime: prevState.breakTime + 60000,
          // time: prevState.time + 60000
        }
      })
      setTimeout(function() {
        self.updateBreakTime(self.state.breakTime)
        // self.updateTime(self.state.time)
      },10)
    }

    downSession() {
      var self = this;
      if (!this.state.stop) {
        this.resetTimer()
      }
      setTimeout(function() {
        if (self.state.sessionTime < 0) {
        self.setState({
          sessionTime: 0,
          time: 0
          })
        }
      },10)
      this.setState( prevState => {
        return {
          sessionTime: prevState.sessionTime - 60000,
          time: prevState.time - 60000
        }
      })
      setTimeout(function() {
        self.updateSessionTime(self.state.sessionTime)
        self.updateTime(self.state.time)
      },10)
    }

    upSession() {
      if (!this.state.stop) {
        this.resetTimer()
      }
      var self = this;
      this.setState( prevState => {
        return {
          sessionTime: prevState.sessionTime + 60000,
          time: prevState.time + 60000
        }
      })
      setTimeout(function() {
        self.updateSessionTime(self.state.sessionTime)
        self.updateTime(self.state.time)
      },10)
    }

    

    render() {

      const timerStyle = {
        gridTemplateRows: "50px",
        border: this.state.session ? "5px solid rgba(150, 150, 170, 1)" : "5px solid rgba(239, 168, 61, 1)",
        backgroundColor: "black",
        color: "white",
        padding: "30px",
        fontSize: "20px",
      }

        return (
            <div>
                <div className="timerBarStyle1">
                    <button className="buttonStyle" onClick={this.pomodoroSetUp}>Pomodoro</button>
                    <button className="buttonStyle" onClick={this.shortSetUp}>Short Break</button>
                    <button className="buttonStyle" onClick={this.longSetUp}>Long Break</button>
                </div>
                <div className="displayStyle">
                {this.state.session ? 
                  <div className="bearDisplay"><img style={{width: 200, height: 200}} src="study.gif" alt="study"/><h3>Revise</h3></div> : 
                  <div className="bearDisplay2"><h3>Chill</h3><img src="https://giphy.com/embed/4afrGYx7N3shTgdfID"  style={{width: 200, height: 200, background-color: white}}></img></div>}
                </div>
                <div className="timeChanger">
                  <h3 className="text">Break</h3>
                  <div></div>
                  <h3 className="text">Session</h3>
                  <div className="upDown">
                    <button className="upDownButton" onClick={this.downBreak}><i className="down"></i></button>
                    <h3 id="breakLength" className="text">05</h3>
                    <button className="upDownButton" onClick={this.upBreak}><i className="up"></i></button>
                  </div>
                  <button id="demo" style={timerStyle}>25:00</button>
                  <div className="upDown">
                    <button className="upDownButton" onClick={this.downSession}><i className="down"></i></button>
                    <h3 id="sessionLength" className="text">25</h3>
                    <button className="upDownButton" onClick={this.upSession}><i className="up"></i></button>
                  </div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <button className="buttonStyle1" onClick={this.startTimer}>Start</button>
                  <button className="buttonStyle2" onClick={this.stopTimer}>Stop</button>
                  <button className="buttonStyle3" onClick={this.resetTimer}>Reset</button>
                </div>
                
            </div>
        ) 
    }
    
}

export default Display


