import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

/** Set `VITE_ADMIN_PASSWORD` in Vercel / `.env` for production; still client-visible — use real auth for sensitive data. */
const ADMIN_PASSWORD =
  import.meta.env.VITE_ADMIN_PASSWORD ?? "zaanvi@admin2024";

export default function PasswordGate({ children }) {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  if (authed) return children;

  const submit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setError("");
      setAuthed(true);
    } else {
      setError("Incorrect password.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-cream px-4 font-body">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-light text-brand-green">
          <Lock className="h-7 w-7" />
        </div>
        <h1 className="text-center font-heading text-2xl text-brand-dark">
          Admin Access
        </h1>
        <p className="mt-2 text-center text-sm text-brand-dark/70">
          Enter the dashboard password to continue.
        </p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-full border border-brand-light bg-brand-cream px-4 py-3 pr-12 text-brand-dark outline-none focus:border-brand-green"
              placeholder="Password"
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-dark/60"
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {error && <p className="text-center text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-full bg-brand-green px-6 py-2 font-medium text-white transition hover:opacity-90"
          >
            Unlock Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
