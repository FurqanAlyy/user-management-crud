const express = require("express")

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require("../controllers/userController")

const { protect } = require("../middlewares/authMiddleware")

const router = express.Router()

router.use(protect)

router.route("/")
  .get(getUsers)
  .post(createUser)

router.route("/:id")
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser)

module.exports = router