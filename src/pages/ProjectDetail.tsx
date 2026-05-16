import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import api from "../api/axios"
import Sidebar from "../components/Sidebar"

export default function ProjectDetail() {
  const { id } = useParams()
  const [project, setProject] = useState<any>(null)
  const [members, setMembers] = useState<any[]>([])
  const [activities, setActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [newTask, setNewTask] = useState("")
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteRole, setInviteRole] = useState("")

  const fetchData = async () => {
    try {
      const projectRes = await api.get(`/projects/${id}`)
      const membersRes = await api.get(`/projects/${id}/members`)
      const activitiesRes = await api.get(`/projects/${id}/activity`)
      setProject(projectRes.data)
      setMembers(membersRes.data)
      setActivities(activitiesRes.data)
      setLoading(false)
    } catch (err: any) {
      console.error(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  const handleCompleteTask = async (taskId: number) => {
    try {
      await api.patch(`/tasks/${taskId}`)
      const projectRes = await api.get(`/projects/${id}`)
      setProject(projectRes.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleAddTask = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTask.trim()) {
      try {
        await api.post("/tasks", { title: newTask, projectId: Number(id) })
        setNewTask("")
        const projectRes = await api.get(`/projects/${id}`)
        setProject(projectRes.data)
      } catch (err) {
        console.error(err)
      }
    }
  }

  const handleInviteMember = async () => {
    try {
      const userRes = await api.get("/user/profile")
      await api.post(`/projects/${id}/members`, {
        userId: userRes.data.id,
        role: inviteRole || "Member"
      })
      setInviteRole("")
      setShowInviteModal(false)
      const membersRes = await api.get(`/projects/${id}/members`)
      setMembers(membersRes.data)
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div className="flex h-screen items-center justify-center bg-background-dark text-white">Loading...</div>
  if (!project) return <div className="flex h-screen items-center justify-center bg-background-dark text-white">Project not found</div>

  const total = project.tasks?.length || 0
  const completed = project.tasks?.filter((t: any) => t.completed).length || 0
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-background-dark text-slate-100">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-y-auto">
        <main className="flex-1 p-6 md:p-8 lg:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <h1 className="text-white text-3xl font-black">{project.name}</h1>
                <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase">In Progress</div>
              </div>
              <p className="text-slate-400">{project.description}</p>
            </div>
            <button
              onClick={() => document.getElementById("new-task-input")?.focus()}
              className="flex h-10 items-center justify-center rounded-lg px-5 bg-primary text-white text-sm font-bold hover:bg-primary/90">
              <span className="material-symbols-outlined mr-2">add</span> New Task
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-slate-100">Tasks</h3>
                <span className="text-sm text-slate-400">{total} total tasks</span>
              </div>
              <div className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
                {project.tasks?.map((task: any) => (
                  <div key={task.id} className="flex items-center p-4 border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleCompleteTask(task.id)}
                      className="w-5 h-5 rounded border-slate-700 text-primary bg-transparent cursor-pointer"
                    />
                    <div className="flex-1 ml-4">
                      <p className={`text-sm font-semibold ${task.completed ? "line-through text-slate-400" : "text-slate-100"}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1 text-slate-500 text-xs">
                          <span className="material-symbols-outlined text-sm">calendar_today</span>
                          {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No date"}
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary uppercase border border-primary/20">
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="p-4 bg-slate-800/20">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400">add_task</span>
                    <input
                      id="new-task-input"
                      className="w-full bg-transparent border-none focus:ring-0 text-sm placeholder:text-slate-500 text-slate-100 outline-none"
                      placeholder="Add a new task... (press Enter)"
                      type="text"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      onKeyDown={handleAddTask}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">Team Members</h3>
                  <button onClick={() => setShowInviteModal(true)} className="text-primary hover:text-primary/80 transition-colors">
                    <span className="material-symbols-outlined text-xl">person_add</span>
                  </button>
                </div>
                <div className="space-y-4">
                  {members.length > 0 ? members.map((member: any) => (
                    <div key={member.id} className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                        {member.user?.name?.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-100">{member.user?.name}</p>
                        <p className="text-xs text-slate-500">{member.role}</p>
                      </div>
                      <div className="size-2 rounded-full bg-emerald-500"></div>
                    </div>
                  )) : <p className="text-sm text-slate-500">No members yet</p>}
                </div>
                <button
                  onClick={() => setShowInviteModal(true)}
                  className="w-full mt-6 py-2 rounded-lg border border-dashed border-slate-700 text-slate-400 text-sm font-medium hover:border-primary hover:text-primary transition-all">
                  Invite Member
                </button>
              </div>

              <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-6">
                <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {activities.length > 0 ? activities.map((activity: any) => (
                    <div key={activity.id} className="relative pl-8">
                      <div className="absolute left-0 top-1 size-[24px] rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[14px]">info</span>
                      </div>
                      <p className="text-xs text-slate-100"><span className="font-bold">{activity.user?.name}</span> {activity.action}</p>
                      <p className="text-[10px] text-slate-500 mt-1">{new Date(activity.createdAt).toLocaleDateString()}</p>
                    </div>
                  )) : <p className="text-sm text-slate-500">No activity yet</p>}
                </div>
              </div>

              <div className="bg-primary/5 rounded-xl border border-primary/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-100">Project Health</h3>
                  <span className="material-symbols-outlined text-primary">analytics</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400">Completion</span>
                  <span className="text-xs font-bold text-primary">{progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                {project.deadline && (
                  <div className="pt-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-rose-500 text-sm">event</span>
                    <p className="text-xs text-slate-400">Deadline: <span className="font-bold text-slate-100">{new Date(project.deadline).toLocaleDateString()}</span></p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {showInviteModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-bold text-white mb-4">Invite Member</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Role</label>
                <input
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. Developer, Designer"
                  type="text"
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                />
              </div>
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 py-2 rounded-lg border border-slate-700 text-slate-400 text-sm font-medium hover:border-slate-500 transition-all">
                  Cancel
                </button>
                <button
                  onClick={handleInviteMember}
                  className="flex-1 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all">
                  Invite
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}