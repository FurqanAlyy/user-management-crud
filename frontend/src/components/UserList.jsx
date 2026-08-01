function UserList({ users, onEdit, onDelete }) {
  return (
    <div className="mt-8 overflow-x-auto rounded-2xl bg-white shadow">
      <table className="min-w-full">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Email</th>
            <th className="px-6 py-4 text-left">Date of Birth</th>
            <th className="px-6 py-4 text-left">CNIC</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className="border-b hover:bg-gray-50"
            >
              <td className="px-6 py-4">
                {user.name}
              </td>

              <td className="px-6 py-4">
                {user.email}
              </td>

              <td className="px-6 py-4">
                {new Date(user.dateOfBirth).toLocaleDateString()}
              </td>

              <td className="px-6 py-4">
                {user.cnic}
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => onEdit(user)}
                    className="rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(user._id)}
                    className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList