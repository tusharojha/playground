import { useEffect, useState } from 'react'
import { Drawer, styled } from '@mui/material'
import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header'
import Body from './components/Body/Body'
import { drawerWidth, WRITING_KEYS } from './constants'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'
import theme from './theme'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { setSelectedItem, setSelectedNetwork, setSnippet } from './redux/slice'

const NETWORK_KEY = "SELECTED_NETWORK"
export type PlaygroundAppType = {
  pageData?: any
  iframe?: boolean
}

function PlaygroundApp({ pageData, iframe = false }: PlaygroundAppType) {
  const [open, setOpen] = useState(!iframe)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const selectedNetwork = useAppSelector((state) => state.code.selectedNetwork)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  useEffect(() => {
    const network = localStorage.getItem(NETWORK_KEY)
    if (network != null) {
      dispatch(setSelectedNetwork(network))
    }

    if (pageData) {
      if (network === 'mainnet' && (WRITING_KEYS.indexOf(pageData['globalKey']) !== -1) && !iframe) {
        router.replace('/')
        return;
      }
      dispatch(setSelectedItem(pageData))
      dispatch(setSnippet(pageData.snippets[pageData.index]))
    } else if (router.asPath !== '/' && !iframe) {
      router.replace('/')
    }
  }, [pageData, selectedNetwork])

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
      <Header iframe={iframe} toggleDrawer={toggleDrawer} />
      {
        iframe ? <></> : <Drawer
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
      }

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
