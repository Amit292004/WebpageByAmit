import { Link, useLocation } from "wouter";
import { Button } from "./button";
import { GraduationCap, Menu, LogIn, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "./sheet";
import { useToast } from "@/hooks/use-toast";

export default function Header() {
  const [location, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const { toast } = useToast();
  
  // Check if user is authenticated
  useEffect(() => {
    const userAuth = localStorage.getItem("userAuth");
    if (userAuth) {
      try {
        const auth = JSON.parse(userAuth);
        if (auth.id) {
          setIsAuthenticated(true);
          setUsername(auth.username || "");
        }
      } catch (error) {
        console.error("Error parsing user auth", error);
        localStorage.removeItem("userAuth");
      }
    }
  }, [location]);  // Re-check when location changes
  
  const handleLogout = () => {
    localStorage.removeItem("userAuth");
    setIsAuthenticated(false);
    setUsername("");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out"
    });
    setLocation("/");
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/question-papers", label: "Question Papers" },
    { href: "/notes", label: "Notes" },
    { href: "/videos", label: "Videos" },
    { href: "/feedback", label: "Feedback" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/enroll", label: "Enroll Now" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="text-white text-sm" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-primary">Bounce Back</h1>
              <p className="text-xs text-gray-600 -mt-1">Academy</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.slice(0, 7).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-primary"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <Link href="/enroll" className="hidden md:block">
              <Button
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Enroll Now
              </Button>
            </Link>
            {isAuthenticated ? (
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white hidden md:flex"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            ) : (
              <>
                <Link href="/login" className="hidden md:block">
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link href="/admin" className="hidden md:block">
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    Login as Admin
                  </Button>
                </Link>
              </>
            )}
            
            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 pt-12">
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`font-medium text-lg transition-colors ${
                        isActive(item.href)
                          ? "text-primary"
                          : "text-gray-700 hover:text-primary"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="pt-4 border-t border-gray-200">
                    {isAuthenticated ? (
                      <Button 
                        variant="outline" 
                        className="w-full mb-3"
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    ) : (
                      <>
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full mb-3">
                            <LogIn className="w-4 h-4 mr-2" />
                            Login
                          </Button>
                        </Link>
                        <Link href="/admin" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full">
                            Login as Admin
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
