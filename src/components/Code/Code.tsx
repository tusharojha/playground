import { useEffect, useState } from "react"

import { PlayArrow } from "@mui/icons-material"
import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-typescript"
import "ace-builds/src-noconflict/theme-monokai"
import { Button, Typography } from "@mui/material"
import runPlayground from "../../playground"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { setResponse, setSnippet } from "../../redux/slice"

const CodeEditor = ({ }) => {

  const snippet = useAppSelector((state) => state.code.snippet)
  const dispatch = useAppDispatch()

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
    value={snippet}
    onChange={(v) => {
      dispatch(setSnippet(v))
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


const CodeWindow = () => {
  const [loading, setLoading] = useState(false)

  const snippet = useAppSelector((state) => state.code.snippet)
  const dispatch = useAppDispatch()

  const runCode = async (code: string) => {
    setLoading(true)
    const res = await runPlayground(code)
    dispatch(setResponse(res))
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
    <CodeEditor />
  </div>
}

export default CodeWindow