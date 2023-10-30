const axios = require("axios")
const fetch = require("node-fetch")
const fs = require("fs")
const formData = require("form-data")
const { fromBuffer } = require("file-type-cjs-fix")

async function uploadFile(buffer) {
  const { ext, mime } = await fromBuffer(buffer)
  const filePath = `temp/${Date.now()}.${ext}`
  await fs.writeFileSync(filePath, buffer)
  const fileData = fs.readFileSync(filePath)
  try {
    const form = new formData()
    form.append("files[]", fileData, `${Date.now()}.${ext}`)
    const { data } = await axios(`https://pomf2.lain.la/upload.php`, {
      method: "post",
      data: form
    })
    return data
  } catch (err) {
    console.log(err)
    return String(err)
  } finally {
    fs.unlinkSync(filePath)
  }
}

function ttsModel() {
  const model = {
    source: `You can find model on this web https://tiktokvoicegenerator.com/`,
    englishUS: {
      female: "en_us_001",
      male1: "en_us_006",
      male2: "en_us_007",
      male3: "en_us_009",
      male4: "en_us_010"
    },
    englishUK: {
      male1: "en_uk_001",
      male2: "en_uk_003"
    },
    englishAU: {
      female1: "en_au_001",
      male1: "en_au_002"
    },
    french: {
      male1: "fr_001",
      male2: "fr_002"
    },
    german: {
      female1: "de_001",
      male1: "de_002"
    },
    spanish: {
      male1: "es_002"
    },
    spanishMX: {
      male1: "es_mx_002"
    },
    portugueseBR: {
      female2: "br_003",
      female3: "br_004",
      male1: "br_005"
    },
    indonesian: {
      female1: "id_001"
    },
    japanese: {
      female1: "jp_001",
      female2: "jp_003",
      female3: "jp_005",
      male1: "jp_006"
    },
    korean: {
      male1: "kr_002",
      male2: "kr_004",
      female1: "kr_003"
    },
    chara: {
      ghostFace: "en_us_ghostface",
      chewbacca: "en_us_chewbacca",
      cepo: "en_us_c3po",
      stitch: "en_us_stitch",
      stormtrooper: "en_us_stormtrooper",
      rocket: "en_us_rocket"
    },
    singing: {
      alto: "en_female_f08_salut_damour",
      tenor: "en_male_m03_lobby",
      sunshine: "en_male_m03_sunshine_soon",
      warmy: "en_female_f08_warmy_breeze",
      glorious: "en_female_ht_f08_glorious",
      itGoesUp: "en_male_sing_funny_it_goes_up",
      chipmunk: "en_male_m2_xhxs_m03_silly",
      dramatic: "en_female_ht_f08_wonderful_world"
    }
  }
  return model
}

async function tiktokTts(text, model) {
  try {
    const modelVoice = model ? model : "en_us_001"
    const { status, data } = await axios(`https://tiktok-tts.weilnet.workers.dev/api/generation`, {
      method: "post",
      data: { text: text, voice: modelVoice },
      headers: {
        "content-type": "application/json"
      }
    })
    return data
  } catch (err) {
    console.log(err.response.data)
    return err.response.data
  }
}

async function enhanceImg(url, scale) {
  const scaleNumber = scale ? scale : 2
  const { data } = await axios(`https://toolsapi.spyne.ai/api/forward`, {
    method: "post",
    data: {
      image_url: url,
      scale: scaleNumber,
      save_params: {
        extension: ".png",
        quality: 95
      }
    },
    headers: {
      "content-type": "application/json",
      accept: "*/*"
    }
  })
  return data
}

async function cekResi(kurir, resi) {
  let { data } = await axios(`https://pluginongkoskirim.com/front/resi`, {
    method: "post",
    data: { kurir: kurir, resi: resi },
    headers: {
      accept: "*/*",
      "content-type": "application/json"
    }
  })
  return data
}

module.exports = {
  uploadFile,
  enhanceImg,
  cekResi,
  tiktokTts,
  ttsModel
}
