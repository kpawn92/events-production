"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var paymentCtrl = _interopRequireWildcard(require("../controllers/payment.controller"));
var _authJwt = require("../middlewares/authJwt");
var _verifyFkBody = require("../middlewares/verifyFkBody");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const router = (0, _express.Router)();

/**
 * @swagger
 *  tags:
 *      name: Payment
 *      description: Endpoints para manejar informacion relacionada con las instancias de pago
 */

/**
 * @swagger
 *  components:
 *      parameters:
 *          PaymentId:
 *              name: paymentId
 *              in: path
 *              description: id del pago
 *              required: true
 *      schemas:
 *          BodyTransactionPost:
 *              type: object
 *              properties:
 *                  transaction:
 *                      type: string
 */

/**
 * @swagger
 * /payment-instance/:
 *      post:
 *          tags:
 *          - Payment
 *          summary: El subscriber genera la instancia de pago
 *          parameters:
 *          - $ref: '#/components/parameters/token'
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BodyTransactionPost'
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

router.post('/', [_authJwt.verifyToken, _authJwt.isUser, _verifyFkBody.verifyPayment], paymentCtrl.createPayment);

/**
 * @swagger
 *  /payment-instance/get/state:
 *      get:
 *          tags:
 *          - Payment
 *          summary: El subscriber obtiene los estado de sus transacciones
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

router.get('/get/state', [_authJwt.verifyToken, _authJwt.isUser], paymentCtrl.getPaymentBySubscriber);

/**
 * @swagger
 *  /payment-instance/:
 *      get:
 *          tags:
 *          - Payment
 *          summary: El economist obtiene todos los estado de las transacciones
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

router.get('/', [_authJwt.verifyToken, _authJwt.isEconomist], paymentCtrl.getPaymentsByState);

/**
 * @swagger
 *  /payment-instance/{paymentId}:
 *      put:
 *          tags:
 *          - Payment
 *          summary: El economist actualiza los estado de las transacciones
 *          parameters:
 *          - $ref: '#/components/parameters/token'
 *          - $ref: '#/components/parameters/PaymentId'
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

router.put('/:paymentId', [_authJwt.verifyToken, _authJwt.isEconomist], paymentCtrl.updateState);
var _default = router;
exports.default = _default;