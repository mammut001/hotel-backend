import {FastifyInstance} from "fastify";
import {submitReservationController} from "../controllers/submitReservationController";
async function submitReservation(fastifyInstance: FastifyInstance) {
    fastifyInstance.post('/api/v1.1/submitReservation',submitReservationController)
}

export default submitReservation;