import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { List, ListItemButton, ListItemIcon, ListItemText, makeStyles, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import ExpandableListItem from './ExpandableListItem';
import './sidebar.css';

const data = require('../../data.json');
const dataKeys = Object.keys(data) ?? [];

const Sidebar = ({ updateSidebarObject }: { updateSidebarObject: (k: string) => void }) => {
  const [sideBarItem, setSideBarItem] = useState({
    index: 0,
    globalKey: '',
    key: '',
    variants: [],
    snippets: []
  })



  useEffect(() => {
    const firstKey = dataKeys.length > 0 ? dataKeys[0] : ''
    setSideBarItem({ ...(data as any)[firstKey][0], globalKey: firstKey, index: 0 })
    updateSidebarObject({ ...(data as any)[firstKey][0], globalKey: firstKey, index: 0 })
  }, [])


  return <div>
    <div className='side-container'>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: '#000' }}
        component="nav"
      >
        {dataKeys.map((key) => {
          return <ExpandableListItem title={key}>
            {((data as any)[key]).map((item: any, index: number) => {
              return <ExpandableListItem sx={{ pl: 4 }} title={item.key}>
                {item.variants.map((subItem: string, index: number) => {
                  return <ListItemButton selected={sideBarItem.globalKey == key && sideBarItem.key == item.key && sideBarItem.index == index}
                    sx={{
                      pl: 4,
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(144, 202, 249, 0.16)',
                      },
                    }}
                    onClick={() => {
                      const resp = { ...item, index: index, globalKey: key }
                      setSideBarItem(resp)
                      updateSidebarObject(resp)
                    }}>
                    <ListItemText primary={subItem} />
                  </ListItemButton>
                })}
              </ExpandableListItem>
            })}
          </ExpandableListItem>
        })}
      </List>
    </div>
  </div >
}

export default Sidebar