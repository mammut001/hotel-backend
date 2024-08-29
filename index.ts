
//index.ts
import fastify, {FastifyRequest} from "fastify";
import cors from '@fastify/cors'
import connectingDatabaseRoutes from "./routes/retrieveUsers";
import validateUserRoute from "./routes/validateUser";
import submitReservation from "./routes/submitReservation";
const app = fastify({logger:true})
app.register(cors, {
    origin: 'http://localhost:3000'

})


app.register(validateUserRoute)
app.register(connectingDatabaseRoutes)
app.register(submitReservation)
export default app;
