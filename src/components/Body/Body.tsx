import { Resizable } from 're-resizable'
import { styled } from '@mui/material'

import OutputWindow from '../../components/Output/Output'
import CodeWindow from '../../components/Code/Code'
import { defaultCodeWidth, drawerWidth } from '../../constants'

export type BodyProps = {
  open: boolean;
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
      maxWidth="100%"
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