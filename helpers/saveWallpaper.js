const { Wallpaper } = require("../models");

async function saveWallpaper(wallpapers) {
  try {
    await Wallpaper.collection.insertMany(wallpapers, function (err, docs) {
      if (err) {
        console.error(err);
      }

      console.log("Wallpapers saved successfully in the database.");
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = saveWallpaper;
