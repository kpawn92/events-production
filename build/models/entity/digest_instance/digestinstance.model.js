"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateStatusById = exports.getStatusBySubscriber = exports.getInstances = exports.getInstanceById = exports.create = void 0;
var _uuid = require("uuid");
var _db = require("../../../config/db");
const create = async (fk_subscriber, abstract) => {
  const id = (0, _uuid.v4)();
  const [result] = await _db.pool.query('INSERT INTO digest_instance SET ?', {
    id,
    fk_subscriber,
    abstract
  });
  return result;
};
exports.create = create;
const getInstances = async () => {
  const [result] = await _db.pool.query('SELECT digest_instance.id, subscriber.id as subsId, subscriber.name, subscriber.lastname, subscriber.dni, abstract, status FROM digest_instance JOIN subscriber ON subscriber.id = digest_instance.fk_subscriber');
  return result;
};
exports.getInstances = getInstances;
const getStatusBySubscriber = async fk_subscriber => {
  const [result] = await _db.pool.query('SELECT id, abstract, status FROM digest_instance WHERE fk_subscriber = ?', [fk_subscriber]);
  return result;
};
exports.getStatusBySubscriber = getStatusBySubscriber;
const updateStatusById = async (id, status) => {
  const [result] = await _db.pool.query('UPDATE digest_instance SET status = ? WHERE id = ?', [status, id]);
  return result;
};
exports.updateStatusById = updateStatusById;
const getInstanceById = async id => {
  const [result] = await _db.pool.query('SELECT id FROM digest_instance WHERE id = ?', [id]);
  return result;
};
exports.getInstanceById = getInstanceById;