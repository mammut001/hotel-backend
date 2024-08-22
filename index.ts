// import fastify from 'fastify'
// import cors from '@fastify/cors'
//
// const server = fastify()
//
// server.register(cors, {
//     origin: 'http://localhost:3000'
// })
//
// server.post('/api/v1.1/submitReservation', async (request, reply) => {
//     const data = request.body
//     console.log('Received data:', data)
//
//     return { success: true, receivedData: data }
// })
//
// server.listen({ port: 8080 }, (err, address) => {
//     if (err) {
//         console.error(err)
//         process.exit(1)
//     }
//     console.log(`Server listening at ${address}`)
// })


import fastify from "fastify";
import cors from '@fastify/cors'


import reservationRoutes from "./routes/submitReservation";

const app = fastify()
app.register(cors, {
    origin: 'http://localhost:3000'
})

app.register(reservationRoutes)

export default app;
