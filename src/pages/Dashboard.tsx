import { useState, useEffect } from "react"
import api from "../api/axios"
import { useAuth } from "../context/AuthContext"
import Sidebar from "../components/Sidebar"
import { Link } from "react-router-dom"

export default function Dashboard() {
  const [projects, setProjects] = useState([])
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [projectDeadline, setProjectDeadline] = useState("")

  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects")
      setProjects(response.data)
      setLoading(false)
    } catch (err: any) {
      console.error(err)
      setLoading(false)
    }
  }

const handleCreateProject = async () => {
  if (!projectName.trim()) return
  try {
    console.log("Creating project with name:", projectName)
    await api.post("/projects", {
      name: projectName,
      description: projectDescription,
      deadline: projectDeadline || undefined
    })
    console.log("Project created successfully")
    setProjectName("")
    setProjectDescription("")
    setProjectDeadline("")
    setShowModal(false)
    fetchProjects()
  } catch (err) {
    console.error("Error creating project:", err)
  }
}

  useEffect(() => {
    fetchProjects()
  }, [])

  if (loading) return <div className="flex h-screen items-center justify-center bg-background-dark text-white">Loading...</div>

  return (
    <div className="flex h-screen overflow-hidden bg-background-dark text-white">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">

        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-black text-white">Welcome, {user?.name}</h2>
            <p className="text-slate-400 mt-1">Here's a snapshot of your project performance today.</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">add</span>
            New Project
          </button>
        </div>

        <div className="mb-12">
          <h3 className="text-xl font-bold text-white mb-6">Active Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: any) => {
              const total = project.tasks.length
              const completed = project.tasks.filter((t: any) => t.completed).length
              const progress = total > 0 ? Math.round((completed / total) * 100) : 0
              return (
                <Link key={project.id} to={`/projects/${project.id}`} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-primary/50 transition-all block">
                  <h4 className="text-lg font-bold mb-1">{project.name}</h4>
                  <p className="text-slate-500 text-sm mb-6">{project.description}</p>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-500">Progress</span>
                    <span className="font-bold">{progress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: `${progress}%` }}></div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium pt-4">
                    <span className="material-symbols-outlined text-[16px]">list_alt</span>
                    {total - completed} tasks remaining
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-6">Recent Tasks</h3>
          <div className="bg-slate-800/30 rounded-xl border border-slate-700 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-800/80 border-b border-slate-700">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Task Name</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Project</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Due Date</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {projects.flatMap((project: any) =>
                  project.tasks.map((task: any) => (
                    <tr key={task.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <input type="checkbox" checked={task.completed} readOnly className="rounded border-slate-600 text-primary bg-transparent size-4" />
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-sm font-semibold ${task.completed ? "line-through text-slate-400" : ""}`}>{task.title}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-500">{project.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-500">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No date"}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary">{task.priority}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* New Project Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-bold text-white mb-4">New Project</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Project Name</label>
                <input
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. Website Redesign"
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Description</label>
                <input
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Brief project description"
                  type="text"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Deadline (optional)</label>
                <input
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm outline-none focus:ring-2 focus:ring-primary"
                  type="date"
                  value={projectDeadline}
                  onChange={(e) => setProjectDeadline(e.target.value)}
                />
              </div>
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 rounded-lg border border-slate-700 text-slate-400 text-sm font-medium hover:border-slate-500 transition-all">
                  Cancel
                </button>
                <button
                  onClick={handleCreateProject}
                  className="flex-1 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all">
                  Create Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}