"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getlivingroomsByEventId = exports.getLivingRoomByName = exports.getElementById = exports.deleteElementById = exports.create = void 0;
var _db = require("../../../config/db");
var _uuid = require("uuid");
const create = async (body, fk_event) => {
  const id = (0, _uuid.v4)();
  const {
    name,
    description,
    fk_manager
  } = body;
  const [result] = await _db.pool.query('INSERT INTO living_room SET ?', {
    id,
    fk_event,
    name,
    description,
    fk_manager
  });
  return result;
};
exports.create = create;
const getLivingRoomByName = async name => {
  const [result] = await _db.pool.query('SELECT COUNT(id) as countLiving FROM living_room WHERE living_room.name = ?', [name]);
  return result[0];
};
exports.getLivingRoomByName = getLivingRoomByName;
const getlivingroomsByEventId = async (fk_event, status) => {
  const [result] = await _db.pool.query('SELECT living_room.id, living_room.name, living_room.description, manager.name as name_manager, manager.lastname, users.email, living_room.createdAt FROM living_room JOIN `event` ON `event`.id = living_room.fk_event JOIN manager ON manager.id = living_room.fk_manager JOIN users ON users.id = manager.fk_user WHERE users.status = ? AND living_room.fk_event= ?', [status, fk_event]);
  return result;
};
exports.getlivingroomsByEventId = getlivingroomsByEventId;
const getElementById = async id => {
  const [result] = await _db.pool.query('SELECT * FROM living_room WHERE id = ?', [id]);
  return result;
};
exports.getElementById = getElementById;
const deleteElementById = async id => {
  const [result] = await _db.pool.query('DELETE FROM living_room WHERE id = ?', [id]);
  return result;
};
exports.deleteElementById = deleteElementById;