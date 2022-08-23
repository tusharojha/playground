import { useEffect, useState } from 'react'
import ReactJson from 'react-json-view'
import './App.css'
import runPlayground from './playground'
import "antd/dist/antd.css";
import data from './data.json';
import { Button, Row, Col, Tabs } from 'antd'
import Sidebar from './components/Sidebar'
import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-typescript"
import "ace-builds/src-noconflict/theme-monokai"

function App() {

  const { TabPane } = Tabs;
  const [response, setResponse] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [snippet, setSnippet] = useState('')
  const [key, setKey] = useState('')
  const [subKey, setSubKey] = useState('')

  // useEffect(() => {
  //   setKey(Object.keys(data).at(0) ?? '')
  //   setKey((data as any)[Object.keys(data).at(0) ?? ''].variants[0])
  // }, [])

  const onClickHandler = async () => {
    setLoading(true)
    const res = await runPlayground(snippet)
    setResponse(res)
    setLoading(false)
  }

  const Logo = () => {
    return <div className='header-section'>
      <img className='logo' src="./subsocial.png" /><span className='logo-title'> playground</span>
      <Button className='run-btn' shape='round' size='large' type='primary' disabled={loading} onClick={() => onClickHandler()}>{loading ? 'Loading...' : 'Run'}</Button>
    </div>
  }

  return (
    <div className="App">
      <Logo />
      <Row className='items'>
        <Col className='itemblock sider' span={5}>
          <Sidebar updateKey={(k) => setKey(k)} updateSnippet={(snip: string) => setSnippet(snip)} />
        </Col>
        <Col className='itemblock codeblock' span={10}>
          <h6>Here's how to do it:</h6>
          <AceEditor
            style={{
              width: '100%'
            }}
            value={snippet}
            onChange={(v) => setSnippet(v)}
            mode="javascript"
            theme="monokai"
            fontSize={16}
            placeholder='Type your code here...'
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              enableBasicAutocompletion: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
          {/* <Tabs defaultActiveKey={subKey} onChange={() => {
            // setSubKey(key)
            // const indexOfSubKey = (data as any)[key]['variants'].indexWhere((i: string) => i === subKey)
            // setSnippet((data as any)[key]['snippets'][indexOfSubKey])
          }}>
            {
              (data as any)[key].map((item: any) => {
                const itemCount = item.variants.length;
                item.variants.map((variant: string, index: number) => {

                })

              })
            }

          </Tabs> */}
        </Col>
        <Col className='itemblock output' span={8}>
          <ReactJson style={{ fontSize: 20 }} collapsed={false} src={response} />
        </Col>
      </Row>
    </div>
  );
}

export default App;
