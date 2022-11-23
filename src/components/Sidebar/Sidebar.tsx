import { List, ListItemButton, ListItemText } from '@mui/material';
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { drawerWidth, WRITING_KEYS } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setSelectedItem, setSnippet } from '../../redux/slice';
import ExpandableListItem from './ExpandableListItem';
import data from '../../data.json';

const dataKeys = Object.keys(data) ?? [];

const Sidebar = () => {

  const router = useRouter();
  const dispatch = useAppDispatch()
  const selectedItem = useAppSelector((state) => state.code.selectedItem)
  const selectedNetwork = useAppSelector((state) => state.code.selectedNetwork)

  useEffect(() => {
    const firstKey = dataKeys.length > 0 ? dataKeys[0] : ''
    const objectData = { ...(data as any)[firstKey][0], globalKey: firstKey, index: 0 }
    dispatch(setSelectedItem(objectData))
    dispatch(setSnippet(objectData.snippets[objectData.index]))
  }, [])


  const parseKeyToString = (key: string) => {
    return key.toLowerCase().replaceAll(' ', '-');
  }

  return <div>
    <div className='side-container'>
      <List
        sx={{ width: '100%', maxWidth: drawerWidth, bgcolor: '#000' }}
        component="nav"
      >
        {dataKeys.map((key) => {
          const index = WRITING_KEYS.indexOf(key)
          if (index !== -1 && selectedNetwork === "mainnet") return <></>
          return <ExpandableListItem key={key} sx={{
            pt: '2px',
            pb: '2px',
          }} title={key}>
            {((data as any)[key]).map((item: any, index: number) => {
              if (item.variants.length === 1) {
                return <ListItemButton key={item + index} selected={selectedItem.globalKey === key && selectedItem.key === item.key}
                  sx={{
                    pl: 4,
                    pt: '2px',
                    pb: '2px',
                    mb: '4px',
                    '&.Mui-selected': {
                      backgroundColor: '#1C252D',
                    },
                  }}
                  onClick={() => {
                    router.push(`/${parseKeyToString(key)}/${item.key.toLowerCase()}/`)
                  }}>
                  <ListItemText primary={item.key} />
                </ListItemButton>
              }
              return <ExpandableListItem key={item + index} sx={{
                pl: 4,
                pt: '2px',
                pb: '2px',
                mb: '2px',
              }} title={item.key}>
                {item.variants.map((subItem: string, index: number) => {
                  return <ListItemButton key={subItem + index} selected={selectedItem.globalKey === key && selectedItem.key === item.key && selectedItem.index === index}
                    sx={{
                      pl: 4,
                      pt: '2px',
                      pb: '2px',
                      mb: '4px',
                      '&.Mui-selected': {
                        backgroundColor: '#1C252D',
                      },
                    }}
                    onClick={() => {
                      router.push(`/${parseKeyToString(key)}/${parseKeyToString(item.key)}/${parseKeyToString(subItem)}`)
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