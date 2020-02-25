import React from 'react';
import Header from './components/Header';
import TimerBar from './components/TimerBar';
import Display from './components/Display';
import CommandBar from './components/CommandBar';
import TimerDisplay from './components/TimerDisplay';

import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Display />
    </div>
  );
}

export default App;
