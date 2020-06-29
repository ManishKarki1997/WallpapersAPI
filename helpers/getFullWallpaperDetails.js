const cheerio = require("cheerio");
const getHTML = require("./getHTML");

const getFullWallpaperDetails = async (wallhavenUrl) => {
  //   const wallhavenUrl = "https://wallhaven.cc/w/48ve72";

  const res = await getHTML(wallhavenUrl);

  if (res.error) {
    return;
  }

  const $ = cheerio.load(res);
  const tags = [];
  let uploaderName;
  let uploaderAvatar;
  let uploadedDate;
  let views;

  //  scrape wallpaper tags
  $("#tags li").each(function (i, el) {
    const tagId = $(el).attr("data-tag-id");
    const tagName = $(el).children("a").text();
    tags.push({
      tagId,
      tagName,
    });
  });

  //   scrape wallpaper artist
  uploaderName = $(".showcase-uploader").find("a.username").text();
  uploaderAvatar = "https:" + $(".showcase-uploader").children("a").children("img").attr("src");
  uploadedDate = $(".showcase-uploader").find("time").attr("datetime");
  views = $("#showcase-sidebar > div > div.sidebar-content > div:nth-child(6) > dl > dd:nth-child(8)").text();

  return {
    tags,
    uploaderName,
    uploaderAvatar,
    uploadedDate,
    views,
  };
};
module.exports = getFullWallpaperDetails;
