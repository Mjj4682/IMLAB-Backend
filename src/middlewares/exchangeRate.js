require("dotenv").config();
const axios = require("axios");

class Today {
  constructor() {
    this.now = new Date();
  }

  getYear = () => {
    return String(this.now.getFullYear());
  };

  getMonth = () => {
    return String(this.now.getMonth() + 1).padStart(2, "0");
  };

  getDate = () => {
    return String(this.now.getDate()).padStart(2, "0");
  };

  getToday = () => {
    return this.getYear() + this.getMonth() + this.getDate();
  };
}

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

  getExchangeRate = async (target) => {
    const result = await axios(this.config);
    const value = await result.data.filter((obj) => obj.cur_unit === target);
    console.log(value);
    return value;
  };

  getDealRate = async (target) => {
    const value = await this.getExchangeRate(target);
    const result = value[0].kftc_bkpr.replace(",", "");
    return Number(result);
  };
}

module.exports = ExchangeRate;
