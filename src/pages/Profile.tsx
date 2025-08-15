
import { useAuth } from "@/lib/auth";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4 mt-16">
          <div className="text-center">Musisz być zalogowany, aby zobaczyć profil.</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto p-4 mt-16">
        <h1 className="text-2xl font-semibold mb-4">Mój profil</h1>
        <div className="space-y-2">
          <div><span className="text-gray-500">Email:</span> {user.email}</div>
          <div><span className="text-gray-500">ID:</span> {user.id}</div>
        </div>
        <div className="mt-6">
          <Button onClick={signOut} variant="outline">Wyloguj</Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
