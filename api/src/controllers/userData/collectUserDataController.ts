import { Response } from "express";

import { handleApiError } from "../../helpers/handleApiError";
import { validateByRules } from "../../helpers/inputValidator";
import { UserData } from "../../models/UserData";

export const collectUserDataController = async (req: any, res: Response) => {
  try {
    const {
      body,
      body: { firstName, lastName, dob, email, phone, activityFamily, options },
    } = req;

    const isDataValid = await validateByRules(body, {
      firstName: "string|required|minLength:3|maxLength:50",
      lastName: "string|required|minLength:3|maxLength:50",
      dob: "required|minLength:3",
      email: "string|required|minLength:5|maxLength:50",
      phone: "string|required|minLength:3",
      activityFamily: "required|minLength:3",
      options: "array|required",
    });

    if (!isDataValid) {
      return handleApiError(res, 422, {
        err: "Invalid input data",
      });
    }

    const userData = await UserData.create({
      firstName,
      lastName,
      dob,
      email,
      phone,
      activityFamily,
      options,
    });

    res.status(201).json({
      collected: userData,
    });
  } catch (err) {
    if (err instanceof Error) {
      handleApiError(res, 500, {
        err: `Collect data error. ${err.toString()}`,
      });
    }
  }
};
