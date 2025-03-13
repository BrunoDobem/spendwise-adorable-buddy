
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, PieChart, Home, CreditCard, Settings, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = [
    { name: 'Dashboard', path: '/', icon: <Home className="w-4 h-4 mr-2" /> },
    { name: 'Transactions', path: '/transactions', icon: <CreditCard className="w-4 h-4 mr-2" /> },
    { name: 'Reports', path: '/reports', icon: <PieChart className="w-4 h-4 mr-2" /> },
  ];
  
  const NavLink = ({ name, path, icon }: { name: string, path: string, icon: React.ReactNode }) => (
    <Link 
      to={path} 
      className={cn(
        "relative flex items-center rounded-lg px-3 py-2 transition-all duration-200 ease-in-out",
        isActive(path) 
          ? "text-primary font-medium bg-primary/10" 
          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
      )}
      onClick={() => setMobileMenuOpen(false)}
    >
      {icon}
      {name}
      {isActive(path) && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
      )}
    </Link>
  );
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-40 transition-all duration-300 ease-in-out",
        scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="relative w-10 h-10 rounded-xl bg-primary flex items-center justify-center overflow-hidden shadow-md">
            <span className="text-white font-bold text-xl">S</span>
            <div className="absolute -bottom-3 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <ChevronDown className="w-4 h-4 text-primary" />
            </div>
          </div>
          <div className="ml-2">
            <h1 className="font-bold text-xl text-foreground">SpendWise</h1>
            <p className="text-xs text-muted-foreground -mt-1">Personal Finance</p>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink key={link.path} {...link} />
            ))}
          </nav>
        )}
        
        {/* Profile */}
        <div className="flex items-center">
          {isMobile ? (
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-secondary text-muted-foreground"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          ) : (
            <div className="flex items-center">
              <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center mr-2">
                <span className="text-sm font-medium">JD</span>
              </div>
              <div className="mr-2">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Free Account</p>
              </div>
              <Settings className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer" />
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobile && (
        <div 
          className={cn(
            "fixed inset-0 bg-background/80 backdrop-blur-sm z-50 transition-all duration-300 ease-in-out",
            mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          <div className={cn(
            "absolute top-16 left-0 right-0 bg-card shadow-lg rounded-b-xl p-4 transition-all duration-300 ease-in-out",
            mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          )}>
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <NavLink key={link.path} {...link} />
              ))}
              <div className="h-px bg-border my-2" />
              <div className="flex items-center p-2">
                <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center mr-2">
                  <span className="text-sm font-medium">JD</span>
                </div>
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">Free Account</p>
                </div>
              </div>
              <Link 
                to="/settings" 
                className="flex items-center rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-secondary"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
