import {FastifyRequest, FastifyReply} from 'fastify'
import dayjs,{Dayjs} from "dayjs";
import {sendSMS} from "../service/sendSMS";
import otpGenerator from 'otp-generator'
import app from "../index";
export type requestBody = {
    start: dayjs.Dayjs,
    end: dayjs.Dayjs,
    phoneNumber: string,
}
export const validateUser = async (req: FastifyRequest, reply: FastifyReply) => {
    const requestPayload = req.body as requestBody
    console.log(requestPayload.start)
    console.log(requestPayload.end)
    console.log(requestPayload.phoneNumber)
    try{


        //TODO store otp inside otp
        //ttl 30 minutes
        try {
            const res = await app.redis.get(`otp:${requestPayload.phoneNumber}`)
            console.log("res "+ res)
            if(!res){
                const otp = otpGenerator.generate(6, { digits: true, specialChars:false, lowerCaseAlphabets:false, upperCaseAlphabets:false});
                console.log(otp)
                await app.redis.set(`otp:${requestPayload.phoneNumber}`, otp,"EX", 60*30)
                app.log.info("key set successfully");
                reply.send({ success: true, status_code:200, otp_code:otp});
            }
            else {
                reply.send({ success: false, status_code: 409, msg:"Conflict!"});
                app.log.info("key found in redis")

            }

        }
        catch (err){
            app.log.error("Error in redis request", err)
            reply.send({500:false,errorMsg:err})

        }
        // User enter otp and matches, then store user INFO inside database.
        //
        // const urlSuffix = await sendSMS(requestPayload.phoneNumber, otp)
        // reply.send({ success: true, url: urlSuffix });
        //

    }
    catch (err){
        console.error("ERROR",err)
        reply.send({500:true})

    }


}