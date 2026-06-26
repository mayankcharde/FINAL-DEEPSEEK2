import React from "react";
import Sidebar from "../components/Sidebar";
import ChatArea from "../components/ChatArea";
import FloatingButton from "../components/FloatingButton";
import MobileMenu from "../components/MobileMenu";

function Home() {
  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-black">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col h-full">
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
