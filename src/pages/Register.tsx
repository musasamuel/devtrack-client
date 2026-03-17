import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value);
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await api.post("/auth/register", { name, email, password });
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 flex flex-col">
      <div className="flex items-center justify-between whitespace-nowrap border-b border-slate-800 px-6 py-3 lg:px-10">
        <div className="flex items-center gap-4 text-primary">
          <div className="size-8 flex items-center justify-center bg-primary/10 rounded-lg">
            <span className="material-symbols-outlined text-primary">terminal</span>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight">DevTrack Pro</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="hidden md:flex items-center gap-9">
            <a className="text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">Features</a>
            <a className="text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">Pricing</a>
            <a className="text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">About</a>
          </div>
          <Link to="/login" className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors">
            Login
          </Link>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-background-dark to-slate-950">
        <div className="w-full max-w-[480px] bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl shadow-2xl p-8 flex flex-col gap-6">
          <div className="text-center">
            <div className="mx-auto size-12 mb-4 flex items-center justify-center bg-primary/10 rounded-xl">
              <span className="material-symbols-outlined text-primary text-3xl">person_add</span>
            </div>
            <h1 className="text-white text-3xl font-bold leading-tight mb-2">Create your account</h1>
            <p className="text-slate-400 text-sm">Join the most advanced developer tracking platform.</p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="text-slate-200 text-sm font-semibold">Full Name</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">person</span>
                <input
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-white transition-all placeholder:text-slate-400"
                  placeholder="John Doe"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-slate-200 text-sm font-semibold">Email address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">mail</span>
                <input
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-white transition-all placeholder:text-slate-400"
                  placeholder="name@company.com"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-slate-200 text-sm font-semibold">Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock</span>
                <input
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-white transition-all placeholder:text-slate-400"
                  placeholder="Create a strong password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>

            <div className="flex items-start gap-3 mt-2">
              <input className="mt-1 rounded border-slate-700 bg-slate-800 text-primary focus:ring-primary" type="checkbox" />
              <p className="text-xs text-slate-400 leading-relaxed">
                I agree to the <a className="text-primary hover:underline" href="#">Terms of Service</a> and <a className="text-primary hover:underline" href="#">Privacy Policy</a>.
              </p>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full mt-4 flex items-center justify-center rounded-lg bg-primary py-4 text-white font-bold text-base hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              Create Account
            </button>
          </form>

          <div className="text-center border-t border-slate-800 pt-6">
            <p className="text-sm text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-bold hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>

      <footer className="py-6 text-center text-slate-500 text-xs">
        <p>© 2024 DevTrack Pro. All rights reserved. Data encryption enabled.</p>
      </footer>
    </div>
  );
}