export const handleErrorResponse = (
  res,
  err,
  status = 500,
  message = 'Server Error'
) => {
  console.log(err);
  res.status(status).send(message);
};
