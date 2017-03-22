import cheerio from "cheerio"
import httpStatus from 'http-status'
import co from 'co'
import axios from 'axios'
import request from 'request'
import utf8 from 'utf8'
import charset from 'superagent-charset'
import superagent from 'superagent'
import { queue } from 'async'

import Album from '../models/album.model'
import Pic from '../models/pic.model'
import AlbumPic from '../models/album_pic.model'
import Genera from '../models/genera.model'
import Category from '../models/category.model'
import GeneraAlbum from '../models/genera_album.model'
import AlbumCategory from '../models/album_category.model'
import PicCategory from '../models/pic_category.model'

import APIError from '../helpers/apierror.helper'
import _time from '../helpers/time.helper'
import _array from '../helpers/array.helper'
import _mongo from '../helpers/mongo.helper'

import config from '../../config/env/'

charset(superagent)

const homesite = config.mm131
const Key = config.mm131Key
const resoption = {
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
        'Referer': 'http://www.mm131.com'
    }
}

function keyJudge(key) {
    return key === Key
}

function selectForum(str = 'xinggan') {
    let url = 'http://www.mm131.com/'
    url = url + str
    return url
}

async function getSchema(schema = 'genera', form = 'xinggan') {
    schema = schema === 'genera' ? 'genera' : 'category'
    let Schema = schema === 'genera' ? Genera : Category
    const generas = {
        xinggan: '性感妹子',
        qingchun: '清纯妹子',
        xiaohua: '大学校花',
        chemo: '性感车模',
        qipao: '旗袍美女',
        mingxing: '明星写真'
    }
    const genera = generas[form]
    let query = { name: genera }
    const generaDoc = await _mongo.uniqSave(query, query, Schema)
    return generaDoc
}

function getLength($) {
    let pages = $('.page-en')
    let last = pages.length - 1
    let length = pages.eq(last).attr('href')
    length = length.split(/_/)[2]
        .replace('.html', '') || 6
    return { length }
}

function pageGet(start = 0, end = 1, length = 10) {
    start = (Number(start) - 1)
    start = (!start && start < 0) ? 0 : start
    end = (Number(end) - 1)
    end = end <= 0 ? 0 : ((end > length || !end) ? length : end)
    console.log(`start is ${start}, end is ${end}`)
    return { start, end }
}

function getSearchUrls({ start = 0, end = 1, url, $ }) {
    const pages = $('.main .page .page-en')
    let urlArr = [url]
    while (start < end) {
        let href = pages.eq(start).attr('href')
        href = url + '/' + href
        urlArr.push(href)
        start++
    }
    urlArr = _array.unique(urlArr)
    console.log(`url arr is ${urlArr}`)
    return { urlArr }
}

async function handleInfo(url, genera_id, category_id) {
    superagent.get(url)
        .charset('gb2312')
        .end((err, res) => {
            if (err || !res.ok) {
                return 'asd'
            }
            const $ = cheerio.load(res.text)
            const albumUrls = getAlbumUrls($)
            console.log('handleInfo', albumUrls)
            let albumUrlsLen = albumUrls.length,
                count = 0
            while (count !== albumUrlsLen) {
                handleAlbum(albumUrls[count], genera_id, category_id)
                count++
            }
            return albumUrls
        })
}

function getAlbumUrls($) {
    let albumUrls = $('.main .list-left dd')
    let len = albumUrls.length,
        count = 0,
        albums = []
    while (count < (len - 1)) {
        let album = {
            href: albumUrls.eq(count).find('a').attr('href'),
            cover: albumUrls.eq(count).find('a img').attr('src'),
            alt: albumUrls.eq(count).find('a img').attr('alt')
        }
        albums.push(album)
        count++
    }
    console.log(`album urls is ${albums}\n`)
    return albums
}

async function handleAlbum(album, genera_id, category_id) {
    try {
        let href = album.href
        let cover = album.cover
        let alt = album.alt
        superagent.get(href)
            .charset('gb2312')
            .end(async (err, res) => {
                if (err || !res.ok) {
                    return 'asd'
                }
                let data = res.text
                const $ = cheerio.load(data)
                let formate_time = $('.content .content-msg').text()
                formate_time = formate_time.replace('更新时间：', '')
                    .replace('MM131美女图片', '')
                formate_time = _time.manageString(formate_time)
                let len = $('.content-page .page-ch').eq(0).text()
                len = len.replace('共', '').replace('页', '')
                len = Number(len)
                let timestamp = new Date(formate_time.full).getTime()
                const query = { title: alt }
                const doc = { title: alt, homesite, cover, formate_time, timestamp, view: 10000}
                const albumDoc = await _mongo.uniqSave(query, doc, Album)
                const album_id = albumDoc._id
                await _mongo.uniqSave({album_id, genera_id}, {album_id, genera_id}, GeneraAlbum)
                await _mongo.uniqSave({album_id, category_id}, {album_id, category_id}, AlbumCategory)
                let count = 0
                console.log('img alt', $('.content .content-pic a img').attr('alt'))
                console.log('img src', $('.content .content-pic a img').attr('src'))
                let url = $('.content .content-pic a img').attr('src')
                let regUrl = url.replace('1.jpg', '')
                while (count < len) {
                    url = regUrl + (count + 1) + '.jpg'
                    let title = count === 0 ? alt : (alt + '(' + count + ')')
                    handlePics({title, url, alt, order:count, homesite, timestamp, formate_time, album_id, category_id})
                    count++
                }
                return 'handleAlbum done'
            })
    }catch(err) {
        console.error(err)
    }
}

async function handlePics({title, url, alt, order, homesite, timestamp, formate_time, album_id, category_id}) {
    const picDoc = await _mongo.uniqSave({title}, {title, url, alt, order, homesite, timestamp, formate_time}, Pic)
    const pic_id = picDoc._id
    await _mongo.uniqSave({album_id, pic_id}, {album_id, pic_id}, AlbumPic)
    return await _mongo.uniqSave({category_id, pic_id}, {category_id, pic_id}, PicCategory)
}



async function start(req, res, next) {
    try {
        const query = req.query
            //判断key是否正确
        if (!keyJudge(query.key)) return res.send("haha, you miss some thing")
            //判断要爬取哪个板块
        const form = query.form || 'xinggan'
        const url = selectForum(form)
            //判断是否有这个分类和大类， 并创建， 输出信息
        const genera = await getSchema('genera', form)
        const category = await getSchema('category', form)
        const genera_id = genera._id
        const category_id = category._id
            //判断这个版块一共多少个页面
        const response = await axios.get(url, resoption)
        const data = response.data
        const $ = cheerio.load(data)
        const { length } = getLength($)
            //判断要爬取多少页
        if (Number(query.start) > Number(query.end)) {
            return res.send("start is bigger than end, you are fucked")
        }
        let { start, end } = pageGet(query.start, query.end, length)
            //获取所要爬取的所有网页
        let { urlArr } = getSearchUrls({ url, start, end, $ })
        let urllens = urlArr.length,
            count = 0
        while (count !== urllens) {
            handleInfo(urlArr[count], genera_id, category_id)
            count++
        }
        return res.send('spider start')
    } catch (err) {
        console.error(err);
        return next(err)
    }
}

export default {
    start,
    name: 'mm131',
    url: '/mm131s',
    get: start
}
