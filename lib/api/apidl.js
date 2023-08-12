//―――――――――――――――――――――――――――――――――――――――――― ┏  Modules ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

const cheerio = require("cheerio")
const axios = require("axios")
const qs = require("qs")
const fetch = require('node-fetch')
const FormData = require('form-data')
const request = require("request")
var export_data = require("./export");
const { rest } = require("lodash")
const e = require("connect-flash")


//―――――――――――――――――――――――――――――――――――――――――― ┏  Funtion ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

function parseFileSize(size) {
    return parseFloat(size) * (/GB/i.test(size)
        ? 1000000
        : /MB/i.test(size)
            ? 1000
            : /KB/i.test(size)
                ? 1
                : /bytes?/i.test(size)
                    ? 0.001
                    : /B/i.test(size)
                        ? 0.1
                        : 0);
}

//―――――――――――――――――――――――――――――――――――――――――― ┏  ApiDl By Alip ┓ ―――――――――――――――――――――――――――――――――――――――――― \\


function zippyshare(url) {
    return new Promise(async(resolve, reject) => {
		const [_, __, host, ___, id] = url.split('/');
		var _a, _b, _c;
		if (!/zippyshare\.com/.test(url)) return resolve()
		if (host == 'www32.zippyshare.com') {
			const res = await axios.get(url);
			const $ = cheerio.load(res.data);
			const filename = $('#lrbox > div:nth-child(2) > div:nth-child(1) > font:nth-child(4)').text()
			const filesizeH = $('#lrbox > div:nth-child(2) > div:nth-child(1) > font:nth-child(7)').text()
			const filesize = (0, parseFileSize)(filesizeH);
			const aploud = $('#lrbox > div:nth-child(2) > div:nth-child(1) > font:nth-child(10)').text()
			const urlId = (_c = (_b = /\((.*?)\)/i.exec((_a = $.html().split('document.getElementById(\'dlbutton\').href =')[1]) === null || _a === void 0 ? void 0 : _a.split(';')[0])) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.trim();
			if (!urlId) {
				resolve()
			}
			const urlIdRes = eval(urlId);
			const _url = `https://${host}/d/${id}/${urlIdRes}/${filename}`;
			const url2 = `https://${host}/i/${id}/${urlIdRes}/${filename}`
			const result = {
				url: _url,
				url2,
				filename,
				filesizeH,
				filesize,
				aploud
			};
			return resolve(result);
	
		}else{

			const res = await axios.get(url);
			const $ = cheerio.load(res.data);
			const $lrbox = $('#lrbox > div.left');
			const filename = $lrbox.find('font').eq(2).text().trim();
			const $div = $lrbox.find('div').eq(0).find('div').eq(0);
			const filesizeH = $div.find('font').eq(1).text().trim();
			const filesize = (0, parseFileSize)(filesizeH);
			const aploud = $div.find('font').eq(3).text().trim();
			const lastDownload = $div.find('font').eq(5).text().trim();
			const urlId = (_c = (_b = /\((.*?)\)/i.exec((_a = $.html().split('document.getElementById(\'dlbutton\').href =')[1]) === null || _a === void 0 ? void 0 : _a.split(';')[0])) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.trim();
			if (!urlId) {
				resolve()
			}
			const urlIdRes = eval(urlId);
			const _url = `https://${host}/d/${id}/${urlIdRes}/${filename}`;
			const result = {
				url: _url,
				filename,
				filesizeH,
				filesize,
				upload_date: aploud,
				lastDownload
			};
			return resolve(result);
		}
	})
}

function mediafiredl(url) {
    return new Promise(async(resolve, reject) => {
		var a, b;
		if (!/https?:\/\/(www\.)?mediafire\.com/.test(url)) return resolve()
	   const data = await axios.get(url).catch(function (error) {})
	   if (!data) {
		resolve()
	   } else {
		const $ = cheerio.load(data.data);
		const Url = ($('#downloadButton').attr('href') || '').trim();
		const url2 = ($('#download_link > a.retry').attr('href') || '').trim();
		const $intro = $('div.dl-info > div.intro');
		const filename = $intro.find('div.filename').text().trim();
		const filetype = $intro.find('div.filetype > span').eq(0).text().trim();
		const ext = ((b = (a = /\(\.(.*?)\)/.exec($intro.find('div.filetype > span').eq(1).text())) === null || a === void 0 ? void 0 : a[1]) === null || b === void 0 ? void 0 : b.trim()) || 'bin';
		const $li = $('div.dl-info > ul.details > li');
		const aploud = $li.eq(1).find('span').text().trim();
		const filesizeH = $li.eq(0).find('span').text().trim();
		const filesize = (0, parseFileSize)(filesizeH);
		const result = {
			url: Url || url2,
			url2,
			filename,
			filetype,
			ext,
			upload_date: aploud,
			filesizeH,
			filesize
		};
		resolve(result)
	   }
	 
		})
}


function sfilemobiSearch(query, page = 1) {
    return new Promise(async(resolve, reject) => {
		const html = await axios.get(`https://sfile.mobi/search.php?q=${query}&page=${page}`)
		const $ = cheerio.load(html.data);
		const results = [];
		$('div > div > div > div.list').each((_, el) => {
			var _a, _b;
			const $el = $(el);
			const url = $el.find('a').attr('href');
			const filename = $el.find('a').text();
			const icon = $el.find('img').attr('src');
			const type = (_a = /\/smallicon\/(.*?)\.svg/.exec(icon)) === null || _a === void 0 ? void 0 : _a[1];
			const filesizeH = (_b = /\((.*?)\)/.exec($el.text())) === null || _b === void 0 ? void 0 : _b[1];
			const filesize = filesizeH && (0, parseFileSize)(filesizeH);
			if (filename && url) {
				results.push({
					url,
					filename,
					icon: icon,
					type: type,
					filesizeH: filesizeH,
					filesize: filesize
				});
			}
		});
		if (!results.length) {
			resolve()
		}
		return  resolve(results)
	})
}


function sfilemobi(url) {
    return new Promise(async(resolve, reject) => {
		var _a, _b, _c, _d, _e, _f, _g, _h, _j;
		if (!/sfile\.mobi/i.test(url)) return resolve()	
		const html = await axios.get(url).catch(function (error) {})
		if (!html) {
			resolve();
		}else{
			const $ = cheerio.load(html.data);
			const $k = (_a = /var z = (.*?);/i.exec($.html())) === null || _a === void 0 ? void 0 : _a[1];
			const urlPage = (((_d = (((_b = /var db = "(.*?)"/i.exec($.html())) === null || _b === void 0 ? void 0 : _b[1]) || ((_c = /var sf = "(.*?)"/i.exec($.html())) === null || _c === void 0 ? void 0 : _c[1]))) === null || _d === void 0 ? void 0 : _d.replace(/\\(\\)?/gi, '')) ||
				$('#download').attr('href')) + `&k=${$k}`;
			const filename = $('div.intro-container > img').attr('alt') || $('div.intro-container > h1').text();
			const icon = $('div.intro-container > img').attr('src');
			const type = (_e = /\/smallicon\/(.*?)\.svg/.exec(icon)) === null || _e === void 0 ? void 0 : _e[1];
			const $list = $('div.list');
			const mimetype = (_f = $list.eq(0).text().split('-')[1]) === null || _f === void 0 ? void 0 : _f.trim();
			const aploud = (_g = $list.eq(2).text().split('Uploaded:')[1]) === null || _g === void 0 ? void 0 : _g.trim();
			const $aploud = $list.eq(1).find('a');
			const aploudby = $aploud.eq(0).text();
			const aploudbyUrl = $aploud.eq(0).attr('href');
			const aploudon = $aploud.eq(1).text();
			const aploudonUrl = $aploud.eq(1).attr('href');
			const decs = $('body > div.w3-row-padding.w3-container.w3-white > div > div:nth-child(1) > div:nth-child(6) ').text()
			const downloads = parseInt((_h = $list.eq(3).text().split('Downloads:')[1]) === null || _h === void 0 ? void 0 : _h.trim());
			const filesizeH = (_j = /\((.*?)\)/i.exec($('#download').text())) === null || _j === void 0 ? void 0 : _j[1];
			const filesize = filesizeH && (0, parseFileSize)(filesizeH);
			const results = {
				url: urlPage,
				decs,
				filename,
				icon,
				type,
				mimetype,
				upload_date: aploud,
				upload_by: aploudby,
				upload_byUrl: aploudbyUrl,
				upload_don: aploudon,
				upload_donUrl: aploudonUrl,
				downloads_count: downloads,
				filesizeH,
				filesize: filesize
			};
		  resolve(results);
		}
	})
}

function musically(URL) {
	return new Promise((resolve, rejecet) => {
        axios.get('https://musicaldown.com/id', {
            headers: {
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            }
        }).then(res => {
            const $ = cheerio.load(res.data)
            const url_name = $("#link_url").attr("name")
            const token_name = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("name")
            const token_ = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("value")
            const verify = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(3)").attr("value")
            let data = {
                [`${url_name}`]: URL,
                [`${token_name}`]: token_,
                verify: verify
            }
        axios.request({
            url: 'https://musicaldown.com/id/download',
            method: 'post',
            data: new URLSearchParams(Object.entries(data)),
            headers: {
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                'cookie': res.headers["set-cookie"]
            }
        }).then(respon => {
            const ch = cheerio.load(respon.data)

		if(!ch('body > div.welcome.section > div > div:nth-child(3) > div.col.s12.l4.center-align > div > div > img').attr('src')){
			
			let hasil = []
            ch('body > div.welcome.section > div > div:nth-child(3) > div > div.row > div').each(function (a, b) {
                hasil.push({
                    url: ch(b).find('img').attr('src'),
					url_download: ch(b).find('a').attr('href')
                })
            })
			
			let result = {
				audio: ch('body > div.welcome.section > div > div:nth-child(3) > div > a.btn.waves-effect.waves-light.orange.download').attr('href'),
				photo: hasil
			}
			if (!result.photo[0]){
			resolve()
			}else{
			resolve(result)	
			}
		
		}else{

        axios.request({
            url: 'https://musicaldown.com/id/mp3',
            method: 'post',
            headers: {
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                'cookie': res.headers["set-cookie"]
            }
        }).then(resaudio => { 
            const hc = cheerio.load(resaudio.data)       
            const result = {
				pp: ch('body > div.welcome.section > div > div:nth-child(3) > div.col.s12.l4.center-align > div > div > img').attr('src'),
				username: ch('body > div.welcome.section > div > div:nth-child(3) > div.col.s12.l4.center-align > div > h2:nth-child(2) > b').text(),
				description: ch('body > div.welcome.section > div > div:nth-child(3) > div.col.s12.l4.center-align > div > h2:nth-child(3)').text(),
				video: ch('body > div.welcome.section > div > div:nth-child(3) > div.col.s12.l8 > a:nth-child(3)').attr('href'),
				video2: ch('body > div.welcome.section > div > div:nth-child(3) > div.col.s12.l8 > a:nth-child(5)').attr('href'),
                video_HD: ch('body > div.welcome.section > div > div:nth-child(3) > div.col.s12.l8 > a:nth-child(7)').attr('href'),
				video_watermark: ch('body > div.welcome.section > div > div:nth-child(3) > div.col.s12.l8 > a:nth-child(9)').attr('href'),
				audio: hc('body > div.welcome.section > div > div:nth-child(3) > div.col.s12.l8 > a:nth-child(6)').attr('href'), 
				audio_Download: hc('body > div.welcome.section > div > div:nth-child(3) > div.col.s12.l8 > a.btn.waves-effect.waves-light.orange.download').attr('href')
            }
        resolve(result)
		})
	  }
   })
})
})
}

function ringtone(title) {
    return new Promise((resolve, reject) => {
        axios.get('https://meloboom.com/en/search/'+title)
        .then((get) => {
            let $ = cheerio.load(get.data)
            let hasil = []
            $('#__next > main > section > div.jsx-2244708474.container > div > div > div > div:nth-child(4) > div > div > div > ul > li').each(function (a, b) {
                hasil.push({ title: $(b).find('h4').text(), source: 'https://meloboom.com/'+$(b).find('a').attr('href'), audio: $(b).find('audio').attr('src') })
            })
            resolve(hasil)
		}).catch(reject)
		})
}


function aiovideodl(link) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'https://aiovideodl.ml/',
            method: 'GET',
            headers: {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "cookie": "PHPSESSID=69ce1f8034b1567b99297eee2396c308; _ga=GA1.2.1360894709.1632723147; _gid=GA1.2.1782417082.1635161653"
            }
        }).then((src) => {
            let a = cheerio.load(src.data)
            let token = a('#token').attr('value')
            axios({
                url: 'https://aiovideodl.ml/wp-json/aio-dl/video-data/',
                method: 'POST',
                headers: {
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                    "cookie": "PHPSESSID=69ce1f8034b1567b99297eee2396c308; _ga=GA1.2.1360894709.1632723147; _gid=GA1.2.1782417082.1635161653"   
                },
                data: new URLSearchParams(Object.entries({ 'url': link, 'token': token }))
            }).then(({ data }) => {
				
                resolve(data.medias)
            },
			(error) => {
				resolve()
			}
			)	
			
		})
		.catch(reject)
		})
}

