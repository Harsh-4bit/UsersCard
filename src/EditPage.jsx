function EditPage({editok, setEditok, firstName, lastName, email, setFirstName, setLastName, setEmail}){
    
    function cancelClick(event) {
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

    return(
        <div className={`absolute left-50 bg-purple-200 ${editok ? 'block' : 'hidden'} w-[40%] h-[55%] z-10 rounded-4xl`}>
            <form className='flex flex-col justify-evenly items-center w-145 rounded-4xl'>
                <div className="flex gap-5 items-center h-30">
                    <span className="font-bold text-xl">First Name</span>
                    <input 
                        type="text" 
                        name="firstname"
                        className="bg-white w-80 h-10 rounded-[18px] text-center outline-none" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="flex gap-5 items-center h-25">
                    <span className="font-bold text-xl">Last Name</span>
                    <input 
                        type="text" 
                        name="lastname"
                        className="bg-white w-80 h-10 rounded-[18px] text-center outline-none" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="flex gap-5 items-center h-40">
                    <span className="font-bold text-xl">E-Mail</span>
                    <input 
                        type="text" 
                        name="mail"
                        className="bg-white w-80 h-10 rounded-[18px] text-center outline-none" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="flex justify-evenly w-full h-30">
                    <button className="w-20 h-8 bg-white rounded-[20px] text-sm text-black cursor-pointer hover:bg-black hover:text-white duration-200" onClick={cancelClick}>Cancel</button>
                    <button className="w-20 h-8 bg-white rounded-[20px] text-sm text-black cursor-pointer hover:bg-black hover:text-white duration-200" onClick={saveClick}>Save</button>
                </div>
            </form>
        </div>
    );
}
export default EditPage;