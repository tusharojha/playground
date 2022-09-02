import { useEffect, useState } from 'react'
import './App.css'
import runPlayground from './playground'
import { Button, Divider, Drawer, Grid, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Tab, Tabs, Typography, useTheme } from '@mui/material'
import Sidebar from './components/Sidebar'
import AceEditor from "react-ace"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/MenuOutlined';
import "ace-builds/src-noconflict/mode-typescript"
import "ace-builds/src-noconflict/theme-monokai"
import { Resizable } from 're-resizable'
import ReactJson from 'react-json-view'
import data from './data.json';
import Header from './components/Header/Header'

const dataKeys = Object.keys(data) ?? [];
const defaultCodeWidth = 60;

const drawerWidth = 250;

const CodeEditor = ({ snippet, setSnippet }: { snippet: string, setSnippet: (k: string) => void }) => {
  const [snip, setSnip] = useState('')

  useEffect(() => {
    setSnip(snippet)
  }, [])

  return <AceEditor
    style={
      {
        width: '100%',
        marginTop: 10
      }
    }
    showGutter={false}
    value={snip}
    onChange={(v) => {
      // setSnippet(v)
      setSnip(v)
    }}
    mode="javascript"
    theme="monokai"
    fontSize={16}
    placeholder='Type your code here...'
    name="UNIQUE_ID_OF_DIV"
    highlightActiveLine
    editorProps={{ $blockScrolling: true }}
  />
}

function App() {
  const [response, setResponse] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)
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
    console.log(k)
    setSelectedTab(0)
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

  const onClickHandler = async () => {
    setLoading(true)
    console.log(snippet)
    const res = await runPlayground(snippet)
    setResponse(res)
    setLoading(false)
  }

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginTop: 95,
    justifyContent: 'flex-end',
    borderRight: 0,
    padding: theme.spacing(0, 1),
  }));

  const Body = () => {
    return <Main>
      <Resizable
        maxWidth="100%"
        minWidth="40%" defaultSize={{ width: `${defaultCodeWidth}%`, height: '100%' }}>
        <Tabs
          onChange={(_, newValue) => {
            const newIndex = sideBarItem.variants.indexOf(newValue)
            setSelectedTab(newIndex)
            setSnippet(sideBarItem.snippets[newIndex])
          }}
          value={sideBarItem.variants[selectedTab]}
          textColor="primary"
          indicatorColor="primary"
          aria-label="secondary tabs example"
        >
          {sideBarItem.variants.map((item: string) => {
            return <Tab label={item} value={item} key={item} />
          })}
        </Tabs>
        <div className='displayArea'>
          <CodeEditor setSnippet={setSnip} snippet={snippet} />
          <div className='resizer'>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </Resizable>
      <div className='output'>
        <ReactJson style={{ fontSize: 16 }} collapsed={false} src={response} />
      </div>
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
            width: drawerWidth,
            boxSizing: 'border-box',
            borderWidth: 0
          },
        }}
        variant="persistent"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <div className='sider'>
          <Sidebar updateSidebarObject={updateKey} />
        </div>
      </Drawer>
      <Body />
    </div >
  );
}

export default App;
