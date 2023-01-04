"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateState = exports.getPaymentsByState = exports.getPaymentBySubscriber = exports.createPayment = void 0;
var _entity = require("../models/entity");
const createPayment = async (req, res) => {
  try {
    const {
      id
    } = await _entity.Subscribers.getIdByFkUser(req.userId);
    const {
      transaction
    } = req.body;
    const payment = await _entity.PaymentInstance.create(id, transaction);
    res.status(200).json(payment);
  } catch (error) {
    return res.status(500).json({
      message: error
    });
  }
};
exports.createPayment = createPayment;
const getPaymentsByState = async (req, res) => {
  try {
    const payments = await _entity.PaymentInstance.getPayments();
    res.status(200).json(payments);
  } catch (error) {
    return res.status(500).json({
      message: error
    });
  }
};
exports.getPaymentsByState = getPaymentsByState;
const updateState = async (req, res) => {
  try {
    const {
      paymentId
    } = req.params;
    const payment = await _entity.PaymentInstance.updateStatePaymentById(paymentId, 1);
    res.status(200).json(payment);
  } catch (error) {
    return res.status(500).json({
      message: error
    });
  }
};
exports.updateState = updateState;
const getPaymentBySubscriber = async (req, res) => {
  try {
    const {
      id
    } = await _entity.Subscribers.getIdByFkUser(req.userId);
    const result = await _entity.PaymentInstance.getStateBySubscriber(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
};
exports.getPaymentBySubscriber = getPaymentBySubscriber;