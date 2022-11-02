/**
 * imports environment variables
 */

require("dotenv").config();

/**
 * module dependencies.
 * @public
 */

const axios = require("axios");
const error = require("./errorConstructor");

/**
 * @summary: yyyymmdd 형식으로 날짜 계산.
 */

class Today {
  constructor() {
    this.now = new Date();
  }

  getYear = () => {
    return String(this.now.getFullYear());
  };

  getMonth = () => {
    //getMonth 0-11 이므로 1을 더함
    return String(this.now.getMonth() + 1).padStart(2, "0");
  };

  getDate = () => {
    return String(this.now.getDate()).padStart(2, "0");
  };

  getToday = () => {
    return this.getYear() + this.getMonth() + this.getDate();
  };
}

/**
 * @summary 실시간 환율 조회.
 */

class ExchangeRate {
  constructor() {
    this.today = new Today().getToday();
    this.authkey = process.env.EXC_ATUHKEY;
    this.config = {
      url: `https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=${this.authkey}&searchdate=${this.today}&data=AP01`,
      timeout: 1000,
      method: "get",
    };
  }

  /**
   * 외부 API 를 호출해 값을 가져온다.
   * @returns: 객체
   */

  getRawDataOfExchange = async () => {
    return await axios(this.config);
  };

  /**
   * @summary: 한국수출입은행 환율 정보 api => 필요한 환율 정보만 get
   * @param: target => type: string, ex) 'USD', 'JPY', 'KRW'
   * @return: {..."cur_unit":null,"ttb":null,"tts":null,"deal_bas_r":null...}
   * @type: object
   */

  getExchangeRate = async (target) => {
    try {
      const result = await this.getRawDataOfExchange();
      const value = await result.data.filter((obj) => obj.cur_unit === target);
      return value;
    } catch (err) {
      console.log(err);
      throw new error("fail: getExchangeRate", 500);
    }
  };

  /**
   * @summary:
   * @param target => type: string, ex) 'USD', 'JPY', 'KRW'
   * @return: ex)1421
   * @type: number
   */

  getDealRate = async (target) => {
    try {
      const value = await this.getExchangeRate(target);
      const result = value[0].kftc_bkpr.replace(",", "");
      return Number(result);
    } catch (err) {
      console.log(err);
      throw new error("fail: getDealRate", 500);
    }
  };
}

/**
 * module exports.
 * @public
 */

module.exports = { ExchangeRate, Today };
