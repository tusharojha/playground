import { List, ListItemButton, ListItemText } from '@mui/material';
import { useEffect } from 'react'
import { drawerWidth } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setSelectedItem, setSnippet } from '../../redux/slice';
import ExpandableListItem from './ExpandableListItem';

const data = require('../../data.json');
const dataKeys = Object.keys(data) ?? [];

const Sidebar = () => {

  const dispatch = useAppDispatch()
  const selectedItem = useAppSelector((state) => state.code.selectedItem)

  useEffect(() => {
    const firstKey = dataKeys.length > 0 ? dataKeys[0] : ''
    const objectData = { ...(data as any)[firstKey][0], globalKey: firstKey, index: 0 }
    dispatch(setSelectedItem(objectData))
    dispatch(setSnippet(objectData.snippets[objectData.index]))
  }, [])


  return <div>
    <div className='side-container'>
      <List
        sx={{ width: '100%', maxWidth: drawerWidth, bgcolor: '#000' }}
        component="nav"
      >
        {dataKeys.map((key) => {
          return <ExpandableListItem title={key}>
            {((data as any)[key]).map((item: any, index: number) => {
              if (item.variants.length === 1) {
                return <ListItemButton selected={selectedItem.globalKey === key && selectedItem.key === item.key && selectedItem.index === index}
                  sx={{
                    pl: 4,
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(144, 202, 249, 0.16)',
                    },
                  }}
                  onClick={() => {
                    const resp = { ...item, index: 0, globalKey: key }
                    dispatch(setSelectedItem(resp))
                    dispatch(setSnippet(resp.snippets[resp.index]))
                  }}>
                  <ListItemText primary={item.key} />
                </ListItemButton>
              }
              return <ExpandableListItem sx={{ pl: 4 }} title={item.key}>
                {item.variants.map((subItem: string, index: number) => {
                  return <ListItemButton selected={selectedItem.globalKey === key && selectedItem.key === item.key && selectedItem.index === index}
                    sx={{
                      pl: 4,
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(144, 202, 249, 0.16)',
                      },
                    }}
                    onClick={() => {
                      const resp = { ...item, index: index, globalKey: key }
                      dispatch(setSelectedItem(resp))
                      dispatch(setSnippet(resp.snippets[resp.index]))
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