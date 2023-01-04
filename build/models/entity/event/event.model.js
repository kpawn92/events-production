"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateEventById = exports.updateCostEventById = exports.invalidEventById = exports.getEvents = exports.getEventByName = exports.getEventById = exports.getById = exports.events = exports.createEvents = void 0;
var _uuid = require("uuid");
var _db = require("../../../config/db");
const createEvents = async ({
  name,
  description,
  date_beginning_inscription,
  end_date_inscription,
  date_beginning,
  end_date
}) => {
  const id = (0, _uuid.v4)();
  const [event] = await _db.pool.query('INSERT INTO event SET ?', {
    id,
    name,
    description,
    date_beginning_inscription,
    end_date_inscription,
    date_beginning,
    end_date
  });
  return event;
};
exports.createEvents = createEvents;
const getEventByName = async name => {
  const [result] = await _db.pool.query('SELECT name FROM event WHERE name = ?', [name]);
  return result;
};
exports.getEventByName = getEventByName;
const getEvents = async status => {
  const [result] = await _db.pool.query('SELECT * FROM event WHERE status = ?', [status]);
  return result;
};
exports.getEvents = getEvents;
const events = async () => {
  const [result] = await _db.pool.query('SELECT * FROM event');
  return result;
};
exports.events = events;
const getEventById = async (id, status) => {
  const [result] = await _db.pool.query('SELECT * FROM event WHERE status = ? AND id = ?', [status, id]);
  return result;
};
exports.getEventById = getEventById;
const getById = async id => {
  const [result] = await _db.pool.query('SELECT * FROM event WHERE id = ?', [id]);
  return result;
};
exports.getById = getById;
const updateEventById = async (id, body) => {
  const {
    name,
    description,
    date_beginning_inscription,
    end_date_inscription,
    date_beginning,
    end_date
  } = body;
  const [result] = await _db.pool.query('UPDATE event SET name = ?, description = ?, date_beginning_inscription = ?, end_date_inscription = ?, date_beginning = ?, end_date = ?  WHERE id = ?', [name, description, date_beginning_inscription, end_date_inscription, date_beginning, end_date, id]);
  return result;
};
exports.updateEventById = updateEventById;
const updateCostEventById = async (id, body, status) => {
  const {
    cost,
    target
  } = body;
  const [result] = await _db.pool.query('UPDATE event SET cost = ?, target = ?, status = ? WHERE id = ?', [cost, target, status, id]);
  return result;
};
exports.updateCostEventById = updateCostEventById;
const invalidEventById = async (id, status) => {
  const [result] = await _db.pool.query('UPDATE event SET `status` = ? WHERE id = ?', [status, id]);
  return result;
};
exports.invalidEventById = invalidEventById;