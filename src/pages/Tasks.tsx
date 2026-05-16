import { useState, useEffect } from "react"
import api from "../api/axios"
import Sidebar from "../components/Sidebar"

export default function Tasks() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects")
        setProjects(response.data)
        setLoading(false)
      } catch (err) {
        console.error(err)
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const handleCompleteTask = async (taskId: number) => {
    try {
      await api.patch(`/tasks/${taskId}`)
      const response = await api.get("/projects")
      setProjects(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  const allTasks = projects.flatMap((project: any) =>
    project.tasks.map((task: any) => ({ ...task, projectName: project.name }))
  )

  if (loading) return <div className="flex h-screen items-center justify-center bg-background-dark text-white">Loading...</div>

  return (
    <div className="flex h-screen overflow-hidden bg-background-dark text-slate-100">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">Tasks</h2>
              <p className="text-slate-400 mt-1">Manage and track your development progress</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-800/50 border-b border-slate-800">
                    <th className="py-4 px-6 w-12">
                      <input className="rounded border-slate-700 bg-transparent text-primary focus:ring-primary" type="checkbox" />
                    </th>
                    <th className="py-4 px-6 text-sm font-semibold uppercase tracking-wider text-slate-500">Task Name</th>
                    <th className="py-4 px-6 text-sm font-semibold uppercase tracking-wider text-slate-500">Project Name</th>
                    <th className="py-4 px-6 text-sm font-semibold uppercase tracking-wider text-slate-500">Due Date</th>
                    <th className="py-4 px-6 text-sm font-semibold uppercase tracking-wider text-slate-500">Priority</th>
                    <th className="py-4 px-6 text-sm font-semibold uppercase tracking-wider text-slate-500">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {allTasks.length > 0 ? allTasks.map((task: any) => (
                    <tr key={task.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 px-6">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => handleCompleteTask(task.id)}
                          className="rounded border-slate-700 bg-transparent text-primary focus:ring-primary cursor-pointer"
                        />
                      </td>
                      <td className="py-4 px-6">
                        <span className={`font-medium ${task.completed ? "line-through text-slate-400" : "text-slate-100"}`}>
                          {task.title}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-slate-400 text-sm">{task.projectName}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-slate-400 text-sm">
                          {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No date"}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {task.priority === "HIGH" && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-900/30 text-rose-400">HIGH</span>
                        )}
                        {task.priority === "MEDIUM" && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-900/30 text-amber-400">MEDIUM</span>
                        )}
                        {task.priority === "LOW" && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-800 text-slate-400">LOW</span>
                        )}
                        {task.priority === "CRITICAL" && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white">CRITICAL</span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        {task.completed ? (
                          <span className="inline-flex items-center gap-1.5 text-emerald-400 text-sm font-medium">
                            <span className="material-symbols-outlined text-lg">check_circle</span>
                            Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-blue-400 text-sm font-medium">
                            <span className="material-symbols-outlined text-lg">sync</span>
                            In Progress
                          </span>
                        )}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500">No tasks yet. Create a project and add tasks.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between text-sm text-slate-500">
              <p>Showing {allTasks.length} tasks</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}