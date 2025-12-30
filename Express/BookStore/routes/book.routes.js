const express = require('express')
const router = express.Router();
const controllers = require('../controllers/book.controllers')

const { customMiddleware } = require('../middlewares/customMiddle')

router.get("/", controllers.getAllBooks)

router.get("/:id", customMiddleware, controllers.getBooksByID)

router.post("/", controllers.enterBook)

router.delete("/:id", controllers.deleteBookByID)

module.exports = router;