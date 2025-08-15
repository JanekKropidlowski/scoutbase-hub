
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/layout/Navbar";

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
    terms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { signUp } = useAuth();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = "Imię i nazwisko jest wymagane";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email jest wymagany";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Nieprawidłowy format email";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Hasło musi mieć co najmniej 6 znaków";
    }

    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Hasła nie są identyczne";
    }

    if (!formData.terms) {
      newErrors.terms = "Musisz zaakceptować regulamin i politykę prywatności";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await signUp({
        email: formData.email,
        password: formData.password,
        full_name: formData.full_name,
      });

      if (result.success) {
        // Redirect will be handled by useAuth hook
        return;
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
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
                <Label htmlFor="full_name" className="text-sm font-medium">Imię i nazwisko</Label>
                <Input 
                  id="full_name" 
                  name="full_name"
                  placeholder="Jan Kowalski" 
                  value={formData.full_name}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className={errors.full_name ? "border-red-500" : ""}
                />
                {errors.full_name && (
                  <p className="text-sm text-red-500">{errors.full_name}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  placeholder="jan.kowalski@zhp.pl" 
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Hasło</Label>
                <Input 
                  id="password" 
                  name="password"
                  type="password" 
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm_password" className="text-sm font-medium">Potwierdź hasło</Label>
                <Input 
                  id="confirm_password" 
                  name="confirm_password"
                  type="password" 
                  value={formData.confirm_password}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className={errors.confirm_password ? "border-red-500" : ""}
                />
                {errors.confirm_password && (
                  <p className="text-sm text-red-500">{errors.confirm_password}</p>
                )}
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox 
                  id="terms" 
                  name="terms"
                  checked={formData.terms}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, terms: checked as boolean }))
                  }
                  disabled={isSubmitting}
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
              {errors.terms && (
                <p className="text-sm text-red-500">{errors.terms}</p>
              )}
              
              <Button 
                type="submit" 
                className="w-full bg-scout-500 hover:bg-scout-600 mt-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Rejestracja..." : "Zarejestruj się"}
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
