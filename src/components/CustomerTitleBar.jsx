import React,{useEffect, useState} from 'react'
import { appWindow } from '@tauri-apps/api/window';


const CustomerTitleBar = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    useEffect(() => {
        appWindow.setFullscreen(isFullscreen);
      
    },[isFullscreen])
    
     
  return (
    <div>
       
    <button onClick={() => appWindow.minimize()} >-</button>
    {/* <button onClick={() => appWindow.toggleMaximize()}>box</button> */}
    <button onClick={() => setIsFullscreen(!isFullscreen)}>box</button>
    <button onClick={() => appWindow.close()}>x</button>
    </div>
  )
}

export default CustomerTitleBar