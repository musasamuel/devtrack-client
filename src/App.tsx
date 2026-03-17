import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProjectDetail from "./pages/ProjectDetail";
import Tasks from "./pages/Tasks";
import Settings from "./pages/Settings"

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/projects/:id" element={<ProjectDetail/>} />
        <Route path="/tasks" element={<Tasks/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
  )
}