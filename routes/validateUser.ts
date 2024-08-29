import {FastifyInstance} from "fastify";
import {validateUser} from "../controllers/validateUserController";

async function validateUserRoute(fastifyInstance: FastifyInstance) {
    fastifyInstance.post('/api/v1.1/validateUser',validateUser)
}

export default validateUserRoute;