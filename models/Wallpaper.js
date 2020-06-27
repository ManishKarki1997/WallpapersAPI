const mongoose = require("mongoose");

const WallpaperSchema = new mongoose.Schema({
  srcUrl: {
    type: String,
  },
  previewWallpaper: {
    type: String,
    required: true,
  },
  fullWallpaperUrl: {
    type: String,
    required: true,
  },
  wallpaperDomain: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Wallpaper", WallpaperSchema);
