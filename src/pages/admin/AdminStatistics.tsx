
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Users, Database, Calendar, Search, MapPin, Heart } from "lucide-react";

const AdminStatistics = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Statystyki</h1>
          <p className="text-muted-foreground">Analiza aktywności i danych w systemie</p>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Przegląd</TabsTrigger>
            <TabsTrigger value="users">Użytkownicy</TabsTrigger>
            <TabsTrigger value="bases">Bazy</TabsTrigger>
            <TabsTrigger value="bookings">Rezerwacje</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Łączna liczba odwiedzin
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12,547</div>
                  <p className="text-xs text-muted-foreground">
                    +15% w porównaniu do poprzedniego miesiąca
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Aktywni użytkownicy
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
                    Liczba baz
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
                    Rezerwacje
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">76</div>
                  <p className="text-xs text-muted-foreground">
                    +24% w porównaniu do zeszłego sezonu
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Aktywność w czasie</CardTitle>
                  <CardDescription>
                    Rozkład miesięcznych odwiedzin strony
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px]">
                    <div className="h-full flex items-end gap-2">
                      {[25, 40, 30, 35, 48, 75, 95, 100, 85, 60, 45, 30].map((value, i) => (
                        <div 
                          key={i}
                          className="relative flex-1 bg-scout-500 rounded-t"
                          style={{ 
                            height: `${value}%`,
                            opacity: 0.5 + (value / 200)
                          }}
                        >
                          <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 text-xs">
                            {['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'][i]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Interakcje użytkowników</CardTitle>
                  <CardDescription>
                    Popularne działania na platformie
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Search className="h-4 w-4 text-scout-500" />
                          <span className="text-sm font-medium">Wyszukiwanie baz</span>
                        </div>
                        <span>42%</span>
                      </div>
                      <div className="h-2 w-full bg-scout-100 rounded-full overflow-hidden">
                        <div className="h-full bg-scout-500 rounded-full" style={{ width: '42%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-scout-500" />
                          <span className="text-sm font-medium">Przeglądanie mapy</span>
                        </div>
                        <span>27%</span>
                      </div>
                      <div className="h-2 w-full bg-scout-100 rounded-full overflow-hidden">
                        <div className="h-full bg-scout-500 rounded-full" style={{ width: '27%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Heart className="h-4 w-4 text-scout-500" />
                          <span className="text-sm font-medium">Dodawanie do ulubionych</span>
                        </div>
                        <span>18%</span>
                      </div>
                      <div className="h-2 w-full bg-scout-100 rounded-full overflow-hidden">
                        <div className="h-full bg-scout-500 rounded-full" style={{ width: '18%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-scout-500" />
                          <span className="text-sm font-medium">Zapytania o rezerwację</span>
                        </div>
                        <span>13%</span>
                      </div>
                      <div className="h-2 w-full bg-scout-100 rounded-full overflow-hidden">
                        <div className="h-full bg-scout-500 rounded-full" style={{ width: '13%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Demografia użytkowników</CardTitle>
                  <CardDescription>
                    Podział użytkowników według organizacji
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="relative w-64 h-64">
                      <div className="absolute inset-0 rounded-full overflow-hidden">
                        <div className="absolute w-full h-full" style={{ transform: 'rotate(0deg)', clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)' }}>
                          <div className="absolute inset-0 bg-blue-500 opacity-80"></div>
                        </div>
                        <div className="absolute w-full h-full" style={{ transform: 'rotate(180deg)', clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%, 50% 50%)' }}>
                          <div className="absolute inset-0 bg-green-500 opacity-80"></div>
                        </div>
                        <div className="absolute w-full h-full" style={{ transform: 'rotate(270deg)', clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 30%, 50% 50%)' }}>
                          <div className="absolute inset-0 bg-yellow-500 opacity-80"></div>
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white w-20 h-20 m-auto"></div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">ZHP (65%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">ZHR (25%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Inne organizacje (10%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Aktywność użytkowników</CardTitle>
                  <CardDescription>
                    Trendy w rejestracji użytkowników
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px]">
                    <div className="relative h-full">
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-border"></div>
                      <div className="h-full flex items-end gap-2 pt-6 pb-6">
                        {[10, 15, 25, 20, 30, 45, 50, 60, 75, 65, 75, 90, 100, 85, 80, 90, 85, 80, 95, 75, 65, 60, 70, 75].map((value, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <div className="w-full bg-scout-500 rounded-t" style={{ height: `${value}%` }}></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="bases" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Popularność regionów</CardTitle>
                  <CardDescription>
                    Najczęściej przeglądane lokalizacje
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { region: "Mazury", percent: 36 },
                      { region: "Bieszczady", percent: 28 },
                      { region: "Pomorze", percent: 22 },
                      { region: "Tatry", percent: 14 },
                      { region: "Bory Tucholskie", percent: 12 },
                      { region: "Jura Krakowsko-Częstochowska", percent: 9 },
                      { region: "Góry Świętokrzyskie", percent: 7 }
                    ].map((item, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center">
                            <span className="font-medium">{item.region}</span>
                          </div>
                          <span className="text-gray-500">{item.percent}%</span>
                        </div>
                        <div className="h-2 w-full bg-scout-100 rounded-full overflow-hidden">
                          <div className="h-full bg-scout-500 rounded-full" style={{ width: `${item.percent}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Typy baz</CardTitle>
                  <CardDescription>
                    Podział baz według rodzaju zakwaterowania
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-48 rounded-full border-8 border-scout-100 relative">
                        <div className="absolute inset-0 border-8 border-scout-500 rounded-full" style={{ clipPath: 'inset(0 0 0 50%)' }}></div>
                        <div className="absolute inset-0 border-8 border-scout-300 rounded-full" style={{ clipPath: 'inset(0 50% 50% 0)' }}></div>
                        <div className="absolute inset-0 border-8 border-scout-200 rounded-full" style={{ clipPath: 'inset(50% 0 0 0)' }}></div>
                      </div>
                    </div>
                    <div className="absolute left-1/4 top-1/4 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="text-lg font-bold">45%</div>
                      <div className="text-xs">Namiotowe</div>
                    </div>
                    <div className="absolute right-1/4 top-1/4 transform translate-x-1/2 -translate-y-1/2">
                      <div className="text-lg font-bold">30%</div>
                      <div className="text-xs">Domki</div>
                    </div>
                    <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                      <div className="text-lg font-bold">25%</div>
                      <div className="text-xs">Budynki</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="bookings" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Sezonowość rezerwacji</CardTitle>
                  <CardDescription>
                    Rozkład rezerwacji w ciągu roku
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px]">
                    <div className="h-full flex items-end gap-2">
                      {[5, 8, 12, 15, 25, 45, 95, 100, 85, 20, 10, 7].map((value, i) => (
                        <div 
                          key={i}
                          className="relative flex-1 bg-scout-500 rounded-t"
                          style={{ 
                            height: `${value}%`,
                            opacity: 0.5 + (value / 200)
                          }}
                        >
                          <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 text-xs">
                            {['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'][i]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Status rezerwacji</CardTitle>
                  <CardDescription>
                    Podział rezerwacji według statusu
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600">65%</div>
                      <div className="text-sm text-gray-500">Potwierdzone</div>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-3xl font-bold text-yellow-600">25%</div>
                      <div className="text-sm text-gray-500">Oczekujące</div>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-red-50 rounded-lg">
                      <div className="text-3xl font-bold text-red-600">10%</div>
                      <div className="text-sm text-gray-500">Anulowane</div>
                    </div>
                  </div>
                  
                  <div className="relative pt-4">
                    <div className="overflow-hidden h-8 text-xs flex rounded-full bg-gray-200">
                      <div className="w-[65%] shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500">65%</div>
                      <div className="w-[25%] shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500">25%</div>
                      <div className="w-[10%] shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500">10%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminStatistics;
