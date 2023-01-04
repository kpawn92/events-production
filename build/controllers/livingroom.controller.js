"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.livingRoomsByEvent = exports.deleteLivingRoom = exports.createLivingRoom = void 0;
var _entity = require("../models/entity");
const createLivingRoom = async (req, res) => {
  try {
    const {
      eventId
    } = req.params;
    const livingRoom = await _entity.LivingRoom.create(req.body, eventId);
    res.status(200).json(livingRoom);
  } catch (error) {
    return res.status(500).json({
      message: 'Error server: ' + error
    });
  }
};
exports.createLivingRoom = createLivingRoom;
const livingRoomsByEvent = async (req, res) => {
  try {
    const {
      eventId
    } = req.params;
    const livingRooms = await _entity.LivingRoom.getlivingroomsByEventId(eventId, 1);
    res.status(200).json(livingRooms);
  } catch (error) {
    return res.status(500).json({
      message: 'Error server: ' + error
    });
  }
};
exports.livingRoomsByEvent = livingRoomsByEvent;
const deleteLivingRoom = async (req, res) => {
  try {
    const {
      livingRoomId
    } = req.params;
    const deleteElement = await _entity.LivingRoom.deleteElementById(livingRoomId);
    res.status(200).json(deleteElement);
  } catch (error) {
    return res.status(500).json({
      message: 'Error server: ' + error
    });
  }
};
exports.deleteLivingRoom = deleteLivingRoom;