import { Box, Typography } from "@mui/material"

import { useAppSelector } from "../../redux/hooks"
import dynamic from 'next/dynamic'

const ReactJson = dynamic(import('react-json-view'), { ssr: false })

const OutputWindow = () => {
  const response = useAppSelector((state) => state.code.result)

  return <div className='output'>
    <div style={{ display: 'flex', flex: '0 1', flexDirection: 'row', alignItems: 'center', marginBottom: '8.25px', minHeight: '34px' }}>
      <Typography sx={{mt: 0}} variant="caption" display="block">
        Result
      </Typography>
    </div>
    <Box className='output-box'>
      <ReactJson defaultValue={{}} collapsed={false} displayDataTypes={false} iconStyle="triangle" style={{ height: '100%', width: '100%', backgroundColor: '#1E1E1E', fontSize: '14px', fontFamily: 'Monaco' }} theme="tomorrow" src={response ? JSON.parse(JSON.stringify(response)) : undefined} />
    </Box>
  </div>
}

export default OutputWindow