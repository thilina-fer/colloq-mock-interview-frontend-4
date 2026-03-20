import React, { useState, useEffect } from "react";
import { colors } from "../../../theme/color";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const CandidateAccount = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [editFormData, setEditFormData] = useState({
    name: "",
    bio: "",
    github: "",
    linkedin: "",
  });

  useEffect(() => {
    if (user) {
      setEditFormData({
        name: user.name || "",
        bio: user.bio || "",
        github: user.github || "",
        linkedin: user.linkedin || "",
      });
    }
  }, [user, isEditing]);

  const handleSave = (e) => {
    e.preventDefault();

    const updatedUser = { ...user, ...editFormData };

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    setUser(updatedUser);

    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("currentUser");
      window.location.href = "/login"; 
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {!isEditing ? (
        /* --- View Mode --- */
        <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm animate-fadeSlideUp">
          <h3
            className="text-xl font-bold mb-8"
            style={{ color: colors.black }}
          >
            Account Settings
          </h3>
          <div className="space-y-4">
            <button
              onClick={() => setIsEditing(true)}
              className="w-full flex items-center justify-between p-5 rounded-xl border border-gray-100 hover:border-orange-500 hover:bg-orange-50 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-orange-100 group-hover:text-orange-500">
                  <EditIcon />
                </div>
                <div className="text-left">
                  <span className="font-bold text-gray-700 block">
                    Edit Profile Details
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    Update your bio and social links
                  </span>
                </div>
              </div>
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-5 rounded-xl border border-red-50 hover:bg-red-50 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
                  <LogoutIcon />
                </div>
                <div className="text-left">
                  <span className="font-bold text-red-600 block">
                    Logout from ColloQ
                  </span>
                  <span className="text-xs text-red-400 font-medium">
                    Sign out from your account safely
                  </span>
                </div>
              </div>
            </button>
          </div>
        </div>
      ) : (
        /* --- Edit Mode --- */
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-md animate-fadeSlideUp">
          <div className="flex items-center gap-3 mb-8">
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowBackIcon sx={{ fontSize: 20 }} />
            </button>
            <h3 className="text-xl font-bold">Edit Your Profile</h3>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 block ml-1">
                Full Name
              </label>
              <input
                required
                type="text"
                value={editFormData.name}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-orange-500 font-medium text-sm"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 block ml-1">
                Bio
              </label>
              <textarea
                rows="3"
                value={editFormData.bio}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, bio: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-orange-500 font-medium text-sm resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <GitHubIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
                  sx={{ fontSize: 18 }}
                />
                <input
                  type="text"
                  value={editFormData.github}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, github: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-orange-500 font-medium text-sm"
                  placeholder="github.com/username"
                />
              </div>
              <div className="relative">
                <LinkedInIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
                  sx={{ fontSize: 18 }}
                />
                <input
                  type="text"
                  value={editFormData.linkedin}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      linkedin: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-orange-500 font-medium text-sm"
                  placeholder="linkedin.com/in/username"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 py-3 rounded-lg font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:translate-y-[-2px] active:scale-95"
                style={{ backgroundColor: colors.primary }}
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 rounded-lg font-bold text-gray-500 bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CandidateAccount;
