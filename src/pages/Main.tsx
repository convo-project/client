import { useState } from "react";
import Header from "../components/main/Header";
import Menu from "../components/main/Menu";
import Profile from "../components/main/Profile";
import { MenuId } from "../types/menu";

export default function MainPage() {
  const [selectedMenu, setSelectedMenu] = useState<MenuId>("user");

  const handleMenuClick = (id: MenuId) => {
    setSelectedMenu(id);
  };

  return (
    <div className="flex flex-col gap-[20px] w-full py-[30px] px-[20px] overflow-hidden">
      <Header />
      <Profile />
      <section className="flex gap-[20px] w-full h-full">
        <Menu selectedMenu={selectedMenu} handleMenuClick={handleMenuClick} />
        <div className="w-full h-full flex flex-col flex-1 rounded-[5px] rounded-b-[5px] border-2 border-indigo-200 bg-white overflow-y-scroll scrollbar-hide"></div>
      </section>
    </div>
  );
}
