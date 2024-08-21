import { getUsers } from "../servicios/getUsers";

import {postUsers} from "../servicios/postUsers";

import { updateUsers } from "../servicios/updateUser";

import { deleteUser } from "../servicios/deleteUsers";


const guardar = document.getElementById("save");
const nombre = document.getElementById("name");
const apellido = document.getElementById("lastName");
const id = document.getElementById("id");

guardar.addEventListener("click",function () {
         
   

   deleteUser(id.value)
  
   
})