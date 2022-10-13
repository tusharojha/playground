import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material"

import Image from 'next/image';
import MenuIcon from '@mui/icons-material/MenuOutlined';
import Head from 'next/head';
import { useAppSelector } from "../../redux/hooks";

const LEARN_MORE_LINK = "https://docs.subsocial.network/docs/develop"

type HeaderProps = {
  toggleDrawer: () => void
}

const Header = (props: HeaderProps) => {
  const { toggleDrawer } = props

  const selectedItem = useAppSelector((state) => state.code.selectedItem)
  return <AppBar color="secondary" position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <Head>
      <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta
        name="description"
        content="Play with Subsocial's JS SDK in the playground."
      />
      <title>Subsocial Playground</title>
    </Head>
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
      <Image
        width={180}
        height={30}
        alt="playground"
        className='logo'
        src={`/playground.svg`} />
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: 4 }}>
        {selectedItem.globalKey !== '' ? `${selectedItem.globalKey}: ${selectedItem.key} ${selectedItem.variants[selectedItem.index]}` : ''}
      </Typography>
      <Button onClick={() => window.open(LEARN_MORE_LINK, "_blank")} variant="contained" color="info">Learn More</Button>
    </Toolbar>
  </AppBar>
}

export default Header