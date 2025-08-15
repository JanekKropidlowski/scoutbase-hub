import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { GuestRoute } from "@/components/auth/ProtectedRoute";
import Footer from "@/components/layout/Footer";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await resetPassword(email);
      if (!error) {
        setEmailSent(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <GuestRoute>
        <div className="min-h-screen flex flex-col">
          <div className="flex-1 flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Email wysłany
                </CardTitle>
                <CardDescription>
                  Sprawdź swoją skrzynkę pocztową i kliknij link w emailu, aby zresetować hasło
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-sm text-gray-600">
                  Email został wysłany na adres: <strong>{email}</strong>
                </p>
                <p className="text-sm text-gray-600">
                  Nie widzisz emaila? Sprawdź folder spam lub spróbuj ponownie za chwilę.
                </p>
                <div className="space-y-2">
                  <Button
                    onClick={() => setEmailSent(false)}
                    variant="outline"
                    className="w-full"
                  >
                    Wyślij ponownie
                  </Button>
                  <Link to="/login">
                    <Button variant="ghost" className="w-full">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Wróć do logowania
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
          <Footer />
        </div>
      </GuestRoute>
    );
  }

  return (
    <GuestRoute>
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <Link to="/" className="inline-flex flex-col items-center gap-2">
                <div className="relative h-12 w-12 flex items-center justify-center bg-scout-500 rounded-full overflow-hidden">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10">
                    <path d="M20 5L26 12L20 19L14 12L20 5Z" fill="white" />
                    <path d="M20 21L26 28L20 35L14 28L20 21Z" fill="white" />
                    <path d="M5 13L11 20L5 27L5 13Z" fill="white" />
                    <path d="M35 13L29 20L35 27L35 13Z" fill="white" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  BazyHarcerskie.pl
                </h2>
              </Link>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                Resetuj hasło
              </h2>
              <p className="mt-2 text-gray-600">
                Wprowadź swój adres email, a wyślemy Ci link do resetowania hasła
              </p>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Adres email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="twoj@email.pl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-scout-500 hover:bg-scout-600"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Wysyłanie...
                      </>
                    ) : (
                      "Wyślij link resetowania"
                    )}
                  </Button>
                  
                  <div className="text-center">
                    <Link 
                      to="/login" 
                      className="inline-flex items-center text-sm text-scout-600 hover:text-scout-500"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Wróć do logowania
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    </GuestRoute>
  );
};

export default ForgotPassword;