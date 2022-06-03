import React, { useState } from 'react'
import ReactJson from 'react-json-view';
import './App.css';
import runPlayground from './playground';
import "antd/dist/antd.css";
import { Button, Row, Col } from 'antd'

function App() {

  const [response, setResponse] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)

  const onClickHandler = async () => {
    setLoading(true)
    const res = await runPlayground()
    console.log(res)
    setResponse(res)
    setLoading(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Subsocial Playground</h2>
        <Row className='items'>
          <Col className='itemblock' span={10}>
            <p>Test your code for subsocial</p>
            <Button size='large' type='primary' disabled={loading} onClick={() => onClickHandler()}>{loading ? 'Loading...' : 'Run'}</Button>
          </Col>
          <Col className='itemblock' span={10}>
            <ReactJson style={{ fontSize: 20 }} collapsed={false} src={response} />
          </Col>
        </Row>
      </header>
    </div>
  );
}

export default App;
