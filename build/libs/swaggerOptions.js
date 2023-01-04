"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = void 0;
var _path = require("path");
var _env = require("../config/env");
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API REST: gestor de eventos',
      version: '1.0.0',
      description: 'Almacenamiento de datos, auth-code codigo de autenticacion y autorizacion, encriptacion de contraseñas, rapida gestion de datos, peticiones get en cache'
    },
    servers: [{
      url: _env.HOSTING
    }]
  },
  apis: [`${(0, _path.join)(__dirname, '../routes/*.js')}`]
};
exports.options = options;