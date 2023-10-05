const axios = require("axios")
const { enhanceImg } = require("./tools.js")

async function textToImage(text) {
  try {
    const { data } = await axios.get("https://tti.photoleapapp.com/api/v1/generate?prompt=" + text)
    const enhanceImages = await enhanceImg(data.result_url, 2)
    const result = {
      status: true,
      url: enhanceImages.url
    }
    return result
  } catch (err) {
    const result = {
      status: false,
      message: String(err)
    }
    console.log(result)
    return result
  }
}

module.exports = { textToImage }
