const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = 4000;

const path = require("path");
const authRouter = require("./routes/auth");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");
const session = require("cookie-session");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use("/static", express.static(path.join(__dirname, "public")));

const DB_URI =
process.env.MONGOLAB_URI;


app.use(cookieParser());
app.use(
  session(
    {
      cookie: {
        httpOnly: true,
        sameSite: true,
        secure: true,
    },
    resave: false,
    saveUninitialized: true,
    secret: "process.env.secret",
    name: "ses",
  })
  );

app.use("/", authRouter);



mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => console.log(`listening on ${port}`));
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });

