import Header from "@/components/Header";
import Chat from "@/components/Chat";
import { Dialog } from "@/components/ui/dialog";
import Popup from "@/components/Popup";

export default function Home() {
  return (
    <Dialog>
      <Header />
      <Chat />
      <Popup />
    </Dialog>
  );
}
