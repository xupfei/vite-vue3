import axios from "@/utils/axios.js";

export default {
    
    login: params => axios.post("/user/signIn", params),

    signOut: () => axios.get("/user/signOut"),
}