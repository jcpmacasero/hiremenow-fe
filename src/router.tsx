import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from './stores/auth';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/Login';
import AdminLayout from './layouts/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import CompaniesPage from './pages/admin/CompaniesPage';
import EmployersPage from './pages/admin/EmployersPage';
import CandidatesPage from './pages/admin/CandidatesPage';
import JobsPage from './pages/admin/JobsPage';

// Auth guard component
function RequireAuth({ allowedRoles }: { allowedRoles: string[] }) {
  const { user, isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 animate-pulse">
            <span className="text-white font-bold text-xl">H</span>
          </div>
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-emerald-500 border-t-transparent" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

// Public route wrapper (redirect to admin if authenticated)
function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 animate-pulse">
            <span className="text-white font-bold text-xl">H</span>
          </div>
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-emerald-500 border-t-transparent" />
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <PublicRoute />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '/admin',
    element: <RequireAuth allowedRoles={['admin']} />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'companies', element: <CompaniesPage /> },
          { path: 'employers', element: <EmployersPage /> },
          { path: 'candidates', element: <CandidatesPage /> },
          { path: 'jobs', element: <JobsPage /> },
        ],
      },
    ],
  },
  {
    path: '/unauthorized',
    element: (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8">
          <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl font-bold">!</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Unauthorized</h1>
          <p className="text-slate-600 mb-6">You don't have permission to access this page.</p>
          <a
            href="/"
            className="inline-flex px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Go to Home
          </a>
        </div>
      </div>
    ),
  },
  {
    path: '*',
    element: (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8">
          <div className="text-6xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent mb-4">
            404
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Page not found</h1>
          <p className="text-slate-600 mb-6">The page you're looking for doesn't exist.</p>
          <a
            href="/"
            className="inline-flex px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Go to Home
          </a>
        </div>
      </div>
    ),
  },
]);
