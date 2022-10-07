import { useState } from "react"

import { PlayArrow } from "@mui/icons-material"
import { Button, CircularProgress, Typography } from "@mui/material"
import runPlayground from "../../playground"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { setFetchingResult, setResponse, setSnippet } from "../../redux/slice"
import dynamic from 'next/dynamic'

const AceEditor = dynamic(import('react-ace'), { ssr: false })

type RunCodeProps = {
  runCode: (s: string) => void
}

const CodeEditor = ({ runCode }: RunCodeProps) => {

  const snippet = useAppSelector((state) => state.code.snippet)
  const height = useAppSelector((state) => state.code.outputWindowHeight)
  const dispatch = useAppDispatch()
  const [inFocus, setInFocus] = useState(false)
  return <AceEditor
    onLoad={editorInstance => {
      document.addEventListener("mouseup", e => (
        editorInstance.resize()
      ));
    }}
    style={
      {
        width: '100%',
        height: `${height ?? 100}px`,
        backgroundColor: '#1E1E1E',
        borderRadius: '4px',
      }
    }
    onFocus={() => {
      setInFocus(true)
    }}
    onBlur={(() => {
      setInFocus(false)
    })}
    className={`codeEditor ${inFocus ? 'editor-focus' : ''}`}
    showPrintMargin={false}
    value={snippet}
    onChange={(v) => {
      dispatch(setSnippet(v))
    }}
    mode="javascript"
    theme="monokai"
    fontSize={14}
    placeholder='Type your code here...'
    name="UNIQUE_ID_OF_DIV"
    highlightActiveLine
    wrapEnabled
    commands={[{
      name: 'Run Code',
      bindKey: {
        win: "Ctrl-Enter",
        mac: "Cmd-Enter"
      },
      exec: (editor) => runCode(editor.getValue())
    }]}
    enableSnippets
    editorProps={{ $blockScrolling: true }}
  />
}

const RunButton = ({ runCode }: RunCodeProps) => {
  const loading = useAppSelector((state) => state.code.fetchingResult)

  const snippet = useAppSelector((state) => state.code.snippet)

  const onBtnClick = async () => runCode(snippet)

  return <Button disabled={loading} onClick={onBtnClick} sx={{ paddingLeft: 1, color: '#fff' }} variant="contained" color="primary">
    {loading ? <CircularProgress size={20} sx={{ marginRight: 1 }} /> : <PlayArrow />}Run
  </Button>
}


const CodeWindow = () => {
  const dispatch = useAppDispatch()

  const runCode = async (code: string) => {
    dispatch(setFetchingResult(true))
    const res = await runPlayground(code)
    dispatch(setResponse(res))
    dispatch(setFetchingResult(false))
  }

  return <div className='displayArea'>
    <div style={{ display: 'flex', flex: '0 1', flexDirection: 'row', alignItems: 'center', marginBottom: '8.25px' }}>
      <Typography sx={{ flexGrow: 1 }} variant="caption" display="block">
        Code
      </Typography>
      <RunButton runCode={runCode} />
    </div>
    <CodeEditor runCode={runCode} />
  </div>
}

export default CodeWindow