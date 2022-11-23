import type { AppProps } from 'next/app'
import 'react-toastify/dist/ReactToastify.css';
import '../src/App.css'

import '../src/components/Sidebar/sidebar.css'
import '../src/components/Header/header.css'
import "../src/components/Code/editor.css"
import React from 'react'
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import { ThemeProvider } from '@mui/material';
import theme from '../src/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  </>
}

export default MyApp