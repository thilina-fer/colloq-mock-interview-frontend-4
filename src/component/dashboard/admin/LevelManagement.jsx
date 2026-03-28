import React, { useState, useEffect } from "react";
import { colors } from "../../../theme/colors";
import { LevelService } from "../../../services/LevelService";
import toast from "react-hot-toast";

// Icons
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const LevelManagement = () => {
  const [levels, setLevels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // 💡 Selector එකට අවශ්‍ය options
  const levelOptions = ["INTERN", "ASSOCIATE", "SENIOR", "EXPERT", "LEAD"];

  const [formData, setFormData] = useState({
    name: "",
    sessionDuration: "",
    price: "",
    status: "ACTIVE",
  });

  const fetchLevels = async () => {
    try {
      const response = await LevelService.getAllLevels();
      setLevels(response.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch levels");
    }
  };

  useEffect(() => {
    fetchLevels();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading(editMode ? "Updating..." : "Saving...");

    try {
      const payload = {
        ...formData,
        sessionDuration: parseInt(formData.sessionDuration),
        price: parseFloat(formData.price),
      };

      if (editMode) {
        await LevelService.updateLevel(selectedId, payload);
        toast.success("Level updated!", { id: loadingToast });
      } else {
        await LevelService.saveLevel(payload);
        toast.success("Level created!", { id: loadingToast });
      }

      resetForm();
      fetchLevels();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed", {
        id: loadingToast,
      });
    }
  };

  const handleEditClick = (level) => {
    setEditMode(true);
    setSelectedId(level.levelId);
    setFormData({
      name: level.name,
      sessionDuration: level.sessionDuration,
      price: level.price,
      status: level.status,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this level?")) {
      try {
        await LevelService.deleteLevel(id);
        toast.success("Level deleted");
        fetchLevels();
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: "", sessionDuration: "", price: "", status: "ACTIVE" });
    setIsModalOpen(false);
    setEditMode(false);
    setSelectedId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-black text-white uppercase tracking-widest">
          Session <span className="text-orange-500">Tiers</span>
        </h2>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-orange-600/10"
        >
          <AddIcon sx={{ fontSize: 18, mr: 1 }} /> Add New Tier
        </button>
      </div>

      {/* Levels Table */}
      <div
        className="border rounded-2xl overflow-hidden"
        style={{ backgroundColor: colors.surface, borderColor: colors.border }}
      >
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/5">
            <tr>
              <th className="p-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                Tier Name
              </th>
              <th className="p-4 text-[10px] font-black uppercase text-gray-400 text-center tracking-widest">
                Duration
              </th>
              <th className="p-4 text-[10px] font-black uppercase text-gray-400 text-center tracking-widest">
                Price
              </th>
              <th className="p-4 text-[10px] font-black uppercase text-gray-400 text-right tracking-widest">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {levels.length > 0 ? (
              levels.map((level) => (
                <tr
                  key={level.levelId}
                  className="hover:bg-white/[0.01] transition-all"
                >
                  <td className="p-4 text-xs font-black text-white uppercase tracking-wider">
                    {level.name}
                  </td>
                  <td className="p-4 text-center text-xs text-gray-400 font-bold">
                    {level.sessionDuration} min
                  </td>
                  <td className="p-4 text-center text-xs text-orange-500 font-black">
                    Rs. {level.price.toLocaleString()}
                  </td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <button
                      onClick={() => handleEditClick(level)}
                      className="p-2 text-gray-500 hover:text-white transition-all hover:bg-white/5 rounded-lg"
                    >
                      <EditIcon sx={{ fontSize: 16 }} />
                    </button>
                    <button
                      onClick={() => handleDelete(level.levelId)}
                      className="p-2 text-red-500/50 hover:text-red-500 transition-all hover:bg-red-500/5 rounded-lg"
                    >
                      <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="p-10 text-center text-[10px] font-black uppercase text-gray-600 tracking-widest italic"
                >
                  No tiers defined yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
          <div
            className="w-full max-w-md border-2 border-orange-500/10 rounded-3xl p-8 shadow-2xl relative animate-in zoom-in duration-300"
            style={{ backgroundColor: colors.surface }}
          >
            <button
              onClick={resetForm}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-all"
            >
              <CloseIcon />
            </button>
            <h3 className="text-center font-black uppercase tracking-[0.2em] text-white mb-8 text-sm">
              {editMode ? "Update" : "Create"} Session{" "}
              <span className="text-orange-500">Tier</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* 💡 LEVEL SELECTOR */}
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 ml-1">
                  Select Tier Level
                </label>
                <select
                  required
                  className="w-full bg-black border border-white/10 rounded-xl p-4 text-xs font-bold text-white outline-none focus:border-orange-500 transition-all appearance-none cursor-pointer"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    backgroundSize: "1em",
                  }}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Choose a level...
                  </option>
                  {levelOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-zinc-900">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 ml-1">
                    Duration (Min)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 45"
                    required
                    className="w-full bg-black border border-white/10 rounded-xl p-4 text-xs font-bold text-white focus:border-orange-500 outline-none transition-all"
                    value={formData.sessionDuration}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sessionDuration: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 ml-1">
                    Price (LKR)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 1500"
                    required
                    className="w-full bg-black border border-white/10 rounded-xl p-4 text-xs font-bold text-white focus:border-orange-500 outline-none transition-all"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 mt-4 bg-orange-600 hover:bg-orange-700 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-xl transition-all shadow-lg shadow-orange-600/20"
              >
                {editMode ? "Update Tier Details" : "Save Session Tier"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LevelManagement;
