import { useEffect, useState } from "react";

import CustomEditTable from "./components/CustomEditTable";
import { checkUpdate, installUpdate, onUpdaterEvent } from '@tauri-apps/api/updater';
import { relaunch } from '@tauri-apps/api/process';
import { getName ,getVersion  } from '@tauri-apps/api/app';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [version, setVersion] = useState("");
  const [showButton,setShowButton] = useState(false);

  
  useEffect(() =>{
    const getVersionApp = async() => {
      const appVersion = await getVersion();
      const appName = await getName();
      setVersion(appVersion);
      setName(appName)
    }
    getVersionApp()

  },[]);

  useEffect(() => { 
    try {
      checkUpdate().then(({ shouldUpdate, manifest, }) => {
    
        if (shouldUpdate) {
          setShowButton(true)
          const { version: newVersion, body: releaseNotes } = manifest;   
          toast.info(<div>{newVersion}{releaseNotes} </div>,{
            position:"bottom-right",
            autoClose:15000
          })
        }

      });
      installUpdate().then(relaunch)

    } catch (error) {
      
    }
  }, []);


  const updateFunction =  async() => {
     try {
      await installUpdate();
      await relaunch();
     } catch (error) {
      
     }
    // await relaunch();
  }



 





  return (
    <div className="container">
      <ToastContainer hideProgressBar/>
     {/* <p>Custom TitleBar</p>
     <CustomerTitleBar/> */}
     <CustomEditTable/>
     {/* <TabLikeEditing/> */}
     {/* <MultiWindow/> */}
     {/* <p>{name}{version}</p>
     {
      showButton && <button onClick={updateFunction}>update</button>
     } */}
   
    </div>
  );
}

export default App;
