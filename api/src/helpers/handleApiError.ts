import { Response } from "express";

export const handleApiError = (
  res: Response,
  status: number,
  data: { err?: string; status?: string; data?: any } = {},
) => {
  res.status(status);
  res.json({ data });
};
