"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setUser = exports.getSubscriberById = exports.getIdByFkUser = exports.create = void 0;
var _uuid = require("uuid");
var _db = require("../../../config/db");
const create = async (id, body) => {
  const _id = (0, _uuid.v4)();
  const {
    name,
    lastname,
    dni,
    nation,
    institution,
    category
  } = body;
  const [subscriber] = await _db.pool.query('INSERT INTO subscriber SET ?', {
    id: _id,
    name,
    lastname,
    nation,
    dni,
    institution,
    category,
    fk_user: id
  });
  return subscriber;
};
exports.create = create;
const setUser = async dni => {
  const [result] = await _db.pool.query('SELECT dni FROM subscriber WHERE dni = ?', [dni]);
  return result;
};
exports.setUser = setUser;
const getSubscriberById = async id => {
  const [result] = await _db.pool.query('SELECT id FROM subscriber WHERE id = ?', [id]);
  return result;
};
exports.getSubscriberById = getSubscriberById;
const getIdByFkUser = async fk_user => {
  const [result] = await _db.pool.query('SELECT id FROM subscriber WHERE fk_user = ?', [fk_user]);
  return result[0];
};
exports.getIdByFkUser = getIdByFkUser;