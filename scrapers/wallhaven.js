const cheerio = require("cheerio");
const getHTML = require("../helpers/getHTML");
const saveWallpaper = require("../helpers/saveWallpaper");
// const url = "https://wallhaven.cc/toplist?page=";
// let pageIndex = 1;

async function scrapeWallhaven(url, filter, pageIndex) {
  const res = await getHTML(`${url}/${filter}?page=${pageIndex}`);
  if (res.error) {
    return;
  }

  const $ = cheerio.load(res);
  let images = [];

  $(".thumb-listing-page ul li").each(function (i, el) {
    const previewWallpaper = $(el).find("img").attr("data-src");
    // const imgExt = previewWallpaper.split(".")[3];
    let imgExt = "jpg";
    const wallpaperId = $(el).children("figure").attr("data-wallpaper-id");
    const wallSubId = wallpaperId.substring(0, 2);
    const srcUrl = $(el).find("a.preview").attr("href");
    if ($(el).find(".thumb-info .png").text()) {
      imgExt = "png";
    } else {
      // imgExt = "jpg";
      imgExt = previewWallpaper.split(".")[3]; //jpg essentially
    }
    const fullWallpaperUrl = `https://w.wallhaven.cc/full/${wallSubId}/wallhaven-${wallpaperId}.${imgExt}`;

    const image = {
      previewWallpaper,
      srcUrl,
      fullWallpaperUrl,
      wallpaperDomain: "https://wallhaven.cc",
      dateAdded: Date.now(),
    };
    images.push(image);
  });

  saveWallpaper(images);
}

module.exports = scrapeWallhaven;
