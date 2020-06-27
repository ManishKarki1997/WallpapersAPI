const axios = require("axios");

async function getHTML(url) {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.error("Error: Status 500");
    }
    console.log(error);
    return {
      error: true,
    };
  }
}

module.exports = getHTML;
