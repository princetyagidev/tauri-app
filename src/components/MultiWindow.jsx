import React, { useState } from 'react'
import {WebviewWindow} from '@tauri-apps/api/window'


const MultiWindow = () => {
    const [window,setWindows] = useState([])

    const OpenNewWindow = () => {
        const webView = new WebviewWindow("newWindow",{
            url: "../../public/newOpenWindow.html",
            decorations: true,
            center: true,
            // theme:'dark',
        })
    }
  return (
    <div>
        <div>MultiWindow</div>
        <button onClick={OpenNewWindow}>OpenNewWindows</button>
    </div>
    
  )
}

export default MultiWindow