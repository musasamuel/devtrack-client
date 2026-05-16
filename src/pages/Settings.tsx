import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Sidebar from "../components/Sidebar"

export default function Settings() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background-dark text-slate-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-background-dark">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <header className="mb-10">
            <h2 className="text-3xl font-black tracking-tight text-white mb-2">User Settings</h2>
            <p className="text-slate-400">View and manage your core profile information.</p>
          </header>

          <section className="mb-8">
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
              <div className="p-6 flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center border-4 border-slate-800">
                  <span className="material-symbols-outlined text-primary text-5xl">person</span>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-white">{user?.name}</h3>
                  <p className="text-slate-400 mb-4">{user?.email}</p>
                  <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
                    Edit Profile
                  </button>
                </div>
              </div>

              <div className="border-t border-slate-800">
                <div className="divide-y divide-slate-800">
                  <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-sm font-medium text-slate-400">Full Name</span>
                    <span className="text-sm font-semibold text-slate-100">{user?.name || "Not set"}</span>
                  </div>
                  <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-sm font-medium text-slate-400">Email Address</span>
                    <span className="text-sm font-semibold text-slate-100">{user?.email}</span>
                  </div>
                  <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-sm font-medium text-slate-400">Account Type</span>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-lg">verified_user</span>
                      <span className="text-sm font-semibold text-slate-100">Administrator</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <footer className="mt-12 flex flex-col items-center">
            <button
              onClick={handleLogout}
              className="w-full md:w-auto min-w-[200px] flex items-center justify-center gap-2 px-8 py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-xl font-bold transition-all duration-200">
              <span className="material-symbols-outlined">logout</span>
              <span>Sign Out of DevTrack Pro</span>
            </button>
            <p className="mt-4 text-xs text-slate-600 text-center">
              Version 1.0.0 (Stable Build) • © 2024 DevTrack Pro
            </p>
          </footer>
        </div>
      </main>
    </div>
  )
}