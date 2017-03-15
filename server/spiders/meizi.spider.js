import cheerio from "cheerio";
import httpStatus from 'http-status';
import co from 'co';
import axios from 'axios';
import request from 'request';
import { queue } from 'async';

import Album from '../models/album.model';
import Pic from '../models/pic.model';
import AlbumPic from '../models/album_pic.model';
import Genera from '../models/genera.model';
import Category from '../models/category.model';
import GeneraAlbum from '../models/genera_album.model';
import AlbumCategory from '../models/album_category.model';
import PicCategory from '../models/pic_category.model';

import APIError from '../helpers/apierror.helper';
import _time from '../helpers/time.helper';

import config from '../../config/env/';

const homesite = config.meizi

/**
 * [manageBricks 处理获得的$('#post-archives .archive-brick').eq(n)
 * 得到其中的网址并解析]
 * @param  {[type]} bricks [$('#post-archives .archive-brick').eq(n)]
 * @return {[type]}        [description]
 */

function manageBricks(brick) {
    let href = brick.find('a').attr('href');
    return saveAlbum(href);
}

function managePreviw(str) {
    const picview_reg = /(次浏览)|(,)/g;
    str = Number(str.replace(picview_reg, ""));
    str = typeof str === "number" ? str : 10000;
    return str;
}

function managePageCount(str) {
    const reg = /页/;
    str = str.replace(reg, "")
        .split(/\//)[1];
    return Number(str)
}

function uniquSave(query, data, MonSchema) {
    return new Promise((resolve, reject) => {
        MonSchema.findOne(query)
            .then(result => {
                if (!result) {
                    result = new MonSchema(data);
                    return result.save();
                }

                return result;
            })
            .then(rs => {
                return resolve(rs);
            })
            .catch(err => {
                console.error(err);
                return reject(err)
            })
    });
}

async function saveAlbum(href, count = 1) {
    try {
        let origin_url = href + "/" + count
        let response = await axios.get(origin_url)
        let data = response.data;
        let $ = cheerio.load(data)
        let album_origin_url = href
        let article = $("#content article").eq(0)
        let title = article.find('h2').text()
        let url = article.find('figure a img').attr('src')
        let alt = article.find('figure a img').attr('alt') || ""
        let meta = article.find('.post-meta')
        let picview = managePreviw(meta.find('.time').eq(1).text())
        let time = meta.find('.time').eq(0).text()
        let formate_time = _time.manageString(time)
        let timestamp = new Date(time).getTime()

        let pagecount = $(".single-page .prev-next-page").text()
        pagecount = managePageCount(pagecount)
        let genera = meta.find('.category a').eq(0).text()

        let album, album_query = { title: title }
        let album_doc = { 
                title,
                homesite,
                formate_time,
                timestamp
            }

        album = await uniquSave(album_query, album_doc, Album);
        let album_id = album._id

        let genera_doc, genera_query = { name: genera }
        genera_doc = await uniquSave(genera_query, genera_query, Genera);

        let genera_album_query = { genera_id: genera_doc._id, album_id: album_id }
        await uniquSave(genera_album_query, genera_album_query, GeneraAlbum);

        let categoriesArr = $(".post-meta ul li a"), categories = []
        for (let i = 0, len = categoriesArr.length; i < len; i++) {
            let cate = categoriesArr.eq(i).text().trim()
            let category_doc, category_query = { name: cate }
            category_doc = await uniquSave(category_query, category_query, Category)
            await categories.push(category_doc)

            let album_category_query = { album_id: album_id, category_id: category_doc._id }
            await uniquSave(album_category_query, album_category_query, AlbumCategory)
        }
        //if pagecount not done iteration this func
        let albumUpdate = {
            href,
            count,
            album_id,
            categories,
            view: 0,
            max_picview: 0,
            hotest_pic_id: null,
            hotest_pic_url: null
        }
        while ((pagecount - count) >= 0) {
            albumUpdate = await savePic(albumUpdate)
            count = albumUpdate.count
        }
        return await Album.update({_id: album_id}, albumUpdate)

    } catch (err) {
        console.error(err);
    }
}

async function savePic({ href, count, album_id, categories, view, max_picview, hotest_pic_id, hotest_pic_url }) {
    try {
        let origin_url = href + "/" + count
        let response = await axios.get(origin_url)
        let data = response.data;
        let $ = cheerio.load(data)
        let article = $("#content article").eq(0)
        let title = article.find('h2').text()
        let url = article.find('figure a img').attr('src')
        let alt = article.find('figure a img').attr('alt') || ""
        let meta = article.find('.post-meta')
        let picview = managePreviw(meta.find('.time').eq(1).text())
        let time = meta.find('.time').eq(0).text()
        let formate_time = _time.manageString(time)
        let timestamp = new Date(time).getTime()

        let pic, pic_query = { title: title, url: url },
            pic_doc = {
                title,
                url,
                alt,
                origin_url,
                homesite,
                picview,
                order: count,
                formate_time,
                timestamp
            }

        pic = await uniquSave(pic_query, pic_doc, Pic);

        let pic_id = pic._id;

        let album_pic_query = { pic_id: pic_id, album_id: album_id }
        await uniquSave(album_pic_query, album_pic_query, AlbumPic);

        for (let i = 0, len = categories.length; i < len; i++) {
            let category_id = categories._id;
            let pic_category_query = { pic_id: pic_id, category_id: category_id }
            await uniquSave(pic_category_query, pic_category_query, PicCategory);
        }

        
        view += picview
        if (max_picview < picview ) {
            max_picview = picview
            hotest_pic_id = pic_id
            hotest_pic_url = pic.url
        }
        count++
        console.log("=============== start ================")
        console.log("pic title", title);
        console.log("pic formate_time", formate_time.full);
        console.log("origin_url", origin_url)
        console.log("pic max_picview", max_picview);
        console.log("=============== end ================")
        return { href, count, album_id, categories, view, max_picview, hotest_pic_id, hotest_pic_url }
    } catch (err) {
        console.error(err);
    }
}

// 主start程序
const start = async function(req, res, next) {
    try {
        let meiziall_href = "http://m.mzitu.com/all";
        let response = await axios.get(meiziall_href);
        let data = response.data;
        let $ = cheerio.load(data);
        const archive_bricks = $('#post-archives .archive-brick');
        const length = archive_bricks.length;
        const query = req.query;
        let start = (Number(query.start) - 1);
        start = start ? (start < 0 ? 0 : start) : 0;
        let end = (Number(query.end) - 1);
        end = (end === 0) ? 0 : (end ? (end < 0 ? 0 : end) : length);
        if (start > end) {
            return res.send("start is bigger than end, you are fucked")
        }
        const zzr = query.zzr || null;
        const meizi_key = config.meiziKey
        if (zzr === meizi_key) {
            while (start <= end) {
                manageBricks(archive_bricks.eq(start))
                start++
            }
            return res.send("spider is start")
        } else {
            return res.send("haha, you miss some thing")
        }
    } catch (err) {
        console.error(err);
        return next(err)
    }
}

export default {
    start
}
