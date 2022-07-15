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

const express = require('express'); 
const app = express();
var favicon = require('serve-favicon')
var path = require('path')
var cookieParser = require('cookie-parser');
var createError = require('http-errors')
require('./settings')


cors = require('cors'),


    secure = require('ssl-express-www');
const PORT = process.env.PORT || 8080 || 5000 || 3000

app.use(favicon(path.join(__dirname,'public','images','favicon.ico')))

var main = require('./routes/main'),
    api = require('./routes/api')

app.set('trust proxy', true);
app.set("json spaces",2)
app.use(cors())
app.use(secure)
app.use(cookieParser());
app.use(express.static("public"))
app.use('/', main)
app.use('/api', api)

app.use(function (req, res, next) {
	next(createError(404))
  })

app.use(function (err, req, res, next) {
	
	res.sendFile(__path + '/view/404.html')
  })


app.listen(PORT, () => {
    console.log(`
	██████╗ ███████╗███████╗████████╗ █████╗ ██████╗ ██╗
	██╔══██╗██╔════╝██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██║
	██████╔╝█████╗  ███████╗   ██║   ███████║██████╔╝██║
	██╔══██╗██╔══╝  ╚════██║   ██║   ██╔══██║██╔═══╝ ██║
	██║  ██║███████╗███████║   ██║   ██║  ██║██║     ██║
	╚═╝  ╚═╝╚══════╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝     ╚═╝
			                              Make by Alip 
								 
 Server running on http://localhost:` + PORT)
console.log(`Hello ${creator}`)
})

module.exports = app

