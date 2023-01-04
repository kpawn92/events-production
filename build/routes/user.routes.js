"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var userCtrl = _interopRequireWildcard(require("../controllers/user.controller"));
var _authJwt = require("../middlewares/authJwt");
var _userEdit = require("../validators/userEdit.validate");
var _verifyEmail = require("../middlewares/verifyEmail");
var _verifyParams = require("../middlewares/verifyParams");
var _turboCache = require("../middlewares/turboCache");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const router = (0, _express.Router)();

// TODO: Admin obtendra todos los usuarios registrados por HTTP:GET

/**
 * @swagger
 *  tags:
 *      name: Users
 *      description: Endpoints para manejar informacion relacionada los usuarios registrados en la BD.
 */

/**
 * @swagger
 *  components:
 *      parameters:
 *          token:
 *              name: x-access-token
 *              in: header
 *              description: token para para obtener los registros
 *              required: true
 *          UserId:
 *              in: path
 *              name: userId
 *              required: true
 *              schema:
 *                  type: string
 *              description: Id del usuario
 *          Role:
 *              in: path
 *              name: role
 *              required: true
 *              schema:
 *                  type: string
 *              description: rol para obtener los usuarios
 */

/**
 * @swagger
 *  /users/:
 *      get:
 *          tags:
 *          - Users
 *          summary: El admin obtiene todos los usuarios
 *          parameters:
 *          - $ref: '#/components/parameters/token'
 *          responses:
 *              200:
 *                  description: usuarios obtenidos
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              404:
 *                  description: token expired
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              401:
 *                  description: No autorizado
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              403:
 *                  description: No contiene token
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 */

router.get('/', [_authJwt.verifyToken, _authJwt.isAdmin, _turboCache.cacheInit], userCtrl.users);
/**
 * @swagger
 *  /users/{userId}:
 *      get:
 *          tags:
 *          - Users
 *          summary: El admin obtiene el usuario
 *          parameters:
 *          - $ref: '#components/parameters/UserId'
 *          - $ref: '#components/parameters/token'
 *          responses:
 *              200:
 *                  description: usuario obtenido satisfactoriamente
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 */
// TODO: __verificar el id que se esta pasando por params y crear el error 500

router.get('/:userId', [_authJwt.verifyToken, _authJwt.isAdmin], userCtrl.user);

/**
 * @swagger
 *  /users/get/{role}:
 *      get:
 *          tags:
 *          - Users
 *          summary: El admin obtiene los usuarios a travez del rol
 *          parameters:
 *          - $ref: '#components/parameters/token'
 *          - $ref: '#components/parameters/Role'
 *          responses:
 *              200:
 *                  description: Usuarios obtenidos satisfactoriamente
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              500:
 *                  description: Error en la respuesta del servidor
 *                  constent:
 *                      application/json:
 *                          schema:
 *                              type: array
 */

router.get('/get/:role', [_authJwt.verifyToken, _authJwt.isAdmin, _verifyParams.verifyRoleByParams], userCtrl.usersByRole);

/**
 * @swagger
 *  /users/mod/{role}:
 *      get:
 *          tags:
 *          - Users
 *          summary: El modelator obtiene todos los managers y economist
 *          parameters:
 *          - $ref: '#/components/parameters/token'
 *          - $ref: '#/components/parameters/Role'
 *          responses:
 *              200:
 *                  description: Peticion realizada
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              401:
 *                  description: No autorizado
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              404:
 *                  description: No existe
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

router.get('/mod/:role', [_authJwt.verifyToken, _authJwt.isModelator], userCtrl.getManagersActived);

/**
 * @swagger
 *  /users/{userId}:
 *      put:
 *          tags:
 *          - Users
 *          summary: El admin edita el usuario
 *          parameters:
 *          - $ref: '#components/parameters/UserId'
 *          - $ref: '#components/parameters/token'
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/LoginPost'
 *          required: true
 *          responses:
 *              200:
 *                  description: Peticion realizada satisfactoriamente
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              404:
 *                  description: Not found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              403:
 *                  description: Bad request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              401:
 *                  description: Unauthorised
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              500:
 *                  description: Error server
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 */

router.put('/:userId', [_authJwt.verifyToken, _authJwt.isAdmin, _userEdit.validateEditUserDTO, _verifyEmail.verifyUserAndEmailById], userCtrl.editUserById);

/**
 * @swagger
 *  /users/{userId}:
 *      delete:
 *          tags:
 *          - Users
 *          summary: El admin invalida el usuario
 *          parameters:
 *          - $ref: '#components/parameters/UserId'
 *          - $ref: '#components/parameters/token'
 *          responses:
 *              200:
 *                  description: Peticion aceptada
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              404:
 *                  description: No existe el usuario
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              500:
 *                  description: Error en el servidor
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 */

router.delete('/:userId', [_authJwt.verifyToken, _authJwt.isAdmin, _verifyParams.verifyUserByParams], userCtrl.toInvalidateUser);
var _default = router;
exports.default = _default;