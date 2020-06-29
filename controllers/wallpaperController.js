const express = require("express");
const Router = express.Router();

const { Wallpaper } = require("../models");

Router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const count = parseInt(req.query.count) || 10;
  const sortByDate = req.query.sortByDate || "DESC";

  const sortType = sortByDate === "latest" ? "descending" : "ascending";

  try {
    // total documents count
    const totalDocuments = await Wallpaper.countDocuments();

    // pagination "logic"
    const wallpapers = await Wallpaper.find({})
      .sort({ dateAdded: sortType })
      .skip(page * count)
      .limit(count);

    return res.status(200).send({
      error: false,
      message: "Wallpapers fetched successfully",
      payload: {
        wallpapers,
        totalPages: Math.floor(totalDocuments / count),
        currentPage: page,
        prev: page == 0 ? false : true,
        next: page < Math.floor(totalDocuments / count) ? true : false,
      },
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
