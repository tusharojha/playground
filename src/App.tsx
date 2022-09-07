import { useEffect, useState } from 'react'
import './App.css'
import runPlayground from './playground'
import { Button, Divider, Drawer, Grid, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Tab, Tabs, Typography, useTheme } from '@mui/material'
import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header'
import Body from './components/Body/Body'
import { useAppDispatch } from './redux/hooks'
import { setSnippet } from './redux/slice'

const drawerWidth = 256;

function App() {
  const [open, setOpen] = useState(true);
  const dispatch = useAppDispatch()

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginTop: 75,
    justifyContent: 'flex-end',
    borderRight: 0,
    padding: theme.spacing(0, 1),
  }));
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
          <Sidebar />
        </div>
      </Drawer>
      <Body open={open} />
    </div >
  );
}

export default App;
