"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setUser = exports.getManagers = exports.getManagerById = exports.create = void 0;
var _uuid = require("uuid");
var _db = require("../../../config/db");
const create = async (id, body) => {
  const _id = (0, _uuid.v4)();
  const {
    name,
    lastname,
    dni
  } = body;
  const [manager] = await _db.pool.query('INSERT INTO manager SET ?', {
    id: _id,
    name,
    lastname,
    dni,
    fk_user: id
  });
  return manager;
};
exports.create = create;
const setUser = async dni => {
  const [result] = await _db.pool.query('SELECT dni FROM manager WHERE dni = ?', [dni]);
  return result;
};
exports.setUser = setUser;
const getManagerById = async id => {
  const [result] = await _db.pool.query('SELECT * FROM manager WHERE id = ?', [id]);
  return result;
};
exports.getManagerById = getManagerById;
const getManagers = async status => {
  const [result] = await _db.pool.query('SELECT manager.id, name, lastname, dni, email FROM manager JOIN users ON users.id = fk_user WHERE status = ?', [status]);
  return result;
};
exports.getManagers = getManagers;