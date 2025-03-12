
import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Database, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import Footer from "@/components/layout/Footer";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { 
      name: "Dashboard", 
      icon: <LayoutDashboard className="h-5 w-5" />, 
      path: "/admin" 
    },
    { 
      name: "Bazy", 
      icon: <Database className="h-5 w-5" />, 
      path: "/admin/bases" 
    },
    { 
      name: "Użytkownicy", 
      icon: <Users className="h-5 w-5" />, 
      path: "/admin/users" 
    },
    { 
      name: "Recenzje", 
      icon: <MessageSquare className="h-5 w-5" />, 
      path: "/admin/reviews" 
    },
    { 
      name: "Statystyki", 
      icon: <BarChart3 className="h-5 w-5" />, 
      path: "/admin/statistics" 
    },
    { 
      name: "Ustawienia", 
      icon: <Settings className="h-5 w-5" />, 
      path: "/admin/settings" 
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-gray-500 hover:text-gray-600" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <Link to="/" className="flex items-center gap-2">
              <div className="relative h-8 w-8 flex items-center justify-center bg-scout-500 rounded-full overflow-hidden">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
                  <path d="M20 5L26 12L20 19L14 12L20 5Z" fill="white" />
                  <path d="M20 21L26 28L20 35L14 28L20 21Z" fill="white" />
                  <path d="M5 13L11 20L5 27L5 13Z" fill="white" />
                  <path d="M35 13L29 20L35 27L35 13Z" fill="white" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-gray-900">Panel Administratora</span>
                <span className="text-xs text-gray-500">BazyHarcerskie.pl</span>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/" className="text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1">
              <span className="text-sm">Wróć do strony</span>
            </Link>
            <div className="h-8 w-8 rounded-full bg-scout-100 flex items-center justify-center text-scout-700 font-medium">
              A
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Sidebar for desktop */}
        <aside className="hidden lg:block w-64 border-r border-gray-200 bg-white h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
          <nav className="px-2 py-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
                      isActive(item.path)
                        ? "bg-scout-50 text-scout-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="pt-6 mt-6 border-t border-gray-200">
              <Link
                to="/logout"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="h-5 w-5" />
                Wyloguj
              </Link>
            </div>
          </nav>
        </aside>
        
        {/* Mobile sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div 
              className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" 
              onClick={() => setSidebarOpen(false)}
            />
            
            <div className="fixed inset-y-0 left-0 flex max-w-xs w-full bg-white shadow-xl">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  className="ml-1 flex items-center justify-center h-8 w-8 rounded-full text-gray-400 hover:text-gray-500"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="flex-1 flex flex-col min-h-0 pt-14 px-2 pb-4">
                <nav className="flex-1">
                  <ul className="space-y-1">
                    {navItems.map((item) => (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
                            isActive(item.path)
                              ? "bg-scout-50 text-scout-700"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                          onClick={() => setSidebarOpen(false)}
                        >
                          {item.icon}
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-6 mt-6 border-t border-gray-200">
                    <Link
                      to="/logout"
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <LogOut className="h-5 w-5" />
                      Wyloguj
                    </Link>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        )}
        
        {/* Main content */}
        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminLayout;
