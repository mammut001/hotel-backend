import {FastifyInstance} from "fastify";
import {validateOTPController} from "../controllers/validateOTPController";
async function validateOTPRoute(fastifyInstance: FastifyInstance) {
    fastifyInstance.post('/api/v1.1/validate_otp',validateOTPController)
}

export default validateOTPRoute;