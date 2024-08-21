async function postUser(inputAgre, inputbutton, ) {
    try {

        const usersDato = {
            inputAgre,
            inputbutton
        

        }

        //post =guardar
        const response = await fetch('http://localhost:3000/users', {
            method: `POST`,

            headers: {
                'content-type': 'application/jon'
            },

            body : JSON.stringify(usersDato)
        });

        const dato = await response.json();

        console.log("datos almacenados");
        return dato;
        


        


    } catch (error) {

}
    
}