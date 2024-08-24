import { FastifyInstance } from "fastify";
import {connectingDBController} from "../controllers/retrieveUserController";


async function connectingDatabaseRoutes(fastifyInstance: FastifyInstance) {
    fastifyInstance.get('/api/v1.1/retrieve_users',connectingDBController)
}

export default connectingDatabaseRoutes;
