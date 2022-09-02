import { Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import './sidebar.css';

const data = require('../data.json');
const dataKeys = Object.keys(data) ?? [];

const Item = ({ title, selected, onTap }: { title: string, selected: boolean, onTap: () => void }) => {
  return <div onClick={onTap} className={'side-item' + (selected ? ' selected' : '')}>
    {title}
  </div>
}

const Sidebar = ({ updateSidebarObject }: { updateSidebarObject: (k: string) => void }) => {
  const [selectedKey, setSelectedKey] = useState('')
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
      {dataKeys.map((key) => {
        return <div key={key} className='sidebar-section'>
          <Typography variant="h6" component="h1">{key}</Typography>
          {((data as any)[key]).map((item: any, index: number) => {
            return <Item key={item.key} title={item.key} onTap={() => {
              setSideBarItem({ ...(data as any)[key][index], globalKey: key, index: index })
              updateSidebarObject({ ...(data as any)[key][index], globalKey: key, index: index })
            }} selected={sideBarItem.globalKey === key && sideBarItem.key === item.key} />
          })}
        </div>
      })}
    </div>
  </div>
}

export default Sidebar