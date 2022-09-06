import { useEffect, useState } from 'react'
import './App.css'
import runPlayground from './playground'
import { Button, Divider, Drawer, Grid, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Tab, Tabs, Typography, useTheme } from '@mui/material'
import Sidebar from './components/Sidebar/Sidebar'
import { Resizable } from 're-resizable'
import ReactJson from 'react-json-view'
import data from './data.json';
import Header from './components/Header/Header'
import OutputWindow from './components/Output/Output'
import CodeWindow from './components/Code/Code'

const dataKeys = Object.keys(data) ?? [];
const defaultCodeWidth = 60;

const drawerWidth = 256;

function App() {
  const [response, setResponse] = useState<any>({})
  const [snippet, setSnippet] = useState('')
  const [snip, setSnip] = useState('')
  const [selectedTab, setSelectedTab] = useState(0)
  const [sideBarItem, setSideBarItem] = useState({
    index: 0,
    globalKey: dataKeys[0],
    ...(data as any)[dataKeys[0]][0]
  })
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const updateKey = (k: any) => {
    setSelectedTab(k.index)
    setSideBarItem(k)
    setSnippet(k.snippets[selectedTab])
  }

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

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginTop: 75,
    justifyContent: 'flex-end',
    borderRight: 0,
    padding: theme.spacing(0, 1),
  }));

  const Body = () => {
    return <Main>
      <Resizable
        maxWidth="100%"
        minWidth="40%" defaultSize={{ width: `${defaultCodeWidth}%`, height: '85vh' }}>
        <div className="codeWindow">

          <CodeWindow updateResponse={setResponse} code={snippet} />
          <div className='resize-dots'>
            <div className='resizer'>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>

        </div>
      </Resizable>
      <OutputWindow response={response} />
    </Main>
  }

  return (
    <div className="App">
      <Header toggleDrawer={toggleDrawer} />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            backgroundColor: '#000',
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid #303030'
          },
        }}
        variant="persistent"
        open={open}
      >
        <DrawerHeader />
        <div className='sider'>
          <Sidebar updateSidebarObject={updateKey} />
        </div>
      </Drawer>
      <Body />
    </div >
  );
}

export default App;
