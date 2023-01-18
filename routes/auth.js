//―――――――――――――――――――――――――――――――――――――――――― ┏  Modules ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

require('../settings');
const passport = require('passport');
require('../controller/passportLocal')(passport);
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const isGmail = require('is-gmail')
const resetToken = require('../model/resetTokens');
const user = require('../model/user');
const VerifyUser = require('../model/Verify-user');
const mailer = require('../controller/sendMail');
const bcryptjs = require('bcryptjs');
const passwordValidator = require('password-validator');
const generateApiKey = require('generate-api-key').default;
const containsEmoji = require('contains-emoji');
const Recaptcha = require('express-recaptcha').RecaptchaV2;
const recaptcha = new Recaptcha(recaptcha_key_1, recaptcha_key_2);

//_______________________ ┏ Function ┓ _______________________\\


function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
        next();
    } else {
        req.flash('error_messages', "Please Login to continue !");
        res.redirect('/login');
    }
}

 function captchaForgotPassword(req, res, next) {
    if (req.recaptcha.error) {
        req.flash('error_messages','reCAPTCHA Tidak Valid');
        res.redirect('/forgot-password');
    } else {
        return next();
   }
}

function captchaResetPassword(req, res, next) {
    const { token } = req.body;
    if (req.recaptcha.error) {
        req.flash('error_messages','reCAPTCHA Tidak Valid');
        res.redirect(`/reset-password?token=${token}`);
    } else {
        return next();
   }
}

function captchaRegister(req, res, next) {
    if (req.recaptcha.error) {
        req.flash('error_messages','reCAPTCHA Tidak Valid');
        res.redirect('/signup');
    } else {
        return next();
   }
}

 function captchaLogin(req, res, next) {
    if (req.recaptcha.error) {
        req.flash('error_messages','reCAPTCHA Tidak Valid');
        res.redirect('/login');
    } else {
        return next();
    }
 }

//_______________________ ┏ Router ┓ _______________________\\


router.get('/login', recaptcha.middleware.render, (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/docs");
    } else {
        res.render("login", { 
            csrfToken: req.csrfToken(),
            recaptcha: res.recaptcha
        });
    }
    
});


router.post('/login', recaptcha.middleware.verify, captchaLogin, (req, res, next) => {
    passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/docs',
        failureFlash: true,
    })(req, res, next);
});

router.get('/signup', recaptcha.middleware.render, (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/docs");
    } else {
        res.render("signup", { 
            csrfToken: req.csrfToken(),
            recaptcha: res.recaptcha
         });
    }
});

router.post('/signup', recaptcha.middleware.verify, captchaRegister, async(req, res) => {
    const { email, username, password, confirmpassword } = req.body;
    var createpw = new passwordValidator();
    createpw.is().min(8).is().max(30).has().uppercase().has().lowercase().has().digits().has().not().spaces().is().not().oneOf(['Passw0rd', 'Password123']);
    
    var checkpw = createpw.validate(password)

    if (!usetempemail){
        var checkemail = await isGmail(email)
    }else{
        var checkemail = true
    }

    if (!email || !username || !password || !confirmpassword) {
        req.flash('error_messages','All Fields Required !');
        res.redirect('/signup');
    } else if (password != confirmpassword) {
        req.flash('error_messages',"Password Don't Match !");
        res.redirect('/signup');
    } else if(!checkpw ) {
        req.flash('error_messages',"Password Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters,no emoji and no Space Limit 30 text");
        res.redirect('/signup');  
    } else if (containsEmoji(password)) {
        req.flash('error_messages',"Password Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters,no emoji and no Space Limit 30 text");
        res.redirect('/signup');  
    } else if(username.length < 4) {
        req.flash('error_messages',"Username harus minimal 4 karakter");
        res.redirect('/signup');
    } else if(username.length > 20) {
        req.flash('error_messages',"Limit Username tidak boleh lebih 20 karakter");
        res.redirect('/signup');
    } else if (containsEmoji(username)) {
        req.flash('error_messages',"Username Tidak boleh guna emoji");
        res.redirect('/signup');  
    }else if(!checkemail){
        req.flash('error_messages',"Sorry kami terima Account Gmail Sahaja");
        res.redirect('/signup');  
    }else{

        user.findOne({ $or: [{ email: email }, { username: username }] }, function (err, data) {
            if (err) throw err;
            if (data) {
                req.flash('error_messages',"User Exists, Try Logging In !");
                res.redirect('/signup');
            } else {
                bcryptjs.genSalt(12, (err, salt) => {
                    if (err) throw err;
                    bcryptjs.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        user({
                            username: username,
                            email: email,
                            password: hash,
                            apikey: generateApiKey({ method: 'bytes', length: 8 }),
                            limitApikey : LimitApikey

                        }).save((err, data) => {
                            if (err) throw err;
                            req.flash('success_messages',"Account Succes Create Sila Login");
                            res.redirect('/login');
                        });
                    })
                });
            }
        });
    }
});

