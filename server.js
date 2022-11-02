require("dotenv").config();

const { createApp } = require("./app");
const { sequelize } = require("./src/models");
const { setDollerRate, setDeliveryCost } = require("./src/middlewares/redis");

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT;

  await setDollerRate();
  await setDeliveryCost();

  await sequelize
    .sync({ force: false, alter: true })
    .then(() => {
      console.log("연결 성공!");
    })
    .catch((err) => {
      console.error(err);
    });
  app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
  });
};

startServer();
