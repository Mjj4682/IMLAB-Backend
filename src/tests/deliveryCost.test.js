const prdc = require("../middlewares/parsing");
const { getDeliveryCost, setDeliveryCost } = require("../middlewares/redis");

describe("deliveryCost:", () => {
  test("11. csv 파일을 가공할 수 있다.", async () => {
    const result = await prdc();
    expect(typeof result).toBe("object");
    expect(result["Macao"]).not.toBeUndefined();
  });

  test("12. 배송비 데이터를 redis 서버에 입력.", async () => {
    const result = await setDeliveryCost();
    expect(result).toBe("OK");
  });

  test("13. 배송비 데이터를 반환할 수 있다.", async () => {
    const result = await getDeliveryCost();
    const value = result["Egypt"]["20"];
    expect(value).toBe("176000");
  });
});
