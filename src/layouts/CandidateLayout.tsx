import { Outlet, NavLink } from 'react-router-dom';
import { useAuthStore } from '../stores/auth';

const navItems = [
  { to: '/candidate/dashboard', label: 'Dashboard' },
  { to: '/candidate/profile', label: 'Profile' },
  { to: '/candidate/progress', label: 'Progress' },
  { to: '/candidate/documents', label: 'Documents' },
  { to: '/candidate/jobs', label: 'Jobs' },
];

export default function CandidateLayout() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white shadow-sm border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-8">
              <span className="text-lg font-bold text-slate-900">HireMeNow</span>
              <div className="hidden md:flex md:gap-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `px-3 py-2 text-sm font-medium rounded-md ${
                        isActive ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
            <button
              onClick={logout}
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-7xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
