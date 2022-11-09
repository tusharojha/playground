import { useEffect, useState } from 'react'
import { Drawer, styled } from '@mui/material'
import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header'
import Body from './components/Body/Body'
import { drawerWidth } from './constants'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'
import theme from './theme'
import { useAppDispatch } from './redux/hooks'
import { setSelectedItem, setSnippet } from './redux/slice'

export type PlaygroundAppType = {
  pageData?: any
}

function PlaygroundApp({ pageData }: PlaygroundAppType) {
  const [open, setOpen] = useState(true)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const toggleDrawer = () => {
    setOpen(!open)
  }

  useEffect(() => {
    if (pageData) {
      dispatch(setSelectedItem(pageData))
      dispatch(setSnippet(pageData.snippets[pageData.index]))
    } else if (router.asPath !== '/') {
      router.replace('/')
    }
  }, [pageData])

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

export default PlaygroundApp;
