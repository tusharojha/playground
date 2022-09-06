import { Box, Typography } from "@mui/material"
import ReactJson from "react-json-view"

import JsonFormatter from 'react-json-formatter'

type OutputProps = {
  response: any
}

const OutputWindow = (props: OutputProps) => {
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
  return <div className='output'>
    <Typography variant="caption" display="block" gutterBottom>
      Result
    </Typography>
    <Box className='output-box'>
      {Object.keys(props.response).length === 0 ? <Typography variant="caption">{'{}'}</Typography> : <JsonFormatter json={JSON.stringify(props.response)} tabWith={4} jsonStyle={jsonStyle} />}
    </Box>
  </div>
}

export default OutputWindow