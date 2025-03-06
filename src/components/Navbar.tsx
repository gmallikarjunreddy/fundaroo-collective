
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Menu, 
  X, 
  Heart, 
  User
} from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md py-4 shadow-subtle' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-medium tracking-tight flex items-center"
        >
          <span className="bg-primary text-white px-2 py-1 rounded mr-1">F</span>
          <span>Fundaroo</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1">
          <Link 
            to="/projects" 
            className="px-4 py-2 text-foreground/80 hover:text-foreground transition-colors"
          >
            Discover
          </Link>
          <Link 
            to="/how-it-works" 
            className="px-4 py-2 text-foreground/80 hover:text-foreground transition-colors"
          >
            How It Works
          </Link>
          <Link 
            to="/start-project" 
            className="px-4 py-2 text-foreground/80 hover:text-foreground transition-colors"
          >
            Start a Project
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Saved projects">
            <Heart className="h-5 w-5" />
          </Button>
          <Link to="/login">
            <Button className="rounded-full" variant="outline">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </Link>
          <Link to="/register">
            <Button className="rounded-full">Join</Button>
          </Link>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[65px] bg-white z-40 md:hidden animate-fade-in">
          <div className="container mx-auto px-4 py-6 flex flex-col h-full">
            <nav className="flex flex-col space-y-4 text-lg">
              <Link 
                to="/projects" 
                className="px-4 py-3 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Discover
              </Link>
              <Link 
                to="/how-it-works" 
                className="px-4 py-3 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                to="/start-project" 
                className="px-4 py-3 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start a Project
              </Link>
              <div className="h-px bg-border my-2"></div>
              <Link 
                to="/login" 
                className="px-4 py-3 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-3 bg-primary text-white rounded-md text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Join Fundaroo
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
