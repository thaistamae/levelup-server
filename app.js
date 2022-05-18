const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
require("./config/db.config")();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: process.env.REACT_APP_URL }));

const businessRouter = require("./api/v1/routes/business.routes");
app.use("/api/business", businessRouter);

const promotionRouter = require("./api/v1/routes/promotion.routes");
app.use("/api/promotion", promotionRouter);

const UserPointsRouter = require("./api/v1/routes/userPoints.routes");
app.use("/api/user-points", UserPointsRouter);

const resetPasswordRouter = require("./api/v1/routes/resetPassword.routes");
app.use(`/api/password`, resetPasswordRouter);

const compensationRuleRouter = require("./api/v1/routes/compensationRules.routes");
app.use(`/api/compensation-rule`, compensationRuleRouter);

app.listen(Number(process.env.PORT), () =>
  console.log(`Server up and running at port ${process.env.PORT}`)
);
