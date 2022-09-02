import { Button, IconButton } from "@mui/material"

import MenuIcon from '@mui/icons-material/MenuOutlined';

type HeaderProps = {
  toggleDrawer: () => void
}

const Header = (props: HeaderProps) => {
  const { toggleDrawer } = props

  return <div className='header-container'>
    <div className='header-section'>

      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer}
        edge="start">
        <MenuIcon />
      </IconButton>
      <img className='logo' src={`${process.env.PUBLIC_URL}/playground.svg`} />
      {/* <div className='run-btn'><Button className='run-btn-widget' variant="contained" size='large' disabled={loading} sx={{ borderRadius: 28 }} onClick={() => onClickHandler()}>{loading ? 'Loading...' : 'Run'}</Button></div> */}
    </div>
  </div>
}

export default Header