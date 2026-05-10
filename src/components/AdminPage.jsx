import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import "../styles/Admin.css";

const MEMBERS_DEFAULT = [
  {
    id: "blackomega",
    name: "ÐX¹_BlackOmega",
    rank: "Clan Leader",
    gameRank: "Legendary",
    playStyle: "Hybrid Player",
    weapon: "XM4",
  },
  {
    id: "letoxzy",
    name: "ÐX¹_Letoxzy",
    rank: "Co-Leader",
    gameRank: "Legendary",
    playStyle: "Hybrid Player",
    weapon: "BY15",
  },
  {
    id: "loki",
    name: "ÐX¹_Loki",
    rank: "Elite Member",
    gameRank: "Legendary",
    playStyle: "BR Only",
    weapon: "AK117",
  },
  {
    id: "asiko",
    name: "ÐX¹_Asiko",
    rank: "Member",
    gameRank: "Legendary",
    playStyle: "Hybrid Player",
    weapon: "KRM",
  },
  {
    id: "chief",
    name: "ÐX¹_CHIEF",
    rank: "Member",
    gameRank: "Grandmaster",
    playStyle: "BR Only",
    weapon: "Fennec",
  },
  {
    id: "theduke",
    name: "ÐX¹_THE_DUKE",
    rank: "Member",
    gameRank: "Pro",
    playStyle: "Hybrid Player",
    weapon: "Groza",
  },
  {
    id: "palmer",
    name: "ÐX¹_Palmer",
    rank: "Member",
    gameRank: "Pro",
    playStyle: "Hybrid Player",
    weapon: "HVK-30",
  },
  {
    id: "lynx",
    name: "ÐX¹_Lynx",
    rank: "Member",
    gameRank: "Master",
    playStyle: "Hybrid Player",
    weapon: "BY15",
  },
];

