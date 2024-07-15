import { App, Table } from "antd";
import { useEffect, useMemo } from "react";

import { dataCollectionAPI } from "../../../redux/services/DataCollectionService";
import { Loader } from "../../Loader/Loader";

import dayjs from "dayjs";
import "./dashboardPage.styles.css";

export const DashboardPage = () => {
  const { notification } = App.useApp();

  const { data, isLoading, error } = dataCollectionAPI.useFetchCollectedUserDataFromDBQuery();

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
      })),
    [data],
  );

  return (
    <div className="dashboardPageWrapper">
      {isLoading && !data && <Loader />}
      {data && <Table columns={tableColumns} dataSource={dataSource} pagination={false} />}
    </div>
  );
};
