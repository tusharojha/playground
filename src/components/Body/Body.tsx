import { useState } from "react"
import { Resizable } from 're-resizable'
import ReactJson from 'react-json-view'
import { Button, Divider, Drawer, Grid, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Tab, Tabs, Typography, useTheme } from '@mui/material'

import OutputWindow from '../../components/Output/Output'
import CodeWindow from '../../components/Code/Code'

const drawerWidth = 256;
const defaultCodeWidth = 60;

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
      minWidth="40%" defaultSize={{ width: `${defaultCodeWidth}%`, height: '85vh' }}>
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