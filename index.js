const express = require("express");
const morgan = require("morgan");

const bankRouter = require("./routes/bankRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
    console.log("hello from the middleware");
    next();
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})


app.use("/api/v1/banks", bankRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
