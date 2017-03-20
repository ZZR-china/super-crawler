import cheerio from "cheerio"
import httpStatus from 'http-status'
import co from 'co'
import axios from 'axios'
import request from 'request'
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

import config from '../../config/env/'

const homesite = config.mm131
const Key = config.mm131Key
const resoption = {
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
        'Referer': 'http://www.mm131.com',
    }
}

function keyJudge (key) {
    return key === Key
}

function selectForum (str = 'xinggan') {
    let url = 'http://www.mm131.com/'
    url = url + str
    return url
}

function getLength (url, $) {
    let length = 10
    let pages = $('.page-en')
    length = pages.length || 10
    console.log('length', pages.length)
    return { length }
}

function pageGet ( start=0, end = 1, length = 10) {
    start = (Number(start) - 1)
    start = (!start && start < 0) ? 0 : start
    end = (Number(end) - 1)
    end = end<= 0 ? 0 : (( end > length || !end) ? length : end)
    console.log(`start is ${start}, end is ${end}`)
    return { start, end }
}

function getUrls ({start = 0, end = 1, url, $}) {
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

async function handleInfo (url) {
    console.log(`handle url is ${url}`)
    const response = await axios.get(url, resoption)
    const data = response.data
    const $ = cheerio.load(data)
    const albumUrls = getAlbumUrls($)
    console.log('handleInfo', albumUrls)
    let albumUrlsLen = albumUrls.length, count = 0
    while (count !== albumUrlsLen) {
        handleAlbum()
        count++
    }
    return
}

async function getAlbumUrls($) {
    let albumUrls = $('.main .list-left dd')
    albumUrls = albumUrls.slice(1, -1)
    let len = albumUrls.length, count = 0, albums = []
    while (count !== len) {
        let href = albumUrls.eq(count).find('a').attr('href')
        albums.push(href)
        count++
    }
    console.log(`album urls is ${albums}`)
    return albums
}

async function handleAlbum () {
    return 90
}

async function start(req, res, next) {
    try {
        const query = req.query
        //判断key是否正确
        if(!keyJudge(query.key)) return res.send("haha, you miss some thing")
        //判断要爬取哪个板块
        const url = selectForum(query.forum)
        //判断这个版块一共多少个页面
        const response = await axios.get(url, resoption)
        const data = response.data
        const $ = cheerio.load(data)
        const { length } = getLength(url, $)
        //判断要爬取多少页
        if (Number(query.start) > Number(query.end)) {
            return res.send("start is bigger than end, you are fucked")
        }
        let { start, end } = pageGet(query.start, query.end, length)
        //获取所要爬取的所有网页
        let { urlArr } = getUrls({ url, start, end, $})
        let urllens = urlArr.length, count = 0
        while (count !== urllens) {
            handleInfo(urlArr[count])
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
    url: '/mm131',
    get: start
}
