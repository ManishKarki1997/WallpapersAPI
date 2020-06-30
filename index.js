const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cron = require("node-cron");
dotenv.config();

const seedWallhaven = require("./seedFunctions/seedWallHaven");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/wallpaperapp";
const MONGODB_URI = "mongodb://localhost:27017/wallpapersapp";

// Controllers
const { WallpaperController } = require("./controllers");

const url = "https://wallhaven.cc";
let pageIndex = 1;
const filter = "latest";
const totalPages = 2;

app.get("/", (req, res) => {
  res.send("Welcome to the API.");
});

app.use("/api/wallpaper", WallpaperController);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongodb Connected");
  })
  .catch((err) => console.log("error ", err));

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.log("Server running on port", PORT);
});

// run every 4 hours
const everyFourHour = "0 */4 * * *";
const everyMinute = "* * * * *";
const everyTwoMinute = "*/2 * * * *";

cron.schedule(everyFourHour, () => {
  seedWallhaven(null, totalPages);
  // ScrapeWallhaven(url, filter, pageIndex, totalPages);
});

// seedWallhaven(2278, 10);
