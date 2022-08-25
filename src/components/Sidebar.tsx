import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import './sidebar.css';

const data = require('../data.json');
const dataKeys = Object.keys(data) ?? [];

const Item = ({ title, selected, onTap }: { title: string, selected: boolean, onTap: () => void }) => {
  return <div onClick={onTap} className={'side-item' + (selected ? ' selected' : '')}>
    {title}
  </div>
}

const Sidebar = ({ updateSnippet, updateKey }: { updateSnippet: (resp: string) => void, updateKey: (str: string) => void }) => {
  const [selectedKey, setSelectedKey] = useState('')

  useEffect(() => {
    const firstKey = dataKeys.length > 0 ? dataKeys[0] : ''
    updateKey(firstKey)
    setSelectedKey(firstKey + (data as any)[firstKey][0].key)
    updateSnippet((data as any)[firstKey][0].snippets[0])
  }, [])

  return <div>
    <div className='side-container'>
      {dataKeys.map((key) => {
        return <div key={key} className='sidebar-section'>
          <Typography variant="h6" component="h1">{key}</Typography>
          {((data as any)[key]).map((item: any) => {
            return <Item key={item.key} title={item.key} onTap={() => {
              setSelectedKey(key + item.key)
              updateSnippet(item.snippets[0])
            }} selected={selectedKey == key + item.key} />
          })}
        </div>
      })}
    </div>
  </div>
}

export default Sidebar