import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  Share2, 
  MapPin, 
  Calendar, 
  Users, 
  CheckCircle, 
  Wifi, 
  Utensils, 
  Droplet, 
  Sun, 
  Tent, 
  Home, 
  Phone, 
  Mail, 
  MessageSquare,
  ArrowLeft,
  Star,
  Download,
  Compass,
  User
} from "lucide-react";

const BASE_DETAILS = {
  id: "1",
  name: "Stanica Harcerska Biały Las",
  location: {
    region: "Warmińsko-mazurskie",
    area: "Mazury",
    address: "Biały Las 12, 11-500 Mikołajki"
  },
  description: "Stanica harcerska położona nad brzegiem jeziora Mikołajskiego, na skraju Puszczy Piskiej. Oferuje zakwaterowanie w budynku głównym oraz na polu namiotowym. Idealne miejsce na obozy harcerskie, biwaki i zielone szkoły. Na terenie stanicy znajduje się własna stołówka, sanitariaty oraz infrastruktura obozowa.",
  longDescription: "Stanica Harcerska Biały Las to obiekt z wieloletnią tradycją, działający od 1985 roku. Położona jest na 5-hektarowej działce, z własnym dostępem do jeziora i pomostem. W budynku głównym znajduje się 60 miejsc noclegowych w pokojach 4-6 osobowych oraz świetlica i stołówka. Na terenie stanicy jest pole namiotowe mogące pomieścić do 150 osób.\n\nOferujemy pełne wyżywienie przygotowywane w naszej kuchni, dostęp do infrastruktury obozowej (pale pionierskie, liny, narzędzia), sprzęt wodny (kajaki, rowery wodne) oraz możliwość zorganizowania zajęć programowych dla uczestników.\n\nObiekt jest czynny od maja do września. W sezonie zimowym dostępna jest tylko część budynku głównego (30 miejsc noclegowych).",
  images: [
    "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
  ],
  price: "25 zł/os",
  capacity: 120,
  contact: {
    manager: "Hm. Jan Kowalski",
    phone: "+48 123 456 789",
    email: "bialy.las@zhp.pl"
  },
  features: [
    {label: "Dostęp do jeziora", value: true},
    {label: "Pole namiotowe", value: true},
    {label: "Budynek z pokojami", value: true},
    {label: "Pełne wyżywienie", value: true},
    {label: "Stołówka", value: true},
    {label: "Sanitariaty", value: true},
    {label: "Prysznice", value: true},
    {label: "Dostęp do prądu", value: true},
    {label: "Internet", value: true},
    {label: "Sprzęt pionierski", value: true},
    {label: "Kajaki", value: true},
    {label: "Rowery wodne", value: false},
    {label: "Świetlica", value: true},
    {label: "Ognisko", value: true},
    {label: "Boisko", value: true}
  ],
  ratings: {
    overall: 4.8,
    location: 4.9,
    facilities: 4.6,
    staff: 4.9,
    value: 4.7,
    count: 47
  },
  reviews: [
    {
      id: "1",
      author: "Drużynowa Anna",
      date: "lipiec 2023",
      rating: 5,
      content: "Świetna baza! Byliśmy z drużyną na dwutygodniowym obozie i wszystko było na najwyższym poziomie. Czyste sanitariaty, smaczne jedzenie, świetna lokalizacja nad jeziorem. Polecam każdemu!"
    },
    {
      id: "2",
      author: "Hufiec Warszawa-Mokotów",
      date: "sierpień 2022",
      rating: 4,
      content: "Bardzo dobra baza, dobrze wyposażona. Obsługa pomocna i profesjonalna. Jedyny minus za małą odległość od innego podobozu, ale poza tym wszystko super."
    },
    {
      id: "3",
      author: "Szczep 100",
      date: "lipiec 2022",
      rating: 5,
      content: "Idealne miejsce na obóz harcerski. Jesteśmy tu już trzeci rok z rzędu i zawsze wszystko jest przygotowane. Polecamy!"
    }
  ],
  availability: [
    {
      month: "Lipiec 2023",
      days: Array(31).fill(0).map((_, i) => ({
        day: i + 1,
        status: i < 15 ? "booked" : i < 25 ? "available" : "booked"
      }))
    },
    {
      month: "Sierpień 2023",
      days: Array(31).fill(0).map((_, i) => ({
        day: i + 1,
        status: i < 5 ? "booked" : i < 20 ? "available" : "booked"
      }))
    }
  ]
};

