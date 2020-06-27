const express = require("express");
const Router = express.Router();

const { Wallpaper } = require("../models");

Router.get("/", async (req, res) => {
  try {
    const wallpapers = await Wallpaper.find({});
    return res.send({
      error: false,
      message: "Wallpapers fetched successfully",
      payload: wallpapers,
    });
  } catch (error) {
    console.error(error);
    return res.send({
      error: true,
      message: "Something went wrong while fetching the wallpapers",
      payload: error,
    });
  }
});

module.exports = Router;
