import { Response } from "express";

import { handleApiError } from "../../helpers/handleApiError";
import { UserData } from "../../models/UserData";

export const getCollectedUserDataFromDBController = async (req: any, res: Response) => {
  try {
    const dto = await UserData.find();

    res.json({
      collected: dto,
    });
  } catch (err) {
    if (err instanceof Error) {
      handleApiError(res, 500, {
        err: `Get collect data error. ${err.toString()}`,
      });
    }
  }
};
