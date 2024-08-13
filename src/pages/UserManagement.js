import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    lastName: '',
    email: '',
    password: '',
    isAdmin: false,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://happycarrental-backend.onrender.com/api/user/getUsers');
      setUsers(response.data.map(user => ({ ...user, isEditing: false })));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleUserChange = (index, e) => {
    const { name, value } = e.target;
    const updatedUsers = [...users];
    if (name === 'role') {
      updatedUsers[index].isAdmin = value === 'admin';
    } else {
      updatedUsers[index][name] = value;
    }
    setUsers(updatedUsers);
  };

  const handleSave = async (index) => {
    const user = users[index];
    try {
      await axios.put('https://happycarrental-backend.onrender.com/api/user/adminUpdateProfile', {
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin,
      });
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (email) => {
    try {
      await axios.delete('https://happycarrental-backend.onrender.com/api/user/deleteuser', { data: { email } });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      await axios.post('https://happycarrental-backend.onrender.com/api/user/adduser', newUser);
      fetchUsers();
      setNewUser({
        username: '',
        lastName: '',
        email: '',
        password: '',
        isAdmin: false,
      });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const toggleEditMode = (index) => {
    const updatedUsers = [...users];
    updatedUsers[index].isEditing = !updatedUsers[index].isEditing;
    setUsers(updatedUsers);
  };

  return (
    <div className="text-gray-900 bg-gray-200">
      <h1 className="text-3xl">Users</h1>
      <div className="px-3 py-4 flex justify-center">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <tbody>
            <tr className="border-b">
              <th className="text-left p-3 px-5">Username</th>
              <th className="text-left p-3 px-5">Email</th>
              <th className="text-left p-3 px-5">Role</th>
              <th></th>
            </tr>
            {users.map((user, index) => (
              <tr key={index} className="border-b hover:bg-orange-100 bg-gray-100">
                <td className="p-3 px-5">
                  {user.isEditing ? (
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={(e) => handleUserChange(index, e)}
                      className="bg-transparent border-b-2 border-gray-300 py-2"
                    />
                  ) : (
                    user.username
                  )}
                </td>
                <td className="p-3 px-5">
                  {user.isEditing ? (
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      readOnly
                      className="bg-transparent border-b-2 border-gray-300 py-2"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="p-3 px-5">
                  {user.isEditing ? (
                    <select
                      name="role"
                      value={user.isAdmin ? 'admin' : 'user'}
                      onChange={(e) => handleUserChange(index, e)}
                      className="bg-transparent border-b-2 border-gray-300 py-2"
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  ) : (
                    user.isAdmin ? 'admin' : 'user'
                  )}
                </td>
                <td className="p-3 px-5 flex justify-end">
                  {user.isEditing ? (
                    <>
                      <button
                        type="button"
                        className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleSave(index)}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="mr-3 text-sm bg-gray-500 hover:bg-gray-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => toggleEditMode(index)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="mr-3 text-sm edit-button text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => toggleEditMode(index)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleDelete(user.email)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            <tr className="border-b hover:bg-orange-100 bg-gray-100">
              <td className="p-3 px-5">
                <input
                  type="text"
                  name="username"
                  value={newUser.username}
                  onChange={handleInputChange}
                  placeholder="Username"
                  className="bg-transparent border-b-2 border-gray-300 py-2"
                />
              </td>
              <td className="p-3 px-5">
                <input
                  type="text"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="bg-transparent border-b-2 border-gray-300 py-2"
                />
              </td>
              <td className="p-3 px-5">
                <input
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="bg-transparent border-b-2 border-gray-300 py-2"
                />
              </td>
              <td className="p-3 px-5">
                <select
                  name="role"
                  value={newUser.isAdmin ? 'admin' : 'user'}
                  onChange={(e) => handleInputChange({ target: { name: 'isAdmin', value: e.target.value === 'admin' } })}
                  className="bg-transparent border-b-2 border-gray-300 py-2"
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </td>
              <td className="p-3 px-5 flex justify-end">
                <button
                  type="button"
                  className="mr-3 text-sm edit-button text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleAddUser}
                >
                  Add
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
