var SI_SYMBOL = ["", "K", "M", "G", "T", "P", "E"]

function convertMs(duration) {
  seconds = parseInt((duration / 1000) % 60)
  minutes = parseInt((duration / (1000 * 60)) % 60)
  hours = parseInt((duration / (1000 * 60 * 60)) % 24)
  hours = hours < 10 ? "0" + hours : hours
  minutes = minutes < 10 ? "0" + minutes : minutes
  seconds = seconds < 10 ? "0" + seconds : seconds
  return hours + ":" + minutes + ":" + seconds
}

function convertSec(sec) {
  var hours = Math.floor(sec / 3600)
  hours >= 1 ? (sec = sec - hours * 3600) : (hours = "00")
  var min = Math.floor(sec / 60)
  min >= 1 ? (sec = sec - min * 60) : (min = "00")
  sec < 1 ? (sec = "00") : void 0
  min.toString().length == 1 ? (min = "0" + min) : void 0
  sec.toString().length == 1 ? (sec = "0" + sec) : void 0
  return hours + ":" + min + ":" + sec
}

function convertNum(number) {
  // what tier? (determines SI symbol)
  var tier = (Math.log10(Math.abs(number)) / 3) | 0
  // if zero, we don't need a suffix
  if (tier == 0) return number
  // get suffix and determine scale
  var suffix = SI_SYMBOL[tier]
  var scale = Math.pow(10, tier * 3)
  // scale the number
  var scaled = number / scale
  // format number and add suffix
  return scaled.toFixed(1) + suffix
}

module.exports = { convertNum, convertSec, convertMs }
