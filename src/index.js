const express = require("express");

const router = express.Router();

const { postToDo, getToDo, editToDo, deleteToDo, editCheck } = require("./controllers");

router.post("/toDo", postToDo);
router.get("/toDo", getToDo);
router.patch("/toDo/:id", editToDo);
router.patch("/toDoCheck/:id", editCheck);
router.delete("/toDo/:id", deleteToDo);

module.exports = router;
