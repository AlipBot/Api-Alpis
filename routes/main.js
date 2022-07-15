__path = process.cwd()

//_______________________ ┏  Info  ┓ _______________________\\
//
//   Credit : AlipBot
//   
//   Note 
//   Jangan Jual SC ini ,
//   Jangan Buang Text ini,
//   Siapa Mahu Upload Jangan Lupa Credit :),
//   Siapa Tidak Letak Credit Akan Ambil Tindakan
//   
//_______________________ ┏ Make By AlipBot ┓ _______________________\\

var express = require('express');
var router = express.Router();
const { runtime,fetchJson } = require('../lib/myfunc')

router.get('/statistic', async (req, res, next) => {

	let hits = await fetchJson('https://api.countapi.xyz/hit/rest-api-alip.herokuapp.com/visitor')

	res.json({
	status: true,
	creator: `${creator}`,
	runtime: runtime(process.uptime()),
	visitor: hits.value,

	})

})

router.get('/', (req, res) => {
    res.sendFile(__path + '/view/home.html')
})

router.get('/docs', (req, res) => {
    res.sendFile(__path + '/view/docs.html')
})


module.exports = router
