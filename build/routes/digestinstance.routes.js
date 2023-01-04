"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _authJwt = require("../middlewares/authJwt");
var _verifyParams = require("../middlewares/verifyParams");
var digestInstanceCtrl = _interopRequireWildcard(require("../controllers/digestinstance.controller"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const router = (0, _express.Router)();

// TODO: Gestionar las instancias de los resumenes de trabajos mandados
/**
 * @swagger
 *  tags:
 *      name: DigestInstance
 *      description: Endpoints para manejar informacion relacionada con las instancias de resumen de los trabajos previos al evento
 */

/**
 * @swagger
 *  components:
 *      parameters:
 *          InstanceId:
 *              name: instanceId
 *              in: path
 *              description: id de la instancia
 *              required: true
 *      schemas:
 *          BodyAbstractPost:
 *              type: object
 *              properties:
 *                  abstract:
 *                      type: string
 */

/**
 * @swagger
 *  /digest-instance/:
 *      post:
 *          tags:
 *          - DigestInstance
 *          summary: El subscriber genera la instancia de resumen del trabajo a presentar
 *          parameters:
 *          - $ref: '#/components/parameters/token'
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BodyAbstractPost'
 *          required: true
 *          responses:
 *              200:
 *                  description: peticion aceptada
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              403:
 *                  description: bad request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              401:
 *                  description: usuario invalid
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *
 */

router.post('/', [_authJwt.verifyToken, _authJwt.isUser], digestInstanceCtrl.setDigestInstance);

/**
 * @swagger
 *  /digest-instance/abstract:
 *      get:
 *          tags:
 *          - DigestInstance
 *          summary: El subscriber obtiene todos los status de instancias de los resumenes que llego a crear
 *          parameters:
 *          - $ref: '#/components/parameters/token'
 *          responses:
 *              200:
 *                  description: peticion aceptada
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              403:
 *                  description: bad request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              401:
 *                  description: usuario invalid
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *
 */

router.get('/abstract', [_authJwt.verifyToken, _authJwt.isUser], digestInstanceCtrl.getStatusByIdSubs);

/**
 * @swagger
 *  /digest-instance/:
 *      get:
 *          tags:
 *          - DigestInstance
 *          summary: El modelator obtiene todas instancias de los resumenes para generarle validez
 *          parameters:
 *          - $ref: '#/components/parameters/token'
 *          responses:
 *              200:
 *                  description: peticion aceptada
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              403:
 *                  description: bad request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              401:
 *                  description: usuario invalid
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *
 */

router.get('/', [_authJwt.verifyToken, _authJwt.isModelator], digestInstanceCtrl.getDigestInstances);

/**
 * @swagger
 *  /digest-instance/{instanceId}:
 *      put:
 *          tags:
 *          - DigestInstance
 *          summary: El modelator actualiza el estado de las instancias
 *          parameters:
 *          - $ref: '#/components/parameters/token'
 *          - $ref: '#/components/parameters/InstanceId'
 *          responses:
 *              200:
 *                  description: peticion aceptada
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              403:
 *                  description: bad request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              401:
 *                  description: usuario invalid
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *
 */

router.put('/:instanceId', [_authJwt.verifyToken, _authJwt.isModelator, _verifyParams.verifyInstance], digestInstanceCtrl.updateStateById);
var _default = router;
exports.default = _default;