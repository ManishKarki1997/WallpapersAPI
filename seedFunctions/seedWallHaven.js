const { ScrapeWallhaven } = require("../scrapers");

async function seedWallhaven() {
  const totalURLs = [];

  // for now, scrape 300 pages to seed for this domain
  for (let i = 10; i <= 300; i++) {
    totalURLs.push({
      domain: "https://wallhaven.cc",
      filter: "latest",
      pageIndex: i,
    });
  }

  //   delay to allow server to connect to mongodb
  setTimeout(async () => {
    // need to wait for certain interval between each page scraping
    // couldn't figure out proper way to do it
    // *sigh*
    // Update: thanks Dan : https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
    for (let i = 0; i < totalURLs.length; i++) {
      await sleep(5000); // sleep so that the server doesn't ban us or throw 'too many requests' response
      ScrapeWallhaven(totalURLs[i].domain, totalURLs[i].filter, totalURLs[i].pageIndex);
    }
  }, 2000);
}

// function to sleep for certain milliseconds
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = seedWallhaven;
