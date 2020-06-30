const { ScrapeWallhaven } = require("../scrapers");
const getFullWallpaperDetails = require("../helpers/getFullWallpaperDetails");
const saveWallpaper = require("../helpers/saveWallpaper");

// function to sleep for certain milliseconds
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function ScrapeDetailedWallpaperInfo(url, filter, pageIndex) {
  console.log("scraping " + url + "/" + filter + "?pageIndex=" + pageIndex);
  const basicInfo = await ScrapeWallhaven(url, filter, pageIndex);
  let allWallpapers = [];
  for (let i = 0; i < basicInfo.length; i++) {
    await sleep(3000);
    const metaInfo = await getFullWallpaperDetails(basicInfo[i].srcUrl);
    const fullDetails = Object.assign(basicInfo[i], metaInfo);
    allWallpapers.push(fullDetails);
  }
  saveWallpaper(allWallpapers);
}

// ScrapeWallpaperInfo();

module.exports = ScrapeDetailedWallpaperInfo;