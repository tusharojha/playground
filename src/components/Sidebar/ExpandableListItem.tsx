import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useState } from "react"

type ExpandableListItemProps = {
  title: string;
  sx?: any;
  children: React.ReactNode
}

const ExpandableListItem: React.FC<ExpandableListItemProps> = ({ title, sx, children }) => {
  const [open, setOpen] = useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  return <div style={{ backgroundColor: '#000' }}>
    <ListItemButton sx={{...sx, backgroundColor: '#000'}} onClick={handleClick}>
      <ListItemText primary={title} />
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse sx={sx} in={open} timeout="auto" unmountOnExit>
      {children}
    </Collapse>
  </div>
}

export default ExpandableListItem