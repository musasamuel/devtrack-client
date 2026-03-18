import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();
  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex flex-col">
  <div className="p-6 flex items-center gap-3">
    <div className="bg-primary rounded-lg p-2 flex items-center justify-center text-white">
      <span className="material-symbols-outlined">terminal</span>
    </div>
    <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white uppercase">DevTrack Pro</h1>
  </div>
  <nav className="flex-1 px-4 space-y-2 mt-4">
    <Link className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary transition-colors" to="/dashboard">
      <span className="material-symbols-outlined">dashboard</span>
      <span className="font-medium text-sm">Dashboard</span>
    </Link>
    <Link className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" to="/dashboard">
      <span className="material-symbols-outlined">work</span>
      <span className="font-medium text-sm">Projects</span>
    </Link>
    <Link className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" to="/tasks">
      <span className="material-symbols-outlined">task_alt</span>
      <span className="font-medium text-sm">Tasks</span>
    </Link>
    <Link className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" to="/settings">
      <span className="material-symbols-outlined">settings</span>
      <span className="font-medium text-sm">Settings</span>
    </Link>
  </nav>
  <div className="p-4 border-t border-slate-200 dark:border-slate-800">
    <div className="flex items-center gap-3 p-2">
      <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
        <span className="material-symbols-outlined">person</span>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold">{user?.name}</span>
        <span className="text-xs text-slate-500">Pro Plan</span>
      </div>
    </div>
  </div>
</aside>
  );
}