
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Check if it's a project not found
  const isProjectNotFound = location.pathname.includes('/project/');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-16">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4 text-primary">404</h1>
          <h2 className="text-2xl font-medium mb-6">
            {isProjectNotFound ? "Project Not Found" : "Page Not Found"}
          </h2>
          <p className="text-muted-foreground mb-8">
            {isProjectNotFound 
              ? "The project you're looking for doesn't exist or has been removed."
              : "The page you're looking for doesn't exist or has been moved."
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link to="/" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return Home
              </Link>
            </Button>
            
            {isProjectNotFound && (
              <Button asChild>
                <Link to="/projects">Browse Projects</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
