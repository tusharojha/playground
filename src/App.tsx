import React, { useState } from 'react'
import './App.css';
import runPlayground from './playground';

function App() {

  const [response, setResponse] = useState<any>('')

  console.log(process.env)

  const onClickHandler = async () => {
    console.log('hi')
    const res = await runPlayground()
    console.log(res)
    setResponse(res)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Subsocial Playground</h2>
        <p>Test your code for subsocial</p>
        <button onClick={() => onClickHandler()}>Run</button>
        <hr></hr>
        <div>
          {response}
        </div>
      </header>
    </div>
  );
}

export default App;
