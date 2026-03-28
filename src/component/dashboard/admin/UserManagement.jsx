// src/component/dashboard/admin/UserManagement.jsx
import React, { useState, useEffect } from "react";
import { colors } from "../../../theme/colors";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // 1. Fetch Users from Backend
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8080/api/v1/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 2. Handle Form Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Submit New Admin
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8080/api/v1/admin/add-admin",
        { ...formData, role: "ADMIN" },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setIsModalOpen(false);
      setFormData({ username: "", email: "", password: "" });
      fetchUsers(); // Table එක refresh කරනවා
      alert("New Admin Added Successfully!");
    } catch (err) {
      alert("Error adding admin: " + err.response?.data || err.message);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-3">
            <PeopleIcon className="text-orange-500" /> USER MANAGEMENT
          </h2>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">
            Maintain and monitor all platform entities
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all shadow-lg shadow-orange-900/20"
        >
          <PersonAddIcon sx={{ fontSize: 16 }} /> Add New Admin
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-black/20 border border-white/5 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/5">
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                User Details
              </th>
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Role
              </th>
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Status
              </th>
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map((user) => (
              <tr
                key={user.authId}
                className="hover:bg-white/[0.02] transition-colors group"
              >
                <td className="p-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-200">
                      {user.username}
                    </span>
                    <span className="text-[10px] text-gray-500 lowercase">
                      {user.email}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-[9px] font-black tracking-widest uppercase ${
                      user.role === "ADMIN"
                        ? "bg-red-500/10 text-red-500 border border-red-500/20"
                        : user.role === "INTERVIEWER"
                          ? "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                          : "bg-green-500/10 text-green-500 border border-green-500/20"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-4">
                  <span className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                    {user.status || "ACTIVE"}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-[9px] font-black text-gray-600 hover:text-white uppercase tracking-widest transition-colors">
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Admin Popup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-[#121212] border border-white/10 rounded-2xl p-8 relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <CloseIcon />
            </button>

            <div className="mb-8">
              <h3 className="text-xl font-black text-white uppercase tracking-tighter">
                Initialize <span className="text-orange-500">Admin</span>
              </h3>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">
                Grant administrative privileges
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  Username
                </label>
                <input
                  required
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-orange-500 focus:outline-none transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-orange-500 focus:outline-none transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  Temporary Password
                </label>
                <input
                  required
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-orange-500 focus:outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white text-[10px] font-black uppercase tracking-widest rounded-lg mt-6 transition-all"
              >
                Finalize Registration
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
