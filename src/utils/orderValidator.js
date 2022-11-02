const error = require("../middlewares/errorConstructor");
const OrderState = require("../models/orderState");
module.exports = class OrderRequest {
  constructor(req) {
    this.data = req;
  }
  getQueryString = () => {
    const result = {};
    const queryString = {
      search: this.data.query.search || undefined,
      orderby: this.data.query.orderby || undefined,
      status: this.data.query.status || undefined,
      startDate: this.data.query.startDate || undefined,
      endDate: this.data.query.endDate || undefined,
      name: this.data.query.name || undefined,
    };
    if (queryString.orderby === undefined) queryString.orderby = "DESC";

    for (const key in queryString) {
      if (!queryString[key]) continue;
      result[key] = queryString[key];
    }
    return result;
  };

  getUpdatedata = async () => {
    const { orderId, state } = this.data.params;
    const deliveryStateId = undefined;

    if (!state || !orderId) {
      throw error("Key_Error", 400);
    }

    const deliveryStatus = await OrderState.findAll({
      attributes: ["id"],
      where: { name: { [Op.like]: `%${state}` } },
    });

    if (deliveryStatus.length !== 1) {
      throw new error("Invalid_Value", 400);
    }

    for (value of deliveryStatus) {
      deliveryStateId = value.id;
    }
    return { deliveryStateId, orderId };
  };
};
