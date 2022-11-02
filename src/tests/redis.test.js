const { redisServer } = require("../middlewares/redis");
const { getDollerRate, setDollerRate } = require("../middlewares/redis");
require("dotenv").config();

describe("redis:", () => {
  let config;
  let redisCli;
  beforeAll(async () => {
    config = {
      url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
      legacyMode: true,
    };
    redisCli = await redisServer(config);
  });

  afterAll(async () => {
    await redisCli.quit();
  });

  test("1. redis: set", async () => {
    const result = await redisCli.set("test1", 1);
    expect(result).toBe("OK");
  });

  test("2. redis: get", async () => {
    const result = await redisCli.get("test1");
    expect(result).toBe("1");
  });

  test("3. redis: exists", async () => {
    const result = await redisCli.exists("test1");
    expect(result).toBe(1);
  });

  test("4. redis: del", async () => {
    const result = await redisCli.del("test1");
    expect(result).toBe(1);
  });
});

describe("환율: 통합", () => {
  test("15. 달러 환율 정보를 redis 서버에 입력 가능하다.", async () => {
    const result = await setDollerRate();
    expect(result).toBe("OK");
  });

  //값이 계속 바뀌기 때문에 테스트 쉽지 않음
  test("14. 달러 환율 정보를 redis 서버에서 가져올 수 있다.", async () => {
    const result = await getDollerRate();
    expect(typeof result).toBe("string");
  });
});