const RANK_OPTIONS = [
  "Legendary",
  "Grandmaster",
  "Master",
  "Pro",
  "Platinum",
  "Diamond",
];
const PLAYSTYLE_OPTIONS = ["Hybrid Player", "MP Only", "BR Only"];
const RANK_ROLE_OPTIONS = [
  "Clan Leader",
  "Co-Leader",
  "Elite Member",
  "Member",
];

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const [uploadEnabled, setUploadEnabled] = useState(true);
  const [members, setMembers] = useState(MEMBERS_DEFAULT);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [newMember, setNewMember] = useState({
    id: "",
    name: "",
    rank: "Member",
    gameRank: "Master",
    playStyle: "Hybrid Player",
    weapon: "",
    bio: "",
  });

  // Auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // Load settings from Firestore
  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const settingsSnap = await getDoc(doc(db, "clan", "settings"));
      if (settingsSnap.exists()) {
        setUploadEnabled(settingsSnap.data().uploadEnabled ?? true);
      }
      const membersSnap = await getDoc(doc(db, "clan", "memberList"));
      if (membersSnap.exists()) {
        setMembers(membersSnap.data().list ?? MEMBERS_DEFAULT);
      }
    };
    load();
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setLoginError("Wrong email or password. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => signOut(auth);

  const toggleUpload = async () => {
    const newVal = !uploadEnabled;
    setUploadEnabled(newVal);
    await setDoc(
      doc(db, "clan", "settings"),
      { uploadEnabled: newVal },
      { merge: true },
    );
  };

  const updateMember = (id, field, value) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)),
    );
  };

  const removeMember = (id) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const addMember = () => {
    if (!newMember.id || !newMember.name) return;
    setMembers((prev) => [...prev, { ...newMember }]);
    setNewMember({
      id: "",
      name: "",
      rank: "Member",
      gameRank: "Master",
      playStyle: "Hybrid Player",
      weapon: "",
      bio: "",
    });
  };

  const saveAll = async () => {
    setSaving(true);
    await setDoc(doc(db, "clan", "memberList"), { list: members });
    await setDoc(
      doc(db, "clan", "settings"),
      { uploadEnabled },
      { merge: true },
    );
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  // LOGIN SCREEN
  if (!user) {
    return (
      <div className="admin-login-wrap">
        <div className="admin-login-box">
          <div className="admin-login-logo">
            <img src="/assets/logo.png" alt="DarkEmpire Logo" />
          </div>
          <h1 className="admin-login-title">DARKEMPIRE</h1>
          <p className="admin-login-sub">Admin Access Only</p>

          <form onSubmit={handleLogin} className="admin-login-form">
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="admin-input"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input"
              required
            />
            {loginError && <p className="admin-error">{loginError}</p>}
            <button
              type="submit"
              className="admin-btn-login"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="de-upload-spinner" /> Signing in...
                </>
              ) : (
                "🔐 Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ADMIN DASHBOARD
  return (
    <div className="admin-wrap">
      <div className="admin-header">
        <div className="admin-header-left">
          <img
            src="/assets/logo.png"
            alt="logo"
            className="admin-header-logo-img"
          />
          <div>
            <h1 className="admin-header-title">DarkEmpire Admin</h1>
            <p className="admin-header-email">{user.email}</p>
          </div>
        </div>
        <button className="admin-btn-logout" onClick={handleLogout}>
          Sign Out
        </button>
      </div>

      <div className="admin-body">
        {/* UPLOAD TOGGLE */}
        <div className="admin-card">
          <h2 className="admin-card-title">📸 Profile Photo Upload</h2>
          <p className="admin-card-desc">
            Control whether members can upload or change their profile photos.
          </p>
          <div className="admin-toggle-row">
            <span
              className={`admin-toggle-label ${uploadEnabled ? "on" : "off"}`}
            >
              {uploadEnabled ? "✅ Upload Enabled" : "🔴 Upload Disabled"}
            </span>
            <button
              className={`admin-toggle ${uploadEnabled ? "active" : ""}`}
              onClick={toggleUpload}
            >
              <span className="admin-toggle-thumb" />
            </button>
          </div>
        </div>

        {/* ADD NEW MEMBER */}
        <div className="admin-card">
          <h2 className="admin-card-title">➕ Add New Member</h2>
          <div className="admin-new-member-grid">
            <input
              className="admin-input"
              placeholder="ID (e.g. newplayer)"
              value={newMember.id}
              onChange={(e) =>
                setNewMember((p) => ({
                  ...p,
                  id: e.target.value.toLowerCase().replace(/\s/g, ""),
                }))
              }
            />
            <input
              className="admin-input"
              placeholder="In-game name"
              value={newMember.name}
              onChange={(e) =>
                setNewMember((p) => ({ ...p, name: e.target.value }))
              }
            />
            <input
              className="admin-input"
              placeholder="Best Weapon"
              value={newMember.weapon}
              onChange={(e) =>
                setNewMember((p) => ({ ...p, weapon: e.target.value }))
              }
            />
            <input
              className="admin-input"
              placeholder="Bio"
              value={newMember.bio}
              onChange={(e) =>
                setNewMember((p) => ({ ...p, bio: e.target.value }))
              }
            />
            <select
              className="admin-select"
              value={newMember.rank}
              onChange={(e) =>
                setNewMember((p) => ({ ...p, rank: e.target.value }))
              }
            >
              {RANK_ROLE_OPTIONS.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
            <select
              className="admin-select"
              value={newMember.gameRank}
              onChange={(e) =>
                setNewMember((p) => ({ ...p, gameRank: e.target.value }))
              }
            >
              {RANK_OPTIONS.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
            <select
              className="admin-select"
              value={newMember.playStyle}
              onChange={(e) =>
                setNewMember((p) => ({ ...p, playStyle: e.target.value }))
              }
            >
              {PLAYSTYLE_OPTIONS.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
            <button className="admin-btn-add" onClick={addMember}>
              ➕ Add Member
            </button>
          </div>
        </div>

        {/* MEMBERS LIST */}
        <div className="admin-card">
          <h2 className="admin-card-title">👥 Manage Members</h2>
          <div className="admin-members-list">
            {members.map((m) => (
              <div className="admin-member-row" key={m.id}>
                <div className="admin-member-id">#{m.id}</div>
                <input
                  className="admin-input sm"
                  value={m.name}
                  onChange={(e) => updateMember(m.id, "name", e.target.value)}
                  placeholder="Name"
                />
                <select
                  className="admin-select sm"
                  value={m.rank}
                  onChange={(e) => updateMember(m.id, "rank", e.target.value)}
                >
                  {RANK_ROLE_OPTIONS.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
                <select
                  className="admin-select sm"
                  value={m.gameRank}
                  onChange={(e) =>
                    updateMember(m.id, "gameRank", e.target.value)
                  }
                >
                  {RANK_OPTIONS.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
                <select
                  className="admin-select sm"
                  value={m.playStyle}
                  onChange={(e) =>
                    updateMember(m.id, "playStyle", e.target.value)
                  }
                >
                  {PLAYSTYLE_OPTIONS.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
                <input
                  className="admin-input sm"
                  value={m.weapon}
                  onChange={(e) => updateMember(m.id, "weapon", e.target.value)}
                  placeholder="Weapon"
                />
                <button
                  className="admin-btn-remove"
                  onClick={() => removeMember(m.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SAVE BUTTON */}
        <button
          className={`admin-btn-save ${saved ? "saved" : ""}`}
          onClick={saveAll}
          disabled={saving}
        >
          {saving ? (
            <>
              <span className="de-upload-spinner" /> Saving...
            </>
          ) : saved ? (
            "✅ Saved!"
          ) : (
            "💾 Save All Changes"
          )}
        </button>
      </div>
    </div>
  );
}
