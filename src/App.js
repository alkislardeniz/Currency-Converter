import './App.css';
import React, {useState} from "react";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {ConversionAppContainer} from "./cnt-conversion-app";
import {Toast} from "primereact/toast";

export const App = () => {
  const [toast, setToast] = useState(null);
  return (
    <div className="App">
      <Toast ref={setToast}/>
      <ConversionAppContainer toast={toast}/>
    </div>
  );
}
