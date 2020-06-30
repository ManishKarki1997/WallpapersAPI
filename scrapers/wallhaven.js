const cheerio = require("cheerio");
const getHTML = require("../helpers/getHTML");
const saveWallpaper = require("../helpers/saveWallpaper");
const getFullWallpaperDetails = require("../helpers/getFullWallpaperDetails");
// const url = "https://wallhaven.cc/toplist?page=";
// let pageIndex = 1;

// function to sleep for certain milliseconds
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function scrapeWallhaven(categoryId, url, filter, pageIndex) {
  const scrapeUrl = categoryId === null ? `${url}/${filter}?page=${pageIndex}` : `${url}/search?q=id%3A${categoryId}&sorting=toplist?page=${pageIndex}`;
  console.log(scrapeUrl);
  const res = await getHTML(scrapeUrl);
  if (res.error) {
    return;
  }

  const $ = cheerio.load(res);
  let images = [];

  $(".thumb-listing-page ul li").each(async function (i, el) {
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

    // const wallpaperMetaInfo = await getFullWallpaperDetails(srcUrl);
    // console.log(wallpaperMetaInfo);
    // return;

    const image = {
      previewWallpaper,
      srcUrl,
      fullWallpaperUrl,
      wallpaperDomain: "https://wallhaven.cc",
      dateAdded: Date.now(),
    };
    images.push(image);
  });
  return images;
}

module.exports = scrapeWallhaven;
