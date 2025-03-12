
import { Conversation, Message } from "@/types/message";

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    name: "Jan Kowalski",
    baseId: "1",
    baseName: "Stanica Harcerska Biały Las",
    lastMessage: "Dzień dobry, czy baza jest dostępna w terminie 15-29 lipca?",
    timestamp: "10:23",
    unread: true,
    isOwner: true
  },
  {
    id: "2",
    name: "Anna Nowak",
    baseId: "3",
    baseName: "Centrum Szkoleniowe Harcerska Dolina",
    lastMessage: "Potwierdzam rezerwację w podanym terminie. Proszę o wpłatę zaliczki.",
    timestamp: "Wczoraj",
    unread: false,
    isOwner: true
  },
  {
    id: "3",
    name: "Piotr Wiśniewski",
    baseId: "4",
    baseName: "Ośrodek Szkoleniowy Nadwiślańskie Wzgórze",
    lastMessage: "Dziękuję za informacje. Czy mógłbym prosić o przesłanie regulaminu ośrodka?",
    timestamp: "23.03",
    unread: false,
    isOwner: false
  }
];

export const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    conversationId: "1",
    senderId: "user",
    content: "Dzień dobry, czy baza jest dostępna w terminie 15-29 lipca? Szukamy miejsca dla grupy 40 osób.",
    timestamp: "10:23",
    read: true
  },
  {
    id: "2",
    conversationId: "1",
    senderId: "other",
    content: "Dzień dobry, tak, mamy jeszcze miejsca w tym terminie. Czy interesuje Państwa pełne wyżywienie czy tylko nocleg?",
    timestamp: "10:45",
    read: true
  },
  {
    id: "3",
    conversationId: "1",
    senderId: "user",
    content: "Szukamy opcji z pełnym wyżywieniem. Jaki byłby koszt pobytu dla 40 osób przez 14 dni?",
    timestamp: "11:30",
    read: true
  },
  {
    id: "4",
    conversationId: "1",
    senderId: "other",
    content: "Koszt wynosi 65 zł od osoby za dobę z pełnym wyżywieniem. Dla grup powyżej 30 osób oferujemy 5% zniżki. Mogę przesłać pełną ofertę na maila.",
    timestamp: "12:05",
    read: false
  },
  {
    id: "5",
    conversationId: "2",
    senderId: "user",
    content: "Witam, chciałbym dokonać rezerwacji na termin 10-22 sierpnia.",
    timestamp: "Wczoraj",
    read: true
  },
  {
    id: "6",
    conversationId: "2",
    senderId: "other",
    content: "Potwierdzam rezerwację w podanym terminie. Proszę o wpłatę zaliczki.",
    timestamp: "Wczoraj",
    read: true
  },
  {
    id: "7",
    conversationId: "3",
    senderId: "user",
    content: "Dzień dobry, czy mógłbym prosić o więcej informacji na temat wyposażenia bazy?",
    timestamp: "23.03",
    read: true
  },
  {
    id: "8",
    conversationId: "3",
    senderId: "other",
    content: "Dziękuję za informacje. Czy mógłbym prosić o przesłanie regulaminu ośrodka?",
    timestamp: "23.03",
    read: true
  }
];

export const formatTimestamp = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};
