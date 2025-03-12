import React, { useContext, useState } from "react";
import "./Settings.css";
import { BiEdit, BiLock, BiMoon, BiSun, BiBell, BiTrash } from "react-icons/bi";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const { user, deleteAccount } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleDelete = async () => {
    await deleteAccount();
    navigate("/")
};

  return (
    <div className={`settings-container ${darkMode ? "dark-mode" : ""}`}>
      {/* Profile Section */}
      <div className="profile-section">
        <img src={require("../../assets/image/avatar.png")} alt="User Avatar" className="avatar" />
        <div>
          <h3>{user && user.role === "admin" && user.name}</h3>
          <p>{user && user.email}</p>
        </div>
        <button className="edit-btn" onClick={() => navigate("/profile")}>
          <BiEdit /> Edit Profile
        </button>
      </div>

      {/* Account Settings */}
      <div className="settings-section">
        <h4>Account Settings</h4>
        <div className="setting-item">
          <BiLock className="icon" />
          <span>Change Password</span>
        </div>
        <div className="setting-item">
          <BiBell className="icon" />
          <span>Two-Factor Authentication</span>
        </div>
        <div className="setting-item delete" onClick={handleDelete}>
          <BiTrash className="icon" />
          <span>Delete Account</span>
        </div>
      </div>

      {/* Preferences */}
      <div className="settings-section">
        <h4>Preferences</h4>
        <div className="setting-item" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <BiSun className="icon" /> : <BiMoon className="icon" />}
          <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </div>
        <div className="setting-item" onClick={() => setNotifications(!notifications)}>
          <BiBell className="icon" />
          <span>{notifications ? "Disable Notifications" : "Enable Notifications"}</span>
        </div>
      </div>
    </div>
  );
};

export default Settings;
