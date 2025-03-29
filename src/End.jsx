import backsvg from '/backsvg.svg';
import { useNavigate } from 'react-router-dom';

function End({len}){
    const navigate = useNavigate();

    function backClick(){
        navigate(`/user/${len-1}`);
    }
    
    return(
        <div className="bg-black w-full h-screen flex flex-col justify-center items-center">
            <h1 className="text-white text-6xl">You Are At The Last Page</h1>
            <div className='w-50 h-50 flex items-center justify-center cursor-pointer hover:scale-90 duration-300' onClick={backClick}>
                <img src={backsvg} alt="errur" className='w-30 h-30'/>
            </div>
        
        
        
        
        </div>
    );
}
export default End;