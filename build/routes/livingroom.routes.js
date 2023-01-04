"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var livingRoomCtrl = _interopRequireWildcard(require("../controllers/livingroom.controller"));
var _authJwt = require("../middlewares/authJwt");
var _verifyParams = require("../middlewares/verifyParams");
var _verifyFkBody = require("../middlewares/verifyFkBody");
var _livingroomValidate = require("../validators/livingroom.validate.dto");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const router = (0, _express.Router)();

// TODO: Las salas seran asignadas al evento, guardando el Id del evento en la entidad de Sala

/**
 * @swagger
 *  tags:
 *      name: LivingRoom
 *      description: Endpoint para manejar informacion relacionada con las salas donde se efectuaran los eventos
 */

/**
 * @swagger
 *  components:
 *      parameters:
 *          LivingRoomId:
 *              in: path
 *              name: livingRoomId
 *              descriiption: Id de la sala
 *              required: true
 *              schema:
 *                  type: string
 *      schemas:
 *          BodyLivingPost:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  description:
 *                      type: string
 *                  fk_manager:
 *                      description: id del manager
 *                      type: string
 */

/**
 * @swagger
 *  /living-room/{eventId}:
 *      post:
 *          tags:
 *          - LivingRoom
 *          summary: El modelator crea las salas de cada evento
 *          parameters:
 *          - $ref: '#/components/parameters/token'
 *          - $ref: '#/components/parameters/EventId'
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BodyLivingPost'
 *          required: true
 *          responses:
 *              200:
 *                  description: Peticion realizada
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              403:
 *                  description: Error en el body
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              404:
 *                  description: El evento ya existe
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              500:
 *                  description:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 */

router.post('/:eventId', [_authJwt.verifyToken, _authJwt.isModelator, _verifyParams.verifyEventByParams, _livingroomValidate.validateLivingRoomDTO, _verifyFkBody.verifyManagerByBody], livingRoomCtrl.createLivingRoom);

/**
 * @swagger
 *  /living-room/{eventId}:
 *      get:
 *          tags:
 *          - LivingRoom
 *          summary: Todos los usuarios obtienen las salas del evento pasado en el parametro
 *          parameters:
 *          - $ref: '#/components/parameters/EventId'
 *          responses:
 *              200:
 *                  description: Peticion realizada
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              403:
 *                  description: Error en el body
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              404:
 *                  description: El evento ya existe
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              500:
 *                  description:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 */

router.get('/:eventId', _verifyParams.verifyEventByParams, livingRoomCtrl.livingRoomsByEvent);

/**
 * @swagger
 *  /living-room/{livingRoomId}:
 *      delete:
 *          tags:
 *          - LivingRoom
 *          summary: El modelator borra/elimina el registro de la sala
 *          parameters:
 *          - $ref: '#/components/parameters/token'
 *          - $ref: '#/components/parameters/LivingRoomId'
 *          responses:
 *              200:
 *                  description: Peticion realizada
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              403:
 *                  description: Error en el body
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              404:
 *                  description: El evento ya existe
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              500:
 *                  description:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 */

router.delete('/:livingRoomId', [_authJwt.verifyToken, _authJwt.isModelator, _verifyParams.verifyLivingRoomByParams], livingRoomCtrl.deleteLivingRoom);
var _default = router;
exports.default = _default;