function wikimedia(title) {
    return new Promise((resolve, reject) => {
        axios.get(`https://commons.wikimedia.org/w/index.php?search=${title}&title=Special:MediaSearch&go=Go&type=image`)
        .then((res) => {
            let $ = cheerio.load(res.data)
            let hasil = []
            $('.sdms-search-results__list-wrapper > div > a').each(function (a, b) {
                hasil.push({
                    title: $(b).find('img').attr('alt'),
                    source: $(b).attr('href'),
                    image: $(b).find('img').attr('data-src') || $(b).find('img').attr('src')
                })
            })
			
            resolve(hasil)
		})
		.catch(reject)
		})
}

function wallpaper(title, page = '1') {
    return new Promise((resolve, reject) => {
		const random = [1,2,3,4,5,6,7,8,9,10]
		let randomgambar = random[Math.floor(Math.random() * random.length)]
        axios.get(`https://www.besthdwallpaper.com/search?CurrentPage=${randomgambar}&q=${title}`)
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let hasil = []
            $('div.grid-item').each(function (a, b) {
                hasil.push({
                    title: $(b).find('div.info > a > h3').text(),
                    type: $(b).find('div.info > a:nth-child(2)').text(),
                    source: 'https://www.besthdwallpaper.com'+$(b).find('div > a:nth-child(3)').attr('href'),
                    image:  $(b).find('picture > source:nth-child(2)').attr('srcset')
                })
            })
	
            resolve(hasil)
		})
		.catch(reject)
		})
}


