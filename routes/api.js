require('../settings')
const express = require('express')
const translate = require('translate-google-api')
const alip = require("../lib/listdl")
const textto = require('soundoftext-js')
const googleIt = require('google-it')
const { shortText } = require("limit-text-js")
const Canvas = require('canvas')
const TinyURL = require('tinyurl');
const { EmojiAPI } = require("emoji-api");
const emoji = new EmojiAPI();
var isUrl = require("is-url")
const BitlyClient = require('bitly').BitlyClient
const canvasGif = require('canvas-gif')
const { convertStringToNumber } = require('convert-string-to-number'); 
const isImageURL = require('image-url-validator').default
const {fetchJson, runtime, getBuffer} = require('../lib/myfunc')
const Canvacord = require("canvacord");
const isNumber = require('is-number');
var router = express.Router()


//―――――――――――――――――――――――――――――――――――――――――― ┏  Info  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\
//  >Creator Alip MY
//  >Jangan Jual Sc Dan Buang Tulisan ini
//  >Guna Dengan Bijak
//  >Kalau mahu reupload jangan lupa creadit Ya :)
//
//
//  >>>>>Menu<<<<<
// >Dowloader
// >Text Pro
// >Photooxy
// >Sound Of Text
// >Search
// >Random Gambar
// >Game
// >Maker
// >Link Short
// >Information
// >Emoji
// >Tools
// >Islamic
//
//
//―――――――――――――――――――――――――――――――――――――――――― ┏  Dowloader  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\


router.get('/dowloader/fbdown', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter url"})  

alip.fbDown2(url)
.then(data => {
	if (!data.links ) return res.json(loghandler.noturl)
	res.json({
	status: true,
	creator: `${creator}`,
	result:	data
	})
	})
	 .catch(e => {
		res.json(loghandler.error)
})
})

router.get('/dowloader/twitter', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter url"})   
	
alip.twitter(url)
.then(data => {
	if (!data.thumb ) res.json(loghandler.noturl)
var result = data
res.json({
status: true,
creator: `${creator}`,
result
})
})
.catch(e => {
res.json(loghandler.error)
})
})

router.get('/dowloader/tikok', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter url"})  

alip.musically(url)
.then(data => {
	if (!data.video ) return res.json(loghandler.noturl)
	var result = data
	res.json({
	status: true,
	creator: `${creator}`,
		result
	})
	})
	 .catch(e => {
	
		res.json(loghandler.noturl)
})
})

router.get('/dowloader/igstory', async (req, res, next) => {
	var username = req.query.username
	if (!username ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter username"})   
	alip.igstory(username)
	.then(data => {
		if (!data ) return res.json(loghandler.notfound)
		var result = data
		res.json({
			status: true,
	        creator: `${creator}`,
			result
		})
		})
         .catch(e => {  
			 res.json(loghandler.error)
})
})

router.get('/dowloader/igreels', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter url"})   

	alip.igdl(url)
	.then(data => {
		if (!data ) return res.json(loghandler.noturl)
		var result = data
		res.json({
			status: true,
	        creator: `${creator}`,
			result
		})
		})
         .catch(e => {     
			 res.json(loghandler.error)	
})
})


router.get('/dowloader/igdowloader', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter url"})   
	
	alip.igdl(url)
	.then(data => {
		if (!data ) return res.json(loghandler.noturl)
		var result = data
		res.json({
			status: true,
	        creator: `${creator}`,
			result
		})
		})
         .catch(e => {
         
			 res.json(loghandler.error)
})

})

router.get('/dowloader/yt', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter url"}) 

	let { yta, ytv } = require('../lib/y2mate')
	let mp3 = await yta(url, '320kbps')
	let mp4 = await ytv(url, '360p')
	if (!mp4.title ) return res.json(loghandler.noturl)
		res.json({
			status: true,
			creator: `${creator}`,
			result: {
				Title: mp4.title,
				thumb : mp4.thumb,
				filesize: mp4.filesizeF,
				Idvideo: mp4.id,
				mp3: mp3.dl_link,
				mp4: mp4.dl_link

	} })
})

router.get('/dowloader/soundcloud', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter url"})   
	
	alip.soundcloud(url)
	.then(data => {
		if (!data.download ) return res.json(loghandler.noturl)
		var result = data
		res.json({
			status: true,
	        creator: `${creator}`,
			result
		})
		})
         .catch(e => {
         
			 res.json(loghandler.error)
})
})

router.get('/dowloader/telesticker', async (req, res, next) => {
	var url = req.query.url
	if (!url ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter url"})   
	if (!url.match(/(https:\/\/t.me\/addstickers\/)/gi)) return res.json(loghandler.noturl)
	alip.telesticker(url)
	.then(data => {
		var result = data
		res.json({
			status: true,
	        creator: `${creator}`,
			result
		})
		})
         .catch(e => {
	 res.json(loghandler.error)
})
})

//―――――――――――――――――――――――――――――――――――――――――― ┏  Text Pro  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

router.get('/textpro/pencil', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.textpro("https://textpro.me/create-a-sketch-text-effect-online-1044.html", [text1])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
})
})


router.get('/textpro/glitch', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.textpro("https://textpro.me/create-impressive-glitch-text-effects-online-1027.html", [text1])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
})


router.get('/textpro/blackpink', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.textpro("https://textpro.me/create-blackpink-logo-style-online-1001.html", [text1])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
})


router.get('/textpro/berry', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.textpro("https://textpro.me/create-berry-text-effect-online-free-1033.html", [text1])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
})


router.get('/textpro/neon', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.textpro("https://textpro.me/neon-light-text-effect-online-882.html", [text1])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
})



router.get('/textpro/logobear', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.textpro("https://textpro.me/online-black-and-white-bear-mascot-logo-creation-1012.html", [text1])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
})


