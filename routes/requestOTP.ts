import {FastifyInstance} from "fastify";
import {validateUser} from "../controllers/requestOTPCode";

async function requestOTPRoute(fastifyInstance: FastifyInstance) {
    fastifyInstance.post('/api/v1.1/requestOTP',validateUser)
}

export default requestOTPRoute;