
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings, LogOut, Edit, Bell, Lock, MapPin, Heart, MessageSquare, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="container px-4 py-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="bg-scout-500 h-32 relative">
              <button className="absolute right-4 top-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors">
                <Edit className="h-4 w-4" />
              </button>
            </div>
            
            <div className="px-6 pb-6 relative">
              <div className="absolute -top-16 left-6 w-32 h-32 rounded-full border-4 border-white bg-scout-100 flex items-center justify-center text-scout-500">
                <User className="h-16 w-16" />
              </div>
              
              <div className="pt-20">
                <h1 className="text-2xl font-bold">Jan Kowalski</h1>
                <p className="text-gray-500 flex items-center mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  Warszawa, Mazowieckie
                </p>
                
                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <div className="bg-scout-50 p-2 rounded-full mr-3">
                      <Calendar className="h-5 w-5 text-scout-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Dołączył</p>
                      <p className="font-medium">Marzec 2023</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-scout-50 p-2 rounded-full mr-3">
                      <Heart className="h-5 w-5 text-scout-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Ulubione</p>
                      <p className="font-medium">2 bazy</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-scout-50 p-2 rounded-full mr-3">
                      <MessageSquare className="h-5 w-5 text-scout-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Wiadomości</p>
                      <p className="font-medium">3 aktywne</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="w-full bg-white rounded-xl mb-6 p-1 border">
              <TabsTrigger 
                value="profile" 
                className="flex-1 data-[state=active]:bg-scout-50 data-[state=active]:text-scout-700 rounded-lg"
                onClick={() => setActiveTab("profile")}
              >
                Profil
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="flex-1 data-[state=active]:bg-scout-50 data-[state=active]:text-scout-700 rounded-lg"
                onClick={() => setActiveTab("settings")}
              >
                Ustawienia
              </TabsTrigger>
              <TabsTrigger 
                value="history" 
                className="flex-1 data-[state=active]:bg-scout-50 data-[state=active]:text-scout-700 rounded-lg"
                onClick={() => setActiveTab("history")}
              >
                Historia
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Informacje o użytkowniku</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-1">Imię i nazwisko</label>
                  <div className="font-medium">Jan Kowalski</div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-1">Email</label>
                  <div className="font-medium">jan.kowalski@example.com</div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-1">Telefon</label>
                  <div className="font-medium">+48 123 456 789</div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-1">Organizacja harcerska</label>
                  <div className="font-medium">ZHP - Chorągiew Stołeczna</div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-1">Funkcja</label>
                  <div className="font-medium">Drużynowy</div>
                </div>
                
                <div className="pt-4">
                  <button className="bg-scout-50 text-scout-700 px-4 py-2 rounded-lg hover:bg-scout-100 transition-colors font-medium flex items-center">
                    <Edit className="h-4 w-4 mr-2" />
                    Edytuj profil
                  </button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="bg-white rounded-xl shadow-sm divide-y">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Ustawienia konta</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Powiadomienia email</h3>
                      <p className="text-sm text-gray-500">Otrzymuj powiadomienia o nowych wiadomościach i aktualnościach</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-scout-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Powiadomienia push</h3>
                      <p className="text-sm text-gray-500">Otrzymuj powiadomienia bezpośrednio w przeglądarce</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-scout-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Newsletter</h3>
                      <p className="text-sm text-gray-500">Otrzymuj informacje o nowych bazach i promocjach</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-scout-500"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-bold mb-4">Bezpieczeństwo</h3>
                
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <Lock className="h-5 w-5 text-gray-500 mr-3" />
                      <span>Zmień hasło</span>
                    </div>
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <Bell className="h-5 w-5 text-gray-500 mr-3" />
                      <span>Zarządzaj powiadomieniami</span>
                    </div>
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <Settings className="h-5 w-5 text-gray-500 mr-3" />
                      <span>Preferencje prywatności</span>
                    </div>
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <button className="flex items-center text-red-500 font-medium">
                  <LogOut className="h-5 w-5 mr-2" />
                  Wyloguj się
                </button>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Historia aktywności</h2>
              
              <div className="space-y-6">
                <div className="border-l-2 border-scout-500 pl-4 pb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Wyszukiwanie bazy</h3>
                    <span className="text-sm text-gray-500">2 godz. temu</span>
                  </div>
                  <p className="text-gray-600">Wyszukiwanie: <span className="font-medium">Mazury, max 80 osób</span></p>
                </div>
                
                <div className="border-l-2 border-scout-500 pl-4 pb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Wysłano wiadomość</h3>
                    <span className="text-sm text-gray-500">Wczoraj, 15:30</span>
                  </div>
                  <p className="text-gray-600">Do: <span className="font-medium">Stanica Harcerska Biały Las</span></p>
                </div>
                
                <div className="border-l-2 border-scout-500 pl-4 pb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Dodano do ulubionych</h3>
                    <span className="text-sm text-gray-500">23.03.2023</span>
                  </div>
                  <p className="text-gray-600">Baza: <span className="font-medium">Centrum Szkoleniowe Harcerska Dolina</span></p>
                </div>
                
                <div className="border-l-2 border-scout-500 pl-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Utworzono konto</h3>
                    <span className="text-sm text-gray-500">12.03.2023</span>
                  </div>
                  <p className="text-gray-600">Witamy w BazyHarcerskie.pl!</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
      <MobileNav />
    </div>
  );
};

export default Profile;
