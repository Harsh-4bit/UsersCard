import Login from './Login.jsx';
import { useState } from 'react';
import {Route, Routes} from 'react-router-dom'
import Userlist from './Userlist.jsx';
import End from './End.jsx';


function App() {
  const [log, setLog] = useState(false);
  const [userdata, setUserdata] = useState(null);
  const [len, setLen] = useState(6);

  return (
    <div> 
       <Routes>
           <Route path="/" element={<Login log={log} setLog={setLog} userdata={userdata} setUserdata={setUserdata}/>} />
           <Route path="/user/:id" element={<Userlist log={log} setLen={setLen}/>} />
           <Route path="/end" element={<End len={len}/>} />
       </Routes>
    
    </div>
  )
}

export default App
