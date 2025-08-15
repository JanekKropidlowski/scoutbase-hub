import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Shield } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRoles?: string | string[];
  fallbackPath?: string;
}

export function ProtectedRoute({
  children,
  requireAuth = true,
  requiredRoles,
  fallbackPath = '/login'
}: ProtectedRouteProps) {
  const { user, profile, loading, hasRole } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-scout-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Ładowanie...</p>
        </div>
      </div>
    );
  }

  // Check if authentication is required and user is not logged in
  if (requireAuth && !user) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // Check if specific roles are required
  if (requiredRoles && user) {
    // Wait for profile to load
    if (!profile) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-scout-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Ładowanie profilu...</p>
          </div>
        </div>
      );
    }

    // Check if user has required role
    if (!hasRole(requiredRoles)) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Brak uprawnień
              </CardTitle>
              <CardDescription>
                Nie masz wystarczających uprawnień, aby uzyskać dostęp do tej strony
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Wymagane uprawnienia: {Array.isArray(requiredRoles) ? requiredRoles.join(', ') : requiredRoles}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Twoje uprawnienia: {profile?.role || 'brak'}
              </p>
              <button
                onClick={() => window.history.back()}
                className="text-scout-600 hover:text-scout-500 font-medium"
              >
                ← Wróć
              </button>
            </CardContent>
          </Card>
        </div>
      );
    }
  }

  // If all checks pass, render the protected content
  return <>{children}</>;
}

// Convenience wrapper for admin-only routes
export function AdminRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requireAuth={true} requiredRoles="admin">
      {children}
    </ProtectedRoute>
  );
}

// Convenience wrapper for moderator+ routes
export function ModeratorRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requireAuth={true} requiredRoles={['admin', 'moderator']}>
      {children}
    </ProtectedRoute>
  );
}

// Redirect authenticated users away from auth pages
export function GuestRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-scout-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Ładowanie...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}