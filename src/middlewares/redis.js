require("dotenv").config();
const redis = require("redis");
const ExchangeRate = require("./exchangeRate");
const deliveryCost = require("./parsing");

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
  legacyMode: true,
});

redisClient.on("connect", () => console.info("Redis connected"));
redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});
redisClient.connect().then();
const redisCli = redisClient.v4;

const exchange = new ExchangeRate();

const a = async () => await exchange.getDealRate("USD");

a().then(async (res) => {
  console.log("res:", res);
  if (await redisCli.exists("doller")) {
    await redisCli.del("doller");
  }
  await redisCli.set("doller", res);
});

const test = async () => {
  const result = await redisCli.get("doller");
  console.log("redis:", result);
};
test();

const redisFn = async () => {
  console.log("here!");
  await redisCli.set("deliveryCost", deliveryCost);
  console.log("please");
  console.log(await redisCli.get("deliveryCost"));
};

redisFn();

module.exports = {
  redisCli,
};
