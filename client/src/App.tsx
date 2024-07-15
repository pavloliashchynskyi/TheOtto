import { App as AntdApp, ConfigProvider, theme } from "antd";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { Router } from "./routes/Router";

// axios.defaults.baseURL = "http://127.0.0.1:1337";

export const App = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};
