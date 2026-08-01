import { useEffect, useState } from "react"
import API from "../api/axios"

function UserForm({
  fetchUsers,
  editingUser,
  setEditingUser
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
    cnic: ""
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (editingUser) {
      setFormData({
        name: editingUser.name,
        email: editingUser.email,
        password: "",
        dateOfBirth: editingUser.dateOfBirth?.split("T")[0],
        cnic: editingUser.cnic
      })
    } else {
      resetForm()
    }
  }, [editingUser])

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      dateOfBirth: "",
      cnic: ""
    })

    setError("")
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "cnic") {
      setFormData({
        ...formData,
        cnic: value.replace(/\D/g, "").slice(0, 13)
      })

      return
    }

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")

    if (
      !formData.name ||
      !formData.email ||
      !formData.dateOfBirth ||
      !formData.cnic
    ) {
      return setError("Please fill in all required fields")
    }

    if (!editingUser && !formData.password) {
      return setError("Password is required")
    }

    if (formData.cnic.length !== 13) {
      return setError("CNIC must be exactly 13 digits")
    }

    setLoading(true)

    try {
      if (editingUser) {
        const payload = { ...formData }

        if (!payload.password) {
          delete payload.password
        }

        await API.put(`/users/${editingUser._id}`, payload)

        setEditingUser(null)
      } else {
        await API.post("/users", formData)
      }

      resetForm()
      fetchUsers()
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        {editingUser ? "Update User" : "Create User"}
      </h2>

      {error && (
        <div className="mb-4 rounded-lg bg-red-100 p-3 text-red-600">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 md:grid-cols-2"
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <input
          type="password"
          name="password"
          placeholder={
            editingUser
              ? "Leave blank to keep current password"
              : "Password"
          }
          value={formData.password}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <input
          type="text"
          name="cnic"
          placeholder="13-digit CNIC"
          value={formData.cnic}
          onChange={handleChange}
          maxLength={13}
          className="rounded-lg border p-3"
        />

        <div className="flex gap-3 md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            {loading
              ? "Saving..."
              : editingUser
              ? "Update User"
              : "Create User"}
          </button>

          {editingUser && (
            <button
              type="button"
              onClick={() => {
                setEditingUser(null)
                resetForm()
              }}
              className="rounded-lg bg-gray-500 px-6 text-white hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default UserForm