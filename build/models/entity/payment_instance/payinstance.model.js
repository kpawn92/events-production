"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateStatePaymentById = exports.getStateBySubscriber = exports.getPayments = exports.getPaymentByTransaction = exports.create = void 0;
var _uuid = require("uuid");
var _db = require("../../../config/db");
const create = async (fk_subscriber, transaction) => {
  const id = (0, _uuid.v4)();
  const [result] = await _db.pool.query('INSERT INTO payment_instance SET ?', {
    id,
    fk_subscriber,
    transaction
  });
  return result;
};
exports.create = create;
const getPayments = async () => {
  const [result] = await _db.pool.query('SELECT * FROM payment_instance');
  return result;
};
exports.getPayments = getPayments;
const updateStatePaymentById = async (id, status) => {
  const [result] = await _db.pool.query('UPDATE payment_instance SET status = ? WHERE id = ?', [status, id]);
  return result;
};
exports.updateStatePaymentById = updateStatePaymentById;
const getStateBySubscriber = async fk_subscriber => {
  const [result] = await _db.pool.query('SELECT transaction, status FROM payment_instance WHERE fk_subscriber = ?', [fk_subscriber]);
  return result;
};
exports.getStateBySubscriber = getStateBySubscriber;
const getPaymentByTransaction = async transaction => {
  const [result] = await _db.pool.query('SELECT id FROM payment_instance WHERE transaction = ?', [transaction]);
  return result;
};
exports.getPaymentByTransaction = getPaymentByTransaction;