import {FastifyReply, FastifyRequest} from "fastify";
import app from "../index";
import dayjs from "dayjs";
import {db} from "../service/createDB";

export type requestBody = {
    start: dayjs.Dayjs,
    end: dayjs.Dayjs,
    phoneNumber: string,
    otpCode: string
}

const insertQuery = async (phoneNumber:string,start:dayjs.Dayjs, end:dayjs.Dayjs) => {
    const queryPromise = new Promise<void>((resolve, reject) => {
        db.run(
            `INSERT INTO user_registration (phoneNumber, start, end) VALUES (?, ?, ?)`,
            [phoneNumber, start.toString(), end.toString()],
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
        await insertQuery(requestPayload.phoneNumber,requestPayload.start,requestPayload.end)
        reply.send({ success: true, status_code:200, msg: "validated!"})
    }
    else{
        reply.send({ success: false, status_code:404, msg: "not validated!"})

    }



}