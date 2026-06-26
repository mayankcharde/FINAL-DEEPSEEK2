import React from "react";
import Sidebar from "../components/Sidebar";
import ChatArea from "../components/ChatArea";
import FloatingButton from "../components/FloatingButton";
import MobileMenu from "../components/MobileMenu";

function Home() {
  return (
    <div className="relative flex h-[100dvh] w-screen overflow-hidden bg-black">
      <div className="hidden md:block flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col h-full min-w-0">
        <ChatArea />
      </div>
      <div className="md:hidden">
        <MobileMenu />
        <FloatingButton />
      </div>
    </div>
  );
}

export default Home;
