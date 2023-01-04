"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyPayment = exports.verifyManagerByBody = void 0;
var _entity = require("../models/entity");
const verifyManagerByBody = async (req, res, next) => {
  try {
    const {
      name,
      fk_manager
    } = req.body;
    const manager = await _entity.Manager.getManagerById(fk_manager);
    if (manager.length === 0) return res.status(404).json({
      message: 'Manager not found'
    });
    const {
      countLiving
    } = await _entity.LivingRoom.getLivingRoomByName(name);
    if (countLiving === 0) return next();
    return res.status(404).json({
      message: 'Living Room already exits'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error server, ' + error
    });
  }
};
exports.verifyManagerByBody = verifyManagerByBody;
const verifyPayment = async (req, res, next) => {
  try {
    const {
      transaction
    } = req.body;
    const id = await _entity.PaymentInstance.getPaymentByTransaction(transaction);
    if (id.length > 0) return res.status(400).json({
      message: 'Instance already exists'
    });
    next();
  } catch (error) {
    return res.status(500).json({
      message: 'Error' + error
    });
  }
};
exports.verifyPayment = verifyPayment;