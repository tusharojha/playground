import { useState } from 'react'
import './App.css'
import { Drawer, styled } from '@mui/material'
import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header'
import Body from './components/Body/Body'
import { drawerWidth } from './constants'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import theme from './theme'
function App() {
  const [open, setOpen] = useState(true)

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
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="dark"
        progressStyle={{ backgroundColor: theme.palette.primary.main }}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        limit={1}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div >
  );
}

export default App;
