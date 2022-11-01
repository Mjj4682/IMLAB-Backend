const OrderRequest = require("../utils/orderValidator");
const {
  getList,
  getOne,
  updateOrderStatus,
} = require("../services/orderService");

const makeOrder = async (req, res) => {
  const body = req.body;
  res.status(201).json(body);
};

const getOrderList = async (req, res) => {
  const orderRequest = new OrderRequest(req);
  const queryData = orderRequest.getQueryString();
  const result = await getList(queryData);
  if (!result) {
    res.status(204).json("No_Content");
  }
  res.status(200).json(result);
};

const getOrderDetail = async (req, res) => {
  const result = await getOne();
  res.status(200).json(result);
};

const updateOrderState = async (req, res) => {
  const orderRequest = new OrderRequest(req);
  const updateParam = await orderRequest.getUpdatedata();
  const orderUpated = await updateOrderStatus(updateParam);

  await res.status(200).json(orderUpated);
};

module.exports = {
  makeOrder,
  getOrderList,
  getOrderDetail,
  updateOrderState,
};
