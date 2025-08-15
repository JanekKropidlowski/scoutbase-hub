
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { GuestRoute } from "@/components/auth/ProtectedRoute";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      // Error will be shown via toast in the auth hook
      return;
    }

    if (!formData.acceptTerms) {
      // Error will be shown via toast in the auth hook
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signUp(formData.email, formData.password, formData.fullName);
      if (!error) {
        // Success message is handled in the auth hook
        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
          acceptTerms: false,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GuestRoute>
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
                  <Label htmlFor="fullName" className="text-sm font-medium">Imię i nazwisko</Label>
                  <Input 
                    id="fullName" 
                    name="fullName"
                    placeholder="Jan Kowalski" 
                    required 
                    value={formData.fullName}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <Input 
                    id="email" 
                    name="email"
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
                  <Input 
                    id="password" 
                    name="password"
                    type="password" 
                    required 
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    minLength={6}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">Potwierdź hasło</Label>
                  <Input 
                    id="confirmPassword" 
                    name="confirmPassword"
                    type="password" 
                    required 
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    minLength={6}
                  />
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox 
                    id="terms" 
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, acceptTerms: checked as boolean }))
                    }
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
                      Rejestrowanie...
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
    </GuestRoute>
  );
};

export default Register;
