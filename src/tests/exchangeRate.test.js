const { ExchangeRate, Today } = require("../middlewares/exchangeRate");

require("dotenv").config();

describe("환율", () => {
  let today;
  let exchangeRate;

  beforeAll(() => {
    today = new Today();
    exchangeRate = new ExchangeRate();
  });

  test("5. 외부 API 에서 환율값을 가져옴", async () => {
    const result = await exchangeRate.getExchangeRate("USD");
    const value = [
      "result",
      "cur_unit",
      "ttb",
      "tts",
      "deal_bas_r",
      "bkpr",
      "yy_efee_r",
      "ten_dd_efee_r",
      "kftc_bkpr",
      "kftc_deal_bas_r",
      "cur_nm",
    ];
    expect(Object.keys(result[0])).toEqual(value);
    expect(result[0].cur_unit).toBe("USD");
  });

  test("6. 외부 API 에서 JPY 값을 가져옴", async () => {
    const result = await exchangeRate.getExchangeRate("JPY(100)");
    const value = [
      "result",
      "cur_unit",
      "ttb",
      "tts",
      "deal_bas_r",
      "bkpr",
      "yy_efee_r",
      "ten_dd_efee_r",
      "kftc_bkpr",
      "kftc_deal_bas_r",
      "cur_nm",
    ];
    expect(Object.keys(result[0])).toEqual(value);
    expect(result[0].cur_unit).toBe("JPY(100)");
  });

  test("7. 달러 환율 값을 반환할 수 있음", async () => {
    const result = await exchangeRate.getDealRate("USD");
    expect(typeof result).toBe("number");
  });

  test("8. KRW 값을 반환할 수 있음", async () => {
    const result = await exchangeRate.getDealRate("KRW");
    expect(typeof result).toBe("number");
  });

  test("9. 날짜 값 계산. yyyymmdd ", () => {
    const result = today.getToday();
    const value = "yyyymmdd".length;

    expect(result).toHaveLength(value);
    expect(typeof result).toBe("string");
  });
});
