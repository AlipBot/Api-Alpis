//―――――――――――――――――――――――――――――――――――――――――― ┏  Modules ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

const request = require('request')
const cheerio = require('cheerio')
const _ = require('lodash')
const htmlToText = require('html-to-text')
const domain = 'https://www.musixmatch.com'



const getList = (body, filter = false, type = '') => {
    let content = []
    const $ = cheerio.load(body, {
        xmlMode: true
    })
    $('.search-results .box-style-plain .box-content .tracks .showArtist').each((key, e) => {
        content.push({
            title: htmlToText.fromString($(e).find('.media-card-body .media-card-title .title').text()),
            artist: htmlToText.fromString($(e).find('.media-card-body .media-card-subtitle').text()),
            url: domain + htmlToText.fromString($(e).find('.media-card-body .media-card-title .title').attr('href')),
        })
    })
    
    return content
}

module.exports = {
    autocomplete: (query, callback) => {
        request(`${domain}/search/${query}/lyrics`, (error, response, body) => {
            if (error) {
                callback(error, null, response, body)
            } else if (response.statusCode !== 200) {
                callback(new Error('Bad response'))
            } else {
                callback(getList(body))
            }
        })
    },
    tracks: (query, callback) => {
        request(`${domain}/search/${query}/tracks`, (error, response, body) => {
            if (error) {
                callback(error, null, response, body)
            } else if (response.statusCode !== 200) {
                callback(new Error('Bad response'))
            } else {
                callback(getList(body))
            }
        })
    },
    search: (query, callback) => {
        request(`${domain}/search/${query}`, (error, response, body) => {
            if (error) {
                callback(error, null, response, body)
            } else if (response.statusCode !== 200) {
                callback(new Error('Bad response'))
            } else {
                callback(getList(body))
            }
        })
    },
    get: (query, callback) => {
        request(`${domain}${query}`, (error, response, body) => {
            if (error) {
                callback(error, null, response, body)
            } else if (response.statusCode !== 200) {
                callback(new Error('Bad response'))
            } else {
                let song = []
                const $ = cheerio.load(body, {
                    xmlMode: false
                })

                let title = htmlToText.fromString($('.mxm-track-title__track').text())
                title = title.replace('Lyrics', '')

                song.push({
                    title: title,
                    artist: htmlToText.fromString( $('.mxm-track-title h2 a').text() ),
                    cover: htmlToText.fromString( $('.banner-album-image-desktop img').attr('src') ),
                    lyric: htmlToText.fromString( $('.mxm-lyrics__content').text() ),
                })
                callback(song)
            }
        })
    }
}