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
  uploadedDate: {
    type: Date,
  },
  uploaderName: {
    type: String,
    required: true,
  },
  uploaderAvatar: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  tags: [],
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

WallpaperSchema.index({ views: 1, tags: 1 });

module.exports = mongoose.model("Wallpaper", WallpaperSchema);
