"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _verifySignup = require("../middlewares/verifySignup");
var _loginValidate = require("../validators/login.validate.dto");
var _verifyEmail = require("../middlewares/verifyEmail");
var authCtrl = _interopRequireWildcard(require("../controllers/auth.controller"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const router = (0, _express.Router)();

// TODO: Verificar que usuario puede crear (Economist, Moderator, Manager) a traves del rol

/**
 * @swagger
 *  tags:
 *      name: Auth
 *      description: Endpoint para manejar informacion relacionada con autenticacion y autorizacion de los usuarios
 */

/**
 * @swagger
 *  components:
 *      parameters:
 *          keyToken:
 *              name: x-access-token
 *              in: header
 *              description: token requerido para Admin y Moderators
 *          headSU:
 *              name: super-usuario
 *              in: header
 *              description: key del admin para crear moderator y economist
 *          headUA:
 *              name: usuario-advanced
 *              in: header
 *              description: key del moderator para crear el manager
 *      schemas:
 *          BodyUserAdvancedPost:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  lastname:
 *                      type: string
 *                  dni:
 *                      type: string
 *                  email:
 *                      type: string
 *                  passwword:
 *                      type: string
 *                  role:
 *                      type: string
 *              example:
 *                  name: Jhon
 *                  lastname: Wick
 *                  dni: 90102047481
 *                  email: john@gamil.com
 *                  password: test1234
 *                  role: moderator || economist || manager
 *          BodySubscriberPost:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  lastname:
 *                      type: string
 *                  nation:
 *                      type: string
 *                  dni:
 *                      type: string
 *                  institution:
 *                      type: string
 *                  category:
 *                      type: number
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *              example:
 *                  name: Jhon
 *                  lastname: Dae
 *                  nation: Cuba-cu
 *                  dni: 92122047481
 *                  institution: UDG
 *                  category: 0
 *                  email: jhon@gmail.com
 *                  password: test1234
 *          LoginPost:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *              example:
 *                  email: admin@admin.com
 *                  password: P@ssw0rd
 */

/**
 * @swagger
 *  /auth/signup:
 *      post:
 *          tags:
 *          - Auth
 *          summary: Autenticacion para acceder al sistema consultando a la BD.
 *          parameters:
 *          - $ref: '#/components/parameters/keyToken'
 *          - $ref: '#/components/parameters/headSU'
 *          - $ref: '#/components/parameters/headUA'
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BodySubscriberPost'
 *          required: true
 *          responses:
 *              200:
 *                  description: usuario creado
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              403:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *
 */

router.post('/signup', [_verifySignup.verifyData, _verifyEmail.verifyEmail], authCtrl.signUp); // Created user

/**
 * @swagger
 *  /auth/signin:
 *      post:
 *          tags:
 *          - Auth
 *          summary: Autorizacion para acceder al sistema consultando a la BD.
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/LoginPost'
 *          required: true
 *          responses:
 *              200:
 *                  description: usuario logeado
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

router.post('/signin', _loginValidate.validateLoginDTO, authCtrl.signIn); // Login user
var _default = router;
exports.default = _default;