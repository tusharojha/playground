import { useEffect, useState } from "react"

import { PlayArrow } from "@mui/icons-material"
import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-typescript"
import "ace-builds/src-noconflict/theme-monokai"
import { Button, Typography } from "@mui/material"
import runPlayground from "../../playground"

const CodeEditor = ({ snippet, setSnippet }: { snippet: string, setSnippet: (k: string) => void }) => {
  const [snip, setSnip] = useState('')

  useEffect(() => {
    setSnip(snippet)
  }, [])

  return <AceEditor
    style={
      {
        display: 'flex',
        width: '100%',
        flex: 1,
        backgroundColor: '#1E1E1E'
      }
    }
    showGutter={false}
    value={snip}
    onChange={(v) => {
      // setSnippet(v)
      setSnip(v)
    }}
    mode="javascript"
    theme="monokai"
    fontSize={16}
    placeholder='Type your code here...'
    name="UNIQUE_ID_OF_DIV"
    highlightActiveLine
    editorProps={{ $blockScrolling: true }}
  />
}


const CodeWindow = ({ code, updateResponse }: { code: string, updateResponse: (k: string) => void }) => {

  const [snippet, setSnip] = useState(code)
  const [loading, setLoading] = useState(false)

  const runCode = async (code: string) => {
    setLoading(true)
    console.log(snippet)
    const res = await runPlayground(code)
    updateResponse(res)
    setLoading(false)
  }

  return <div className='displayArea'>
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
      <Typography sx={{ flexGrow: 1 }} variant="caption" display="block" gutterBottom>
        Code
      </Typography>
      <Button disabled={loading} onClick={() => runCode(snippet)} sx={{ paddingLeft: 1, color: '#fff' }} variant="contained" color="primary">
        <PlayArrow />Run
      </Button>
    </div>
    <CodeEditor setSnippet={setSnip} snippet={snippet} />
  </div>
}

export default CodeWindow