import { MENU_ROUTES } from "../../routes/common";

export const getSelectedMenuItem = (pathname: string) => {
  if (pathname === MENU_ROUTES.root) {
    return [];
  } else {
    const defaultMenu = Object.entries(MENU_ROUTES).find(([, route]) => route === pathname);
    return defaultMenu ? [defaultMenu[0]] : [MENU_ROUTES.root];
  }
};
