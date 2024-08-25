import app from "../index";
import fastifyRedis from "@fastify/redis";

export const registerRedisService = async (): Promise<void> => {
    app.register(fastifyRedis,{
        url:'redis://127.0.0.1:6379',
    })

}