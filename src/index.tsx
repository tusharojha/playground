import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: () => ({
          borderBottom: "1px solid #303030"
        })
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'h6' && {
            fontWeight: 700,
          }),
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'contained' &&
            ownerState.color === 'info' && {
            backgroundColor: '#48494F',
            color: '#fff',
            fontWeight: 500
          }),
        }),
      },
    },
  },
  palette: {
    secondary: {
      main: "#000",
    },
    primary: {
      main: '#E89B25',
    },
    background: {
      default: "#000000"
    },
  }
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