const BaseDetails = () => {
  const { id } = useParams();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("details");
  const [liked, setLiked] = useState(false);

  const base = BASE_DETAILS;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="md:hidden sticky top-16 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center">
          <button className="p-1 mr-3">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="font-bold text-lg truncate flex-grow">{base.name}</h1>
          <button 
            className={`p-2 rounded-full ${liked ? 'text-red-500' : 'text-gray-400'}`}
            onClick={() => setLiked(!liked)}
          >
            <Heart className={`h-6 w-6 ${liked ? 'fill-current' : ''}`} />
          </button>
          <button className="p-2 rounded-full text-gray-400">
            <Share2 className="h-6 w-6" />
          </button>
        </div>
        
        <div className="relative">
          <div className="relative h-64 md:h-96 bg-gray-200">
            <img 
              src={base.images[activeImageIndex]} 
              alt={base.name}
              className="w-full h-full object-cover"
            />
            
            <div className="absolute bottom-4 left-4 right-4 flex justify-between">
              <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium">
                {base.price} / doba
              </div>
              
              <div className="hidden md:flex gap-2">
                <button 
                  className={`p-2 rounded-full bg-white/90 backdrop-blur-sm ${liked ? 'text-red-500' : 'text-gray-700'}`}
                  onClick={() => setLiked(!liked)}
                >
                  <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
                </button>
                <button className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-700">
                  <Share2 className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-700">
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
            <button 
              className="p-1 rounded-full bg-white/80 backdrop-blur-sm shadow-sm"
              onClick={() => setActiveImageIndex((activeImageIndex - 1 + base.images.length) % base.images.length)}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <button 
              className="p-1 rounded-full bg-white/80 backdrop-blur-sm shadow-sm"
              onClick={() => setActiveImageIndex((activeImageIndex + 1) % base.images.length)}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden md:flex gap-2">
            {base.images.map((_, index) => (
              <button 
                key={index}
                className={`w-2.5 h-2.5 rounded-full ${
                  index === activeImageIndex ? 'bg-white' : 'bg-white/40'
                }`}
                onClick={() => setActiveImageIndex(index)}
              />
            ))}
          </div>
        </div>
        
        <div className="container px-4 py-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-2 hidden md:block">{base.name}</h1>
                <p className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-1 text-scout-500" />
                  {base.location.region}, {base.location.area}
                </p>
                
                <div className="flex items-center mt-2">
                  <div className="flex text-yellow-400 mr-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < Math.floor(base.ratings.overall) ? 'fill-current' : ''}`} 
                      />
                    ))}
                  </div>
                  <span className="font-medium">{base.ratings.overall}</span>
                  <span className="text-gray-500 mx-1">•</span>
                  <span className="text-gray-500">{base.ratings.count} ocen</span>
                </div>
              </div>
              
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="w-full bg-gray-100 rounded-xl mb-6 p-1">
                  <TabsTrigger 
                    value="details" 
                    className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
                    onClick={() => setActiveTab("details")}
                  >
                    Szczegóły
                  </TabsTrigger>
                  <TabsTrigger 
                    value="features" 
                    className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
                    onClick={() => setActiveTab("features")}
                  >
                    Wyposażenie
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reviews" 
                    className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
                    onClick={() => setActiveTab("reviews")}
                  >
                    Opinie ({base.ratings.count})
                  </TabsTrigger>
                  <TabsTrigger 
                    value="availability" 
                    className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
                    onClick={() => setActiveTab("availability")}
                  >
                    Dostępność
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="focus-visible:outline-none">
                  <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">O bazie</h2>
                    <p className="text-gray-700 mb-4">{base.description}</p>
                    <p className="text-gray-700 whitespace-pre-line">{base.longDescription}</p>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">Lokalizacja</h2>
                    <p className="text-gray-700 mb-4">{base.location.address}</p>
                    <div className="h-64 bg-gray-200 rounded-lg overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center bg-scout-50/20">
                        <Compass className="h-12 w-12 text-scout-500 opacity-50" />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="features" className="focus-visible:outline-none">
                  <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">Szczegóły zakwaterowania</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mb-8">
                      <div className="flex items-start">
                        <Users className="h-6 w-6 text-scout-500 mr-3 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium">Pojemność bazy</h3>
                          <p className="text-gray-600">Maksymalnie {base.capacity} osób</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Home className="h-6 w-6 text-scout-500 mr-3 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium">Zakwaterowanie</h3>
                          <p className="text-gray-600">Budynek (60 miejsc) + pole namiotowe</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Calendar className="h-6 w-6 text-scout-500 mr-3 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium">Dostępność</h3>
                          <p className="text-gray-600">Maj - Wrzesień (pełna), Październik - Kwiecień (częściowa)</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Utensils className="h-6 w-6 text-scout-500 mr-3 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium">Wyżywienie</h3>
                          <p className="text-gray-600">Pełne wyżywienie w cenie (3 posiłki dziennie)</p>
                        </div>
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-bold mb-4">Udogodnienia</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {base.features.map((feature, index) => (
                        <div 
                          key={index}
                          className={`flex items-center p-3 rounded-lg ${
                            feature.value ? 'bg-scout-50/30' : 'bg-gray-100 opacity-60'
                          }`}
                        >
                          <CheckCircle className={`h-5 w-5 mr-2 ${
                            feature.value ? 'text-scout-500' : 'text-gray-400'
                          }`} />
                          <span className={feature.value ? 'text-gray-800' : 'text-gray-500'}>
                            {feature.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="focus-visible:outline-none">
                  <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-bold mb-6">Oceny i opinie</h2>
                    
                    <div className="flex flex-col md:flex-row gap-8 mb-8">
                      <div className="md:w-1/3 flex flex-col items-center justify-center">
                        <div className="text-5xl font-bold text-scout-500 mb-2">
                          {base.ratings.overall}
                        </div>
                        <div className="flex text-yellow-400 mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-6 w-6 ${i < Math.floor(base.ratings.overall) ? 'fill-current' : ''}`} 
                            />
                          ))}
                        </div>
                        <p className="text-gray-500">{base.ratings.count} ocen</p>
                      </div>
                      
                      <div className="md:w-2/3 space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-gray-700">Lokalizacja</span>
                            <div className="flex text-yellow-400">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < Math.floor(base.ratings.location) ? 'fill-current' : ''}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-yellow-400 rounded-full" 
                              style={{ width: `${base.ratings.location * 20}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-gray-700">Wyposażenie</span>
                            <div className="flex text-yellow-400">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < Math.floor(base.ratings.facilities) ? 'fill-current' : ''}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-yellow-400 rounded-full" 
                              style={{ width: `${base.ratings.facilities * 20}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-gray-700">Obsługa</span>
                            <div className="flex text-yellow-400">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < Math.floor(base.ratings.staff) ? 'fill-current' : ''}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-yellow-400 rounded-full" 
                              style={{ width: `${base.ratings.staff * 20}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-gray-700">Stosunek jakości do ceny</span>
                            <div className="flex text-yellow-400">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < Math.floor(base.ratings.value) ? 'fill-current' : ''}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-yellow-400 rounded-full" 
                              style={{ width: `${base.ratings.value * 20}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {base.reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium">{review.author}</h3>
                              <p className="text-sm text-gray-500">{review.date}</p>
                            </div>
                            <div className="flex text-yellow-400">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < review.rating ? 'fill-current' : ''}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700">{review.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="availability" className="focus-visible:outline-none">
                  <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-bold mb-6">Dostępność terminów</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {base.availability.map((month) => (
                        <div key={month.month}>
                          <h3 className="font-medium mb-4">{month.month}</h3>
                          <div className="grid grid-cols-7 gap-1">
                            {['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'].map((day) => (
                              <div key={day} className="text-center text-sm text-gray-500 py-1">
                                {day}
                              </div>
                            ))}
                            
                            {Array(0).fill(0).map((_, i) => (
                              <div key={`empty-${i}`}></div>
                            ))}
                            
                            {month.days.map((day) => (
                              <button
                                key={day.day}
                                className={`h-10 rounded-md flex items-center justify-center text-sm ${
                                  day.status === 'available' 
                                    ? 'bg-scout-50 text-scout-700 hover:bg-scout-100'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                              >
                                {day.day}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-center gap-6 mt-8">
                      <div className="flex items-center">
                        <div className="w-4 h-4 rounded-sm bg-scout-50 mr-2"></div>
                        <span className="text-sm">Dostępne</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 rounded-sm bg-gray-100 mr-2"></div>
                        <span className="text-sm">Niedostępne</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="md:w-1/3">
              <div className="sticky top-24">
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h2 className="text-xl font-bold mb-4">Rezerwacja</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Cena za osobę:</span>
                      <span className="font-medium">{base.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Minimalna długość pobytu:</span>
                      <span className="font-medium">5 dni</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Wyżywienie:</span>
                      <span className="font-medium">W cenie</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Maksymalna liczba osób:</span>
                      <span className="font-medium">{base.capacity}</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-scout-500 text-white py-3 rounded-lg font-medium hover:bg-scout-600 transition-colors mb-3">
                    Sprawdź dostępność
                  </button>
                  
                  <button className="w-full flex items-center justify-center py-3 border border-scout-500 text-scout-500 rounded-lg font-medium hover:bg-scout-50 transition-colors">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Wyślij wiadomość
                  </button>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h2 className="text-xl font-bold mb-4">Kontakt</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <User className="h-5 w-5 text-scout-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Komendant bazy</h3>
                        <p className="text-gray-600">{base.contact.manager}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-scout-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Telefon</h3>
                        <p className="text-gray-600">{base.contact.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-scout-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-gray-600">{base.contact.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <MobileNav />
    </div>
  );
};

export default BaseDetails;
