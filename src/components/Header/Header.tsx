import { AppBar, Button, IconButton, Toolbar, Typography, Menu, MenuItem } from "@mui/material"

import Image from 'next/image';
import MenuIcon from '@mui/icons-material/MenuOutlined';
import { OpenInNewRounded, InfoOutlined, LayersSharp, ArrowDropDownSharp, CheckRounded } from "@mui/icons-material";
import Head from 'next/head';
import data from '../../data.json';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useState } from "react";
import { networks } from "../../playground/config";
import { setSelectedNetwork } from "../../redux/slice";

const NETWORK_KEY = "SELECTED_NETWORK"
const LEARN_MORE_LINK = "https://docs.subsocial.network/docs/develop/playground"

type HeaderProps = {
  toggleDrawer: () => void,
  iframe?: boolean
}

const Header = (props: HeaderProps) => {
  const { toggleDrawer } = props
  const repo = data as any
  const dispatch = useAppDispatch()
  const selectedItem = useAppSelector((state) => state.code.selectedItem)
  const selectedNetwork = useAppSelector((state) => state.code.selectedNetwork)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectNetwork = (item: string) => {
    localStorage.setItem(NETWORK_KEY, item);
    dispatch(setSelectedNetwork(item))
    window.location.reload()
    handleClose()
  }

  const openPlayground = () => {
    window.open(window.location.href.split('?')[0])
  }

  const onOpenDocsTap = () => {
    const itemIndex = repo[selectedItem.globalKey].findIndex((i: any) => i["key"] === selectedItem.key)
    if (itemIndex === -1) return;
    window.open(repo[selectedItem.globalKey][itemIndex]["links"][selectedItem.index])
  }

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
      {props.iframe ?
        <></> :
        <IconButton
          onClick={toggleDrawer}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 1 }}
        >
          <MenuIcon />
        </IconButton>}
      <Image
        width={180}
        height={30}
        alt="playground"
        className='logo'
        src={`/playground.svg`} />
      {props.iframe ? <div style={{ flexGrow: 1 }}></div> :
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: 4 }}>
          {selectedItem.globalKey !== '' ? `${selectedItem.globalKey}: ${selectedItem.key} ${selectedItem.variants[selectedItem.index]}` : ''}
          <Button onClick={onOpenDocsTap} style={{ marginLeft: 10, justifyContent: 'flex-start' }}>Open in Docs<OpenInNewRounded fontSize="small" style={{ marginLeft: 10 }} /></Button>
        </Typography>}

      <Button style={{ marginRight: 16, fontSize: '14px' }}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="contained" color="info">
        <LayersSharp fontSize="small" style={{ marginRight: 10 }} />
        {selectedNetwork}
        <ArrowDropDownSharp style={{ marginLeft: 0 }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        className="networkMenu"
        onClose={handleClose}
      >
        <div className="menuBody">
          {Object.keys(networks).map((item) => {
            if (item === selectedNetwork) {
              return <MenuItem key={item} className="listItem selected" onClick={() => selectNetwork(item)}><CheckRounded style={{ marginRight: 5 }} /> {item.toUpperCase()}</MenuItem>
            }
            return <MenuItem key={item} className="listItem" onClick={() => selectNetwork(item)}>{item.toUpperCase()}</MenuItem>
          })}
        </div>
      </Menu>

      {props.iframe ?
        <Button onClick={openPlayground} style={{ marginLeft: 10, justifyContent: 'flex-start' }}>Open App<OpenInNewRounded fontSize="small" style={{ marginLeft: 10 }} /></Button> :
        <Button onClick={() => window.open(LEARN_MORE_LINK, "_blank")} variant="contained" color="info"><InfoOutlined fontSize="small" style={{ marginRight: 10 }} />About App</Button>}

    </Toolbar>
  </AppBar>
}

export default Header