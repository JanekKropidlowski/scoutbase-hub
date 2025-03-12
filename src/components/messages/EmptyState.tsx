
import { MessageSquare } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="hidden md:flex flex-col flex-grow items-center justify-center text-center p-8">
      <div className="w-16 h-16 bg-scout-50 rounded-full flex items-center justify-center text-scout-500 mb-4">
        <MessageSquare className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-bold mb-2">Wybierz rozmowę</h3>
      <p className="text-gray-500 max-w-sm">
        Zaznacz rozmowę z listy po lewej stronie lub rozpocznij nową, kontaktując się z właścicielem bazy.
      </p>
    </div>
  );
};

export default EmptyState;
