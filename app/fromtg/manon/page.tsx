import Header from "@/components/Telegram/HeaderTG";
import Chat from "@/components/Telegram/ChatTG";
import { Dialog } from "@/components/ui/dialog";
import Popup from "@/components/Popup";

export default function TiktokManon() {
  return (
    <div className="bg-[#F8F8F8] h-screen bg-[url('/backgroundtelegram.jpg')] bg-cover">
      <Dialog>
        <Header />
        <Chat />
        <Popup />
      </Dialog>
    </div>
  );
}
