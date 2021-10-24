require('dotenv').config();
const express = require('express');

const app = express();

const userRouter = require("./users/userrouter");
app.use(express.json());

app.use("/user", userRouter);

app.listen(process.env.APP_PORT, () => {
    console.log("Server get run at port : ", process.env.APP_PORT);
});