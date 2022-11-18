import { useEffect, useState } from "react"

import { PlayArrow } from "@mui/icons-material"
import { Button, CircularProgress, Typography } from "@mui/material"
import runPlayground from "../../playground"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { setFetchingResult, setIsApiReady, setResponse } from "../../redux/slice"
import dynamic from 'next/dynamic'
import { generateCrustAuthToken, SubsocialApi } from "@subsocial/api"
import config from "../../playground/config"


const CodeEditor = dynamic(import('./Editor'), { ssr: false })

type RunCodeProps = {
  runCode: (s: string) => void
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
  const selectedNetwork = useAppSelector((state) => state.code.selectedNetwork)
  const [api, setApi] = useState<SubsocialApi>()
  const isApiReady = useAppSelector((state) => state.code.isApiReady)

  const setupApi = async () => {
    const configDetails = config(selectedNetwork)
    const newApi = await SubsocialApi.create(configDetails)
    setApi(newApi)
    dispatch(setIsApiReady(true))
  }
  useEffect(() => {
    dispatch(setIsApiReady(false))
    setApi(undefined)
    setupApi()
  }, [selectedNetwork])

  const runCode = async (code: string) => {
    if (!isApiReady) return;
    dispatch(setFetchingResult(true))
    if (selectedNetwork === 'testnet') {
      const authHeader = generateCrustAuthToken('bottom drive obey lake curtain smoke basket hold race lonely fit walk//Alice');
      console.log(api)
      api!.ipfs.setWriteHeaders({
        authorization: 'Basic ' + authHeader
      })

    }
    const res = await runPlayground(code, api)
    dispatch(setResponse(res))
    dispatch(setFetchingResult(false))
  }

  return <div className='displayArea'>
    <div style={{ display: 'flex', flex: '0 1', flexDirection: 'row', alignItems: 'center', marginBottom: '8.25px', minHeight: '36px' }}>
      <Typography sx={{ flexGrow: 1 }} variant="caption" display="block">
        Code
      </Typography>
      <RunButton runCode={runCode} />
    </div>
    <CodeEditor runCode={runCode} />
  </div>
}

export default CodeWindow