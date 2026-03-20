import React, { useState } from "react";
import { colors } from "../../../theme/color";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const CandidateAccount = () => {
  const [isEditing, setIsEditing] = useState(false);

  // දැනට තියෙන දත්ත (Initial Data)
  const [profile, setProfile] = useState({
    name: "Thilina Hemantha",
    bio: "Full-stack developer passionate about React and Java. Looking for mock interviews to improve system design skills.",
    github: "github.com/thilina-dev",
    linkedin: "linkedin.com/in/thilina-dev",
  });

  const handleSave = (e) => {
    e.preventDefault();
    // මෙතනදී Backend එකට data යවන්න පුළුවන්
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto animate-contentFade">
      {!isEditing ? (
        /* --- View Mode (කලින් තිබුණු විදිහ) --- */
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
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
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-orange-100 group-hover:text-orange-500 transition-colors">
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

            <button className="w-full flex items-center justify-between p-5 rounded-xl border border-red-50 hover:bg-red-50 transition-all group">
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
        /* --- Edit Mode (අලුතින් එකතු කළ Form එක) --- */
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-md">
          <div className="flex items-center gap-3 mb-8">
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowBackIcon sx={{ fontSize: 20 }} />
            </button>
            <h3 className="text-xl font-bold" style={{ color: colors.black }}>
              Edit Your Profile
            </h3>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block ml-1">
                Full Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5 font-medium"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block ml-1">
                Professional Bio
              </label>
              <textarea
                rows="4"
                value={profile.bio}
                onChange={(e) =>
                  setProfile({ ...profile, bio: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5 font-medium resize-none text-sm leading-relaxed"
              />
            </div>

            {/* Social Links Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block ml-1">
                  GitHub URL
                </label>
                <div className="relative">
                  <GitHubIcon
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                    sx={{ fontSize: 18 }}
                  />
                  <input
                    type="text"
                    value={profile.github}
                    onChange={(e) =>
                      setProfile({ ...profile, github: e.target.value })
                    }
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-500 font-medium text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block ml-1">
                  LinkedIn URL
                </label>
                <div className="relative">
                  <LinkedInIcon
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                    sx={{ fontSize: 18 }}
                  />
                  <input
                    type="text"
                    value={profile.linkedin}
                    onChange={(e) =>
                      setProfile({ ...profile, linkedin: e.target.value })
                    }
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-500 font-medium text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 py-3.5 rounded-xl font-bold text-white shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 transition-all hover:translate-y-[-2px] active:scale-95"
                style={{ backgroundColor: colors.primary }}
              >
                <SaveIcon sx={{ fontSize: 18 }} />
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-3.5 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all active:scale-95"
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
