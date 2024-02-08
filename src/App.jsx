import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
// import "./App.css";
import CustomerTitleBar from "./components/CustomerTitleBar";
import CustomEditTable from "./components/CustomEditTable";
import TabLikeEditing from "./TabLikeEditing";
import MultiWindow from "./components/MultiWindow";
import { saveWindowState, StateFlags  } from "tauri-plugin-window-state-api";
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater';

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

 




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
{/* <script src="https://gist.github.com/HuakunShen/c71fb4093e68aa2ed24860a5ea812708.js"></script> */}
{/* <script src="https://gist.github.com/princetyagidev/4cdd715270a77ab2f1fba40e5547090e.js"></script> */}