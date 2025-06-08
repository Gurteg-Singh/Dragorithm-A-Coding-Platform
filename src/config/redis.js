const {createClient} = require("redis");

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-15849.c241.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 15849
    }
});

module.exports = redisClient;