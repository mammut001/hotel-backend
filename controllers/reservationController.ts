import {FastifyRequest, FastifyReply} from 'fastify'
import dayjs,{Dayjs} from "dayjs";
import {sendSMS} from "../service/sendSMS";
import otpGenerator from 'otp-generator'

export type requestBody = {
    start: dayjs.Dayjs,
    end: dayjs.Dayjs,
    phoneNumber: string,
}
export const submitReservation = async (req: FastifyRequest, reply: FastifyReply) => {
    const requestPayload = req.body as requestBody
    console.log(requestPayload.start)
    console.log(requestPayload.end)
    console.log(requestPayload.phoneNumber)
    try{
        const otp = otpGenerator.generate(6, { digits: true, specialChars:false, lowerCaseAlphabets:false, upperCaseAlphabets:false});
        console.log(otp)

        //TODO store otp inside otp
        //ttl 30 minutes

        //User enter otp and matches, then store user INFO inside database.

        // const urlSuffix = await sendSMS(requestPayload.phoneNumber, otp)
        // reply.send({ success: true, url: urlSuffix });


    }
    catch (err){
        console.error("ERROR",err)
        reply.send({500:true})

    }


}