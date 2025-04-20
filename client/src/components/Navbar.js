import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LogIn,
  UserPlus,
  PlusCircle,
  LogOut,
  Menu,
  FileText,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  // console.log("Navbar user:", user);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between w-5/6 m-auto">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">NotesApp</span>
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => navigate("/create")}
              >
                <PlusCircle size={16} />
                Create Note
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="gap-2"
                onClick={logout}
              >
                <LogOut size={16} />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="gap-2">
                  <LogIn size={16} className="flex" />
                  Login
                </Button>
              </Link>
              <Button
                variant="default"
                size="sm"
                className="gap-2"
                onClick={() => navigate("/signup")}
              >
                <UserPlus size={16} />
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col h-full backdrop-blur-xl">
              <div className="px-2 py-6">
                <Link
                  to="/"
                  className="flex items-center gap-2 mb-6"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FileText className="h-6 w-6 text-primary text-gray-200" />
                  <span className="font-bold text-xl text-gray-200">
                    NotesApp
                  </span>
                </Link>
              </div>
              <div className="px-2 py-4 border-t">
                {user ? (
                  <div className="space-y-3">
                    <Button
                      className="w-full gap-2 justify-start text-gray-200"
                      onClick={() => {
                        navigate("/create");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <PlusCircle size={16} />
                      Create Note
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-full gap-2 justify-start text-gray-200"
                      onClick={logout}
                    >
                      <LogOut size={16} />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link to="/login" className="flex">
                      <Button
                        variant="outline"
                        className="w-full gap-2 justify-start text-gray-200"
                      >
                        <LogIn size={16} />
                        Login
                      </Button>
                    </Link>
                    <Button
                      className="w-full gap-2 justify-start text-gray-200"
                      onClick={() => {
                        navigate("/signup");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <UserPlus size={16} />
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