router.get('/send-verification-email', checkAuth, async (req, res) => {
    var check = await VerifyUser.findOne({ email: req.user.email });
    if (req.user.isVerified ) {
        res.redirect('/docs');
    } else {
        if (check) {
        req.flash('error_messages', 'Please Dont Spam Wait After 30 minit.')
        res.redirect('/docs');
        }else{
         var token = crypto.randomBytes(32).toString('hex');
        await VerifyUser({ token: token, email: req.user.email }).save();
        var mail =await mailer.sendVerifyEmail(req.user.email, token)
        if(mail == 'error'){
            req.flash('error_messages','Error Please Try Again Tomorrow');
            res.redirect('/docs');
        }else{
        req.flash('success_messages', 'Done Sent Email Link Expired After 30 mnit.')
        res.redirect('/docs');
        }

    }
}
});


router.get('/verifyemail', async (req, res) => {
    const token = req.query.token;
    if (token) {
        var check = await VerifyUser.findOne({ token: token });
        if (check) {
            var userData = await user.findOne({ email: check.email });
            userData.isVerified = true;
            await userData.save();
            await VerifyUser.findOneAndDelete({ token: token });
            res.redirect('/docs');
        } else {
            if (req.user) {
            res.redirect("docs");
        }else{
            req.flash('error_messages', 'Link Expired Or Error')
            res.redirect('/login');
        }
    }
    } else {
        if (req.user) {
            res.redirect("docs");
        }else{
            req.flash('error_messages', 'Token Missing')
            res.redirect('/login');
        }
    }
});

router.get('/forgot-password', recaptcha.middleware.render, async (req, res) => {
    res.render('forgot-password.ejs',  { 
        csrfToken: req.csrfToken(),
        recaptcha: res.recaptcha
     });

});

router.post('/forgot-password', recaptcha.middleware.verify, captchaForgotPassword, async (req, res) => {
    const { email } = req.body;

	if (!email ) {
        req.flash('error_messages','All Fields Required !');
        res.redirect('/forgot-password');
    }
    var userData = await user.findOne({ email: email });
    var Cooldown = await resetToken.findOne({ email: email });

if (userData) {
if (Cooldown) {
    req.flash('error_messages','Please Dont Spam Wait After 30 minit after new submit.');
    res.redirect('/forgot-password')
            
 }else{
            var token = crypto.randomBytes(32).toString('hex');
            var mail = await mailer.sendResetEmail(email, token)
            if(mail == 'error'){
                req.flash('error_messages','Error Please Try Again Tomorrow');
                res.redirect('/forgot-password');
            }else{
             await resetToken({ token: token, email: email }).save();
            req.flash('success_messages','Check your email for more info, wait 30 minit after new submit.');
            res.redirect('/forgot-password');    
            }
           
 }
    } else {
        req.flash('error_messages','No user Exists with this email');
        res.redirect('/forgot-password');
    }
});

router.get('/reset-password', recaptcha.middleware.render, async (req, res) => {
    const token = req.query.token;

    if (token) {
        var check = await resetToken.findOne({ token: token });
        if (check) {
            res.render('forgot-password.ejs',  { 
                csrfToken: req.csrfToken(),
                recaptcha: res.recaptcha,
                reset: true,
                email: check.email,
                token: token
             });
        } else {
            req.flash('error_messages','Token Tampered or Expired.');
            res.redirect('/forgot-password');
        }
    } else {
        res.redirect('/login');
    }

});


router.post('/reset-password', recaptcha.middleware.verify, captchaResetPassword, async (req, res) => {
    const { password, confirmpassword, email, token } = req.body;
    var resetpw = new passwordValidator();
resetpw
.is().min(8)                                   
.is().max(30)                                 
.has().uppercase()                              
.has().lowercase()                              
.has().digits()                               
.has().not().spaces()                           
.is().not().oneOf(['Passw0rd', 'Password123']);

var checkpw = resetpw.validate(password)

    if (!password || !confirmpassword || confirmpassword != password) {
        req.flash('error_messages',"Passwords Don't Match !");
        res.redirect(`/reset-password?token=${token}`);
    } else if(!checkpw) {
        req.flash('error_messages',"Password Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters,no emoji and no Space Limit 30 text");
        res.redirect(`/reset-password?token=${token}`);
    } else {
        var salt = await bcryptjs.genSalt(12);
        if (salt) {
            var hash = await bcryptjs.hash(password, salt);
            await user.findOneAndUpdate({ email: email }, { $set: { password: hash } });
            await resetToken.findOneAndDelete({ token: token });
            req.flash('success_messages', 'Password Has Change')
            res.redirect('/login');
        } else {
        req.flash('error_messages',"Unexpected Error Try Again");
        res.redirect(`/reset-password?token=${token}`);
        }
    }
});


module.exports = router;