function covid(){
	return new Promise(async(resolve, reject) => {
		axios.get('https://covid19.go.id/')
		.then(({ data }) => {
			const $ = cheerio.load(data)
			const hasil = [];
			$('#case > div > div > div > div > div:nth-child(2)').each(function(a,b) {
				const pindo = $(b).find('div:nth-child(3) > strong').text()
				const mindo = $(b).find('div:nth-child(5) > strong').text()
				const sindo = $(b).find('div:nth-child(4) > strong').text()
				const upindo = $(b).find('div.pt-4.text-color-black.text-1').text().trim()
			$('#case > div > div > div > div > div:nth-child(1)').each(function(c,d) {
					const neg = $(d).find('div:nth-child(3) > strong').text() 
					const pglo = $(d).find('div:nth-child(4) > strong').text()
					const nglo = $(d).find('div:nth-child(5) > strong').text()
					const up = $(d).find('div.pt-4.text-color-grey.text-1').text().trim()
				const result = {
					indo : {
						positif_indo: pindo,
						meninggal_indo: mindo,
						sembuh_indo: sindo,
						update_indo: upindo.split(':')[1]
					},
					global: {
						negara: neg,
						positif: pglo,
						meninggal: nglo,
						update: up.split(':')[1].split('\n')[0]

					}
				}
				hasil.push(result)
				})
			})
			resolve(hasil)
		})
		.catch(reject)
	})
}



function tebakgambar() {
	return new Promise(async(resolve, reject) => {
    axios.get('https://jawabantebakgambar.net/all-answers/')
    .then(({ data }) => {
    const $ = cheerio.load(data)
    const result = [];
    let random = Math.floor(Math.random() * 2836) + 2;
    let link2 = 'https://jawabantebakgambar.net'
    $(`#images > li:nth-child(${random}) > a`).each(function(a, b) {
    const img = link2 + $(b).find('img').attr('data-src')
    const jwb = $(b).find('img').attr('alt')
    result.push({
    	image: img,
    	jawaban: jwb
    })
	let res = result[Math.floor(Math.random() * result.length)]
    	resolve(res)
    })
    	})
    .catch(reject)
	})
}

