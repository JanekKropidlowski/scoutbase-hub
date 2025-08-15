
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/lib/auth";

const Register = () => {
  const { toast } = useToast();
  const { signUpWithEmail } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [accept, setAccept] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accept) {
      toast({ title: "Wymagana akceptacja", description: "Musisz zaakceptować regulamin i politykę prywatności." });
      return;
    }
    if (password !== confirmPassword) {
      toast({ title: "Błąd", description: "Hasła nie są takie same." });
      return;
    }
    setLoading(true);
    const { error } = await signUpWithEmail(email, password, name);
    setLoading(false);
    if (error) {
      toast({ title: "Błąd rejestracji", description: error.message });
      return;
    }
    toast({
      title: "Rejestracja udana",
      description: "Na Twój adres email został wysłany link aktywacyjny.",
    });
    navigate("/login");
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
                <Input id="name" placeholder="Jan Kowalski" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input id="email" type="email" placeholder="jan.kowalski@zhp.pl" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Hasło</Label>
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-sm font-medium">Potwierdź hasło</Label>
                <Input id="confirm-password" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="terms" checked={accept} onCheckedChange={(v) => setAccept(Boolean(v))} />
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
              <Button type="submit" className="w-full bg-scout-500 hover:bg-scout-600 mt-2" disabled={loading}>
                {loading ? "Rejestrowanie..." : "Zarejestruj się"}
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
