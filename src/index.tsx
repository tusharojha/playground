import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Theme as MuiTheme } from "@mui/material/styles";

declare module '@emotion/react' {
  export interface Theme extends MuiTheme {}
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
