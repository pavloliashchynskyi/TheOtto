import { Spin } from "antd";

import "./loaderStyles.css";

export const Loader = () => {
  return (
    <div className="loadingContainer">
      <Spin size="large" />
    </div>
  );
};
