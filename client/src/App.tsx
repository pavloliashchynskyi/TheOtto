import { App as AntdApp, ConfigProvider, theme } from "antd";
import { BrowserRouter } from "react-router-dom";

import { Router } from "./routes/Router";

// axios.defaults.baseURL = "http://127.0.0.1:1337";

export const App = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <AntdApp>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AntdApp>
    </ConfigProvider>
  );
};
