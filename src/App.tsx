import { useEffect, useMemo, useState } from 'react'
import './App.css'
import runPlayground from './playground'
import { Button, Divider, Drawer, Grid, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Typography, useTheme } from '@mui/material'
import Sidebar from './components/Sidebar'
import AceEditor from "react-ace"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/MenuOutlined';
import "ace-builds/src-noconflict/mode-typescript"
import "ace-builds/src-noconflict/theme-monokai"
import { Resizable } from 're-resizable'
import ReactJson from 'react-json-view'

const drawerWidth = 250;

function App() {

  const [response, setResponse] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [snippet, setSnippet] = useState('')
  const [key, setKey] = useState('')
  const [subKey, setSubKey] = useState('')
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const Main = styled('main')(
    ({ theme }) => ({
      display: 'flex',
      flexGrow: 1,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: 5,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: `${drawerWidth}px`,
      }),
    }),
  );


  // useEffect(() => {
  //   setKey(Object.keys(data).at(0) ?? '')
  //   setKey((data as any)[Object.keys(data).at(0) ?? ''].variants[0])
  // }, [])

  const onClickHandler = async () => {
    setLoading(true)
    const res = await runPlayground(snippet)
    setResponse(res)
    setLoading(false)
  }

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginTop: 80,
    justifyContent: 'flex-end',
    borderRight: 0,
    padding: theme.spacing(0, 1),
  }));

  const Logo = () => {
    return <div className='header-container'>
      <div className='header-section'>

        {!open ? <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start">
          <MenuIcon />
        </IconButton> : <div style={{ width: 28 }}></div>}
        <img className='logo' src="./playground.png" />
        <div className='run-btn'><Button className='run-btn-widget' variant="contained" size='large' disabled={loading} sx={{ borderRadius: 28 }} onClick={() => onClickHandler()}>{loading ? 'Loading...' : 'Run'}</Button></div>
      </div>
    </div>
  }

  const Body = (() => {
    return <Main>
      <Resizable
        maxWidth="100%"
        minWidth="40%" defaultSize={{ width: '60%', height: '100%' }}>
        <span className='title'>Fetching a space:</span>
        <AceEditor
          style={{
            width: '100%',
            marginTop: 10
          }}
          showGutter={false}
          value={snippet}
          onChange={(v) => setSnippet(v)}
          mode="javascript"
          theme="monokai"
          fontSize={16}
          placeholder='Type your code here...'
          name="UNIQUE_ID_OF_DIV"
          highlightActiveLine
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </Resizable>
      <ReactJson style={{ fontSize: 20 }} collapsed={false} src={response} />
    </Main>
  })

  return (
    <div className="App">
      <Logo />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderWidth: 0
          },
        }}
        variant="persistent"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <div className='sider'>
          <Sidebar updateKey={(k) => setKey(k)} updateSnippet={(snip: string) => setSnippet(snip)} />
        </div>

      </Drawer>
      <Body />
    </div >
  );
}

export default App;