router.get('/textpro/3dchristmas', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.textpro("https://textpro.me/3d-christmas-text-effect-by-name-1055.html", [text1])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
})


router.get('/textpro/thunder', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.textpro("https://textpro.me/online-thunder-text-effect-generator-1031.html", [text1])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
})


router.get('/textpro/3dboxtext', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.textpro("https://textpro.me/3d-box-text-effect-online-880.html", [text1])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
})


router.get('/textpro/glitch2', async (req, res, next) => {
	var text1 = req.query.text
	var text2 = req.query.text2
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	if (!text2 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text2"}) 
	alip.textpro("https://textpro.me/create-a-glitch-text-effect-online-free-1026.html", [text1,text2])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
})

router.get('/textpro/glitchtiktok', async (req, res, next) => {
	var text1 = req.query.text
	var text2 = req.query.text2
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	if (!text2 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text2"}) 
	alip.textpro("https://textpro.me/create-glitch-text-effect-style-tik-tok-983.html", [text1,text2])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
})

router.get('/textpro/video-game-classic', async (req, res, next) => {
	var text1 = req.query.text
	var text2 = req.query.text2
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	if (!text2 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text2"}) 
	alip.textpro("https://textpro.me/video-game-classic-8-bit-text-effect-1037.html", [text1,text2])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
})

router.get('/textpro/marvel-studios', async (req, res, next) => {
	var text1 = req.query.text
	var text2 = req.query.text2
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	if (!text2 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text2"}) 
	alip.textpro("https://textpro.me/create-logo-style-marvel-studios-online-971.html", [text1,text2])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
})

router.get('/textpro/ninja-logo', async (req, res, next) => {
	var text1 = req.query.text
	var text2 = req.query.text2
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	if (!text2 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text2"}) 
	alip.textpro("https://textpro.me/create-ninja-logo-online-935.html", [text1,text2])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
})

router.get('/textpro/green-horror', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.textpro("https://textpro.me/create-green-horror-style-text-effect-online-1036.html", [text1])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
})

router.get('/textpro/magma', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.textpro("https://textpro.me/create-a-magma-hot-text-effect-online-1030.html", [text1])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
})

router.get('/textpro/3d-neon-light', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.textpro("https://textpro.me/create-3d-neon-light-text-effect-online-1028.html", [text1])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
})

router.get('/textpro/3d-orange-juice', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.textpro("https://textpro.me/create-a-3d-orange-juice-text-effect-online-1084.html", [text1])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
})

router.get('/textpro/chocolate-cake', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.textpro("https://textpro.me/chocolate-cake-text-effect-890.html", [text1])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
})

router.get('/textpro/strawberry', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.textpro("https://textpro.me/strawberry-text-effect-online-889.html", [text1])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
})
.catch((err) =>{
 res.json(loghandler.error)
})
})

//―――――――――――――――――――――――――――――――――――――――――― ┏  Phootoxy  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\


router.get('/photooxy/flaming', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.photooxy("https://photooxy.com/logo-and-text-effects/realistic-flaming-text-effect-online-197.html", [text1])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
})
})


router.get('/photooxy/shadow-sky', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.photooxy("https://photooxy.com/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html", [text1])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
})
})


router.get('/photooxy/metallic', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.photooxy("https://photooxy.com/other-design/create-metallic-text-glow-online-188.html", [text1])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
})
})


router.get('/photooxy/naruto', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.photooxy("https://photooxy.com/manga-and-anime/make-naruto-banner-online-free-378.html", [text1])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
})
})


router.get('/photooxy/pubg', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	var text2 = req.query.text2
	if (!text2 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text2"})  
	alip.photooxy("https://photooxy.com/battlegrounds/make-wallpaper-battlegrounds-logo-text-146.html", [text1,text2])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
})
})

router.get('/photooxy/under-grass', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.photooxy("https://photooxy.com/logo-and-text-effects/make-quotes-under-grass-376.html", [text1])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
})
})

router.get('/photooxy/harry-potter', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.photooxy("https://photooxy.com/logo-and-text-effects/create-harry-potter-text-on-horror-background-178.html", [text1])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
})
})

router.get('/photooxy/flower-typography', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.photooxy("https://photooxy.com/art-effects/flower-typography-text-effect-164.html", [text1])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
})
})

router.get('/photooxy/picture-of-love', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.photooxy("https://photooxy.com/logo-and-text-effects/create-a-picture-of-love-message-377.html", [text1])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
})
})

router.get('/photooxy/coffee-cup', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.photooxy("https://photooxy.com/logo-and-text-effects/put-any-text-in-to-coffee-cup-371.html", [text1])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
})
})

router.get('/photooxy/butterfly', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.photooxy("https://photooxy.com/logo-and-text-effects/butterfly-text-with-reflection-effect-183.html", [text1])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
})
})

router.get('/photooxy/night-sky', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.photooxy("https://photooxy.com/logo-and-text-effects/write-stars-text-on-the-night-sky-200.html", [text1])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
})
})


router.get('/photooxy/carved-wood', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.photooxy("https://photooxy.com/logo-and-text-effects/carved-wood-effect-online-171.html", [text1])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
})
})


router.get('/photooxy/illuminated-metallic', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.photooxy("https://photooxy.com/logo-and-text-effects/illuminated-metallic-effect-177.html", [text1])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
})
})

router.get('/photooxy/sweet-candy', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.photooxy("https://photooxy.com/logo-and-text-effects/sweet-andy-text-online-168.html", [text1])
.then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
.catch((err) =>{
 res.json(loghandler.error)
})
})

//―――――――――――――――――――――――――――――――――――――――――― ┏  Sound Of Text  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\



