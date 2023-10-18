import Header from "@/components/Telegram/HeaderTG";
import Chat from "@/components/Telegram/ChatTG";

export default function TelegramManon() {
  return (
    <div className="bg-[#F8F8F8] h-screen bg-[url('/backgroundtelegram.jpg')] bg-cover">
      <Header />
      <Chat />
    </div>
  );
}
