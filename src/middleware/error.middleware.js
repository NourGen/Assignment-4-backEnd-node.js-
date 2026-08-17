import { NODE_ENV } from "../config.js";

export const globalErroeHandling = (error, req, res, next) => {
  return res.status(error.cause?.status ?? 500).json({
    error_message: error.message || "somthing went wrong",
    error: NODE_ENV == "development" ? error : undefined,
    stack: NODE_ENV == "development" ? error.stack : undefined,
  });
};
// if (false) {
// throw new Error("MESSAGE", { cause: { status: code } })
// }
