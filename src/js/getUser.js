async function GetUser() {
    try {
        const response = await fetch ('http://localhost:3000/users');
        const dato =await response.json();


        return dato
    } catch (error) {
        console.log(Error);
        
    }
    
}

export{GetUser}