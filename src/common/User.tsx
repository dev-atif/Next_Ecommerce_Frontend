import axios from "axios";

async function UserDetails(){
    try {
        const response =await axios.get('http://localhost:8080/api/user',{withCredentials:true})
        return response.data

    } catch (error:any) {
        throw new Error(error)
    }
}
module.exports = {UserDetails}