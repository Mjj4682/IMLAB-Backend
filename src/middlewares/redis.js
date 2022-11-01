const { createClient } = require("redis");

const startRedis = async () => {
  const client = createClient();

  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();
};

startRedis();
