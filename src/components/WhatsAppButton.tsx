import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "584146807886"; // Placeholder

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20me%20gustaría%20agendar%20una%20evaluación`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] md:hover:bg-[#20BD5A] text-white flex items-center justify-center shadow-lg md:hover:shadow-xl md:hover:scale-110 active:scale-95 transition-[transform,box-shadow,background-color] duration-200"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  );
}
