
import Sidebar from '@/components/custom/SideBar';
import React from 'react';

const layout = ({children}) => {
  return (
    <div>
        <Sidebar/>
        <main style={{marginLeft:'82px',marginTop:'0px',height:'100dvh'}}>
            {
              children
            }
        </main>
    </div>
  )
}

export default layout