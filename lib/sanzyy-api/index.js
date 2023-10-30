//const version = require("./package.json").version

module.exports = {
  creator: "Sanzy Dev",
  version: '1.0.0',
  tools: require("./src/tools.js"),
  downloader: require("./src/downloader.js"),
  search: require("./src/search.js"),
  random: require("./src/random.js"),
  ai: require("./src/ai.js")
}
