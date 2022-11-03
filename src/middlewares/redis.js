/**
 * imports environment variables
 */

require("dotenv").config();

/**
 * module dependencies.
 * @public
 */

const redis = require("redis");
const { ExchangeRate } = require("./exchangeRate");
const processDeliveryCost = require("./parsing");
const error = require("./errorConstructor");

/**
 * redis server 의 설정값.
 */

const config = {
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
  legacyMode: true,
};

/**
 * redis cloud 서버 시작. 로컬 메모리를 사용하지 않는다.
 * return 값으로 set, get 등의 명령이 가능함.
 * @param: config
 * @returns: redisCli 객체
 */

const redisServer = async (config) => {
  const redisClient = redis.createClient(config);

  redisClient.on("connect", () => {});
  redisClient.on("error", (err) => {});

  redisClient.connect().then();
  const redisCli = redisClient.v4;

  return redisCli;
};

/**
 * redis cloud 에 key:doller, value: 환율 을 입력한다.
 * @param: 없음
 * @return: 없음
 */

const setDollerRate = async () => {
  const exchange = new ExchangeRate();

  const redis = await redisServer(config);

  const getRawData = async () => await exchange.getDealRate("USD");

  getRawData()
    .then(async (res) => {
      if (await redis.exists("doller")) {
        await redis.del("doller");
      }
      await redis.set("doller", res);
      await redis.quit();
    })
    .catch((err) => {
      console.log(err);
      throw new error("redis error", 500);
    });

  return "OK";
};

/**
 * deliveryCost 를 redis 에 입력한다.
 * @param: 없음
 * @return: {nations : {quantities : costs}}
 */

const setDeliveryCost = async () => {
  try {
    const value = await processDeliveryCost();

    const redis = await redisServer(config);

    if (await redis.exists("deliveryCost")) {
      await redis.del("deliveryCost");
    }

    const result = await redis.set("deliveryCost", JSON.stringify(value));
    await redis.quit();
    return result;
  } catch (err) {
    console.log(err);
    throw new error("fail: setDeliveryCost", 500);
  }
};

/**
 * redis 서버에 있는 key: deliveryCost 의 value 를 불러온다. 다음과 같이 사용함.
 * value[nation][quantity] => number
 * @param: 없음
 * @returns: {nations : {quantities : costs}}
 */

const getDeliveryCost = async () => {
  try {
    const redis = await redisServer(config);
    const val = JSON.parse(await redis.get("deliveryCost"));
    await redis.quit();
    return val;
  } catch (err) {
    console.log(err);
    throw new error("fail: getDeliveryCost", 500);
  }
};

/**
 * 달러 기준 한국환 값을 반환함. 보통 '환율'로 부르는 값.
 * @param: 없음
 * @returns: ex)1422
 * @type: number
 */

const getDollerRate = async () => {
  try {
    const redis = await redisServer(config);
    const result = await redis.get("doller");
    await redis.quit();
    return result;
  } catch (err) {
    console.log(err);
    throw new error("fail: getDollerRate", 500);
  }
};

/**
 * module exports.
 * @public
 */

module.exports = {
  redisServer,
  getDeliveryCost,
  getDollerRate,
  setDollerRate,
  setDeliveryCost,
};
