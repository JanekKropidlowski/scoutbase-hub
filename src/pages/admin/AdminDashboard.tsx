
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Database, MessageSquare, Calendar, Eye, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Przegląd statystyk i działań w systemie</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Bazy harcerskie
              </CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">132</div>
              <p className="text-xs text-muted-foreground">
                +2 nowe w tym tygodniu
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Użytkownicy
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">862</div>
              <p className="text-xs text-muted-foreground">
                +43 nowych w tym miesiącu
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Recenzje
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">284</div>
              <p className="text-xs text-muted-foreground">
                +12 nowych w tym tygodniu
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Rezerwacje
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">76</div>
              <p className="text-xs text-muted-foreground">
                Aktywne na bieżący sezon
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Odwiedziny strony</CardTitle>
              <CardDescription>
                Statystyki odwiedzin w ostatnim miesiącu
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[200px] flex items-end gap-2">
                {[60, 45, 80, 70, 45, 55, 75, 65, 90, 85, 65, 70, 75, 60, 55, 85, 90, 80, 70, 65, 75, 80, 65, 60, 70, 75, 80, 85, 90, 95].map((value, i) => (
                  <div
                    key={i}
                    className="bg-scout-500 rounded-t w-full"
                    style={{
                      height: `${value}%`,
                      opacity: 0.5 + value / 200,
                    }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Popularne regiony</CardTitle>
              <CardDescription>
                Najczęściej przeglądane regiony
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <span className="font-medium">Mazury</span>
                    </div>
                    <span className="text-gray-500">36%</span>
                  </div>
                  <Progress value={36} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <span className="font-medium">Bieszczady</span>
                    </div>
                    <span className="text-gray-500">28%</span>
                  </div>
                  <Progress value={28} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <span className="font-medium">Pomorze</span>
                    </div>
                    <span className="text-gray-500">22%</span>
                  </div>
                  <Progress value={22} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <span className="font-medium">Tatry</span>
                    </div>
                    <span className="text-gray-500">14%</span>
                  </div>
                  <Progress value={14} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Ostatnie aktywności</CardTitle>
              <CardDescription>
                Najnowsze działania w systemie
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { user: "Jan Kowalski", action: "dodał nową bazę", time: "2 godz. temu", icon: <Database className="h-4 w-4" /> },
                  { user: "Anna Nowak", action: "dodała recenzję", time: "4 godz. temu", icon: <MessageSquare className="h-4 w-4" /> },
                  { user: "Piotr Wiśniewski", action: "zarejestrował się", time: "6 godz. temu", icon: <Users className="h-4 w-4" /> },
                  { user: "Magdalena Lis", action: "dodała bazę do ulubionych", time: "8 godz. temu", icon: <Eye className="h-4 w-4" /> },
                  { user: "Tomasz Wojciechowski", action: "zaktualizował bazę", time: "12 godz. temu", icon: <Database className="h-4 w-4" /> }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="rounded-full p-1.5 bg-scout-100 text-scout-700">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        <strong>{item.user}</strong> {item.action}
                      </p>
                      <p className="text-xs text-gray-500">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Najlepiej oceniane bazy</CardTitle>
              <CardDescription>
                Bazy z najwyższą oceną użytkowników
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Stanica Harcerska Biały Las", rating: 4.9, reviews: 28 },
                  { name: "Baza Harcerska Leśne Ustronie", rating: 4.8, reviews: 17 },
                  { name: "Stanica Wodna Bryza", rating: 4.7, reviews: 23 },
                  { name: "Baza Obozowa Watra", rating: 4.6, reviews: 15 }
                ].map((base, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{base.name}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className={`h-3.5 w-3.5 ${i < Math.floor(base.rating) ? "text-yellow-400" : "text-gray-300"}`}>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                              </svg>
                            </div>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">({base.reviews})</span>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-scout-600">
                      {base.rating}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Nadchodzące rezerwacje</CardTitle>
              <CardDescription>
                Rezerwacje na najbliższy miesiąc
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { group: "47 MDH Pomarańczarnia", base: "Stanica Harcerska Biały Las", date: "12-25 lipca 2023", status: "Potwierdzona" },
                  { group: "22 DSH Grot", base: "Baza Harcerska Leśne Ustronie", date: "15-28 lipca 2023", status: "Oczekująca" },
                  { group: "135 WDH Buki", base: "Stanica Wodna Bryza", date: "1-15 sierpnia 2023", status: "Potwierdzona" },
                  { group: "72 ŁDH Węzeł", base: "Baza Obozowa Watra", date: "5-19 sierpnia 2023", status: "Oczekująca" }
                ].map((reservation, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium">{reservation.group}</p>
                      <span className={`text-xs rounded-full px-2 py-0.5 ${
                        reservation.status === "Potwierdzona" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {reservation.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{reservation.base}</p>
                    <p className="text-xs font-medium">{reservation.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
