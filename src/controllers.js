const { toDo } = require("../models");

exports.postToDo = async (req, res) => {
  try {
    const data = {...req.body, checkList: false}

    console.log(data);
    const createToDo = await toDo.create(data);

    const checktoDo = await toDo.findOne({
      where: {
        id: createToDo.id,
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    res.send({
      status: "success",
      data: checktoDo,
      message: "To Do success created",
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.getToDo = async (req, res) => {
  try {
    const checkToDo = await toDo.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    res.status(200).send({
      status: "success",
      data: checkToDo,
      message: "To Do success created",
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.editToDo = async (req, res) => {
  try {
    const { id } = req.params;

    const checkToDo = await toDo.findOne({
      where: {
        id,
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!checkToDo) {
        res.status(400).send({
            status: "failed",
            message: `To Do with id ${id} not found`,
          });
    }

    await toDo.update(req.body, {
      where: {
        id: checkToDo.id,
      },
    });

    const checkingToDo = await toDo.findOne({
      where: {
        id: checkToDo.id,
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    res.send({
      status: "success",
      data: checkingToDo,
      message: "To Do success edited",
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.deleteToDo = async (req, res) => {
  try {
    const { id } = req.params;

    const checkToDo = await toDo.findOne({
      where: {
        id,
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!checkToDo) {
      return res.status(400).send({
        status: "failed",
        message: `To Do with id ${id} not found`,
      });
    }

    await toDo.destroy({
      where: {
        id,
      },
    });

    res.status(200).send({
      status: "success",
      message: `To Do with id ${checkToDo.id} success deleted`,
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.editCheck = async (req, res) => {
  try {
    const { id } = req.params;

    const checkToDo = await toDo.findOne({
      where: {
        id,
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!checkToDo) {
        res.status(400).send({
            status: "failed",
            message: `To Do with id ${id} not found`,
          });
    }
    console.log(checkToDo);
    if (checkToDo?.checkList === false) {
      await toDo.update({checkList:true}, {
        where: {
          id: checkToDo.id,
        },
      });
    } else if (checkToDo.checkList === true) {
      await toDo.update({checkList:false}, {
        where: {
          id: checkToDo.id,
        },
      });
    }
    const checkingToDo = await toDo.findOne({
      where: {
        id: checkToDo.id,
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    res.send({
      status: "success",
      data: checkingToDo,
      message: "To Do success edited",
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};