import { useEffect, useState } from "react"
import API from "../api/axios"
import Navbar from "../components/Navbar"
import UserForm from "../components/UserForm"
import UserList from "../components/UserList"

function Dashboard() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [editingUser, setEditingUser] = useState(null)

  const fetchUsers = async () => {
    try {
      setLoading(true)

      const { data } = await API.get("/users")

      setUsers(data)
      setError("")
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleEdit = (user) => {
    setEditingUser(user)

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    )

    if (!confirmDelete) return

    try {
      await API.delete(`/users/${id}`)

      if (editingUser?._id === id) {
        setEditingUser(null)
      }

      fetchUsers()
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            User Management
          </h1>

          <p className="mt-2 text-gray-500">
            Create, view, update and delete users.
          </p>
        </div>

        <UserForm
          fetchUsers={fetchUsers}
          editingUser={editingUser}
          setEditingUser={setEditingUser}
        />

        {loading && (
          <div className="mt-8 rounded-xl bg-white p-8 text-center shadow">
            <p>Loading users...</p>
          </div>
        )}

        {error && (
          <div className="mt-8 rounded-xl bg-red-100 p-4 text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && users.length === 0 && (
          <div className="mt-8 rounded-xl bg-white p-8 text-center shadow">
            <h2 className="text-xl font-semibold">
              No users found
            </h2>

            <p className="mt-2 text-gray-500">
              Create your first user.
            </p>
          </div>
        )}

        {!loading && !error && users.length > 0 && (
          <>
            <div className="mt-8 mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                Users
              </h2>

              <span className="rounded-full bg-blue-100 px-4 py-2 text-blue-600 font-semibold">
                {users.length} Users
              </span>
            </div>

            <UserList
              users={users}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default Dashboard