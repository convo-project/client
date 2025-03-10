export type MenuId = "user" | "chat" | "settings";

export type TMenuProps = { selectedMenu: string; handleMenuClick: (id: MenuId) => void };
