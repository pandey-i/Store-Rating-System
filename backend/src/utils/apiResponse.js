export const successResponse = (
  res,
  data,
  message = "Success",
  status = 200,
  meta = null
) => {
  return res.status(status).json({
    success: true,
    message,
    data,
    ...(meta && { pagination: meta }),
  });
};

export const errorResponse = (
  res,
  message = "Internal Server Error",
  status = 500
) => {
  return res.status(status).json({
    success: false,
    message,
  });
};