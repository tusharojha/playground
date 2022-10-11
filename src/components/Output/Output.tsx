import { Box, Typography } from "@mui/material"

import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { useEffect, useRef } from "react"
import { setOutputWindowHeight } from "../../redux/slice"
import dynamic from 'next/dynamic'

const ReactJson = dynamic(import('react-json-view'), { ssr: false })

const OutputWindow = () => {
  const ref = useRef(null)
  const response = useAppSelector((state) => state.code.result)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (ref) {
      dispatch(setOutputWindowHeight((ref.current as any).clientHeight))
    }
  }, [])

  return <div className='output'>
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 13, marginTop: 3 }}>
      <Typography variant="caption" display="block">
        Result
      </Typography>
    </div>
    <Box ref={ref} className='output-box'>
      <ReactJson defaultValue={{}} collapsed={false} displayDataTypes={false} iconStyle="triangle" style={{ height: '100%', width: '100%', backgroundColor: '#1E1E1E', fontSize: '14px', fontFamily: 'Monaco' }} theme="tomorrow" src={response ? JSON.parse(JSON.stringify(response)) : undefined} />
    </Box>
  </div>
}

export default OutputWindow