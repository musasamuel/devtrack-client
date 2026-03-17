import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await api.post("/auth/login", { email, password });
      login(response.data.token, response.data.user);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 bg-background-dark">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
          <span className="material-symbols-outlined text-2xl">analytics</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">DevTrack Pro</h2>
      </div>

      <div className="w-full max-w-md bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="h-32 w-full bg-gradient-to-br from-primary/20 to-primary/5 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary dark:text-blue-400">Secure Access</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Welcome Back</h1>
            <p className="text-slate-500 dark:text-slate-400">Please enter your details to sign in</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">mail</span>
                <input
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
                  placeholder="name@company.com"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                <a className="text-xs font-semibold text-primary hover:underline" href="#">Forgot password?</a>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock</span>
                <input
                  className="w-full pl-10 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                <span className="material-symbols-outlined text-red-500 text-lg">error</span>
                <p className="text-xs font-medium text-red-500">{error}</p>
              </div>
            )}

            <div className="flex items-center gap-2">
              <input className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary bg-transparent" id="remember" type="checkbox" />
              <label className="text-sm text-slate-600 dark:text-slate-400" htmlFor="remember">Keep me logged in</label>
            </div>

            <button className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2" type="submit">
              Log In
              <span className="material-symbols-outlined text-xl">login</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Don't have an account?
              <Link className="font-bold text-primary hover:underline ml-1" to="/register">Create an account</Link>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-6 text-xs font-medium text-slate-500 dark:text-slate-600">
        <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
        <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
        <a className="hover:text-primary transition-colors" href="#">Help Center</a>
      </div>
    </div>
  );
}