"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var eventCtrl = _interopRequireWildcard(require("../controllers/event.controller"));
var _authJwt = require("../middlewares/authJwt");
var _eventValidate = require("../validators/event.validate.dto");
var _costEventValidate = require("../validators/costEvent.validate.dto");
var _turboCache = require("../middlewares/turboCache");
var _verifyParams = require("../middlewares/verifyParams");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const router = (0, _express.Router)();

// TODO: Todos los usuarios obtienen los eventos y su descripcion

/**
 * @swagger
 *  tags:
 *      name: Events
 *      description: Endpoints para manejar los eventos en la BD
 */

/**
 * @swagger
 *  components:
 *      parameters:
 *          EventId:
 *              in: path
 *              name: eventId
 *              required: true
 *              schema:
 *                  type: string
 *              description: id del registro ha obtener
 *      schemas:
 *          BodyCostEvent:
 *              type: object
 *              properties:
 *                  cost:
 *                      description: Cantidad a pagar para participar en el evento
 *                      type: number
 *                  target:
 *                      description: Numero de targeta para recibir el pago
 *                      type: string
 *          BodyEventsPost:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  description:
 *                      type: string
 *                  date_beginning_inscription:
 *                      description: fecha de inicio de inscripcion al evento
 *                      type: number
 *                  end_date_inscription:
 *                      description: fecha final de inscripcion del evento
 *                      type: number
 *                  date_beginning:
 *                      description: fecha inicio del evento
 *                      type: number
 *                  end_date:
 *                      description: fecha final del evento
 *                      type: number
 *              example:
 *                  name: Ciencia y tecnica
 *                  description: A long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opp
 *                  date_beginning_inscription: 1671577145
 *                  end_date_inscription: 1671577145
 *                  date_beginning: 1671577145
 *                  end_date: 1671577145
 */

/**
 * @swagger
 *  /events/:
 *      get:
 *          tags:
 *          - Events
 *          summary: Los usuarios obtienen los eventos activos, solo el economist y el moderator obtienen todos los eventos activos e inactivos
 *          parameters:
 *          - $ref: '#/components/parameters/headUA'
 *          responses:
 *              200:
 *                  description: Peticion realizada satisfactoriamente
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              500:
 *                  description: Error al server
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 */

router.get('/', [_verifyParams.verifyHeaderModeratorOrEconomist, _turboCache.cacheInit], eventCtrl.getEvents);

/**
 * @swagger
 *  /events/{eventId}:
 *      get:
 *          tags:
 *          - Events
 *          summary: Todos los usuarios obtienen el evento
 *          parameters:
 *          - $ref: '#components/parameters/EventId'
 *          responses:
 *              200:
 *                  description: Peticion realizada
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              404:
 *                  description: No se encuentra
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              500:
 *                  description: Err server
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 */

router.get('/:eventId', _verifyParams.verifyEventByParams, eventCtrl.getEventById);

/**
 * @swagger
 *  /events/:
 *      post:
 *          tags:
 *          - Events
 *          summary: El modelator crea los eventos
 *          parameters:
 *          - $ref: '#/components/parameters/token'
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BodyEventsPost'
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

router.post('/', [_authJwt.verifyToken, _authJwt.isModelator, _eventValidate.validateEventDTO], eventCtrl.createEvent);

/**
 * @swagger
 *  /events/{eventId}:
 *      put:
 *          tags:
 *          - Events
 *          summary: El modelator actualiza el evento
 *          parameters:
 *          - $ref: '#/components/parameters/token'
 *          - $ref: '#/components/parameters/EventId'
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BodyEventsPost'
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

router.put('/:eventId', [_authJwt.verifyToken, _authJwt.isModelator, _verifyParams.verifyEventByParams, _eventValidate.validateEventDTO], eventCtrl.updateEventById);

/**
 * @swagger
 *  /events/{eventId}:
 *      patch:
 *          tags:
 *          - Events
 *          summary: El economist actualiza el costo del evento
 *          parameters:
 *          - $ref: '#/components/parameters/token'
 *          - $ref: '#/components/parameters/EventId'
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BodyCostEvent'
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

router.patch('/:eventId', [_authJwt.verifyToken, _authJwt.isEconomist, _verifyParams.verifyEventByParams, _costEventValidate.validateCostEventDTO], eventCtrl.setCostEvent);

/**
 * @swagger
 *  /events/{eventId}:
 *      delete:
 *          tags:
 *          - Events
 *          summary: El moderator cancela el evento
 *          parameters:
 *          - $ref: '#/components/parameters/token'
 *          - $ref: '#/components/parameters/EventId'
 *          responses:
 *              200:
 *                  description: Peticion aceptada
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              404:
 *                  description: No existe el evento
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              500:
 *                  description: Err server
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 */

router.delete('/:eventId', [_authJwt.verifyToken, _authJwt.isModelator, _verifyParams.verifyEventByParams], eventCtrl.cancelEventById);
var _default = router;
exports.default = _default;