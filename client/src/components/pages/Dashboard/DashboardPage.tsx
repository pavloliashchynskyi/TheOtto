import { App, Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { dataCollectionAPI } from "../../../redux/services/DataCollectionService";
import { Loader } from "../../Loader/Loader";

import "./dashboardPage.styles.css";

export const DashboardPage = () => {
  const [offset, setOffset] = useState<number>(0);

  const { notification } = App.useApp();

  const { data, isLoading, error } = dataCollectionAPI.useFetchCollectedUserDataFromDBQuery({
    offset,
  });

  useEffect(() => {
    if (error) {
      notification.error({
        message: "Error (get data)",
        description: error.toString(),
        placement: "topRight",
      });
    }
  }, [error]);

  const tableColumns = useMemo(
    () => [
      { title: "Prénom", dataIndex: "firstName", key: "firstName" },
      { title: "Nom", dataIndex: "lastName", key: "lastName" },
      { title: "Date de naissance", dataIndex: "dob", key: "dob" },
      { title: "Email", dataIndex: "email", key: "email" },
      { title: "Numéro de téléphone", dataIndex: "phone", key: "phone" },
      { title: "Famille d’activité", dataIndex: "activityFamily", key: "activityFamily" },
      { title: "Options", dataIndex: "options", key: "options" },
      { title: "Price", dataIndex: "price", key: "price" },
    ],
    [],
  );

  const dataSource = useMemo(
    () =>
      data &&
      data.collected.map((dto: any) => ({
        key: dto._id,
        firstName: dto.firstName,
        lastName: dto.lastName,
        dob: dayjs(dto.dob).format("DD.MM.YYYY"),
        email: dto.email,
        phone: dto.phone,
        activityFamily: dto.activityFamily,
        options: dto.options.map((opt: string) => ` | ${opt}`),
        price: dto.price,
      })),
    [data],
  );

  return (
    <div id="dashboardPageWrapperID" className="dashboardPageWrapper">
      {isLoading && !data && <Loader />}
      {data && (
        <Table
          columns={tableColumns}
          dataSource={dataSource}
          pagination={{
            total: data.count,
            showTotal: (total: number) => `Total ${total} articles`,
            defaultCurrent: 1,
            onChange: (page: number) => {
              if (page === 1) {
                setOffset(0);
              } else {
                setOffset(dataSource.length);
              }
            },
            size: "small",
          }}
          rowKey="key"
          bordered
        />
      )}
    </div>
  );
};
