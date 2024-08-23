import {FastifyRequest, FastifyReply} from 'fastify'
import dayjs,{Dayjs} from "dayjs";
import {sendSMS} from "../service/sendSMS";
type requestBody = {
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
        const urlSuffix = await sendSMS(requestPayload.phoneNumber)
        reply.send({ success: true, url: urlSuffix });

    }
    catch (err){
        console.error("ERROR",err)
        reply.send({500:true})

    }


}