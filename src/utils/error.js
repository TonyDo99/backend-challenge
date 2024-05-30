export const HandlerResponse = (res, { status, data, message }) =>
  res.status(status ? 200 : 403).json({
    status,
    data,
    message,
  });
