import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import dynamic from 'next/dynamic'
import AceEditor from 'react-ace';
import brace from 'brace'
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import { setSnippet } from "../../redux/slice";

type RunCodeProps = {
  runCode: (s: string) => void
}

const CodeEditor = ({ runCode }: RunCodeProps) => {
  const snippet = useAppSelector((state) => state.code.snippet)
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
        backgroundColor: '#1E1E1E',
        borderRadius: '6px',
        flex: 1,
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

export default CodeEditor
