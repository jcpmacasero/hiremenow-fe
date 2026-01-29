import { Outlet, NavLink } from 'react-router-dom';
import { useAuthStore } from '../stores/auth';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/companies', label: 'Companies' },
  { to: '/admin/employers', label: 'Employers' },
  { to: '/admin/candidates', label: 'Candidates' },
  { to: '/admin/jobs', label: 'Jobs' },
];

export default function AdminLayout() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-8">
              <span className="text-xl font-bold text-gray-900">HireMeNow Admin</span>
              <div className="hidden md:flex md:space-x-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `px-3 py-2 text-sm font-medium rounded-md ${
                        isActive
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
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
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-7xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
