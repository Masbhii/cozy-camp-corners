
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Folder, CheckSquare, MessageCircle, FileText, Users, Settings, Menu, X, CalendarDays } from 'lucide-react';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Projects', path: '/projects', icon: <Folder size={20} /> },
    { name: 'Calendar', path: '/calendar', icon: <CalendarDays size={20} /> },
    { name: 'Tasks', path: '/tasks', icon: <CheckSquare size={20} /> },
    { name: 'Messages', path: '/messages', icon: <MessageCircle size={20} /> },
    { name: 'Files', path: '/files', icon: <FileText size={20} /> },
    { name: 'Team', path: '/team', icon: <Users size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white border-b border-cool-gray/20 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-purple rounded-lg flex items-center justify-center">
            <Folder size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg text-neutral-gray">CozyPM</span>
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-gray-100" 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-soft-gray text-primary-purple font-medium'
                  : 'text-neutral-gray hover:bg-soft-gray'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 bg-white md:hidden">
            <div className="flex justify-end p-4">
              <button 
                onClick={toggleMenu}
                className="p-2 rounded-lg hover:bg-gray-100"
                aria-label="Close navigation menu"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col items-center gap-4 p-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg w-full transition-colors ${
                    isActive(item.path)
                      ? 'bg-soft-gray text-primary-purple font-medium'
                      : 'text-neutral-gray hover:bg-soft-gray'
                  }`}
                  onClick={toggleMenu}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
