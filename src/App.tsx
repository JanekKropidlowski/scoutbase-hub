
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute, AdminRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Map from "./pages/Map";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import BaseDetails from "./pages/BaseDetails";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBases from "./pages/admin/AdminBases";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminStatistics from "./pages/admin/AdminStatistics";
import AdminPages from "./pages/admin/AdminPages";
import AdminMedia from "./pages/admin/AdminMedia";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/map" element={<Map />} />
            <Route path="/search" element={<Search />} />
            <Route 
              path="/favorites" 
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/messages" 
              element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route path="/base/:id" element={<BaseDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Admin CMS Routes - Protected */}
            <Route 
              path="/admin" 
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } 
            />
            <Route 
              path="/admin/bases" 
              element={
                <AdminRoute>
                  <AdminBases />
                </AdminRoute>
              } 
            />
            <Route 
              path="/admin/users" 
              element={
                <AdminRoute>
                  <AdminUsers />
                </AdminRoute>
              } 
            />
            <Route 
              path="/admin/reviews" 
              element={
                <AdminRoute>
                  <AdminReviews />
                </AdminRoute>
              } 
            />
            <Route 
              path="/admin/statistics" 
              element={
                <AdminRoute>
                  <AdminStatistics />
                </AdminRoute>
              } 
            />
            <Route 
              path="/admin/pages" 
              element={
                <AdminRoute>
                  <AdminPages />
                </AdminRoute>
              } 
            />
            <Route 
              path="/admin/media" 
              element={
                <AdminRoute>
                  <AdminMedia />
                </AdminRoute>
              } 
            />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
