const redisDB = require('redis');
const redisClient = redisDB.createClient();
redisClient.connect();
redisClient.on("connect", () => console.log('Connected to redisDB'));
redisClient.on("error", err => console.log(err));
redisClient.on("ready", () => console.log("redis ready to use..."))
redisClient.on("end", () => console.log("disconnected from redis...."))

module.exports = redisClient;