function surah(no){
	return new Promise(async(resolve, reject) => {
		axios.get('https://kalam.sindonews.com/surah/' + no)
		.then(({ data }) => {
			const $ = cheerio.load(data)

			const result = [];
			const ar = [];
			const id = [];
			const lt = [];
			$('div.ayat-arab').each(function(a, b) {
				ar.push($(b).text()) 
			})
			$('li > div.ayat-text').each(function(e, f) {
				id.push($(f).text().replace(',','').trim()) })
			$('div.ayat-latin').each(function(g, h) {
				lt.push($(h).text().trim())	})
			for(let i = 0; i < ar.length ; i++){
			result.push({
				arab: ar[i],
				rumi: id[i],
				latin: lt[i],
			})
		}
		var	ya = $('body > main > div.container > div.content.clearfix > div.news.col-md-9 > section > div.list-content.clearfix > div:nth-child(1) > div.ayat-title > h1').text()
		if (!ya ) {
			resolve()
		}else{
			resolve(result)
		}
			
		})
		.catch(reject)
	})
}
function sholat(NO) {
	return new Promise(async(resolve, reject) =>{
		axios.get('https://kalam.sindonews.com/jadwalsholat/' + NO).then(({ data }) => {
			const $ = cheerio.load(data)
			const result = {};
			$('div.imsakiyah-content').each(function(a, b) {
			result.Tanggal = $(b).find('tr:nth-child(1) > td:nth-child(1)').text()
			result.imsak = $(b).find('tr:nth-child(1) > td:nth-child(2)').text()
			result.subuh = $(b).find('tr:nth-child(1) > td:nth-child(3)').text()
			result.zuhur = $(b).find('tr:nth-child(1) > td:nth-child(4)').text()
			result.ashar = $(b).find('tr:nth-child(1) > td:nth-child(5)').text()
			result.maghrib = $(b).find('tr:nth-child(1) > td:nth-child(6)').text()
			result.isya = $(b).find('tr:nth-child(1) > td:nth-child(7)').text()
			})
			resolve(result)
		})
		.catch(reject)
	})
}

function lirik(link,title){
	return new Promise(async(resolve, reject) => {
   		axios.get(link).then(async({ data }) => {
		const $ = cheerio.load(data)
   		const hasil = {};
	        	hasil.tajuk = title
				hasil.artis = $('#site > div > div > div > main > div > div > div.mxm-track-banner.top > div > div > div > div.col-sm-10.col-md-8.col-ml-9.col-lg-9.static-position > div.track-title-header > div.mxm-track-title > h2 > span > a').text()
		   		hasil.thumb = 'https:' + $('div.col-sm-1.col-md-2.col-ml-3.col-lg-3.static-position > div > div > div').find('img').attr('src')
		  		$('div.col-sm-10.col-md-8.col-ml-6.col-lg-6 > div.mxm-lyrics').each(function(a,b) {
		   hasil.lirik = $(b).find('span > p > span').text() +'\n' + $(b).find('span > div > p > span').text()
	   })
	   resolve(hasil)
   })
   .catch(reject)
   })
}

function chara(query) {
	return new Promise((resolve, reject) => {
		axios.get('https://www.wallpaperflare.com/search?wallpaper='+ query,{
			headers: {
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "_ga=GA1.2.863074474.1624987429; _gid=GA1.2.857771494.1624987429; __gads=ID=84d12a6ae82d0a63-2242b0820eca0058:T=1624987427:RT=1624987427:S=ALNI_MaJYaH0-_xRbokdDkQ0B49vSYgYcQ"
			}
		})
		.then(({ data }) => {
			const $ = cheerio.load(data)
			const result = [];
			$('#gallery > li > figure > a').each(function(a, b) {
				result.push($(b).find('img').attr('data-src'))
			})
			let jadi = result[Math.floor(Math.random() * result.length)]
			resolve(jadi)
		})
	.catch({status: 'err'})
	})
}

function wattpad(judul){
	return new Promise((resolve, reject) => {
		axios.get('https://www.wattpad.com/search/' + judul)
		.then(({data}) => {
			const $ = cheerio.load(data)
			const result = [];
			const jdl = [];
			const img = [];
			const des = [];
			const lnk = [];
			const red = [];
			const vt = [];
			const limk = 'https://www.wattpad.com/'
			$('div.cover.cover-xs.pull-left').each(function(a,b){
				img.push($(b).find('img').attr('src')) 
			})
			$('div.content > h5').each(function(a,b) {
				jdl.push($(b).text().trim())
			})	
			$('div.content > p').each(function(a,b){
				des.push($(b).text().trim())
			})	
			$('#results-stories > div > ul > li').each(function(a,b){
				lnk.push(limk + $(b).find('a.on-result').attr('data-id'))
			})
			$('div.content > div > small.reads').each(function(a,b){
				red.push($(b).text())
			})
			$('div.content > div > small.votes').each(function(a, b) {
				vt.push($(b).text())
			})
		for (let i = 0; i < lnk.length; i++){
			result.push({
					judul: jdl[i],
					desc: des[i],
					vote: vt[i],
					reads: red[i],
					image: img[i],
					link: lnk[i]
			})
			resolve(result)
		}
		})
	.catch({message: 'err'})
	})
}

function playstore(name){
	return new Promise((resolve, reject) => {
		axios.get('https://play.google.com/store/search?q='+ name +'&c=apps')
		.then(({ data }) => {
			const $ = cheerio.load(data)
			let ln = [];
			let nm = [];
			let dv = [];
			let lm = [];
			const result = [];
			$('div.wXUyZd > a').each(function(a,b){
				const link =  'https://play.google.com' + $(b).attr('href')
				ln.push(link);
			})
			$('div.b8cIId.ReQCgd.Q9MA7b > a > div').each(function(d,e){
				const name = $(e).text().trim()
				nm.push(name);
			})
			$('div.b8cIId.ReQCgd.KoLSrc > a > div').each(function(f,g){
				const dev = $(g).text().trim();
				dv.push(dev)
			})
			$('div.b8cIId.ReQCgd.KoLSrc > a').each(function(h,i){
				const limk = 'https://play.google.com' + $(i).attr('href');
				lm.push(limk);
			})			
		for (let i = 0; i < ln.length; i++){
			result.push({
				name: nm[i],
				link: ln[i],
				developer: dv[i],
				link_dev: lm[i]
			})
	}
		resolve(result)
		})
	.catch(reject)
	})
}