router.get('/soundoftext', async (req, res, next) => {
	var text1 = req.query.text
	var lan = req.query.lang
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	if (!lan ) return res.json({ status : false, creator : `${creator}`, message : "[!] sila letak format lang dengan betul cek web site https://soundoftext.com/docs untuk lihat code lang"})   
	
	
textto.sounds.create({ text: text1, voice: lan })
.then(soundUrl => {
		  
	res.json({
		status: true,
		creator: `${creator}`,
		result: soundUrl
	})
})
.catch(e => {
	res.json(loghandler.error)
	
})
})

//―――――――――――――――――――――――――――――――――――――――――― ┏  Search  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\



router.get('/search/linkgroupwa', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.linkwa(text1)
.then((data) =>{ 
	if (!data[0] ) return res.json(loghandler.notfound)
  res.json({
	status: true,
	creator: `${creator}`,
	result: data
})
})
.catch((err) =>{
 res.json(loghandler.notfound)

})
})

router.get('/search/pinterest', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.pinterest(text1)
.then((data) =>{ 
	if (!data[0] ) return res.json(loghandler.notfound)
  res.json({
	status: true,
	creator: `${creator}`,
	result: data
})
})
.catch((err) =>{
 res.json(loghandler.notfound)

})
})


router.get('/search/ringtone', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.ringtone(text1)
.then((data) =>{ 
	if (!data ) return res.json(loghandler.notfound)
  res.json({
	status: true,
	creator: `${creator}`,
	result: data
})
})
.catch((err) =>{
 res.json(loghandler.notfound)

})
})


router.get('/search/wikimedia', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.wikimedia(text1)
.then((data) =>{ 
	if (!data[0] ) return res.json(loghandler.notfound)
  res.json({
	status: true,
	creator: `${creator}`,
	result: data
})
})
.catch((err) =>{
 res.json(loghandler.notfound)

})
})


router.get('/search/wallpaper', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.wallpaper(text1)
.then((data) =>{ 
	if (!data[0] ) return res.json(loghandler.notfound)
  res.json({
	status: true,
	creator: `${creator}`,
	result: data
})
})
.catch((err) =>{
 res.json(loghandler.notfound)

})
})

router.get('/search/google', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   

	googleIt({'query': text1}).then(results => {
		if (!results[0] ) return res.json(loghandler.notfound)
			res.json({
				status: true,
				creator: `${creator}`,
				result: results
			})

	}).catch(e => {	
		res.json(loghandler.notfound)
	})

})

router.get('/search/googleimage', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   

	var gis = require('g-i-s')
gis(text1, logResults)

function logResults(error, results) {
  if (error) {
	res.json(loghandler.notfound)
  }
  else {
	if (!results[0] ) return res.json(loghandler.notfound)
	res.json({
		status: true,
		creator: `${creator}`,
		result:  results
	})
   
  }
}
})


router.get('/search/ytplay', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"}) 

	let yts = require("yt-search")
	let search = await yts(text1)
	let anu = search.videos[Math.floor(Math.random() * search.videos.length)]

	let { yta, ytv } = require('../lib/y2mate')
	let mp3 = await yta(anu.url, '320kbps')
	let mp4 = await ytv(anu.url, '360p')
		res.json({
			status: true,
			creator: `${creator}`,
			result: {
				Link: anu.url,
				Title: anu.title,
				Description : anu.description,
				Idvideo: anu.videoId,
				Duration: anu.timestamp,
				Viewer: anu.views,
				UploadedOn : anu.ago,
				Author : anu.author.name,
				Channel : anu.author.url,
				linldowloader: {
					mp3: mp3.dl_link,
					mp4:{ 
						link: mp4.dl_link,
						filesize: mp4.filesizeF
					}
				}

	} })
})

router.get('/search/sticker', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})   
	alip.stickersearch(text1)
	.then(data => {
		if (!data ) return res.json(loghandler.notfound)
		res.json({
			status: true,
	        creator: `${creator}`,
			result: data
		})
		})
         .catch(e => {
	 res.json(loghandler.error)
})
})

//―――――――――――――――――――――――――――――――――――――――――― ┏  Random Gambar ┓ ―――――――――――――――――――――――――――――――――――――――――― \\


router.get('/randomgambar/couplepp', async (req, res, next) => {

	let resultt = await fetchJson('https://raw.githubusercontent.com/AlipBot/data-rest-api/main/kopel.json')
	let random = resultt[Math.floor(Math.random() * resultt.length)]

	res.json({
	status: true,
	creator: `${creator}`,
		result: {
			male: random.male,
			female: random.female
		}
	})

})


router.get('/randomgambar/dadu', async (req, res, next) => {

	let dadu = await fetchJson('https://raw.githubusercontent.com/AlipBot/data-rest-api/main/dadu.json')
	let random = dadu[Math.floor(Math.random() * dadu.length)]
	var result = await getBuffer(random.result)
	res.set({'Content-Type': 'image/webp'})
	res.send(result)
})


router.get('/randomgambar/coffee', async (req, res, next) => {

	var result = await getBuffer('https://coffee.alexflipnote.dev/random')
	res.set({'Content-Type': 'image/png'})
	res.send(result)
})

// Game

router.get('/game/tembakgambar', async (req, res, next) => {
 
	alip.tebakgambar()
.then((data) =>{ 
		  
  res.json({
	status: true,
	creator: `${creator}`,
	result: data
})
})
.catch((err) =>{
 res.json(loghandler.error)

})
})

router.get('/game/susunkata', async (req, res, next) => {

	let ra = await fetchJson('https://raw.githubusercontent.com/AlipBot/data-rest-api/main/susunkata.json')
	let ha = ra[Math.floor(Math.random() * ra.length)]
		  
  res.json({
	status: true,
	creator: `${creator}`,
	result: ha
})

})

