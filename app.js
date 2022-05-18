const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
require("./config/db.config")();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: process.env.REACT_APP_URL }));

const businessRouter = require("./api/routes/business.routes");
app.use("/api/business", businessRouter);

const promotionRouter = require("./api/routes/promotion.routes");
app.use("/api/promotion", promotionRouter);

const UserPointsRouter = require("./api/routes/userPoints.routes");
app.use("/api/user-points", UserPointsRouter);

const resetPasswordRouter = require("./api/routes/resetPassword.routes");
app.use(`/api/password`, resetPasswordRouter);

const compensationRuleRouter = require("./api/routes/compensationRules.routes");
app.use(`/api/compensation-rule`, compensationRuleRouter);

app.listen(Number(process.env.PORT), () =>
  console.log(`Server up and running at port ${process.env.PORT}`)
);
