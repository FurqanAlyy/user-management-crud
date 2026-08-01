const User = require("../models/User")
const bcrypt = require("bcryptjs")

const createUser = async (req, res) => {
  try {
    const { name, email, password, dateOfBirth, cnic } = req.body

    if (!name || !email || !password || !dateOfBirth || !cnic) {
      return res.status(400).json({
        message: "All fields are required"
      })
    }

    const emailExists = await User.findOne({ email })

    if (emailExists) {
      return res.status(400).json({
        message: "Email already exists"
      })
    }

    const cnicExists = await User.findOne({ cnic })

    if (cnicExists) {
      return res.status(400).json({
        message: "CNIC already exists"
      })
    }

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      dateOfBirth,
      cnic
    })

    res.status(201).json({
      message: "User created successfully",
      user
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password")

    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password")

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const updateUser = async (req, res) => {
  try {
    const { name, email, password, dateOfBirth, cnic } = req.body

    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email })

      if (emailExists) {
        return res.status(400).json({
          message: "Email already exists"
        })
      }
    }

    if (cnic && cnic !== user.cnic) {
      const cnicExists = await User.findOne({ cnic })

      if (cnicExists) {
        return res.status(400).json({
          message: "CNIC already exists"
        })
      }
    }

    user.name = name || user.name
    user.email = email || user.email
    user.dateOfBirth = dateOfBirth || user.dateOfBirth
    user.cnic = cnic || user.cnic

    if (password) {
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
    }

    const updatedUser = await user.save()

    res.status(200).json({
      message: "User updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        dateOfBirth: updatedUser.dateOfBirth,
        cnic: updatedUser.cnic,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt
      }
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    await user.deleteOne()

    res.status(200).json({
      message: "User deleted successfully"
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
}