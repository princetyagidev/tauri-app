import { useEffect, useState } from "react";

import CustomEditTable from "./components/CustomEditTable";
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater';
import { getName ,getVersion  } from '@tauri-apps/api/app';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [version, setVersion] = useState("");

  
  useEffect(() =>{
    const getVersionApp = async() => {
      const appVersion = await getVersion();
      const appName = await getName();
      setVersion(appVersion);
      setName(appName)
    }
    getVersionApp()

  },[]);
  const callNotification = () => {
    toast.info(<div>{name}{version}<button></button></div>,{
      position:"bottom-right",
      autoClose:false
    })
  }
  useEffect(() => {
    checkUpdate().then(({ shouldUpdate, manifest }) => {
      if (shouldUpdate) {
        const { version: newVersion, body: releaseNotes } = manifest;
        console.log(newVersion);
       
      }
    });
  }, []);






  return (
    <div className="container">
      <ToastContainer hideProgressBar/>
     {/* <p>Custom TitleBar</p>
     <CustomerTitleBar/> */}
     <CustomEditTable/>
     {/* <TabLikeEditing/> */}
     {/* <MultiWindow/> */}
     <p>{name}{version}</p>
     <button onClick={callNotification}>trigger</button>
    </div>
  );
}

export default App;
{/* <script src="https://gist.github.com/HuakunShen/c71fb4093e68aa2ed24860a5ea812708.js"></script> */}
{/* <script src="https://gist.github.com/princetyagidev/4cdd715270a77ab2f1fba40e5547090e.js"></script> */}