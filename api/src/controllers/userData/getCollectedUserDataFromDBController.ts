import { Response } from "express";

import { handleApiError } from "../../helpers/handleApiError";
import { UserData } from "../../models/UserData";

export const getCollectedUserDataFromDBController = async (req: any, res: Response) => {
  try {
    const {
      query: { limit, offset },
    } = req;

    const dto = await UserData.find().limit(Number(limit)).skip(Number(offset));
    const count = await UserData.countDocuments();

    res.json({
      collected: dto,
      count,
    });
  } catch (err) {
    if (err instanceof Error) {
      handleApiError(res, 500, {
        err: `Get collect data error. ${err.toString()}`,
      });
    }
  }
};
