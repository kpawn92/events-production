"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setUser = exports.getEconomists = exports.create = void 0;
var _uuid = require("uuid");
var _db = require("../../../config/db");
const create = async (id, body) => {
  const _id = (0, _uuid.v4)();
  const {
    name,
    lastname,
    dni
  } = body;
  const [economist] = await _db.pool.query('INSERT INTO economist SET ?', {
    id: _id,
    name,
    lastname,
    dni,
    fk_user: id
  });
  return economist;
};
exports.create = create;
const setUser = async dni => {
  const [result] = await _db.pool.query('SELECT dni FROM economist WHERE dni = ?', [dni]);
  return result;
};
exports.setUser = setUser;
const getEconomists = async status => {
  const [result] = await _db.pool.query('SELECT economist.id, name, lastname, dni, email FROM economist JOIN users ON users.id = fk_user WHERE status = ?', [status]);
  return result;
};
exports.getEconomists = getEconomists;