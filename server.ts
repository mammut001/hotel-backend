//server.ts
import app from "./index";
import {registerRedisService} from "./service/registerRedisService";
const startServer = async () =>{
    try{
        await registerRedisService()
        await app.listen({port:8080})
        console.log("Server currently listening on port 8080");
    }
    catch(err){
        console.error("ERROR",err)
        process.exit(1)
    }
}

startServer().catch(err => console.log(err));