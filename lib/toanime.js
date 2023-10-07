const axios = require('axios');
const Jimp = require('jimp');
const FormData = require('form-data');
const fetch = require('node-fetch')

async function toanime(input) {
const baseUrl = 'https://tools.betabotz.org'
  const buf = await fetch(input)
  const buffer = await buf.buffer()
  const form = new FormData();
  form.append('image', buffer, { filename: 'toanime.jpg' });
  try {
    const { data } = await axios.post(`${baseUrl}/ai/toanime`, form, {
      headers: {
        ...form.getHeaders(),
        'accept': 'application/json',
      },
    });
    var res = {
      image_data: data.result,
      image_size: data.size
    };
    return res;
  } catch (error) {
    console.error('Identifikasi Gagal:', error);
    return null;
  }
}
module.exports.toanime = toanime