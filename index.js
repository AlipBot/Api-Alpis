//_______________________ ┏  Info  ┓ _______________________\\
//
//   Credit : AlipBot
//
//   Note
//   Jangan Jual SC ini ,
//   Jangan Buang Text ini,
//   Siapa Mahu Upload Jangan Lupa Credit :),
//   Siapa Tidak Letak Credit Akan Ambil Tindakan
//
//_______________________ ┏ Make By AlipBot ┓ _______________________\\

//―――――――――――――――――――――――――――――――――――――――――― ┏  Modules ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

require("./settings");
const express = require("express");
const app = express();
const favicon = require("serve-favicon");
const path = require("path");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const mongoose = require("mongoose");
const expressSession = require("express-session");
const MemoryStore = require("memorystore")(expressSession);
const passport = require("passport");
const flash = require("connect-flash");
const csrf = require("csurf");
const cron = require("node-cron");
const bodyParser = require("body-parser");
const User = require("./model/user");
const dataweb = require("./model/DataWeb");

//_______________________ ┏ Funtion ┓ _______________________\\

async function resetapi() {
  await User.updateMany({}, { $set: { limitApikey: LimitApikey } });
  console.log("RESET LIMIT DONE");
}

async function ResetRequestToday() {
  await dataweb.updateOne(
    {},
    {
      RequestToday: 0,
    }
  );
  console.log("RESET Request Today DONE");
}

//_______________________ ┏ Code ┓ _______________________\\

(cors = require("cors")), (secure = require("ssl-express-www"));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));
var main = require("./routes/main"),
  api = require("./routes/api");
app.set("view engine", "ejs");
app.set("views", __dirname + "/view");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//_______________________ ┏ Connect Database ┓ _______________________\\

mongoose.set("strictQuery", false);
mongoose
  .connect(keymongodb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected !");
    let limit = await dataweb.findOne();
    if (limit === null) {
      let obj = { RequestToday: 0 };
      await dataweb.create(obj);
      console.log("DATA WEBSITE Sussces Create");
    }
  });

//_______________________ ┏ CronJob For Reset Limit ┓ _______________________\\

// Reset Request Today Setiap sehari
cron.schedule(
  "0 0 0 * * *",
  () => {
    ResetRequestToday();
  },
  {
    scheduled: true,
    timezone: "Asia/Jakarta",
  }
);

//Reset All User Apikey Limit setiap sebulan
cron.schedule(
  "0 0 1 * *",
  () => {
    resetapi();
  },
  {
    scheduled: true,
    timezone: "Asia/Jakarta",
  }
);

//_______________________ ┏ Code ┓ _______________________\\

app.use(cookieParser("random"));
app.use(
  expressSession({
    secret: "random",
    resave: true,
    saveUninitialized: true,
    maxAge: 24 * 60 * 60 * 1000,
    store: new MemoryStore(),
  })
);
app.use(csrf());
app.use(passport.initialize());
app.use(express.static("public"));
app.use(passport.session());
app.set("trust proxy", true);
app.set("json spaces", 2);
app.use(cors());
app.use(secure);
app.use(flash());
app.use(function (req, res, next) {
  res.locals.success_messages = req.flash("success_messages");
  res.locals.error_messages = req.flash("error_messages");
  res.locals.error = req.flash("error");
  next();
});
app.use("/", main);
app.use("/", api);
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  res.render("404");
});

module.exports = app;

//_______________________ ┏ Make By AlipBot ┓ _______________________\\
