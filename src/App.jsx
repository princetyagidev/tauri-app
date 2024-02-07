import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
// import "./App.css";
import CustomerTitleBar from "./components/CustomerTitleBar";
import CustomEditTable from "./components/CustomEditTable";
import TabLikeEditing from "./TabLikeEditing";
import MultiWindow from "./components/MultiWindow";
import { saveWindowState, StateFlags  } from "tauri-plugin-window-state-api";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  saveWindowState(StateFlags.POSITION);


  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }
  // document.addEventListener('DOMContentLoaded', () => {
  //   // This will wait for the window to load, but you could
  //   // run this function on whatever trigger you want
  //   setTimeout(() => {
  //     invoke('close_splashscreen')
  //   },5000)
    
  // })

  return (
    <div className="container">
     {/* <p>Custom TitleBar</p>
     <CustomerTitleBar/> */}
     <CustomEditTable/>
     {/* <TabLikeEditing/> */}
     {/* <MultiWindow/> */}
    </div>
  );
}

export default App;
