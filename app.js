const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
require("./config/db.config")();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: process.env.REACT_APP_URL }));

const businessRouter = require("./routes/business.routes");
app.use("/api/business", businessRouter);

const pointsRouter = require("./routes/points.routes");
app.use("/api/points", pointsRouter);

const UserPointsRouter = require("./routes/UserPoints.routes");
app.use("/api/user-points", UserPointsRouter);

/*const discountRouter = require("./routes/discount.routes");
app.use("/api/discount", discountRouter);

const userDiscountRouter = require("./routes/userDiscount.routes");
app.use("/api/user-discount", userDiscountRouter);*/

const uploadRouter = require("./routes/uploadImages.routes");
app.use(`/api/upload`, uploadRouter);

const resetPasswordRouter = require("./routes/resetPassword.routes");
app.use(`/api/password`, resetPasswordRouter);

const compensationRuleRouter = require("./routes/compensationRules.routes");
app.use(`/api/compensation-rule`, compensationRuleRouter);

app.listen(Number(process.env.PORT), () =>
  console.log(`Server up and running at port ${process.env.PORT}`)
);
