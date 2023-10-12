import Header from "@/components/Telegram/HeaderTG";
import Chat from "@/components/Test/TestChatTG";

export default function TestTelegram() {
  return (
    <div className="bg-[#F8F8F8] h-screen bg-[url('/backgroundtelegram.jpg')] bg-cover">
      <Header />
      <Chat />
    </div>
  );
}
