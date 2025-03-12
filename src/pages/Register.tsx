
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";

const Register = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Rejestracja udana",
      description: "Na Twój adres email został wysłany link aktywacyjny.",
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
                <Input id="name" placeholder="Jan Kowalski" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input id="email" type="email" placeholder="jan.kowalski@zhp.pl" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Hasło</Label>
                <Input id="password" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-sm font-medium">Potwierdź hasło</Label>
                <Input id="confirm-password" type="password" required />
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="terms" />
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
              <Button type="submit" className="w-full bg-scout-500 hover:bg-scout-600 mt-2">
                Zarejestruj się
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
