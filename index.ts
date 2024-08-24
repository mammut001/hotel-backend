

import fastify from "fastify";
import cors from '@fastify/cors'
import connectingDatabaseRoutes from "./routes/retrieveUsers";
import reservationRoutes from "./routes/submitReservation";

const app = fastify({logger:true})
app.register(cors, {
    origin: 'http://localhost:3000'

})


app.register(reservationRoutes)
app.register(connectingDatabaseRoutes)
export default app;
