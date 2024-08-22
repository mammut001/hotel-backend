import {FastifyRequest, FastifyReply} from 'fastify'
import dayjs,{Dayjs} from "dayjs";

type requestBody = {
    start: dayjs.Dayjs,
    end: dayjs.Dayjs,
    phoneNumber: string,
}
export const submitReservation = async (req: FastifyRequest, reply: FastifyReply) => {
    const requestPayload = req.body as requestBody
    console.log("Received data:", requestPayload)

    reply.send({200:true})
}