import { Button, Checkbox, DatePicker, Form, Input, Select, Tooltip } from "antd";

import "./collectDataPage.styles.css";

const { Option } = Select;

export const CollectDataPage = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {};

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
            label="Prénom [First Name]"
            rules={[{ required: true, message: "Veuillez entrer votre prénom!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Nom [Last Name]"
            rules={[{ required: true, message: "Veuillez entrer votre nom!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="dob"
            label="Date de naissance [Date of Birth]"
            rules={[{ required: true, message: "Veuillez sélectionner votre date de naissance!" }]}
          >
            <DatePicker style={{ width: "100%" }} />
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
            label="Numéro de téléphone [Phone Number]"
            rules={[{ required: true, message: "Veuillez entrer votre numéro de téléphone!" }]}
          >
            <Input type="tel" />
          </Form.Item>

          <Form.Item
            name="activityFamily"
            label="Famille d’activité [Business Activity Family]"
            rules={[{ required: true, message: "Veuillez sélectionner une famille d’activité!" }]}
          >
            <Select placeholder="Sélectionnez une famille d’activité">
              <Option value="Conseil/Service aux Entreprises/Education/Formation">
                Conseil/Service aux Entreprises/Education/Formation
              </Option>
              <Option value="Bien-Être">Bien-Être</Option>
              <Option value="Informatique et Technologie">Informatique et Technologie</Option>
              <Option value="Média/Marketing">Média/Marketing</Option>
              <Option value="Service à la personne">Service à la personne</Option>
              <Option value="Activités Spécifiques">Activités Spécifiques</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="options"
            label="Options"
            rules={[{ required: true, message: "Veuillez sélectionner au moins une option!" }]}
          >
            <Checkbox.Group style={{ display: "flex", flexDirection: "column" }}>
              <Tooltip title="test">
                <Checkbox value="Option1">Option Cyber - [Cyber Liability]</Checkbox>
              </Tooltip>
              <Tooltip title="test">
                <Checkbox value="Option2">
                  Option Responsabilité du dirigeant [Director's Liability]
                </Checkbox>
              </Tooltip>
              <Checkbox value="Option3">Option Homme-clé [Key Person]</Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Soumettre
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
