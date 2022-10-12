import { Resizable } from 're-resizable'
import { CircularProgress, Grid, styled } from '@mui/material'
import dynamic from 'next/dynamic'

import OutputWindow from '../../components/Output/Output'
const CodeWindow = dynamic(
  () => import('../../components/Code/Code'),
  {
    ssr: false, loading: () => <Loader />
  }
)
import { defaultCodeWidth, drawerWidth } from '../../constants'

export type BodyProps = {
  open: boolean;
}

const Loader = () => {
  return <div style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <CircularProgress />
    </div>
}

const Body = (props: BodyProps) => {
  const { open } = props

  const Main = styled('main')(
    ({ theme }) => ({
      display: 'flex',
      flexGrow: 1,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: 24,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: `${drawerWidth + 24}px`,
      }),
    }),
  );

  return <Main>
    <Resizable
      maxWidth="80%"
      minWidth="40%" defaultSize={{ width: `${defaultCodeWidth}%`, height: '' }}
      style={{ marginBottom: '24px' }}
    >
      <div className="codeWindow">
        <CodeWindow />
        <div className='resize-dots'>
          <div className='resizer'>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>

      </div>
    </Resizable>
    <OutputWindow />
  </Main>
}

export default Body