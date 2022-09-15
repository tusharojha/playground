import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    h6: {
      color: '#fff'
    },
    caption: {
      color: '#A9A9A9',
      fontSize: '16px'
    }
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
    action: {
      disabledBackground: '#000',
      disabled: '#A9A9A9'
    }
  },
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
            fontWeight: 500,
            ":hover": {
              backgroundColor: 'rgb(162, 108, 25)'
            }
          }),
        }),
      },
    },
    MuiList: {
      styleOverrides: {
        root: () => ({
          backgroundColor: '#000',
          padding: 0
        }),
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ ownerState }) => ownerState.selected ? {
          backgroundColor: "#000",
          color: '#E89B25',
          fontWeight: 700,
          borderRadius: '4px',
          marginBottom: '5px',
        } : ({
          borderRadius: '4px',
          backgroundColor: '#000',
          color: '#fff',
          fontWeight: 500,
          marginBottom: '5px',
          ":hover": {
            backgroundColor: 'rgba(144, 202, 249, 0.16)',
            color: "#E89B25",
          }
        }),
      },
    }
  },
});

export default theme
