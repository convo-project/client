import { MENU_ITEMS } from "../../constants/menu";
import { TMenuProps } from "../../types/menu";

const Menu = ({ selectedMenu, handleMenuClick }: TMenuProps) => {
  return (
    <aside className="flex flex-col sticky top-0 w-[100px] h-full gap-[20px]">
      {MENU_ITEMS.map(({ id, icon: Icon, name }) => (
        <div
          key={id}
          className="flex flex-col gap-[10px] justify-center items-center w-full h-[100px] cursor-pointer"
          onClick={() => handleMenuClick(id)}>
          <Icon
            className={`${selectedMenu === id ? "text-indigo-900" : "text-neutral-600"} w-[50px] h-[50px] hover:opacity-80`}
          />
          <span className={`${selectedMenu === id ? "text-indigo-900" : "text-neutral-600"}`}>{name}</span>
        </div>
      ))}
    </aside>
  );
};

export default Menu;
