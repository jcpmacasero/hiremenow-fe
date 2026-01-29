import { useAuthStore } from '../stores/auth';

export default function DashboardPage() {
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">HireMeNow</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user?.email}</span>
              <span className="px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800 uppercase">
                {user?.role}
              </span>
              <button
                onClick={logout}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900">Welcome to HireMeNow</h2>
          <p className="mt-2 text-gray-600">
            You are logged in as <strong>{user?.email}</strong> with role{' '}
            <strong>{user?.role}</strong>.
          </p>
        </div>
      </main>
    </div>
  );
}
