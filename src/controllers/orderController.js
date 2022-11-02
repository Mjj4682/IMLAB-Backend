const OrderRequest = require("../utils/orderValidator");
const {
  getList,
  getOne,
  updateDeliveryStatus,
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

const updateDeliveryState = async (req, res) => {
  const orderRequest = new OrderRequest(req);
  const updateParam = await orderRequest.getUpdatedata();
  const orderUpated = await updateDeliveryStatus(updateParam);

  await res.status(200).json(orderUpated);
};

module.exports = {
  makeOrder,
  getOrderList,
  getOrderDetail,
  updateDeliveryState,
};
