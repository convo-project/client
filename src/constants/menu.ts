import { FaUser } from "react-icons/fa6";
import { BsChatDotsFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { MenuId } from "../types/menu";

export const MENU_ITEMS = [
  {
    id: "user" as MenuId,
    icon: FaUser,
    name: "친구목록",
  },
  {
    id: "chat" as MenuId,
    icon: BsChatDotsFill,
    name: "채팅",
  },
  {
    id: "settings" as MenuId,
    icon: IoMdSettings,
    name: "설정",
  },
];
