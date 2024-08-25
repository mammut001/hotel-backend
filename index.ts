
//index.ts
import fastify, {FastifyRequest} from "fastify";
import cors from '@fastify/cors'
import connectingDatabaseRoutes from "./routes/retrieveUsers";
import reservationRoutes from "./routes/submitReservation";
import validateOTPRoute from "./routes/validateOTP";
const app = fastify({logger:true})
app.register(cors, {
    origin: 'http://localhost:3000'

})


app.register(reservationRoutes)
app.register(connectingDatabaseRoutes)
app.register(validateOTPRoute)
export default app;
