//―――――――――――――――――――――――――――――――――――――――――― ┏  Modules ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

require('../settings')
const nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
  service: servicesmtp,
  auth: {
    user: sendemail,
    pass: sendpwmail,
  },
});

//―――――――――――――――――――――――――――――――――――――――――― ┏ Send Reset Email┓ ―――――――――――――――――――――――――――――――――――――――――― \\

module.exports.sendResetEmail = async (email, token) => {
  return new Promise(async(resolve, rejecet) => {

  var url = `http://${domain}/reset-password?token=` + token;

  await smtpTransport.sendMail({
    from: fromsendemail,
    to: email,
    subject: "RESET KATA SANDi",
    html: `
    <!DOCTYPE html>
    <html>
    <head>
    
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
      @media screen {
        @font-face {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 400;
          src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
        }
        @font-face {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 700;
          src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
        }
      }

      body,
      table,
      td,
      a {
        -ms-text-size-adjust: 100%; /* 1 */
        -webkit-text-size-adjust: 100%; /* 2 */
      }

      table,
      td {
        mso-table-rspace: 0pt;
        mso-table-lspace: 0pt;
      }

      img {
        -ms-interpolation-mode: bicubic;
      }

      a[x-apple-data-detectors] {
        font-family: inherit !important;
        font-size: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
        color: inherit !important;
        text-decoration: none !important;
      }

      div[style*="margin: 16px 0;"] {
        margin: 0 !important;
      }
      body {
        width: 100% !important;
        height: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
      }

      table {
        border-collapse: collapse !important;
      }
      a {
        color: #1a82e2;
      }
      img {
        height: auto;
        line-height: 100%;
        text-decoration: none;
        border: 0;
        outline: none;
      }
      </style>
    
    </head>
    <body style="background-color: #e9ecef;">
    
      <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
        Preheader adalah teks ringkasan singkat yang mengikuti baris subjek saat email dilihat di kotak masuk.
      </div>

      <table border="0" cellpadding="0" cellspacing="0" width="100%">
    
        <tr>
          <td align="center" bgcolor="#e9ecef">

            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <tr>
                <td align="center" valign="top" style="padding: 36px 24px;">
                  <a href="https://${domain}" target="_blank" style="display: inline-block;">
                    <img src="https://telegra.ph/file/22cffdfa5155c4f9ca4ec.png" alt="Logo" border="0" width="100" style="display: block; width: 100px; max-width: 100px; min-width: 100px;">
                  </a>
                </td>
              </tr>
            </table>

          </td>

        <tr>
          <td align="center" bgcolor="#e9ecef">

            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                  <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Mengatur Ulang Kata Sandi Anda</h1>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <tr>
          <td align="center" bgcolor="#e9ecef">

            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
    
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                  <p style="margin: 0;">
                    Kesulitan masuk?<br>Menyetel ulang sandi Anda itu mudah.<br><br>Cukup tekan tombol di bawah dan ikuti petunjuknya. Kami akan Membantu Anda.</p>
                </td>
              </tr>

              <tr>
                <td align="left" bgcolor="#ffffff">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                        <table border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                              <a href="${url}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Atur ulang kata sandi</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>


              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                  <p style="margin: 0;">Aliff,<br> ${domain}</p>
                </td>
              </tr>
    
            </table>

          </td>
        </tr>

        <tr>
          <td align="center" bgcolor="#e9ecef" style="padding: 24px;">

            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
    
              <tr>
                <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                  <p style="margin: 0;">Jika Anda Tidak Membuat Permintaan Ini, Silakan Abaikan Email Ini.</p>
                </td>
              </tr>
    
            </table>

          </td>
        </tr>
    
      </table>
    
    </body>
    </html>

    `
  }, (error, info) => {
    if (error) {
      resolve('error')
      console.log(`[!] Warning SMTP error ,Limit Habis`);
    } else{
      resolve()
    }
  });

  })

}

//―――――――――――――――――――――――――――――――――――――――――― ┏ Send Verify Email ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

module.exports.sendVerifyEmail = async (email, token) => {
  return new Promise(async(resolve, rejecet) => {
    var url = `http://${domain}/verifyemail?token=` + token;

  await smtpTransport.sendMail({
    from: fromsendemail,
    to: email,
    subject: "VERIFIKASI EMAIL",
    html: `
    <!DOCTYPE html>
    <html>
    <head>
    
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
      @media screen {
        @font-face {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 400;
          src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
        }
        @font-face {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 700;
          src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
        }
      }

      body,
      table,
      td,
      a {
        -ms-text-size-adjust: 100%; /* 1 */
        -webkit-text-size-adjust: 100%; /* 2 */
      }

      table,
      td {
        mso-table-rspace: 0pt;
        mso-table-lspace: 0pt;
      }

      img {
        -ms-interpolation-mode: bicubic;
      }

      a[x-apple-data-detectors] {
        font-family: inherit !important;
        font-size: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
        color: inherit !important;
        text-decoration: none !important;
      }

      div[style*="margin: 16px 0;"] {
        margin: 0 !important;
      }
      body {
        width: 100% !important;
        height: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
      }

      table {
        border-collapse: collapse !important;
      }
      a {
        color: #1a82e2;
      }
      img {
        height: auto;
        line-height: 100%;
        text-decoration: none;
        border: 0;
        outline: none;
      }
      </style>
    
    </head>
    <body style="background-color: #e9ecef;">
    
      <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
        Verifikasi Email Anda Klik Tombol Dibawah.
      </div>

      <table border="0" cellpadding="0" cellspacing="0" width="100%">
    
        <tr>
          <td align="center" bgcolor="#e9ecef">

            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <tr>
                <td align="center" valign="top" style="padding: 36px 24px;">
                  <a href="https://${domain}" target="_blank" style="display: inline-block;">
                  <img src="https://telegra.ph/file/22cffdfa5155c4f9ca4ec.png" alt="Logo" border="0" width="100" style="display: block; width: 100px; max-width: 100px; min-width: 100px;">
                  </a>
                </td>
              </tr>
            </table>

          </td>

        <tr>
          <td align="center" bgcolor="#e9ecef">

            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                  <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Verifikasi Alamat Email Anda</h1>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <tr>
          <td align="center" bgcolor="#e9ecef">

            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
    
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                  <p style="margin: 0;">Terima Kasih Telah Menggunakan Rest Api HendraXD, Silakan Tekan Tombol Di Bawah Ini Untuk Memverifikasi Akun Anda.</p>
                </td>
              </tr>

              <tr>
                <td align="left" bgcolor="#ffffff">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                        <table border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                              <a href="${url}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Verifikasi Email</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>


              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                  <p style="margin: 0;">Aliff,<br> ${domain}</p>
                </td>
              </tr>
    
            </table>

          </td>
        </tr>

        <tr>
          <td align="center" bgcolor="#e9ecef" style="padding: 24px;">

            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
    
              <tr>
                <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                  <p style="margin: 0;">Anda Menerima Email Ini Karena Kami Menerima Permintaan Verifikasi Akun Anda. Jika Anda Tidak Meminta Verifikasi Akun, Anda Dapat menghapus Atau Abaikan Pesan Ini.</p>
                </td>
              </tr>
    
            </table>

          </td>
        </tr>
    
      </table>
    
    </body>
    </html>

  `,
}, (error, info) => {
  if (error) {
    resolve('error')
    console.log(`[!] Warning SMTP error ,Limit Habis`);
  } else{
    resolve()
  }
});

})

}

//―――――――――――――――――――――――――――――――――――――――――― ┏  Made by HendraXD ┓ ―――――――――――――――――――――――――――――――――――――――――― \\