router.get('/game/tembakbendera', async (req, res, next) => {

	let ra = await fetchJson('https://raw.githubusercontent.com/AlipBot/data-rest-api/main/tebakbendera.json')
	let ha = ra[Math.floor(Math.random() * ra.length)]
		  
  res.json({
	status: true,
	creator: `${creator}`,
	result: ha
})

})


router.get('/game/tembakgame', async (req, res, next) => {

	let ra = await fetchJson('https://raw.githubusercontent.com/AlipBot/data-rest-api/main/tebakgame.json')
	let ha = ra[Math.floor(Math.random() * ra.length)]
		  
  res.json({
	status: true,
	creator: `${creator}`,
	result: ha
})

})

router.get('/game/tembakkata', async (req, res, next) => {

	let ra = await fetchJson('https://raw.githubusercontent.com/AlipBot/data-rest-api/main/tebakkata.json')
	let ha = ra[Math.floor(Math.random() * ra.length)]
		  
  res.json({
	status: true,
	creator: `${creator}`,
	result: ha
})

})

router.get('/game/tembaklirik', async (req, res, next) => {

	let ra = await fetchJson('https://raw.githubusercontent.com/AlipBot/data-rest-api/main/tebaklirik.json')
	let ha = ra[Math.floor(Math.random() * ra.length)]
		  
  res.json({
	status: true,
	creator: `${creator}`,
	result: ha
})

})
router.get('/game/tembaklagu', async (req, res, next) => {

	let ra = await fetchJson('https://raw.githubusercontent.com/AlipBot/data-rest-api/main/tebaklagu.json')
	let ha = ra[Math.floor(Math.random() * ra.length)]
		  
  res.json({
	status: true,
	creator: `${creator}`,
	result: ha
})

})
router.get('/game/tembakkimia', async (req, res, next) => {

	let ra = await fetchJson('https://raw.githubusercontent.com/AlipBot/data-rest-api/main/tebakkimia.json')
	let ha = ra[Math.floor(Math.random() * ra.length)]
		  
  res.json({
	status: true,
	creator: `${creator}`,
	result: ha
})

})

//―――――――――――――――――――――――――――――――――――――――――― ┏ Maker ┓ ―――――――――――――――――――――――――――――――――――――――――― \\


router.get('/maker/circle', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter url"})
	var img = await isImageURL(text)
	if ( !img ) return res.json({ status : false, creator : 'Alip', message : "[!] cek kembali url image"}) 

	const hasil =  await Canvacord.Canvas.circle(text);
	res.set({'Content-Type': 'image/png'})
	res.send(hasil)
  
})


router.get('/maker/beautiful', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter url"})
	var img = await isImageURL(text)
	if ( !img ) return res.json({ status : false, creator : 'Alip', message : "[!] cek kembali url image"}) 

	const hasil =  await Canvacord.Canvas.beautiful(text);
	res.set({'Content-Type': 'image/png'})
	res.send(hasil)
  
})


router.get('/maker/blur', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter url"})
	var img = await isImageURL(text)
	if ( !img ) return res.json({ status : false, creator : 'Alip', message : "[!] cek kembali url image"}) 

	const hasil =  await Canvacord.Canvas.blur(text)
	res.set({'Content-Type': 'image/png'})
	res.send(hasil)
  
})


router.get('/maker/darkness', async (req, res) => {
	var text = req.query.url
	var no = req.query.no
	if (!text ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter url"})
	if (!no ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter no"})

	var img = await isImageURL(text)
	var n = isNumber(no)
	if ( !img ) return res.json({ status : false, creator : 'Alip', message : "[!] cek kembali url image"}) 
	if ( !n ) return res.json({ status : false, creator : 'Alip', message : "[!] parameter no nombor sahaja"}) 


	const hasil =  await Canvacord.Canvas.darkness(text,shortText(no, 3))
	res.set({'Content-Type': 'image/png'})
	res.send(hasil)
  
})

router.get('/maker/facepalm', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter url"})
	var img = await isImageURL(text)
	if ( !img ) return res.json({ status : false, creator : 'Alip', message : "[!] cek kembali url image"}) 

	const hasil =  await Canvacord.Canvas.facepalm(text)
	res.set({'Content-Type': 'image/png'})
	res.send(hasil)
  
})

router.get('/maker/invert', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter url"})
	var img = await isImageURL(text)
	if ( !img ) return res.json({ status : false, creator : 'Alip', message : "[!] cek kembali url image"}) 

	const hasil =  await Canvacord.Canvas.invert(text)
	res.set({'Content-Type': 'image/png'})
	res.send(hasil)
  
})

