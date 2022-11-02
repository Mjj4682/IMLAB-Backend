const { createApp } = require("../../app");
const { sequelize } = require("../models");
const request = require("supertest");

describe("purchase service test: ", () => {
  let app;
  beforeAll(async () => {
    app = createApp();
    await sequelize.sync({});
    await sequelize.query(
      `INSERT INTO coupon_meta (name, target) VALUES ('%할인', '10%')`
    );
    await sequelize.query(
      `INSERT INTO delivery_status (name) VALUES ('배송전'),('배송중'),('배송완료')`
    );
    await sequelize.query(
      `INSERT INTO order_state (name) VALUES ('결제완료'),('결제취소')`
    );
    await sequelize.query(
      `INSERT INTO country (id, name, country_code, country_decode) VALUES (191, 'South Korea', 'KR', 82), (221, 'USA', 'US', 1)`
    );
    await sequelize.query(
      `INSERT INTO user (name, country_id) VALUES ('김성식', 191),('Walter', 221)`
    );
    /* 
      테스트 테이블에 insert 하는 expried_date 는 항상 최신화 필요
      첫 번째와 두 번째에 insert 하는 expired_date 는 현재 날짜보다 뒤의 날짜로 지정
      세 번째에 insert 하는 expired_date 는 현재 날짜보다 앞의 날짜로 지정
      */
    await sequelize.query(
      `INSERT INTO coupon (expired_date, coupon_metum_id, user_id) VALUES ('2022-11-30', 1, 1),('2022-11-30', 1, 2),('2022-11-01', 1, 2)`
    );
  });

  afterAll(async () => {
    await sequelize.query(`SET foreign_key_checks = 0`);
    await sequelize.query(`TRUNCATE user`);
    await sequelize.query(`TRUNCATE coupon_meta`);
    await sequelize.query(`TRUNCATE coupon`);
    await sequelize.query(`TRUNCATE delivery_status`);
    await sequelize.query(`TRUNCATE order_state`);
    await sequelize.query(`TRUNCATE country`);
    await sequelize.query(`SET foreign_key_checks = 1`);
  });

  describe("add purchase test: ", () => {
    test("SUCCESS: purchase success (South Korea)", async () => {
      await request(app)
        .post("/purchase/1")
        .send({
          price: 10000,
          quantity: 2,
          countryId: 191,
          couponId: 1,
        })
        .expect(201)
        .expect({ message: "Purchase success" });
    });

    test("SUCCESS: purchase success (USA)", async () => {
      await request(app)
        .post("/purchase/2")
        .send({
          price: 100,
          quantity: 3,
          countryId: 221,
          couponId: 2,
        })
        .expect(201)
        .expect({ message: "Purchase success" });
    });

    test("SUCCESS: purchase success (No coupon)", async () => {
      await request(app)
        .post("/purchase/1")
        .send({
          price: 1000,
          quantity: 1,
          countryId: 191,
        })
        .expect(201)
        .expect({ message: "Purchase success" });
    });

    test("FAILED: Invalid user", async () => {
      await request(app)
        .post("/purchase/100")
        .send({
          price: 1000,
          quantity: 1,
          countryId: 191,
          couponId: 1,
        })
        .expect(400)
        .expect({ message: "INVALID_USER" });
    });

    test("FAILED: Invalid country", async () => {
      await request(app)
        .post("/purchase/1")
        .send({
          price: 1000,
          quantity: 1,
          countryId: 1,
          couponId: 1,
        })
        .expect(400)
        .expect({ message: "INVALID_COUNTRY" });
    });

    test("FAILED: Invalid coupon", async () => {
      await request(app)
        .post("/purchase/2")
        .send({ price: 100, quantity: 3, countryId: 221, couponId: 3 })
        .expect(400)
        .expect({ message: "INVALID_COUPON" });
    });
  });
});
