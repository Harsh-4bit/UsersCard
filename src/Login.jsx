import wall from '/wallpaper.jpg';
import eye from '/eye.svg';
import notEye from '/notEye.svg';
import { useState, useRef } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Login({log, setLog, userdata, setUserdata}) {
    const [type, setType] = useState("password");
    const [mailok, setMailok] = useState(true);
    const [passok, setPassok] = useState(true);
    const navigate = useNavigate();

    function eyeClick() {
        setType((prevType) => (prevType === "password" ? "text" : "password"));
    }

    async function loginClick(event) {
        event.preventDefault();
        const mail = event.target.elements.email.value;
        const pass = event.target.elements.password.value;
        
        if(pass != 'cityslicka'){
            setPassok(false);
        }
        else{
            try{
                const response = await axios.post("https://reqres.in/api/login", {
                    email: mail,
                    password: pass,
                });
                console.log(response.data);
                const token = response.data;
                const str = await fetchUser(token);
                localStorage.setItem("userdata", JSON.stringify(str));
                setUserdata(str);
                console.log(str);
                setMailok(true);
                setLog(true);
                navigate('/user/0');
            }
            catch(error){
                setMailok(false);
            }
        }
    }

    async function fetchUser(token){
        try{
            const response = await axios.get("https://reqres.in/api/users?page=1",{
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            return response.data;
          }
          catch(error){
            console.log('errur');
          }
      }


return (
    <div className={`w-full h-screen ${(log) ? 'hidden' : 'flex'} justify-center items-center bg-cover bg-no-repeat`} style={{ backgroundImage: `url(${wall})` }}>
      <div className="flex flex-col justify-evenly items-center w-[45%] h-[70%] text-white border-2 rounded-[3%] backdrop-blur-md bg-white/6">
        <div className='select-none rounded-4xl w-50 h-17 bg-white/20 flex items-center justify-center'>
          <h1 className="text-4xl font-bold">Login</h1>  
        </div> 

        <form onSubmit={loginClick} className='flex flex-col items-center justify-evenly h-[80%]'>
          <div className="p-5">
            <input type="email" name="email" placeholder="E-mail" className="border-2 border-white rounded-4xl h-14 w-110 cursor-pointer outline-none text-white text-center duration-150" onKeyDown={(event) => {if(event.key === " "){event.preventDefault();}}}/>
          </div>

          <div className="select-none p-5 gap-5 flex justify-between items-center">
            <input type={type} name="password" placeholder="Password" className="border-2 border-white rounded-4xl h-14 w-110 cursor-pointer outline-none text-white text-center" onKeyDown={(event) => {if(event.key === " "){event.preventDefault();}}}/>
            <img src={type === "password" ? eye : notEye} alt="toggle visibility" className='absolute right-35 w-7 h-7 cursor-pointer opacity-85 rounded-[50%] hover:scale-105 duration-150' onClick={eyeClick}/>
          </div>

          <div className={`text-sm font-light text-red-400 ${(!mailok || !passok) ? 'block' : 'hidden'}`}>
                <h1>{`${(!mailok) ? 'Incorrect E-mail id / Password !' : 'Incorrect Password'}`}</h1>

          </div>

          <div>
            <button type="submit" className="bg-white text-black text-lg p-2 font-bold w-30 h-12 rounded-4xl cursor-pointer hover:bg-orange-300 hover:text-white duration-150 hover:scale-110">Login</button>
          </div>
        </form>

      </div>   
    </div>
  );
}

export default Login;