function linkwa(nama){
	return new Promise((resolve,reject) => {
		axios.get('http://ngarang.com/link-grup-wa/daftar-link-grup-wa.php?search='+ nama +'&searchby=name')
		.then(({ data }) => {
			const $ = cheerio.load(data);
			const result = [];
			const lnk = [];
			const nm = [];
		$('div.wa-chat-title-container').each(function(a,b){
			const limk = $(b).find('a').attr('href');
			lnk.push(limk)
			})
		$('div.wa-chat-title-text').each(function(c,d) {
			const name = $(d).text();
			nm.push(name)
			})
		for( let i = 0; i < lnk.length; i++){
			result.push({
				nama: nm[i].split('. ')[1],
				link: lnk[i].split('?')[0]
			})
		}
	
		resolve(result)
		})
	.catch(reject)
	})
}

function pinterest(querry){
	return new Promise(async(resolve,reject) => {
		 axios.get('https://id.pinterest.com/search/pins/?autologin=true&q=' + querry, {
			headers: {
			"cookie" : "_auth=1; _b=\"AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg=\"; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0"
		}
			}).then(({ data }) => {
		const $ = cheerio.load(data)
		const result = [];
		const hasil = [];
   		 $('div > a').get().map(b => {
        const link = $(b).find('img').attr('src')
            result.push(link)
		});
   		result.forEach(v => {
		 if(v == undefined) return
		 hasil.push(v.replace(/236/g,'736'))
			})
			hasil.shift()
		
				resolve(hasil)
		
		})
	})
}

function igstory (username) {
		return new Promise(async(resolve, reject) => {
			axios.get('https://storydownloader.app/en',{
				headers: {
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
				}
			})
			.then(res  => {
				const $ = cheerio.load(res.data)
				var token = $('body > main > div.hero.pt-5.pb-5 > div.container.w > div > form > div.input-group.mb-2 > input[type=hidden]:nth-child(2)').attr('value')
				axios.request({
					url: 'https://storydownloader.app/request',
					method: 'post',
					data: new URLSearchParams(Object.entries({ 'username': username, '_token': token })),
					headers: {
						'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
						'cookie': res.headers["set-cookie"]
					}
				}).then(respon => {
					if(!respon.data.html) {
						return resolve()
				}else{
					const $ = cheerio.load(respon.data.html)	
					let hasil = []
					$('div.row > div').each(function (a, b) {
						hasil.push({
							image: $(b).find('img').attr('src'),
							url_download: $(b).find('a').attr('href')
						})
					})
					const result = {
						username: $('h3.card-title').text(),
						profile_picture: $('img.card-avatar').attr('src'),
						url: hasil
					}
					return resolve(result)
				}
				}).catch(reject => {
					return resolve()
				})
		})
	})
}
			
	

function igdl(url){
	return new Promise(async(resolve, reject) => {
		var data;
		const hasil = []
		try {
			data = await export_data(url);
		} catch {
			return resolve()
		}
		if (!data.url){
			if (!data[0]){
				return resolve()
			}else{
			for (let i = 0; i < data.length; i++) {
				let result = {
						image: data[i].thumb,
						video: data[i].sd
				  }
				hasil.push(result)
			}

			let dataresult = {
				decs: data[0].meta.title,
				source: data[0].meta.source,
				url: hasil
			}
			  return resolve(dataresult)
		}
		}else{
		let result = {
		  url: data.url,
		  thumb: data.thumb,
		  decs: data.meta.title,
		  source: data.meta.source
		}
		return resolve(result)
	}
	})
}

