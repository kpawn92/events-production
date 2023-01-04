"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateEventById = exports.setCostEvent = exports.getEvents = exports.getEventById = exports.createEvent = exports.cancelEventById = void 0;
var _entity = require("../models/entity");
/**
 * Funciones CRUD de la entidad Event
 * @param {Request} req Peticion del cliente
 * @param {Response} res Solucion que brinda el servidor web
 * @returns status de la respuesta del consulta a la base de datos
 */

const createEvent = async (req, res) => {
  try {
    const {
      name
    } = req.body;
    const nameEvent = await _entity.Event.getEventByName(name);
    if (nameEvent.length > 0) return res.status(404).json({
      message: 'Event already exists'
    });
    const event = await _entity.Event.createEvents(req.body);
    res.status(200).json(event);
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating: ' + error
    });
  }
};
exports.createEvent = createEvent;
const getEvents = async (req, res) => {
  try {
    const events = await _entity.Event.getEvents(1);
    if (events.length === 0) return res.status(404).json({
      message: 'Events not fully created'
    });
    res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({
      message: 'Error server, ' + error
    });
  }
};
exports.getEvents = getEvents;
const getEventById = async (req, res) => {
  try {
    const {
      eventId
    } = req.params;
    const event = await _entity.Event.getById(eventId);
    res.status(200).json(event);
  } catch (error) {
    return res.status(500).json({
      message: 'Error server, ' + error
    });
  }
};
exports.getEventById = getEventById;
const updateEventById = async (req, res) => {
  try {
    const {
      eventId
    } = req.params;
    const updateEvent = await _entity.Event.updateEventById(eventId, req.body);
    res.status(200).json(updateEvent);
  } catch (error) {
    return res.status(500).json({
      message: 'Error server, ' + error
    });
  }
};
exports.updateEventById = updateEventById;
const setCostEvent = async (req, res) => {
  try {
    const {
      eventId
    } = req.params;
    const updateCostEvent = await _entity.Event.updateCostEventById(eventId, req.body, 1);
    res.status(200).json(updateCostEvent);
  } catch (error) {
    return res.status(500).json({
      message: 'Error server, ' + error
    });
  }
};
exports.setCostEvent = setCostEvent;
const cancelEventById = async (req, res) => {
  try {
    const {
      eventId
    } = req.params;
    const setCancel = await _entity.Event.invalidEventById(eventId, 0);
    res.status(200).json(setCancel);
  } catch (error) {
    return res.status(500).json({
      message: 'Error server, ' + error
    });
  }
};
exports.cancelEventById = cancelEventById;