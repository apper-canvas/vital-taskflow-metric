import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { useTasks } from "@/hooks/useTasks";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
{ name: 'Dashboard', href: '/', icon: 'LayoutDashboard' },
    { name: 'Tasks', href: '/', icon: 'CheckSquare' },
    { name: 'Analytics', href: '#', icon: 'BarChart3' }
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-center h-16 px-4 bg-gradient-to-r from-primary to-secondary">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <ApperIcon name="CheckSquare" className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">TaskFlow</h1>
          </div>
        </div>

        <nav className="mt-5 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = item.href === '/' ? location.pathname === '/' : location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <ApperIcon 
                  name={item.icon} 
                  className={`mr-3 h-5 w-5 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-500'
                  }`} 
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:pl-0">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-slate-200">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="text-slate-500 hover:text-slate-600 lg:hidden"
                onClick={toggleSidebar}
              >
                <ApperIcon name="Menu" className="h-6 w-6" />
              </button>
              <div className="hidden lg:block">
                <h2 className="text-lg font-semibold text-slate-900">
                  {navigation.find(nav => nav.href === '/' && location.pathname === '/')?.name || 'Dashboard'}
                </h2>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 text-slate-400 hover:text-slate-500 hover:bg-slate-100 rounded-full">
                <ApperIcon name="Bell" className="h-5 w-5" />
              </button>
              <button className="p-2 text-slate-400 hover:text-slate-500 hover:bg-slate-100 rounded-full">
                <ApperIcon name="Settings" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;