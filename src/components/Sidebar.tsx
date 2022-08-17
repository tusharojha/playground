import React, { useEffect, useState } from 'react'
import './sidebar.css';

import data from '../data.json';

const Item = ({ title, selected, onTap }: { title: string, selected: boolean, onTap: () => void }) => {
  return <div onClick={onTap} className={'side-item' + (selected ? ' selected' : '')}>
    {title}
  </div>
}

const Sidebar = () => {
  const [selectedKey, setSelectedKey] = useState('')

  useEffect(() => {
    const firstKey = Object.keys(data).at(0) ?? ''
    setSelectedKey(firstKey + (data as any)[firstKey][0].key)
  }, [])

  return <div>
    <div className='side-container'>
      {Object.keys(data).map((key) => {
        return <div className='sidebar-section'>
          <h6>{key}</h6>
          {((data as any)[key]).map((item: any) => {
            return <Item title={item.key} onTap={() => setSelectedKey(key + item.key)} selected={selectedKey == key + item.key} />
          })}
        </div>
      })}
    </div>
  </div>
}

export default Sidebar