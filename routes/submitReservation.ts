import fastify, {FastifyInstance} from "fastify";
import {submitReservation} from "../controllers/reservationController";

async function reservationRoutes(fastifyInstance: FastifyInstance) {
    fastifyInstance.post('/api/v1.1/submitReservation',submitReservation)
}

export default reservationRoutes;