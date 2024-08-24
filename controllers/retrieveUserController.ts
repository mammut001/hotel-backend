import {FastifyRequest, FastifyReply} from 'fastify'
import {db} from "../service/createDB";
import app from "../index";
export const connectingDBController = async (req: FastifyRequest, reply: FastifyReply) => {
    try{
        const queryPromise = new Promise((resolve, reject) => {
            db.get(`SELECT * FROM users`, (err, row) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(row)
                }
            })
        })
        try {
            const row = await queryPromise
            if (row) {
                app.log.info("Query Result:", row)
                return reply.send({
                    message: "Database connection successful",
                    data: row,
                });
            } else {
                return reply.send({
                    message: "Database connection successful, but no data found",
                });
                }
            }
            catch (err) {
            app.log.error("Database error:", err)
                return reply.status(500).send("Database error")
            }

    }
    catch (err){
        console.error("ERROR",err)
        reply.send({500:true})

    }


}