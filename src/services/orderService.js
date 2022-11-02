const error = require("../middlewares/errorConstructor");

const Order = require("../models/order");
const OrderState = require("../models/orderState");
const User = require("../models/user");

const { Op } = require("sequelize");

const getDate = (dateString) => {
  const date = new Date(dateString);
  return date;
};

const getUserIds = async (userNames) => {
  userNames = userNames.split(",");
  const result = await User.findAll({
    attributes: ["id"],
    where: { name: userNames },
    raw: true,
  });

  const userIds = [];
  for (const user of result) {
    userIds.push(user.id);
  }
  return userIds;
};

const getOrderStatusIds = async (status) => {
  status = status.split(",");
  const result = await OrderState.findAll({
    attributes: ["id"],
    where: { name: status },
    raw: true,
  });
  const statusIds = [];
  for (const state of result) {
    status.push(state.id);
  }
  return statusIds;
};

const getOrderListQuery = (queryData) => {
  const query = { where: {}, order: [], raw: true };
  const where = [];

  if ("orderby" in queryData) {
    query.order.push(["createdAt", queryData.orderby]);
  }
  if ("startDate" in queryData) {
    where.push({ createAt: { [Op.gte]: getDate(queryData.startDate) } });
  }
  if ("endDate" in queryData) {
    where.push({ createAt: { [Op.lte]: getDate(queryData.endDate) } });
  }
  if ("status" in queryData) {
    const statusIds = getOrderStatusIds(queryData.status);
    where.push({ order_state_id: statusIds });
  }
  if ("name" in queryData) {
    const userIds = getUserIds(queryData.name);
    where.push({ user_id: userIds });
  }
  query.where[Op.and] = where;
  console.log(query);
  return query;
};

const getList = async (queryData) => {
  const query = getOrderListQuery(queryData);
  const orderList = await Order.findAll(query);
  return orderList;
};

const getOne = async (queryData) => {
  const query = {};

  const orderDatail = await Order.findOne();
};

const updateDeliveryStatus = async (data) => {
  const result = await Order.update(
    {
      delivery_state_id: data.stateId,
      delivery_number: data.deliveryNum,
    },
    {
      where: {
        [Op.and]: [{ id: data.orderId }, { order_state_id: { [Op.gte]: 2 } }],
      },
      raw: true,
    }
  );
  return result;
};

module.exports = {
  getList,
  getOne,
  updateDeliveryStatus,
};
