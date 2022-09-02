import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material"

import MenuIcon from '@mui/icons-material/MenuOutlined';

type HeaderProps = {
  toggleDrawer: () => void
}

const Header = (props: HeaderProps) => {
  const { toggleDrawer } = props

  return <AppBar color="secondary" position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <Toolbar>
      <IconButton
        onClick={toggleDrawer}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 1 }}
      >
        <MenuIcon />
      </IconButton>
      <img className='logo' src={`${process.env.PUBLIC_URL}/playground.svg`} />
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Reading Data: Space by ID
      </Typography>
      <Button variant="contained" color="info">Learn More</Button>
    </Toolbar>
  </AppBar>
}

export default Header