function igstalk(username){
	return new Promise((resolve,reject) => {
		axios.get('https://www.instagram.com/'+ username +'/channel/?__a=1',{
			method: 'GET',
			headers: {
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
				"cookie": "ig_did=085C2CB5-8000-4441-85DD-CF5BCA1FE157; ig_nrcb=1; csrftoken=7ZyQtU7rsZFsOgvKLjflk0KLMmTC4Chh; mid=YooZLAALAAF_nhOq9DEEIGOl8xB8; fbm_124024574287414=base_domain=.instagram.com; fbsr_124024574287414=d4okoqSIG-fbjXgJKE07737dLXrQkN682RmOZvAdn8M.eyJ1c2VyX2lkIjoiMTAwMDQxMDU2ODc1NDA4IiwiY29kZSI6IkFRQ3ZLZkpVdzZ3WkVaUmhleTRodjFyV05BZ0JlUXM1cVRlVTJnWnZrbjkxOXllN2lfUGM1a2VjUHRIZF9qdy1KS2tDcE9Jb3ZTUmF0SGxDaTZNdzFCODFYdXJ0OEZ4aVZKVGNTMzRLbVFMVHFYVzY5NGU1X0ltcDFZSmdWSVBwLUFwblpJbkRkWWRYSURSSk9oRVZScGNuRVE1MVMwNWtXeFZxZ0EwQzZRN1VsQzcxVTdCLWNDS0haNzk3cU9vYk9yRl9mcHVZdUs3a3Fic1djaU5NVF9TbkszN2kyLVFxalEtei1SanF3bFNONnNxWXJWaUhfbTIzSWJWdUVwZUZxRzYweldoR0NxLUM5TXF5dHNYTGRzM3NNY25IS3Z0Tmc2VzIxRHFpM3poSGQybFNQUS1IR2U1ZERkUWIyS3liZzlYUXNCX3FvemhWOHI3WVBFLVYwUmI3V2s5VEpiMWNaMlBQcEFPaDJRR0lEZyIsIm9hdXRoX3Rva2VuIjoiRUFBQnd6TGl4bmpZQkFKakVxOGZNUmNYQm1sOUpkWkFzcUxqaU9wVGZic2dYYUd6dDZaQUhla0FtV0lUOUdPdWpkSlFjMVlkMFR5SjYwWkF5Mm5PWkFRemtCREUwbU1wdkZ3WDN5cTdkVnppWkNFYjR3NkZQRnlOSVdiY29aQVc1RWEwdjJNOXdxYnd4SXBITkFESTBCZXB5eFg1UU9NN3dtUDhaQWI3NVlKQ04xR213a2d6eXRjQjBRVFNBRXlDc1lZWkQiLCJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTY1NDM0NTk2MX0; fbsr_124024574287414=d4okoqSIG-fbjXgJKE07737dLXrQkN682RmOZvAdn8M.eyJ1c2VyX2lkIjoiMTAwMDQxMDU2ODc1NDA4IiwiY29kZSI6IkFRQ3ZLZkpVdzZ3WkVaUmhleTRodjFyV05BZ0JlUXM1cVRlVTJnWnZrbjkxOXllN2lfUGM1a2VjUHRIZF9qdy1KS2tDcE9Jb3ZTUmF0SGxDaTZNdzFCODFYdXJ0OEZ4aVZKVGNTMzRLbVFMVHFYVzY5NGU1X0ltcDFZSmdWSVBwLUFwblpJbkRkWWRYSURSSk9oRVZScGNuRVE1MVMwNWtXeFZxZ0EwQzZRN1VsQzcxVTdCLWNDS0haNzk3cU9vYk9yRl9mcHVZdUs3a3Fic1djaU5NVF9TbkszN2kyLVFxalEtei1SanF3bFNONnNxWXJWaUhfbTIzSWJWdUVwZUZxRzYweldoR0NxLUM5TXF5dHNYTGRzM3NNY25IS3Z0Tmc2VzIxRHFpM3poSGQybFNQUS1IR2U1ZERkUWIyS3liZzlYUXNCX3FvemhWOHI3WVBFLVYwUmI3V2s5VEpiMWNaMlBQcEFPaDJRR0lEZyIsIm9hdXRoX3Rva2VuIjoiRUFBQnd6TGl4bmpZQkFKakVxOGZNUmNYQm1sOUpkWkFzcUxqaU9wVGZic2dYYUd6dDZaQUhla0FtV0lUOUdPdWpkSlFjMVlkMFR5SjYwWkF5Mm5PWkFRemtCREUwbU1wdkZ3WDN5cTdkVnppWkNFYjR3NkZQRnlOSVdiY29aQVc1RWEwdjJNOXdxYnd4SXBITkFESTBCZXB5eFg1UU9NN3dtUDhaQWI3NVlKQ04xR213a2d6eXRjQjBRVFNBRXlDc1lZWkQiLCJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTY1NDM0NTk2MX0",
				"set-cookie": "csrftoken=7ZyQtU7rsZFsOgvKLjflk0KLMmTC4Chh; Domain=.instagram.com; expires=Sat, 03-Jun-2023 12:35:09 GMT; Max-Age=31449600; Path=/; Secure"
			}
		})
		.then(({ data }) => {
			const user = data.graphql.user
			let result = {
                id: user.id,
                biography: user.biography,
                followers: user.edge_followed_by.count,
                following: user.edge_follow.count,
                fullName: user.full_name,
                highlightCount: user.highlight_reel_count,
                isBusinessAccount: user.is_business_account,
                isRecentUser: user.is_joined_recently,
                accountCategory: user.business_category_name,
                linkedFacebookPage: user.connected_fb_page,
                isPrivate: user.is_private,
                isVerified: user.is_verified,
                profilePicHD: user.profile_pic_url_hd,
                username: user.username,
                postsCount: user.edge_owner_to_timeline_media.count
			}
		resolve(result)
		})
	.catch(reject)
	})
}

function twitter(link){
	return new Promise((resolve, reject) => {
		let config = {
			'url': link
		}
		axios.post('https://www.expertsphp.com/instagram-reels-downloader.php',qs.stringify(config),{
			headers: {
				"content-type": 'application/x-www-form-urlencoded',
				'cookie':'_gid=GA1.2.1209552833.1682995186; _gat_gtag_UA_120752274_1=1; __gads=ID=e2d27851a97b70ac-222d68fe87e000b0:T=1682995185:RT=1682995185:S=ALNI_MYaXoBa8KWleDZ97JpSaXGyI7nu3g; __gpi=UID=00000be71a67625d:T=1682995185:RT=1682995185:S=ALNI_MYyedH9xuRqL2hx4rg7YyeBDzK36w; _ga_D1XX1R246W=GS1.1.1682995185.1.1.1682995205.0.0.0; _ga=GA1.1.363250370.1682995185',
				'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
			  },
		})
		.then(({ data }) => {
		const $ = cheerio.load(data)
	resolve({
				video: $('div.col-md-4.col-md-offset-4 > table > tbody > tr > td > video').attr('src')			})
		}).catch(reject)
	})
}

 function fbDown2(url){
	return new Promise((resolve,reject) => {
		axios.get('https://saveas.co/')
		.then(({ data }) => {
		const $ = cheerio.load(data)
		let token = $('#token').attr('value')
		axios('https://saveas.co/system/action.php', {
			method: 'POST',
			data: 'url=' + ')encodeURIComponent(url + '/ + 'token=' + token
		})
		.then(({data}) => {
			resolve(data)
		})
		.catch(reject)
	})
	})
	}


function fbdown(link){
	return new Promise((resolve,reject) => {
	let config = {
		'url': link
		}
	axios('https://www.getfvid.com/downloader',{
			method: 'POST',
			data: new URLSearchParams(Object.entries(config)),
			headers: {
				"content-type": "application/x-www-form-urlencoded",
				"user-agent":  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "_ga=GA1.2.1310699039.1624884412; _pbjs_userid_consent_data=3524755945110770; cto_bidid=rQH5Tl9NNm5IWFZsem00SVVuZGpEd21sWnp0WmhUeTZpRXdkWlRUOSUyQkYlMkJQQnJRSHVPZ3Fhb1R2UUFiTWJuVGlhVkN1TGM2anhDT1M1Qk0ydHlBb21LJTJGNkdCOWtZalRtZFlxJTJGa3FVTG1TaHlzdDRvJTNE; cto_bundle=g1Ka319NaThuSmh6UklyWm5vV2pkb3NYaUZMeWlHVUtDbVBmeldhNm5qVGVwWnJzSUElMkJXVDdORmU5VElvV2pXUTJhQ3owVWI5enE1WjJ4ZHR5NDZqd1hCZnVHVGZmOEd0eURzcSUyQkNDcHZsR0xJcTZaRFZEMDkzUk1xSmhYMlY0TTdUY0hpZm9NTk5GYXVxWjBJZTR0dE9rQmZ3JTNEJTNE; _gid=GA1.2.908874955.1625126838; __gads=ID=5be9d413ff899546-22e04a9e18ca0046:T=1625126836:RT=1625126836:S=ALNI_Ma0axY94aSdwMIg95hxZVZ-JGNT2w; cookieconsent_status=dismiss"
			}
		})
	.then(async({ data }) => {
		const $ = cheerio.load(data)	
		resolve({
			Normal_video: $('body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(1) > a').attr('href'),
			HD: $('body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(1) > a').attr('href'),
			audio: $('body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(2) > a').attr('href')
			})
		})
	.catch(reject)
	})
}

