const express = require("express");
const router = express.Router();
const userService = require("./user.service");

// routes

/**
 * @swagger
 * tags:
 *  name: userauth
 *  description: This is for the main data
 * /users/authenticate:
 *  post:
 *      tags: [userauth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                              default: ammarganja
 *                          password:
 *                              type: string
 *                              default: Ammar@123
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.post("/authenticate", authenticate);

/**
 * @swagger
 * tags:
 *  name: userauth
 *  description: This is for the main data
 * /users/register:
 *  post:
 *      tags: [userauth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          firstName:
 *                              type: string
 *                              default: ammar
 *                          lastName:
 *                              type: string
 *                              default: ganja
 *                          username:
 *                              type: string
 *                              default: ammarganja
 *                          password:
 *                              type: string
 *                              default: Ammar@123
 *      responses:
 *          default:
 *              description: This is the default response for it
 */

router.post("/register", register);

/**
 * @swagger
 * tags:
 *  name: userauth
 *  description: This is for the main data
 * /users:
 *  get:
 *      tags: [userauth]
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get("/", getAll);

/**
 * @swagger
 * tags:
 *  name: userauth
 *  description: This is for the main data
 * /users/current:
 *  get:
 *      tags: [userauth]
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get("/current", getCurrent);

/**
 * @swagger
 * tags:
 *  name: userauth
 *  description: This is for the main data
 * /users/{:id}:
 *  get:
 *      tags: [userauth]
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get("/:id", getById);

/**
 * @swagger
 * tags:
 *  name: userauth
 *  description: This is for the main data
 * /users/{:id}:
 *  put:
 *      tags: [userauth]
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.put("/:id", update);

/**
 * @swagger
 * tags:
 *  name: userauth
 *  description: This is for the main data
 * /users/{id}:
 *  delete:
 *      tags: [userauth]
 *      content:
 *              parameters:
 *                          -name: id
 *                          in: path
 *                          required: true
 *                          schema:
 *                          type : integer
 *                          format: int64
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.delete("/:id", _delete);

module.exports = router;

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then((user) =>
      user
        ? res.json(user)
        : res.status(400).json({ message: "Username or password is incorrect" })
    )
    .catch((err) => next(err));
}

function register(req, res, next) {
  userService
    .create(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  userService
    .getAll()
    .then((users) => res.json(users))
    .catch((err) => next(err));
}

function getCurrent(req, res, next) {
  userService
    .getById(req.user.sub)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function getById(req, res, next) {
  userService
    .getById(req.params.id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function update(req, res, next) {
  userService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  userService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}
