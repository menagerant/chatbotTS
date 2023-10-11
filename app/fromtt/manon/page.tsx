import Header from "@/components/Tiktok/HeaderTT";
import Chat from "@/components/Tiktok/ChatTT";
import { Dialog } from "@/components/ui/dialog";
import Popup from "@/components/Popup";

export default function TiktokManon() {
  return (
    <div className="bg-[#F8F8F8] h-screen">
      <Dialog>
        <Header />
        <Chat />
        <Popup />
      </Dialog>
    </div>
  );
}
