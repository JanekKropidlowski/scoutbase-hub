
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signUp, user } = useAuth();

  // Jeśli użytkownik jest już zalogowany, przekieruj
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Walidacja
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Proszę wypełnić wszystkie pola");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Hasła nie są identyczne");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Hasło musi mieć co najmniej 6 znaków");
      return;
    }

    if (!termsAccepted) {
      toast.error("Musisz zaakceptować regulamin i politykę prywatności");
      return;
    }

    setIsLoading(true);
    try {
      await signUp(formData.email, formData.password, {
        full_name: formData.name,
        role: 'user'
      });
    } catch (error) {
      // Błąd jest już obsłużony w kontekście
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-4 mt-16">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">Zarejestruj się</CardTitle>
            <CardDescription className="text-center text-sm">
              Utwórz konto, aby korzystać z pełni możliwości serwisu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Imię i nazwisko</Label>
                <Input 
                  id="name" 
                  placeholder="Jan Kowalski" 
                  required 
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="jan.kowalski@zhp.pl" 
                  required 
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Hasło</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    required 
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    placeholder="Minimum 6 znaków"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">Potwierdź hasło</Label>
                <div className="relative">
                  <Input 
                    id="confirmPassword" 
                    type={showConfirmPassword ? "text" : "password"} 
                    required 
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox 
                  id="terms" 
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                  disabled={isLoading}
                />
                <Label htmlFor="terms" className="text-sm font-normal">
                  Akceptuję{" "}
                  <Link to="/terms" className="text-scout-500 hover:underline">
                    regulamin
                  </Link>{" "}
                  i{" "}
                  <Link to="/privacy" className="text-scout-500 hover:underline">
                    politykę prywatności
                  </Link>
                </Label>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-scout-500 hover:bg-scout-600 mt-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Rejestracja...
                  </>
                ) : (
                  "Zarejestruj się"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-sm text-center font-normal">
              Masz już konto?{" "}
              <Link to="/login" className="text-scout-500 hover:underline font-medium">
                Zaloguj się
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
