const { ScrapeWallhaven } = require("../scrapers");
const ScrapeDetailedWallpaperInfo = require("../scrapers/ScrapeWallpaperInfo");

async function seedWallhaven(totalPages) {
  const totalURLs = [];

  // run for however pages to scrape

  // --------------------- //
  // using this function to run every x hours, to scrape 'totalPages' pages
  // --------------------- //

  for (let i = 1; i <= totalPages; i++) {
    totalURLs.push({
      domain: "https://wallhaven.cc",
      filter: "toplist",
      pageIndex: i,
    });
  }

  //   delay to allow server to connect to mongodb
  setTimeout(async () => {
    // thanks to Dan : https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
    for (let i = 0; i < totalURLs.length; i++) {
      // sleep so that the server doesn't ban us or throw 'too many requests' response
      // 90 seconds seems to be the minimum delay to not overload the website
      await sleep(90000);

      // ScrapeWallhaven(totalURLs[i].domain, totalURLs[i].filter, totalURLs[i].pageIndex);
      ScrapeDetailedWallpaperInfo(totalURLs[i].domain, totalURLs[i].filter, totalURLs[i].pageIndex);
    }
  }, 4000);
}

// function to sleep for certain milliseconds
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = seedWallhaven;
