const { Wallpaper } = require("../models");

async function saveWallpaper(wallpapers) {
  try {
    if (wallpapers.length === 0) {
      return;
    }

    // fetch existing wallpapers for that domain
    const savedWallpapers = await Wallpaper.find({ wallpaperDomain: wallpapers[0].wallpaperDomain }).sort({ dateAdded: -1 });

    // filter out new wallpapers from existing wallpapers in the database
    const newWalls = wallpapers.filter((wall) => !savedWallpapers.find((oldWall) => oldWall.fullWallpaperUrl === wall.fullWallpaperUrl));
    // only save if there is a new wallpaper available
    if (newWalls.length > 0) {
      await Wallpaper.collection.insertMany(newWalls, function (err, docs) {
        if (err) {
          console.error(err);
          return;
        }
        console.log(`${newWalls.length} wallpapers saved successfully in the database.`);
      });
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = saveWallpaper;
