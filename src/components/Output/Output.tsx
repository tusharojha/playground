import { Box, Typography } from "@mui/material"

import JsonFormatter from 'react-json-formatter'
import { useAppSelector } from "../../redux/hooks"

const OutputWindow = () => {
  const jsonStyle = {
    propertyStyle: { color: '#66D9EF' },
    stringStyle: { color: '#F92672' },
    numberStyle: { color: '#AE81FF' },
    booleanStyle: { color: '#fff', fontWeight: 'bold' },
    braceStyle: { color: '#fff' },
    bracketStyle: { color: '#fff', fontWeight: 'bold' },
    commaStyle: { color: '#fff' },
    falseStyle: { color: '#fff' },
    nullStyle: { color: '#E89B25', fontWeight: 'bold' },
    style: { color: '#fff' },
    tabSpaceStyle: { color: '#fff' },
    trueStyle: { color: '#fff', fontWeight: 'bold' }
  }

  const response = useAppSelector((state) => state.code.result)

  return <div className='output'>
    <Typography variant="caption" display="block" gutterBottom>
      Result
    </Typography>
    <Box className='output-box'>
      {Object.keys(response).length === 0 ? <Typography variant="caption">{'{}'}</Typography> : <JsonFormatter json={JSON.stringify(response)} tabWith={4} jsonStyle={jsonStyle} />}
    </Box>
  </div>
}

export default OutputWindow