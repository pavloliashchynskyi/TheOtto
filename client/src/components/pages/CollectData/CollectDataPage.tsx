import { App, Button, Checkbox, DatePicker, Form, Input, Select, Tooltip } from "antd";
import { useCallback, useEffect, useMemo } from "react";
import InputMask from "react-input-mask";

import { dataCollectionAPI } from "../../../redux/services/DataCollectionService";
import { CollectFormType } from "../../../types/collectDataTypes";

import "./collectDataPage.styles.css";

const { Option } = Select;

export const CollectDataPage = () => {
  const [form] = Form.useForm();

  const { notification } = App.useApp();

  const [collectUserDataMutation, { isLoading, error, isSuccess }] =
    dataCollectionAPI.useCollectUserDataMutation();

  useEffect(() => {
    if (error) {
      notification.error({
        message: "Error",
        description: error.toString(),
        placement: "topRight",
      });
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: "Success",
        description: "Data has been collected successfully",
        placement: "topRight",
      });

      setTimeout(() => form.resetFields(), 600);
    }
  }, [isSuccess]);

  const activityFamilyOptions = useMemo(
    () => [
      { value: "Conseil/Service aux Entreprises/Education/Formation" },
      { value: "Bien-Être" },
      { value: "Informatique et Technologie" },
      { value: "Média/Marketing" },
      { value: "Service à la personne" },
      { value: "Activités Spécifiques" },
    ],
    [],
  );

  const onFinish = useCallback(
    async (values: CollectFormType) => {
      if (Object.keys(values).length) {
        await collectUserDataMutation(values);
      }
    },
    [collectUserDataMutation],
  );

  return (
    <div className="collectDataWrapper">
      <div className="collectDataContainer">
        <Form
          form={form}
          name="user_form"
          onFinish={onFinish}
          layout="vertical"
          className="collectDataForm"
        >
          <Form.Item
            name="firstName"
            label="Prénom"
            rules={[{ required: true, message: "Veuillez entrer votre prénom!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Nom"
            rules={[{ required: true, message: "Veuillez entrer votre nom!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="dob"
            label="Date de naissance"
            rules={[{ required: true, message: "Veuillez sélectionner votre date de naissance!" }]}
          >
            <DatePicker style={{ width: "100%" }} placeholder="" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email", message: "Veuillez entrer un email valide!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Numéro de téléphone"
            rules={[
              { required: true, message: "Veuillez entrer votre numéro de téléphone!" },
              { pattern: /^[0-9-]+$/, message: "Veuillez entrer un numéro de téléphone valide!" },
            ]}
          >
            <InputMask mask="999-999-9999">
              {() => <Input type="tel" placeholder="123-456-7890" />}
            </InputMask>
          </Form.Item>

          <Form.Item
            name="activityFamily"
            label="Famille d’activité"
            rules={[{ required: true, message: "Veuillez sélectionner une famille d’activité!" }]}
          >
            <Select placeholder="Sélectionnez une famille d’activité">
              {activityFamilyOptions.map((opt: any, index: number) => (
                <Option key={index} value={opt.value}>
                  {opt.value}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="options"
            label="Options"
            rules={[{ required: true, message: "Veuillez sélectionner au moins une option!" }]}
          >
            <Checkbox.Group style={{ display: "flex", flexDirection: "column" }}>
              <Tooltip title="test">
                <Checkbox value="Option Cyber">Option Cyber</Checkbox>
              </Tooltip>
              <Tooltip title="test">
                <Checkbox value="Option Responsabilité du dirigeant">
                  Option Responsabilité du dirigeant
                </Checkbox>
              </Tooltip>
              <Checkbox value="Option Homme-clé">Option Homme-clé</Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Soumettre
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
