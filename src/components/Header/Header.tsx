import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material"

import MenuIcon from '@mui/icons-material/MenuOutlined';
import { useAppSelector } from "../../redux/hooks";

const LEARN_MORE_LINK = "https://docs.subsocial.network/docs/develop"

type HeaderProps = {
  toggleDrawer: () => void
}

const Header = (props: HeaderProps) => {
  const { toggleDrawer } = props

  const selectedItem = useAppSelector((state) => state.code.selectedItem)

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
      <img alt="playground" className='logo' src={`${process.env.PUBLIC_URL}/playground.svg`} />
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {`${selectedItem.globalKey}: ${selectedItem.key} ${selectedItem.variants[selectedItem.index]}`}
      </Typography>
      <Button onClick={() => window.open(LEARN_MORE_LINK, "_blank")} variant="contained" color="info">Learn More</Button>
    </Toolbar>
  </AppBar>
}

export default Header