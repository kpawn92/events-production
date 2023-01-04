<h1 align="center"> API REST - Cronograma de eventos</h1>

## Tabla de contenidos:

---

- [Descripción y contexto](#descripción-y-contexto)
- [Guía de usuario](#guía-de-usuario)
- [Guía de instalación](#guía-de-instalación)
- [Código de conducta](#código-de-conducta)
- [Autor/es](#autores)
- [Licencia](#licencia)

## Descripción y contexto

---

API REST:

- Interfaz que dos sistemas de computación utilizan para intercambiar información de manera segura a través de Internet. La mayoría de las aplicaciones para empresas deben comunicarse con otras aplicaciones internas o de terceros para llevar a cabo varias tareas.

- La arquitectura de la API REST incluye varias capas que operan juntas para construir una jerarquía que ayuda a generar una aplicación más escalable y flexible. Debido a su sistema de capas, una aplicación tiene mejor seguridad ya que los componentes de cada capa no pueden interactuar fuera de la capa siguiente.

- Gestora de eventos, encargada de controlar los usuarios que interactuan con la aplicacion filtrando los privilegios de cada usuario, recibe los pedidos de los usuarios verificado los schemas mandados que cumpla con las normas asignadas en el servidor para persistir los datos.

## Guía de usuario

---

Endpoint: "/docs": se describe detalladamente cada proceso que debe realizar el usuario para trabajar correctamente con la API REST

## Guía de instalación

---

La API REST y el sistema servidor cumple con ciertos requisitos indispensables para su buen funcionamiento.

- Sistemas Operativos: Windows, Linux, Mac 
- Requerimientos minimos: (512MB RAM, 1GB HDD/SSD)
- Gestor de base de datos: MySQL
- Aplicaciones: Nodejs (http://nodejs.org) entorno para la ejecucion de JavaScript

Guía de instalación:

- Crear la base de datos con el nombre 'eventsdb'
- Importar el modelo db 'build/models/database/eventsdb.sql'

* Inicializar el servidor

```
npm run start
```

### Dependencias

- @sinclair/typebox v0.25.13: biblioteca de creación de tipos que crea objetos de esquema JSON en memoria que se pueden inferir estáticamente como tipos de TypeScript. Los esquemas producidos por esta biblioteca están diseñados para coincidir con las reglas de verificación de tipos estáticos del compilador de TypeScript. TypeBox permite crear un tipo unificado que TypeScript puede verificar estáticamente y afirmar en tiempo de ejecución mediante la validación de esquema JSON estándar
- ajv v8.11.2,
- ajv-errors v3.0.0,
- ajv-formats v2.1.1: Ajv implementa los estándares JSON Schema draft-06/07/2019-09/2020-12 (el draft-04 es compatible con v6)
  todas las palabras clave de validación (consulte Palabras clave de validación del esquema JSON )
- Extensiones OpenAPI :
  NUEVO: discriminador de palabras clave .
  palabra clave anulable .
  soporte completo de referencias remotas (los esquemas remotos deben agregarse addSchemao compilarse para estar disponibles)
  soporte de referencias recursivas entre esquemas
  longitudes de cadena correctas para cadenas con pares Unicode
  Formatos JSON Schema (con el complemento ajv-formats ).
  valida esquemas contra meta-esquema
  NUEVO: admite la definición de tipo JSON :
  todas las palabras clave (consulte los formularios de esquema de definición de tipo JSON )
  meta-esquema para esquemas JTD
  palabra clave "unión" y palabras clave definidas por el usuario (se pueden usar dentro del miembro "metadatos" del esquema)
  admite navegadores y Node.js 10.x - actual
  carga asíncrona de esquemas referenciados durante la compilación
  Modo de validación "Todos los errores" con la opción allErrors
  mensajes de error con parámetros que describen las razones del error para permitir la generación de mensajes de error
  Soporte de mensajes de error i18n con el paquete ajv-i18n
  eliminar-propiedades-adicionales
  asignación de valores predeterminados a propiedades y elementos que faltan
  obligar a los datos a los tipos especificados en las typepalabras clave
  palabras clave definidas por el usuario
  palabras clave de extensión adicionales con el paquete ajv-keywords
- bcryptjs v2.4.3: optimizado en JavaScript con cero dependencias. Compatible con el enlace bcrypt de C++ en node.js y también funciona en el navegador,
- cors v2.8.5: Ciertas solicitudes de CORS se consideran "complejas" y requieren una OPTIONSsolicitud inicial (llamada "solicitud previa al vuelo"). Un ejemplo de una solicitud CORS 'compleja' es una que usa un verbo HTTP que no sea GET/HEAD/POST (como DELETE) o que usa encabezados personalizados,
- dotenv: v16.0.3: módulo de dependencia cero que carga variables de entorno desde un .envarchivo a process.env. El almacenamiento de la configuración en el entorno separado del código se basa en la metodología de la aplicación The Twelve-Factor,
- express-expeditious: v5.1.1,
- expeditious-engine-memory v0.2.1: Un motor en memoria para expeditious. Las entradas de caché están, lo adivinaste, almacenadas en la memoria de proceso de node.js. ¡Este motor de caché perderá todo lo almacenado si su proceso se reinicia, y podría provocar una sobrecarga de memoria y recolecciones de basura lentas si no tiene cuidado con el tamaño y el volumen de las entradas!,
- express v4.18.2:
  Enrutamiento robusto
  Centrarse en el alto rendimiento
  Cobertura de prueba súper alta
  Ayudantes HTTP (redireccionamiento, almacenamiento en caché, etc.)
  Sistema de visualización compatible con más de 14 motores de plantillas
  Negociación de contenido
  Ejecutable para generar aplicaciones rápidamente,
  helmet v6.0.1: Midleware de express para la seguridad de las cabeceras,
- jsonwebtoken v9.0.0: JSON Web Token es un estándar de Internet propuesto para crear datos con firma opcional y/o encriptación opcional cuya carga útil contiene JSON que afirma una cierta cantidad de reclamos. Los tokens se firman mediante un secreto privado o una clave pública/privada,
- multer v1.4.5-lts.1: Multer es un middleware para Express y Nodejs que hace que sea fácil manipular este multipart/form-data cuando tus usuarios suben archivos,
- mysql2 v2.3.3: es una continuación de MySQL-Native . El código del analizador de protocolo se reescribió desde cero y se cambió la API para que coincida con mysqljs/mysql popular . El equipo de MySQL2 está trabajando junto con el equipo de mysqljs/mysql para eliminar el código compartido y moverlo bajo la organización de mysqljs
  Más rápido / mejor rendimiento
  Declaraciones preparadas
  Protocolo de registro binario de MySQL
  Servidor MySQL
  Soporte extendido para Codificación y Cotejo
  Envoltorio de promesa
  Compresión
  SSL y conmutador de autenticación
  Flujos personalizados
  puesta en común,
- uuid v9.0.0: es un identificador único; personalmente lo uso para generar cadenas aleatorias y criptográficamente seguras,
- swagger-jsdoc v6.2.7,
- swagger-ui-express v4.6.0: Swagger es un conjunto de herramientas de software de código abierto para diseñar, construir, documentar, y utilizar servicios web RESTful. Fue desarrollado por SmartBear Software e incluye documentación automatizada, generación de código, y generación de casos de prueba,

## Código de conducta

---

El código de conducta establece las normas sociales, reglas y responsabilidades que los individuos y organizaciones deben seguir al interactuar de alguna manera con la herramienta digital o su comunidad. Es una buena práctica para crear un ambiente de respeto e inclusión en las contribuciones al proyecto.

La plataforma Github premia y ayuda a los repositorios dispongan de este archivo. Al crear CODE_OF_CONDUCT.md puedes empezar desde una plantilla sugerida por ellos. Puedes leer más sobre cómo crear un archivo de Código de Conducta (aquí)[https://help.github.com/articles/adding-a-code-of-conduct-to-your-project/]

## Autor/es

---

Ing. Heriberto Alejandro Pozo Castro (Desarrollador del proyecto)

## Licencia

---

Si desconoces qué tipos de licencias existen y cuál es la mejor para cada caso, te recomendamos visitar la página https://choosealicense.com/.