function youtube(link){
	return new Promise((resolve, reject) => {
		const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
		if (ytIdRegex.test(link)) {
		let url =  ytIdRegex.exec(link)
		let config = {
			'url': 'https://www.youtube.be/' + url,
			'q_auto': 0,
			'ajax': 1
		}
		let headerss = 	{
			"sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
			"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
			"Cookie": 'PHPSESSID=6jo2ggb63g5mjvgj45f612ogt7; _ga=GA1.2.405896420.1625200423; _gid=GA1.2.2135261581.1625200423; _PN_SBSCRBR_FALLBACK_DENIED=1625200785624; MarketGidStorage={"0":{},"C702514":{"page":5,"time":1625200846733}}'
		}
	axios('https://www.y2mate.com/mates/en68/analyze/ajax',{
			method: 'POST',
			data: new URLSearchParams(Object.entries(config)),
			headers: headerss
		})
	.then(({ data }) => {
		const $ = cheerio.load(data.result)
		let img = $('div.thumbnail.cover > a > img').attr('src');
		let title = $('div.thumbnail.cover > div > b').text();
		let size = $('#mp4 > table > tbody > tr:nth-child(3) > td:nth-child(2)').text()
		let size_mp3 = $('#audio > table > tbody > tr:nth-child(1) > td:nth-child(2)').text()
		let id = /var k__id = "(.*?)"/.exec(data.result)[1]
		let configs = {
    type: 'youtube',
    _id: id,
    v_id: url[1],
    ajax: '1',
    token: '',
    ftype: 'mp4',
    fquality: 480
  }
	axios('https://www.y2mate.com/mates/en68/convert',{
		method: 'POST',
		data: new URLSearchParams(Object.entries(configs)),
		headers: headerss 
	})
	.then(({data}) => {
		const $ = cheerio.load(data.result)
		let link = $('div > a').attr('href')
	let configss = {
    type: 'youtube',
    _id: id,
    v_id: url[1],
    ajax: '1',
    token: '',
    ftype: 'mp3',
    fquality: 128
  }
	axios('https://www.y2mate.com/mates/en68/convert',{
		method: 'POST',
		data: new URLSearchParams(Object.entries(configss)),
		headers: headerss 
	})
	.then(({ data }) => {
		const $ = cheerio.load(data.result)
		let audio = $('div > a').attr('href')
		resolve({
			id: url[1],
			title: title,
			size: size,
			quality: '480p',
			thumb: img,
			link: link,
			size_mp3: size_mp3,
			mp3: audio
		})

		})
			})
		})
	.catch(reject)
	}else reject('link invalid')
	})
}

function ttdownloader(url){
	return new Promise(async(resolve, reject) => {
		axios.get('https://ttdownloader.com/',{
			headers: {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "PHPSESSID=9ut8phujrprrmll6oc3bist01t; popCookie=1; _ga=GA1.2.1068750365.1625213061; _gid=GA1.2.842420949.1625213061"
			}
		})
		.then(({ data }) => {
			const $ = cheerio.load(data)
			let token = $('#token').attr('value')
			let config = {
				'url': url,
				'format': '',
				'token': token
			}
		axios('https://ttdownloader.com/query/',{
			method: 'POST',
			data : new URLSearchParams(Object.entries(config)),
			headers: {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "PHPSESSID=9ut8phujrprrmll6oc3bist01t; popCookie=1; _ga=GA1.2.1068750365.1625213061; _gid=GA1.2.842420949.1625213061"
			}
			})
		.then(({ data }) => {
			const $ = cheerio.load(data)
			resolve({
				nowm: $('div:nth-child(2) > div.download > a').attr('href'),
				wm: $('div:nth-child(3) > div.download > a').attr('href'),
				audio: $('div:nth-child(4) > div.download > a').attr('href')
				})
			})
		})
	.catch(reject)
	})
}


function styletext(teks) {
    return new Promise((resolve, reject) => {
        axios.get('http://qaz.wtf/u/convert.cgi?text='+teks)
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let hasil = []
            $('table > tbody > tr').each(function (a, b) {
                hasil.push({ name: $(b).find('td:nth-child(1) > h6 > a').text(), result: $(b).find('td:nth-child(2)').text().trim() })
            }),
            resolve(hasil)
        })
    })
}

function watuksolatmy() {
    return new Promise((resolve, reject) => {
		axios.get('https://www.waktusolat.my/')
		.then(({ data }) => {
		  const $ = cheerio.load(data)
		  let hasil = []
		  $('#waktu-semua > tbody > tr').each(function (a, b) {
			hasil.push({
			   Negeri: $(b).find('td:nth-child(1) > h6 > a').text(),
			   Waktuk: { Imsak: $(b).find('td:nth-child(2)').text(),
			   Subuh: $(b).find('td:nth-child(3)').text(),
			   Syuruk: $(b).find('td:nth-child(4)').text(),
			   Zohor: $(b).find('td:nth-child(5)').text(),
			   Asar: $(b).find('td:nth-child(6)').text(),
			   Maghrib: $(b).find('td:nth-child(7)').text(),
			   Isyak: $(b).find('td:nth-child(8)').text(),}
	  
		  })  
		  })
 let tarih = $('#wrapper > main > section.cr-section.salat-times-area.bg--pattern.bg--pattern.bg--white.flower--right-bottom > div > div.col-lg-12.col-xl-8 > div > div > h5').text()
 
		  
		  var hasill = {
			Tarikh: tarih,
			results: hasil
		}
	resolve(hasill)
		})
        })
}

