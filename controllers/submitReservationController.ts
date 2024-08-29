import {FastifyReply, FastifyRequest} from "fastify";
import app from "../index";
import dayjs from "dayjs";
import {db} from "../service/createDB";
import { v4 as uuidv4 } from 'uuid';

export type requestBody = {
    start: dayjs.Dayjs,
    end: dayjs.Dayjs,
    phoneNumber: string,
    otpCode: string
}

const insertQuery = async (phoneNumber:string,start:dayjs.Dayjs, end:dayjs.Dayjs, uuid:string) => {
    const queryPromise = new Promise<void>((resolve, reject) => {
        db.run(
            `INSERT INTO user_registration (phoneNumber, start, end, uuid) VALUES (?, ?, ?, ?)`,
            [phoneNumber, start.toString(), end.toString(),uuid],
            function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            }
        );
    });

    try {
        await queryPromise
        app.log.info("query inserted")
    }
    catch (err) {
        app.log.error("query error:", err)
    }
}
export const submitReservationController = async(req: FastifyRequest, reply: FastifyReply) => {
    const requestPayload = req.body as requestBody
    console.log(requestPayload.otpCode)
    const retrievedResultFromRedis = await app.redis.get(`otp:${requestPayload.phoneNumber}`)
    if (retrievedResultFromRedis === requestPayload.otpCode) {
        //insert sql query to insert data once the otp is validated...
        const uuid = uuidv4()
        await insertQuery(requestPayload.phoneNumber,requestPayload.start,requestPayload.end,uuid)
        reply.status(200).send({ success: true, status_code:200, msg: "validated!",uuid:uuid})
    }
    else{
        reply.status(404).send({ success: false, status_code:404, msg: "not validated!"})

    }



}