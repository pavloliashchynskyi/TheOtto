import { Validator } from "node-input-validator";

export const validatorRules = {
  email: { email: "required|email" },
  password: { password: "required|minLength:5|maxLength:50" },
  firstName: { firstName: "required|minLength:3|maxLength:50" },
  middleName: { middleName: "maxLength:50" },
  lastName: { lastName: "required|minLength:3|maxLength:50" },

  phone: { phone: "maxLength:50" },
  messenger: { messenger: "maxLength:50" },
  photo: { photo: "url" },

  offset: { offset: "required|min:0" },
  limit: { limit: "required|min:1|max:100" },
  customer: { customer: "required|minLength:24|maxLength:24" },
};

export const validateByRules = async (data = {}, validationRules = {}) => {
  const validator = new Validator(data, validationRules);

  return validator.check();
};
