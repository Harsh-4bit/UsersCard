import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import editsvg from '/editsvg.svg';
import binsvg from '/binsvg.svg';
import gmailsvg from '/gmailsvg.svg';

function Userlist({ setLen }) {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const userId = Number(id);

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editok, setEditok] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const storedData = localStorage.getItem("userdata");
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                setUserData(parsedData);
                setLoading(false);
            } catch (error) {
                console.error("Error parsing userdata:", error);
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) return <div className="text-red-400 text-center">Loading</div>;

    if (!userData?.data?.[userId]) navigate('/end');

    const image = userData.data[userId].avatar || "/wallpaper.jpg";
    const fn = userData.data[userId].first_name;
    const ln = userData.data[userId].last_name;
    const ml = userData.data[userId].email;

    function nextClick() {
        if (userId < userData.data.length - 1) {
            navigate(`/user/${userId + 1}`);
        } else {
            navigate('/end');
        }
    }

    function prevClick() {
        if (userId > 0) {
            navigate(`/user/${userId - 1}`);
        }
    }

    async function delClick() {
        try {
            const apiId = userId + 1;
            await axios.delete(`https://reqres.in/api/users/${apiId}`);
            const updatedUsers = userData.data.filter((_, index) => index !== userId);

            setUserData({ data: updatedUsers });
            setLen(updatedUsers.length);
            localStorage.setItem("userdata", JSON.stringify({ data: updatedUsers }));
            alert("User deleted successfully!");

            if (updatedUsers.length === 0 || userId >= updatedUsers.length) navigate('/end');
            else navigate(`/user/${userId}`);
        } 
        catch (err) {
            alert("Failed to delete user. Try again!");
        }
    }

    function editClick() {
        setFirstName(fn);
        setLastName(ln);
        setEmail(ml);
        setEditok(true);
    }

    function cancelClick(event){
        event.preventDefault();
        setEditok(false);
    }


    async function saveClick(event) {
        event.preventDefault(); 
    
        
        const updatedUser = {
            first_name: firstName, 
            last_name: lastName,
            email: email,
            avatar: userData.data[userId].avatar  
        };
    
        try {
            const response = await axios.post(`https://reqres.in/api/users`, updatedUser);
    
            if (response.status === 201) { 
                
                const updatedUsers = [...userData.data];
                updatedUsers[userId] = updatedUser;
    
                
                setUserData({ data: updatedUsers });
                localStorage.setItem("userdata", JSON.stringify({ data: updatedUsers }));
    
                alert("User updated successfully!");
                setEditok(false); 
            }
        } catch (error) {
            alert("Failed to update user. Please try again!");
        }
    }
    

    return (
        <div className="flex w-full h-screen items-center bg-black/75 bg-[radial-gradient(circle,#ffffff_1px,transparent_1px)] bg-[size:30px_30px]">
            
            <div className="absolute left-[48%] top-5 bg-black w-20 h-10 rounded-[20px] text-center text-white text-xl py-1">{userId+1}</div>

            <div className={`absolute left-120 bg-white ${editok ? 'flex flex-col' : 'hidden'} items-center justify-evenly w-145 h-[55%] z-10 rounded-4xl`}>
                <div className="flex gap-5 items-center">
                    <span className="font-bold text-xl">First Name</span>
                    <input 
                        type="text" 
                        className="bg-white w-80 h-10 rounded-[18px] border-1 text-center outline-none" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="flex gap-5 items-center">
                    <span className="font-bold text-xl">Last Name</span>
                    <input 
                        type="text" 
                        className="bg-white w-80 h-10 rounded-[18px] border-1 text-center outline-none" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="flex gap-5 items-center">
                    <span className="font-bold text-xl">E-Mail</span>
                    <input 
                        type="text" 
                        className="bg-white w-80 h-10 rounded-[18px] border-1 text-center outline-none" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="flex justify-evenly w-full">
                    <button className="w-20 h-8 bg-white rounded-[20px] text-sm text-black border-2 cursor-pointer hover:bg-black hover:text-white duration-200" onClick={cancelClick}>Cancel</button>
                    <button className="w-20 h-8 bg-white rounded-[20px] text-sm text-black border-2 cursor-pointer hover:bg-black hover:text-white duration-200" onClick={saveClick}>Save</button>
                </div>
            </div>

            
            <div className="flex justify-evenly items-center mx-auto w-450 h-screen">
                <div className="w-40 cursor-pointer hover:brightness-200 duration-200 hover:scale-95" onClick={prevClick}>
                    <img src="/prevsvg.svg" alt="Previous" className="w-40 h-40 brightness-75" />
                </div>

                <div className="flex flex-col items-center justify-evenly w-85 h-[75%] bg-black rounded-3xl duration-300 hover:shadow-[10px_10px_50px_rgba(127,255,212,0.7)] hover:-translate-y-1">
                    <div
                        className="flex justify-center items-center w-[55%] h-[35%] border-cyan-300  rounded-[50%] my-3 bg-cover bg-no-repeat cursor-grab border-b-[7px] hover:scale-125 duration-200"
                        style={{ backgroundImage: `url(${image})` }}
                    ></div>
                    <div className="flex flex-col w-full items-center justify-between h-[35%]">
                        <p className="whitespace-pre text-center text-3xl w-[80%] h-15 py-3 rounded-[25px] bg-gray-600 text-white">
                            {fn + " " + ln}
                        </p>
                        <div className="flex flex-col items-center justify-center w-full p-2 border-b-1">
                            <img src={gmailsvg}alt="Email" className="w-10 h-5 opacity-75" />
                            <p className="text-lg text-white">{ml}</p>
                        </div>
                        <div className="flex items-center w-full justify-evenly">
                            <button className="w-25 h-10 bg-green-300 rounded-[30px] hover:bg-green-500 cursor-pointer flex items-center justify-evenly p-2 duration-200 text-sm" onClick={editClick}>
                                Edit <img src={editsvg} alt="er" className="w-4 h-4"/>
                            </button>
                            <button className="w-25 h-10 bg-red-300 rounded-[30px] hover:bg-red-500 cursor-pointer flex items-center justify-evenly p-2 duration-200 text-sm" onClick={delClick}>
                                Delete <img src={binsvg} alt="er" className="w-4 h-4"/>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-40 cursor-pointer hover:brightness-200 duration-200 hover:scale-95" onClick={nextClick}>
                    <img src="/nextsvg.svg" alt="Next" className="w-40 h-40 brightness-75" />
                </div>
            </div>
        </div>
    );
}

export default Userlist;
