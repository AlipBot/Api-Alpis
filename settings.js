require('dotenv').config()


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





//_______________________ ┏  Main Setting  ┓ _______________________\\

creator = '乂𝘼𝙡𝙞𝙥乂' // Nama 
port = 8080 //port host
LimitApikey = 200 // Limit Apikey default

//___________ ┏  Database Mongodb Setting  ┓ ___________\\

keymongodb = process.env.mongodb //example "mongodb+srv://user:password@name_database.mongodb.net/?retryWrites=true&w=majority";

//___________ ┏  SMTP Setting  ┓ ___________\\

//note service SMTP Gmail Tidak Boleh Send Kat Temp Email Kalau mahu pakai temp email buat di service lain
usetempemail = false // kalau true boleh sing up pakai email temp kalau pakai service gmail pakai false je 
servicesmtp = 'Gmail'//Ada gmail ada sendinblue ikut masing2 limit gmail 500 limit sendinblue 300 free. List service smtp : https://nodemailer.com/smtp/well-known/
sendemail = process.env.sendemail //Email SMTP
fromsendemail = process.env.fromsendemail // From Email SMTP *kalau takde custom email kena sama email dengan Email SMTP
sendpwmail = process.env.sendpwmail // Password Email SMTP
domain = 'localhost:8080'// domain website tanpa http or https

//_______________________ ┏  Apikey  ┓ _______________________\\

// NOTE!!!!
// KALAU APIKEY HABIS BUAT SENDIRI

//Get Api Cuttly From https://cutt.ly/cuttly-api    \\
apicuttly = ['4786cc6a0f19de9c67ea6a4282c494323c932','2038c1a7754b408aa8f9055282638c00e668e','127b09320337c7f855427601a74eddd8261ee 89d73b3a07209177d0251e30d49d66bd669ac','e841147455d0fdfbf50f74aefe63b6728adc0','27f3aa3f45cb4460bcbac69b782ca470a4570','31a8df09d5a9d8d009790df0b5642e3d76919','09b4e764ff07b10eac1682e71aaf95a78f358','75fe576ce040b619176af22f5a718b2f574f5','e24ee36f9c1519c0a779667a5182a31fb7ccf','903869065d29e23455ddca922071f4bbeb133','e40a3b5f856026b0b42555a09dff20e0','de3805d3b96674a142e054749a0f43f346815']

//Get Api Bittly From https://bitly.com/a/sign_in?rd=/settings/api/    \\
apibitly = ['6cfc18e9bfa554714fadc10a1f6aff7555642348','2243940c230ad0d748059aee58ddf126b65fd8e7','c71b6658a1d271ddaf2a5077de3dcb9d67f68025','cddbceccdc2f1c9d11e4cdd0d2b1d1078e447c43','7915c671fbd90eca96310e5c9442d761225a1080','e5dee46eb2d69fc9f4b0057266226a52a3555356','f09ab8db9cf778b37a1cf8bc406eee5063816dec','964080579f959c0cc3226b4b2053cd6520bb60ad','a4f429289bf8bf6291be4b1661df57dde5066525','3d48e2601f25800f375ba388c30266aad54544ae','4854cb9fbad67724a2ef9c27a9d1a4e9ded62faa','d375cf1fafb3dc17e711870524ef4589995c4f69','43f58e789d57247b2cf285d7d24ab755ba383a28','971f6c6c2efe6cb5d278b4164acef11c5f21b637','ae128b3094c96bf5fd1a349e7ac03113e21d82c9','e65f2948f584ffd4c568bf248705eee2714abdd2','08425cf957368db9136484145aa6771e1171e232','dc4bec42a64749b0f23f1a8f525a69184227e301','0f9eb729a7a08ff5e73fe1860c6dc587cc523035','037c5017712c8f5f154ebbe6f91db1f82793c375']

//APIKEY RECAPTCHA From https://www.google.com/recaptcha/about/ or https://www.google.com/recaptcha/admin  \\
recaptcha_key_1 = process.env.recaptcha_key_1
recaptcha_key_2 = process.env.recaptcha_key_2

//_______________________ ┏  Loghandler  ┓ _______________________\\

loghandler = {
    error: {
        status: false,
        code: 503,
        message: '[!] Service Unavaible Or Error',
        maintanied_by: `${creator}`
    },
    noturl: {
    	status: false,
    	code: 403,
    	message: '[!] Forbiden or Error, Invlid url',
    	maintanied_by: `${creator}`
    },
    notfound: {
    	status: false,
    	code: 404,
    	message: '[!] Forbiden or Error, Not Found',
    	maintanied_by: `${creator}`
    },
    notid: {
    	status: false,
    	code: 404,
    	message: '[!] Forbiden or Error, Invalid Id or Zone',
    	maintanied_by: `${creator}`
    },
    redy: {
    	status: false,
    	code: 403,
    	message: '[!] Forbiden or Error, Alias ​​already in use',
    	maintanied_by: `${creator}`
    },
    emoji: {
	    status: false,
	    code: 403,
	    message: '[!] Forbiden or Error, Emoji not Found',
	    maintanied_by: `${creator}`
   },
    register: {
	    status: false,
	    code: 403,
	    message: '[!] Please Register First',
  },
   verify: {
	    status: false,
	    code: 403,
	    message: '[!] Please Verify Email',
}

}