function soundcloud (url)  {
    return new Promise((resolve, reject) => {
        axios.get('https://soundcloudmp3.org/id').then((data) => {
            let a = cheerio.load(data.data)
            let token = a('form#conversionForm > input[type=hidden]').attr('value')
            const options = {
                method: 'POST',
                url: `https://soundcloudmp3.org/converter`,
                headers: {
                    "content-type": "application/x-www-form-urlencoded;",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                    "Cookie": data["headers"]["set-cookie"],
                },
                formData: {
                    _token: token,
                    url: url
                }
            };
            request(options, async function(error, response, body) {
                if (error) return reject()
                $get = cheerio.load(body)
                const result = {
                    title: $get('#preview > div:nth-child(3) > p:nth-child(2)').text().replace('Title:',''),
                    duration: $get('#preview > div:nth-child(3) > p:nth-child(3)').text().replace(/Length\:|Minutes/g,''),
                    quality: $get('#preview > div:nth-child(3) > p:nth-child(4)').text().replace('Quality:',''),
                    thumbnail: $get('#preview > div:nth-child(3) > img').attr('src'),
                    download: $get('#download-btn').attr('href')
                }
                resolve(result)
            });
        })
    })
}

function telesticker(url) {
    return new Promise(async (resolve, reject) => {
        packName = url.replace("https://t.me/addstickers/", "")
        data = await axios(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(packName)}`,{method: "GET",headers: {"User-Agent": "GoogleBot"}})
        const hasil = []
        for (let i = 0; i < data.data.result.stickers.length; i++) {
            fileId = data.data.result.stickers[i].thumb.file_id
            data2 = await axios(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${fileId}`)
            result = {
            url: "https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" + data2.data.result.file_path
            }
            hasil.push(result)
		}
		resolve(hasil)
	})
}

	function stickersearch(text) {
		return new Promise((resolve, reject) => {
			axios.get(`https://getstickerpack.com/stickers?query=${text}`)
				.then(({data}) => {
					const $ = cheerio.load(data)
					const source = []
					const link = [];
					var	ya = $('#stickerPacks > div > div:nth-child(3) > div > a').text()
		if (!ya ) return resolve()
					$('#stickerPacks > div > div:nth-child(3) > div > a').each(function(a, b) {
						source.push($(b).attr('href'))
					})
					axios.get(source[Math.floor(Math.random() * source.length)])
						.then(({
							data
						}) => {
							const $$ = cheerio.load(data)
							$$('#stickerPack > div > div.row > div > img').each(function(c, d) {
								link.push($$(d).attr('src').replace(/&d=200x200/g,''))
							})
							result = {
								title: $$('#intro > div > div > h1').text(),
								sticker_url: link
							}
							resolve(result)
						})
				}).catch(reject)
		})
	}

function ssweb (url, device = 'desktop')  {
		return new Promise((resolve, reject) => {
			 const base = 'https://www.screenshotmachine.com'
			 const param = {
			   url: url,
			   device: device,
			   cacheLimit: 0
			 }
			 axios({url: base + '/capture.php',
				  method: 'POST',
				  data: new URLSearchParams(Object.entries(param)),
				  headers: {
					   'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
				  }
			 }).then((data) => {
				  const cookies = data.headers['set-cookie']
				  if (data.data.status == 'success') {
					   axios.get(base + '/' + data.data.link, {
							headers: {
								 'cookie': cookies.join('')
							},
							responseType: 'arraybuffer'
					   }).then(({ data }) => {
							resolve(data)
					   })
				  } else {
					   reject()
				  }
			 }).catch(reject)
		})
   }

   function tafsirsurah (query)  {
    return new Promise((resolve, reject) => {
        axios.get(`https://tafsirq.com/topik/${query}`)
            .then(({data}) => {
                const $ = cheerio.load(data)
                const hasil = []
                $('body > div:nth-child(4) > div > div.col-md-6 > div ').each(function(a, b) {
                    result = {
                    surah: $(b).find('> div.panel-heading.panel-choco > div > div > a').text(),
                    tafsir: $(b).find('> div.panel-body.excerpt').text().trim(),
                    type: $(b).find('> div.panel-heading.panel-choco > div > div > span').text(),
                    source: $(b).find('> div.panel-heading.panel-choco > div > div > a').attr('href')
                }
                hasil.push(result)
                })
                resolve(hasil)
            })
            .catch(reject)
    })
}
module.exports.igstory = igstory
module.exports.tafsirsurah = tafsirsurah
module.exports.ssweb = ssweb
module.exports.stickersearch  = stickersearch
module.exports.telesticker  = telesticker
module.exports.soundcloud  = soundcloud
module.exports.covid = covid
module.exports.tebakgambar = tebakgambar
module.exports.surah = surah
module.exports.sholat = sholat
module.exports.lirik = lirik
module.exports.chara = chara
module.exports.wattpad = wattpad
module.exports.playstore = playstore
module.exports.linkwa = linkwa
module.exports.pinterest = pinterest
module.exports.igdl = igdl
module.exports.igstalk = igstalk
module.exports.twitter = twitter
module.exports.fbdown = fbdown
module.exports.fbDown2 = fbDown2
module.exports.youtube = youtube
module.exports.ttdownloader = ttdownloader
module.exports.wallpaper = wallpaper
module.exports.wikimedia = wikimedia
module.exports.aiovideodl = aiovideodl
module.exports.ringtone = ringtone
module.exports.styletext = styletext
module.exports.watuksolatmy = watuksolatmy
module.exports.musically = musically
module.exports.mediafiredl = mediafiredl
module.exports.sfilemobiSearch = sfilemobiSearch
module.exports.sfilemobi = sfilemobi
module.exports.zippyshare = zippyshare