router.get('/maker/pixelate', async (req, res) => {
	var text = req.query.url
	var no = req.query.no
	if (!text ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter url"})
	if (!no ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter no"})

	var img = await isImageURL(text)
	var n = isNumber(no)
	if ( !img ) return res.json({ status : false, creator : 'Alip', message : "[!] cek kembali url image"}) 
	if ( !n ) return res.json({ status : false, creator : 'Alip', message : "[!] parameter no nombor sahaja"}) 


	const hasil =  await Canvacord.Canvas.pixelate(text,convertStringToNumber(no))
	res.set({'Content-Type': 'image/png'})
	res.send(hasil)
  
})


router.get('/maker/rainbow', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter url"})
	var img = await isImageURL(text)
	if ( !img ) return res.json({ status : false, creator : 'Alip', message : "[!] cek kembali url image"}) 

	const hasil =  await Canvacord.Canvas.rainbow(text)
	res.set({'Content-Type': 'image/png'})
	res.send(hasil)
  
})

router.get('/maker/resize', async (req, res) => {
	var text = req.query.url
	var width = req.query.width
	var height = req.query.height

	if (!text ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter url"})
	if (!width ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter width"})
	if (!height ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter height"})

	let w = width
	let h = height
	if (w>1000){ w = "1000"}
	if (h>1000){ h = "1000"}

	var img = await isImageURL(text)
	var wid = isNumber(width)
	var hei = isNumber(height)
	if ( !img ) return res.json({ status : false, creator : 'Alip', message : "[!] cek kembali url image"}) 
	if ( !wid ) return res.json({ status : false, creator : 'Alip', message : "[!] parameter width nombor sahaja"}) 
	if ( !hei ) return res.json({ status : false, creator : 'Alip', message : "[!] parameter height nombor sahaja"}) 

	const hasil =  await Canvacord.Canvas.resize(text, convertStringToNumber(w),  convertStringToNumber(h))
	res.set({'Content-Type': 'image/png'})
	res.send(hasil)
  
})

router.get('/maker/trigger', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter url"})
	var img = await isImageURL(text)
	if ( !img ) return res.json({ status : false, creator : 'Alip', message : "[!] cek kembali url image"}) 

	const hasil =  await Canvacord.Canvas.trigger(text)
	res.set({'Content-Type': 'gif'})
	res.send(hasil)
  
})

router.get('/maker/wanted', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter url"})
	var img = await isImageURL(text)
	if ( !img ) return res.json({ status : false, creator : 'Alip', message : "[!] cek kembali url image"}) 

	const hasil =  await Canvacord.Canvas.wanted(text)
	res.set({'Content-Type': 'image/png'})
	res.send(hasil)
  
})

router.get('/maker/wasted', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter url"})
	var img = await isImageURL(text)
	if ( !img ) return res.json({ status : false, creator : 'Alip', message : "[!] cek kembali url image"}) 

	const hasil =  await Canvacord.Canvas.wasted(text)
	res.set({'Content-Type': 'image/png'})
	res.send(hasil)
  
})

router.get('/maker/attp', async (req, res) => {
	var text = req.query.text
	if (!text ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})

const file = "./asset/image/attp.gif"

let length = text.length
		
var font = 90
if (length>12){ font = 68}
if (length>15){ font = 58}
if (length>18){ font = 55}
if (length>19){ font = 50}
if (length>22){ font = 48}
if (length>24){ font = 38}
if (length>27){ font = 35}
if (length>30){ font = 30}
if (length>35){ font = 26}
if (length>39){ font = 25}
if (length>40){ font = 20}
if (length>49){ font = 10}
Canvas.registerFont('./asset/font/SF-Pro.ttf', { family: 'SF-Pro' })
canvasGif(
	file,
	(ctx, width, height, totalFrames, currentFrame) => {

		var couler = ["#ff0000","#ffe100","#33ff00","#00ffcc","#0033ff","#9500ff","#ff00ff"]
		let jadi = couler[Math.floor(Math.random() * couler.length)]
	
	
		function drawStroked(text, x, y) {
			ctx.font = `${font}px SF-Pro`
			ctx.strokeStyle = 'black'
			ctx.lineWidth = 3
			ctx.textAlign = 'center'
			ctx.strokeText(text, x, y)
			ctx.fillStyle = jadi
			ctx.fillText(text, x, y)
		}
		
		drawStroked(text,290,300)

	},
	{
		coalesce: false, // whether the gif should be coalesced first (requires graphicsmagick), default: false
		delay: 0, // the delay between each frame in ms, default: 0
		repeat: 0, // how many times the GIF should repeat, default: 0 (runs forever)
		algorithm: 'neuquant', // the algorithm the encoder should use, default: 'neuquant',
		optimiser: false, // whether the encoder should use the in-built optimiser, default: false,
		fps: 7, // the amount of frames to render per second, default: 60
		quality: 1, // the quality of the gif, a value between 1 and 100, default: 100
	}
).then((buffer) =>{
res.set({'Content-Type': 'gif'})
res.send(buffer)

})
  

router.get('/maker/ttp', async (req, res) => {
	var text = req.query.text
	if (!text ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})

	Canvas.registerFont('./asset/font/SF-Pro.ttf', { family: 'SF-Pro' })
	let length = text.length
		
	var font = 90
	if (length>12){ font = 68}
	if (length>15){ font = 58}
	if (length>18){ font = 55}
	if (length>19){ font = 50}
	if (length>22){ font = 48}
	if (length>24){ font = 38}
	if (length>27){ font = 35}
	if (length>30){ font = 30}
	if (length>35){ font = 26}
	if (length>39){ font = 25}
	if (length>40){ font = 20}
	if (length>49){ font = 10}

	var ttp = {}
	ttp.create = Canvas.createCanvas(576, 576)
	ttp.context = ttp.create.getContext('2d')
	ttp.context.font =`${font}px SF-Pro`
	ttp.context.strokeStyle = 'black'
	ttp.context.lineWidth = 3
	ttp.context.textAlign = 'center'
	ttp.context.strokeText(text, 290,300)
	ttp.context.fillStyle = 'white'
	ttp.context.fillText(text, 290,300)

		res.set({'Content-Type': 'image/png'})
		res.send(ttp.create.toBuffer())
  
})
})

