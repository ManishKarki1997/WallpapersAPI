const express = require("express");
const Router = express.Router();

const { Wallpaper } = require("../models");

Router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const count = parseInt(req.query.count) || 20;
  const sortByDate = req.query.sortByDate || -1;
  const filterQuery = req.query.filter || "latest";

  const popularSort = filterQuery == "popular" ? -1 : 1;
  // const sortType = sortByDate === "latest" ? -1 : 1;

  try {
    // total documents count
    const totalDocuments = await Wallpaper.countDocuments();

    // pagination "logic"
    Wallpaper.find({})
      // .sort({ dateAdded: sortType })
      .sort({ views: popularSort })
      .skip(page * count)
      .limit(count)
      .exec((err, docs) => {
        if (err) {
          console.log(err);
        }
        return res.status(200).send({
          error: false,
          message: "Wallpapers fetched successfully",
          payload: {
            wallpapers: docs,
            totalPages: Math.floor(totalDocuments / count),
            currentPage: page,
            prev: page == 0 ? false : true,
            next: page < Math.floor(totalDocuments / count) ? true : false,
          },
        });
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

// get similar wallpapers to the requested tags
Router.get("/similar/:wallpaperId", async (req, res) => {
  try {
    const wallpaper = await Wallpaper.findOne({ _id: req.params.wallpaperId });
    const wallpaperTags = wallpaper.tags;

    if (wallpaperTags.length == 0) {
      return res.send({
        error: false,
        payload: {
          similarWallpapers: [],
        },
      });
    }
    const tagIds = wallpaperTags.map((tag) => {
      return {
        tagId: tag.tagId,
      };
    });
    const similarWallpapers = await Wallpaper.find({ tags: { $elemMatch: { $or: tagIds } } }).limit(8);
    return res.send({
      error: false,
      payload: {
        similarWallpapers,
      },
    });
  } catch (error) {
    console.log(error);
    return res.send({
      error: true,
      message: "Something went wrong finding similar wallpapers",
    });
  }
});

// get wallpapers for a category
Router.get("/category/:categoryId", async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const count = parseInt(req.query.count) || 20;
  const filterQuery = req.query.filter || "latest";

  const popularSort = filterQuery == "popular" ? -1 : 1;
  try {
    const totalDocuments = await Wallpaper.find({ tags: { $elemMatch: { tagId: req.params.categoryId } } });

    Wallpaper.find({ tags: { $elemMatch: { tagId: req.params.categoryId } } })
      .sort({ views: popularSort })
      .skip(page * count)
      .limit(count)
      .exec(function (err, docs) {
        return res.send({
          error: false,
          payload: {
            wallpapers: docs,
            totalPages: Math.floor(totalDocuments.length / count) == 0 ? 1 : Math.floor(totalDocuments.length / count),
            currentPage: page,
            prev: page == 0 ? false : true,
            next: page < Math.floor(totalDocuments.length / count) ? true : false,
          },
        });
      });
  } catch (error) {
    console.log(error);
    return res.send({
      error: true,
      message: "Failed to fetch wallpapers for that category.",
    });
  }
});

module.exports = Router;
