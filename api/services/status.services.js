const createdStatus = (res) => {
  return res.status(201);
};

const successStatus = (res) => {
  return res.status(200);
};

const badRequestStatus = (res) => {
  return res.status(400);
};

const unauthorizedStatus = (res) => {
  return res.status(401);
};

const internalServerErrorStatus = (res) => {
  return res.status(500)
}

const notFoundStatus = (res) => {
  return res.status(404)
}

module.exports = {
  createdStatus,
  successStatus,
  badRequestStatus,
  unauthorizedStatus,
  internalServerErrorStatus,
  notFoundStatus
};
