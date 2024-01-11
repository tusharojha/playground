import { PlayArrow } from '@mui/icons-material'
import { Button, CircularProgress } from '@mui/material'
import runPlayground from '../../playground'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  selectLoading,
  setTabLoading,
  updateTabResult,
} from '../../redux/slice'
import dynamic from 'next/dynamic'
import useNetworkManager from '../../networkManager'
import { testAuthKeyForCrust } from '../../constants'
import { CodeTabs } from './CodeTabs'

const CodeEditor = dynamic(import('./Editor'), { ssr: false })

type RunCodeProps = {
  runCode: (s: string) => void
}

const RunButton = ({ runCode }: RunCodeProps) => {
  const loading = useAppSelector((state) => selectLoading(state))

  const snippet = useAppSelector((state) => state.code.snippet)

  const onBtnClick = async () => runCode(snippet)

  return (
    <Button
      disabled={loading}
      onClick={onBtnClick}
      sx={{ paddingLeft: 1, color: '#fff' }}
      variant='contained'
      color='primary'>
      {loading ? (
        <CircularProgress size={20} sx={{ marginRight: 1 }} />
      ) : (
        <PlayArrow />
      )}
      Run
    </Button>
  )
}

const CodeWindow = () => {
  const dispatch = useAppDispatch()
  const selectedNetwork = useAppSelector((state) => state.code.selectedNetwork)
  const selectedTab = useAppSelector((state) => state.code.selectedTab)
  const { api, isApiReady } = useNetworkManager()

  const logToResponseWindow = (log: any) => {
    const status = log.status ?? ''
    const progressStatus = log.id != null || status.includes('Finalised')
    dispatch(setTabLoading({ index: selectedTab, loading: !progressStatus }))
    dispatch(updateTabResult({ index: selectedTab, data: log }))
  }

  const runCode = async (code: string) => {
    if (!isApiReady || api == undefined) return

    const selectedNetworkApi = api.get(selectedNetwork)

    if (selectedNetworkApi == undefined) return

    dispatch(setTabLoading({ index: selectedTab, loading: true }))
    if (selectedNetwork === 'testnet' || selectedNetwork === 'xsocial') {
      selectedNetworkApi.ipfs.setWriteHeaders({
        authorization: 'Basic ' + testAuthKeyForCrust,
      })
    }

    const res = await runPlayground(
      code,
      selectedNetworkApi,
      logToResponseWindow
    )
    dispatch(updateTabResult({ index: selectedTab, data: res }))
    dispatch(setTabLoading({ index: selectedTab, loading: false }))
  }

  return (
    <div className='displayArea'>
      <div
        style={{
          display: 'flex',
          flex: '0 1',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: '8.25px',
          minHeight: '36px',
        }}>
        <CodeTabs />
        <RunButton runCode={runCode} />
      </div>
      <CodeEditor runCode={runCode} />
    </div>
  )
}

export default CodeWindow
