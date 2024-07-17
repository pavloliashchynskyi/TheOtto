import { App, Button, Checkbox, DatePicker, Form, Input, Popover, Select } from "antd";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import InputMask from "react-input-mask";

import { dataCollectionAPI } from "../../../redux/services/DataCollectionService";
import { CollectFormType } from "../../../types/collectDataTypes";

import "./collectDataPage.styles.css";

const { Option } = Select;

export const CollectDataPage = () => {
  const [dto, setDto] = useState<CollectFormType | any>({});

  const [form] = Form.useForm();

  const { notification } = App.useApp();

  const [
    collectUserDataMutation,
    {
      isLoading: collectUserDataLoading,
      error: collectUserDataError,
      isSuccess: collectUserDataSuccess,
    },
  ] = dataCollectionAPI.useCollectUserDataMutation();

  const [
    sendCollectedUserDataMutation,
    {
      isLoading: sendCollectedUserDataLoading,
      error: sendCollectedUserDataError,
      isSuccess: sendCollectedUserDataSuccess,
      data: sendCollectedUserData,
    },
  ] = dataCollectionAPI.useSendCollectedDataToAPIMutation();

  const sendCollectedData = useCallback(async (dtobj: any) => {
    if (Object.keys(dtobj).length) {
      const obj = {
        Client: {
          PostCode: "75016",
          BirthDate: dayjs(dtobj.dbo).toISOString(),
          SocialSecurityRegime: "RG",
          Name: dtobj.lastName,
          MaidenName: "string",
          FirstName: dtobj.firstName,
          SocialSecurityNumber: "string",
          Title: 0,
          OrganismeCode: "string",
          FamilySituation: 0,
          Email: dtobj.email,
        },
        EffectDate: "2024-07-18T11:54:23.568Z",
        Level: "Niveau 1",
        Commission: 0,
        OptionLevel: "string",
        BrokerCode: 0,
        BrokerAdministrativeFees: 0,
        SpvieAdministrativeFeesRate: 0,
        ProductCategory: 15,
        Freelancer: true,
        AnnualRevenue: 30,
        ProductSpecificFields: {
          RcProPrestaServiceFields: {
            ActivityKeys: ["string"],
            ActivityFamily: "string",
            OptionList: [
              {
                Name: 0,
                IsActive: true,
              },
            ],
            AutoEntrepreneurConditions: true,
            InfoNotice: true,
            IsAccepted: true,
          },
          InsuranceCoverType: 0,
        },
        IsSurcoEnabled: true,
        PaymentPeriod: 0,
        SourceApp: 0,
      };

      await sendCollectedUserDataMutation(obj);
    }
  }, []);

  useEffect(() => {
    if (collectUserDataError) {
      notification.error({
        message: "Error (collecting data)",
        description: collectUserDataError.toString(),
        placement: "topRight",
      });
    }
  }, [collectUserDataError]);

  useEffect(() => {
    if (collectUserDataSuccess) {
      notification.success({
        message: "Success",
        description: "Data has been stored successfully",
        placement: "topRight",
      });

      setTimeout(() => {
        form.resetFields();
      }, 600);
    }
  }, [collectUserDataSuccess]);

  useEffect(() => {
    if (sendCollectedUserDataError) {
      notification.error({
        message: "Error (calculating price)",
        description: sendCollectedUserDataError.toString(),
        placement: "topRight",
      });
    }
  }, [sendCollectedUserDataError]);

  useEffect(() => {
    if (sendCollectedUserDataSuccess) {
      notification.info({
        message: `Price: ${sendCollectedUserData.Price}`,
        placement: "topRight",
      });

      setTimeout(() => {
        collectUserDataMutation({
          ...dto,
          price: sendCollectedUserData.Price.toString(),
        });
      }, 600);
    }
  }, [sendCollectedUserDataSuccess]);

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
        setDto(values);
        await sendCollectedData(values);
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
            rules={[
              { required: true, message: "Veuillez entrer votre prénom!" },
              { pattern: /^[a-zA-Z]+$/, message: "Veuillez entrer un prénom valide!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Nom"
            rules={[
              { required: true, message: "Veuillez entrer votre nom!" },
              { pattern: /^[a-zA-Z]+$/, message: "Veuillez entrer un nom valide!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="dob"
            label="Date de naissance"
            rules={[{ required: true, message: "Veuillez sélectionner votre date de naissance!" }]}
          >
            <DatePicker style={{ width: "100%" }} placeholder="" format="DD.MM.YYYY" />
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
              <Popover
                content={
                  <div>
                    <strong>
                      - Avoir mis en place les mesures d'hygiène informatique suivantes :
                    </strong>
                    <li>
                      - Protection permanente de type anti-virus sur les systèmes informatiques
                      locaux contenant des bases de données
                    </li>
                    <li>- Pares-feux installés à tous les points de connexion à internet</li>
                    <li>
                      - Sauvegarde hebdomadaire des données sur des systèmes ou des supports de
                      données distincts
                    </li>
                    <li>
                      - Mise à jour et mise à niveaux régulières des systèmes d’exploitation et des
                      logiciels selon les évolutions transmises par les éditeurs
                    </li>
                    <li>
                      <strong>
                        - Justifier sur les cinq dernières années d'aucun événement susceptible
                        d’être couvert par la garantie
                      </strong>
                    </li>
                    <strong>Cyber proposé au Contrat</strong>
                  </div>
                }
              >
                <Checkbox value="Option Cyber">Option Cyber</Checkbox>
              </Popover>
              <Popover
                content={
                  <div>
                    <li>
                      - Avoir eu des résultats nets positifs sur les deux derniers états financiers
                    </li>
                    <li>
                      - Disposer de fonds propres positifs sur les deux derniers états financiers
                    </li>
                    <li>
                      - Justifier sur les cinq dernières années d'aucune réclamation de tiers
                      engageant leur Responsabilité en tant que dirigeant de fait ou de droit
                    </li>
                  </div>
                }
              >
                <Checkbox value="Option Responsabilité du dirigeant">
                  Option Responsabilité du dirigeant
                </Checkbox>
              </Popover>
              <Checkbox value="Option Homme-clé">Option Homme-clé</Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={collectUserDataLoading || sendCollectedUserDataLoading}
            >
              Soumettre
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