router.get('/maker/emojimix', async (req, res, next) => {
	var emoji1 = req.query.emoji1
	var emoji2 = req.query.emoji2
	if (!emoji1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter emoji1"})
	if (!emoji2 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter emoji2"})  
	

	let data = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
	let jadi = data.results[Math.floor(Math.random() * data.results.length)]
	if (!jadi ) return res.json(loghandler.notfound)
	for (let ress of data.results) {
	resul = await getBuffer(ress.url)
	res.set({'Content-Type': 'image/png'})
	res.send(resul)
}
})

router.get('/maker/welcome1', async (req, res, next) => {
	var name = req.query.name
    var grup = req.query.gpname
    var member = req.query.member
	var pp = req.query.pp
    var bg = req.query.bg
	
	var imgpp = await isImageURL(pp)
	var bgimg = await isImageURL(bg)

    if (!name ) return res.json({ status : false, creator : 'Alip', message : "[!] masukan parameter name"})  
	if (!grup ) return res.json({ status : false, creator : 'Alip', message : "[!] masukan parameter gpname"})  
    if (!member ) return res.json({ status : false, creator : 'Alip', message : "[!] masukan parameter member"})  
	if (!pp ) return res.json({ status : false, creator : 'Alip', message : "[!] masukan parameter pp"})  
    if (!bg ) return res.json({ status : false, creator : 'Alip', message : "[!] masukan parameter bg"})  

	if ( !imgpp ) return res.json({ status : false, creator : 'Alip', message : "[!] cek kembali url image pp"}) 
	if ( !bgimg ) return res.json({ status : false, creator : 'Alip', message : "[!] cek kembali url image bg"}) 
   
    Canvas.registerFont('./asset/font/Creme.ttf', { family: 'creme' })

var welcomeCanvas = {}
welcomeCanvas.create = Canvas.createCanvas(1024, 500)
welcomeCanvas.context = welcomeCanvas.create.getContext('2d')
welcomeCanvas.context.font = '72px creme'
welcomeCanvas.context.fillStyle = '#ffffff'

await Canvas.loadImage("./asset/image/wbg1.jpg").then(async (img) => {
    welcomeCanvas.context.drawImage(img, 0, 0, 1024, 500)

})

let can = welcomeCanvas


await Canvas.loadImage(bg)
.then(bg => {
can.context.drawImage(bg, 320, 0, 709, 360)
})

    let canvas = welcomeCanvas
    canvas.context.beginPath()
    canvas.context.arc(174, 279, 115, 0, Math.PI * 2, true)
    canvas.context.stroke()
    canvas.context.fill()
    canvas.context.font = '100px creme',
    canvas.context.textAlign = 'center'
    canvas.context.fillText("Welcome", 670, 140)
    canvas.context.font = '100px Helvetica'
    canvas.context.fillText("____   ____", 670, 160)
    canvas.context.fillText("✩", 670, 215)
    canvas.context.font = '100px creme'
    canvas.context.fillText(shortText(grup, 17), 670, 300)
    canvas.context.font = '40px creme'
    canvas.context.textAlign = 'start'
    canvas.context.fillText(shortText(name, 40), 420, 420)
    canvas.context.font = '35px creme'
    canvas.context.fillText(`${shortText(member, 10)} th member`, 430, 490)
    canvas.context.beginPath()
    canvas.context.arc(174, 279, 110, 0, Math.PI * 2, true)
    canvas.context.closePath()
    canvas.context.clip()
    await Canvas.loadImage(pp)
    .then(pp => {
        canvas.context.drawImage(pp, 1, 150, 300, 300)
    })
    

    res.set({'Content-Type': 'image/png'})
    res.send(canvas.create.toBuffer())
})


router.get('/maker/goodbye1', async (req, res, next) => {
	var name = req.query.name
    var grup = req.query.gpname
	var pp = req.query.pp
    var member = req.query.member
    var bg = req.query.bg

	var imgpp = await isImageURL(pp)
	var bgimg = await isImageURL(bg)

    if (!name ) return res.json({ status : false, creator : 'Alip', message : "[!] masukan parameter name"})  
	if (!grup ) return res.json({ status : false, creator : 'Alip', message : "[!] masukan parameter gpname"})  
    if (!member ) return res.json({ status : false, creator : 'Alip', message : "[!] masukan parameter member"})  
    if (!bg ) return res.json({ status : false, creator : 'Alip', message : "[!] masukan parameter bg"})  
	if (!pp) return res.json({ status : false, creator : 'Alip', message : "[!] masukan parameter pp"}) 
   
	if ( !imgpp ) return res.json({ status : false, creator : 'Alip', message : "[!] masukan parameter pp Link pp dengan betul"}) 
	if ( !bgimg ) return res.json({ status : false, creator : 'Alip', message : "[!] masukan parameter pp Link bg dengan betul"}) 

    Canvas.registerFont('./asset/font/Creme.ttf', { family: 'creme' })

var goobyeCanvas = {}
goobyeCanvas.create = Canvas.createCanvas(1024, 500)
goobyeCanvas.context =  goobyeCanvas.create.getContext('2d')
goobyeCanvas.context.font = '72px creme'
goobyeCanvas.context.fillStyle = '#ffffff'

await Canvas.loadImage("./asset/image/wbg1.jpg").then(async (img) => {
	goobyeCanvas.context.drawImage(img, 0, 0, 1024, 500)

})

let can =  goobyeCanvas


await Canvas.loadImage(bg)
.then(bg => {
can.context.drawImage(bg, 320, 0, 709, 360)
})

    let canvas = goobyeCanvas
    canvas.context.beginPath()
    canvas.context.arc(174, 279, 115, 0, Math.PI * 2, true)
    canvas.context.stroke()
    canvas.context.fill()
    canvas.context.font = '100px creme',
    canvas.context.textAlign = 'center'
    canvas.context.fillText("GoodBye", 670, 140)
    canvas.context.font = '100px Helvetica'
    canvas.context.fillText("____   ____", 670, 160)
    canvas.context.fillText("✩", 670, 215)
    canvas.context.font = '100px creme'
    canvas.context.fillText(shortText(grup, 17), 670, 300)
    canvas.context.font = '40px creme'
    canvas.context.textAlign = 'start'
    canvas.context.fillText(shortText(name, 40), 420, 420)
    canvas.context.font = '35px creme'
    canvas.context.fillText(`${shortText(member, 10)} th member`, 430, 490)
    canvas.context.beginPath()
    canvas.context.arc(174, 279, 110, 0, Math.PI * 2, true)
    canvas.context.closePath()
    canvas.context.clip()
    await Canvas.loadImage(pp)
    .then(pp => {
        canvas.context.drawImage(pp, 1, 150, 300, 300)
    })
    

    res.set({'Content-Type': 'image/png'})
    res.send(canvas.create.toBuffer())
})

//―――――――――――――――――――――――――――――――――――――――――― ┏  Link Short  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

router.get('/linkshort/tinyurl', async (req, res, next) => {
	var link = req.query.link
	if (!link ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter link"})  

    var islink = isUrl(link)
	if (!islink ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter url sahaja"})  


TinyURL.shorten(link, function(link, err) {
  if (err) return res.json(loghandler.error)
	res.json({
		status: true,
		creator: `${creator}`,
		result: link
		})
});
	
})

router.get('/linkshort/tinyurlwithalias', async (req, res, next) => {
	var link = req.query.link
	var alias = req.query.alias
	if (!link ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter link"})  
	if (!alias ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter alias"})  

    var islink = isUrl(link)
	if (!islink ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter url sahaja"})  

	const data = { 'url': link, 'alias': shortText(alias, 30) }

	TinyURL.shortenWithAlias(data).then(function(link)  {	
		if (link == "Error") return res.json(loghandler.redy)

	res.json({
		status: true,
		creator: `${creator}`,
		result: link
		})
})
})
	
router.get('/linkshort/cuttly', async (req, res, next) => {
	var link = req.query.link
	if (!link ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter link"})  
    var islink = isUrl(link)
	if (!islink ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter url sahaja"})  

	let randomapicuttly = apicuttly[Math.floor(Math.random() * apicuttly.length)]
	var hasil = await fetchJson(`https://cutt.ly/api/api.php?key=${randomapicuttly}&short=${link}`)
  if (!hasil.url.shortLink ) return res.json(loghandler.error)

	res.json({
		status: true,
		creator: `${creator}`,
		result: hasil.url.shortLink
		})
});


router.get('/linkshort/bitly', async (req, res, next) => {
	var link = req.query.link
	if (!link ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter link"})  

	var islink = isUrl(link)
	if (!islink ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter url sahaja"})  

	let randomapibitly = apibitly[Math.floor(Math.random() * apibitly.length)]
	const bitly = new BitlyClient(randomapibitly)
	bitly
	.shorten(link)
	.then(function(result) {
		res.json({
			status: true,
			creator: `${creator}`,
			result : result.link
			})
	 
	})
	.catch(function(error) {
	 res.json(loghandler.error)
	});
})

//―――――――――――――――――――――――――――――――――――――――――― ┏  Infomation  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\


router.get('/info/githubstalk', async (req, res, next) => {
	var user = req.query.user
	if (!user ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter user"})  
	let gitstalk = await fetchJson(`https://api.github.com/users/${user}`)
	if (!gitstalk.login ) return res.json(loghandler.notfound)

	res.json({
	status: true,
	creator: `${creator}`,
	result: gitstalk
	})

})

router.get('/info/waktuksolatmy', async (req, res, next) => {
	alip.watuksolatmy()
	.then(data => {
		if (!data.Tarikh ) return res.json(loghandler.error)
		var result = data
		res.json({
			status: true,
	        creator: `${creator}`,
			result
		})
		})
         .catch(e => {
			console.log(e);
			 res.json(loghandler.error)
})
})


router.get('/info/translate', async (req, res, next) => {
	var text = req.query.text
    var lang = req.query.lang

	if (!text ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})  
	if (!lang ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter lang.  boleh lihat list bahasa di https://cloud.google.com/translate/docs/languages"})  

	const defaultLang = 'en'
	const tld = 'cn'
	

	let result
    try {
        result = await translate(`${text}`, {
            tld,
            to: lang,
        })
    } catch (e) {
        result = await translate(`${text}`, {
            tld,
            to: defaultLang,
        })
        
    } finally {
		res.json({
			status: true,
			creator: `${creator}`,
			result: result[0]
		})
        
    }
})

//―――――――――――――――――――――――――――――――――――――――――― ┏  Emoji  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

router.get('/emoji/apple', async (req, res, next) => {
	var emoji1 = req.query.emoji
	
	if (!emoji1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter emoji"})

	emoji.get(emoji1)
    .then(async emoji => {
	resul = await getBuffer(emoji.images[0].url)
	res.set({'Content-Type': 'image/png'})
	res.send(resul)
	})
	.catch(error => {
		res.json(loghandler.emoji)
	})
})

router.get('/emoji/google', async (req, res, next) => {
	var emoji1 = req.query.emoji
	
	if (!emoji1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter emoji"})

	emoji.get(emoji1)
    .then(async emoji => {
	resul = await getBuffer(emoji.images[1].url)
	res.set({'Content-Type': 'image/png'})
	res.send(resul)
	})
	.catch(error => {
		res.json(loghandler.emoji)
	})
})

router.get('/emoji/samsung', async (req, res, next) => {
	var emoji1 = req.query.emoji
	
	if (!emoji1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter emoji"})

	emoji.get(emoji1)
    .then(async emoji => {
	resul = await getBuffer(emoji.images[2].url)
	res.set({'Content-Type': 'image/png'})
	res.send(resul)
	})
	.catch(error => {
		res.json(loghandler.emoji)
	})
})


router.get('/emoji/microsoft', async (req, res, next) => {
	var emoji1 = req.query.emoji
	
	if (!emoji1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter emoji"})

	emoji.get(emoji1)
    .then(async emoji => {
	resul = await getBuffer(emoji.images[3].url)
	res.set({'Content-Type': 'image/png'})
	res.send(resul)
	})
	.catch(error => {
		res.json(loghandler.emoji)
	})
})

router.get('/emoji/whatsapp', async (req, res, next) => {
	var emoji1 = req.query.emoji
	
	if (!emoji1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter emoji"})

	emoji.get(emoji1)
    .then(async emoji => {
	resul = await getBuffer(emoji.images[4].url)
	res.set({'Content-Type': 'image/png'})
	res.send(resul)
	})
	.catch(error => {
		res.json(loghandler.emoji)
	})
})

router.get('/emoji/twitter', async (req, res, next) => {
	var emoji1 = req.query.emoji
	
	if (!emoji1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter emoji"})

	emoji.get(emoji1)
    .then(async emoji => {
	resul = await getBuffer(emoji.images[5].url)
	res.set({'Content-Type': 'image/png'})
	res.send(resul)
	})
	.catch(error => {
		res.json(loghandler.emoji)
	})
})

router.get('/emoji/facebook', async (req, res, next) => {
	var emoji1 = req.query.emoji
	
	if (!emoji1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter emoji"})

	emoji.get(emoji1)
    .then(async emoji => {
	resul = await getBuffer(emoji.images[6].url)
	res.set({'Content-Type': 'image/png'})
	res.send(resul)
	})
	.catch(error => {
		res.json(loghandler.emoji)
	})
})

router.get('/emoji/skype', async (req, res, next) => {
	var emoji1 = req.query.emoji
	
	if (!emoji1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter emoji"})

	emoji.get(emoji1)
    .then(async emoji => {
	resul = await getBuffer(emoji.images[7].url)
	res.set({'Content-Type': 'image/png'})
	res.send(resul)
	})
	.catch(error => {
		res.json(loghandler.emoji)
	})
})
//―――――――――――――――――――――――――――――――――――――――――― ┏  Tools ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

router.get('/tools/ebase64', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})  
	if (text1.length > 2048) return res.json({ status : false, creator : `${creator}`, message : "[!] Maximal 2.048 String!"})

		res.json({
			status: true,
			creator: `${creator}`,
			result: Buffer.from(text1).toString('base64')
		})

})

router.get('/tools/debase64', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})  
	if (text1.length > 2048) return res.json({ status : false, creator : `${creator}`, message : "[!] Maximal 2.048 String!"})

		res.json({
			status: true,
			creator: `${creator}`,
			result: Buffer.from(text1, 'base64').toString('ascii')
		})

})

router.get('/tools/ebinary', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})  
	if (text1.length > 2048) return res.json({ status : false, creator : `${creator}`, message : "[!] Maximal 2.048 String!"})

	function encodeBinary(char) {
		return char.split("").map(str => {
			 const converted = str.charCodeAt(0).toString(2);
			 return converted.padStart(8, "0");
		}).join(" ")
	 }

		res.json({
			status: true,
			creator: `${creator}`,
			result: encodeBinary(text1)
		})
})

router.get('/tools/debinary', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})  
	if (text1.length > 2048) return res.json({ status : false, creator : `${creator}`, message : "[!] Maximal 2.048 String!"})

	function decodeBinary(char) {
		return char.split(" ").map(str => String.fromCharCode(Number.parseInt(str, 2))).join("");
	 }

		res.json({
			status: true,
			creator: `${creator}`,
			result: decodeBinary(text1)
		})

})

router.get('/tools/ssweb', async (req, res, next) => {
	var link = req.query.link
	if (!link ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter link"})  

	var islink = isUrl(link)
	if (!islink ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter url sahaja"})  


	alip.ssweb(link)
	.then((data) =>{ 
		if (!data ) return res.json(loghandler.notfound)
		res.set({'Content-Type': 'image/png'})
		res.send(data)
	})
	.catch((err) =>{
	 res.json(loghandler.notfound)
	
	})


	//let randomapissweb = apissweb[Math.floor(Math.random() * apissweb.length)]
	//let result = await getBuffer(`https://shot.screenshotapi.net/screenshot?token=${randomapissweb}&url=${link}&full_page=true&fresh=true&output=image&file_type=png&wait_for_event=load`)
	//if (!result.code ) {
	//	res.set({'Content-Type': 'image/png'})
	//	res.send(result)
	//}else{
	//	res.json(loghandler.error)
	//}

})

router.get('/tools/styletext', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text "}) 
	var text = shortText(text1, 10000)  
	alip.styletext(text)
.then((data) =>{ 
	if (!data ) return res.json(loghandler.error)
  res.json({
	status: true,
	creator: `${creator}`,
	result: data
})
})
.catch((err) =>{
 res.json(loghandler.error)

})
})

//―――――――――――――――――――――――――――――――――――――――――― ┏  Islamic  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\


router.get('/islamic/surah', async (req, res, next) => {
	var text1 = req.query.no
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter no"})  
	alip.surah(text1)
.then((data) =>{ 
	if (!data ) return res.json(loghandler.notfound)
		res.json({
			status: true,
			creator: `${creator}`,
			result: data
		})
})
.catch((err) =>{
 res.json(loghandler.error)

})
})


router.get('/islamic/tafsirsurah', async (req, res, next) => {
	var text1 = req.query.text
	if (!text1 ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter text"})  
	alip.tafsirsurah(text1)
.then((data) =>{ 
	if (!data[0] ) return res.json(loghandler.notfound)
		res.json({
			status: true,
			creator: `${creator}`,
			result: data
		})
})
.catch((err) =>{
 res.json(loghandler.error)

})
})

module.exports = router