import {FastifyRequest, FastifyReply} from 'fastify'
import {db} from "../service/createDB";
import app from "../index";
export const connectingDBController = async (req: FastifyRequest, reply: FastifyReply) => {
    try{
        const queryPromise = new Promise((resolve, reject) => {
            db.all(`SELECT * FROM user_registration`, (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
        try {
            const rows = await queryPromise
            if (rows) {
                app.log.info("Query Result:", rows)
                return reply.send({message: "Query Result:", data: rows,});
            }
            else
            {
                return reply.send({message: "Database connection successful, but no data found",});
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