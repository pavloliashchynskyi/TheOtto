import { Layout, Menu } from "antd";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import React, { useCallback, useMemo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { MENU_ROUTES } from "../../routes/common";
import { MENU_ITEMS_KEYS } from "./common";
import { getSelectedMenuItem } from "./helpers";

const { Header, Content, Footer } = Layout;

export const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: ItemType<MenuItemType>[] = useMemo(
    () => [
      { key: MENU_ITEMS_KEYS.COLLECT_DATA, label: "Collecte de données" },
      { key: MENU_ITEMS_KEYS.DASHBOARD, label: "Tableau de bord" },
    ],
    [],
  );

  const onItemChange = useCallback(
    (item: any) => {
      navigate(MENU_ROUTES[item.key] || MENU_ROUTES.root);
    },
    [navigate],
  );

  return (
    <Layout style={{ minHeight: "100vh", background: "unset" }}>
      <Header
        style={{
          background: "#f5f5f5",
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Menu
          theme="light"
          mode="horizontal"
          items={menuItems}
          onClick={onItemChange}
          selectedKeys={getSelectedMenuItem(location.pathname)}
          triggerSubMenuAction="click"
          style={{ width: "100%", background: "#f5f5f5" }}
        />
        <div
          style={{
            fontFamily: "Inter",
            fontWeight: 600,
            fontSize: "20px",
          }}
        >
          Otto
        </div>
      </Header>
      <Content style={{ padding: "32px" }}>
        <Outlet />
      </Content>
      <Footer
        style={{ textAlign: "center", fontFamily: "Inter", fontWeight: 500, fontSize: "14px" }}
      >
        Apiko ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};
