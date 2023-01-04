"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debugIntances = void 0;
/**
 * 
 * @param {date} date Fecha actual
 * @comment Consultar a la base de datos para obtener las instancias de los resumenes, guardarlas en un array
 * @comment Comparar cada fecha con la actual, sacar la diferencias de dias, si es superior a 5 dias eliminarlas usar(filter() y guardarlo en una constante)
 */

console.log(new Date().getTime());
console.log(new Date(1672679085982));
const debugIntances = async date => {};
exports.debugIntances = debugIntances;