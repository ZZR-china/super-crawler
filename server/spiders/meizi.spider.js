import cheerio from "cheerio";
import httpStatus from 'http-status';
import co from 'co';
import axios from 'axios';
import request from 'request';

import Meizi from '../models/meizi.model';
import Pic from '../models/pic.model';
import Genera from '../models/genera.model';
import Category from '../models/category.model';
import MeiziCategory from '../models/meizi_category.model';
import PicCategory from '../models/pic_category.model';

import APIError from '../helpers/apierror.helper';
import _time from '../helpers/time.helper';

/**
 * [manageBricks 处理获得的$('#post-archives .archive-brick').eq(n)
 * 得到其中的网址并解析]
 * @param  {[type]} bricks [$('#post-archives .archive-brick').eq(n)]
 * @return {[type]}        [description]
 */
function manageBricks(brick) {
    let href = brick.find('a').attr('href');
    console.log("href", href)
    return setPics(href, 1);
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
                    if (!result){
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

async function setPics(href, count) {
    try {
        let href_count = href + "/" + count;
        let response = await axios.get(href_count);
        let data = response.data;
        let $ = cheerio.load(data)

        let article, meta, time, pagecount;

        let title, url, alt, meizihref = href, originhref, homesite;
        let picview, order, formate_time, timestamp;
        
        let genera, category = [], categories;

        article = $("#content article").eq(0);
        title = article.find('h2').text(); //pic title
        url = article.find('figure a img').attr('src');
        alt = article.find('figure a img').attr('alt') || "";
        originhref = href_count;
        homesite = {
            href: "http://m.mzitu.com",
            name: "妹子图"
        };
        meta = article.find('.post-meta');
        picview = managePreviw(meta.find('.time').eq(1).text());
        time = meta.find('.time').eq(0).text();
        formate_time = _time.manageString(time);
        timestamp = new Date(time).getTime();

        pagecount = $(".single-page .prev-next-page").text();
        pagecount= managePageCount(pagecount);
        genera = meta.find('.category a').eq(0).text();
        //check and save pic
        let pic, 
            pic_query = { title: title, url: url },
            pic_doc = { title, url, alt, meizihref, originhref, homesite, picview,
            order:count,formate_time, timestamp };
        pic = await uniquSave(pic_query, pic_doc, Pic);

        let pic_id = pic._id;

        //check and save genera
        let genera_doc, 
            genera_query = { name: genera},
            genera_data = { name: genera };
        genera_doc = await uniquSave(genera_query, genera_data, Genera);

        categories = $(".post-meta ul li a");
        for (let i = 0, len = categories.length; i < len; i++) {
            //check and save category
            let cate = categories.eq(i).text();
            let category_doc, 
                category_query = { name:  cate},
                category_data = { name: cate};
            category_doc = await uniquSave(category_query, category_data, Category);

            let category_id = category_doc._id;
            let pic_category_doc,
                pic_category_query = { pic_id: pic_id, category_id: category_id},
                pic_category_data = { pic_id: pic_id, category_id: category_id};
            pic_category_doc = await uniquSave(pic_category_query, pic_category_data, PicCategory);

            await category.push(cate);
        }
    
        console.log("=============== start ================")
        console.log("pic title", title);
        // console.log("pic url", url);
        // console.log("pic alt", alt);
        // console.log("pic originhref", originhref);
        // console.log("pic homesite", homesite);
        // console.log("pic picview", picview);
        console.log("pic formate_time", formate_time);
        // console.log("pic timestamp", timestamp);
        // console.log("pic genera", genera);
        // console.log("pic category", category);
        // console.log("pic pagecount", pagecount);
        console.log("=============== end ================")

        //if pagecount not done iteration this fun
        if ((pagecount - count) !== 0) {
            count++;
            setPics(href, count);
        }else{
            let aggregate = await Pic.aggregate({
                $match: {
                    meizihref: href
                }
            },{
                $group: {
                    _id: "$meizihref",
                    title: {$first: "$alt"},
                    pic_ids: {$push: "$_id"},
                    picview: {$sum: "$picview"},
                    max_picview: {$max: "$picview"},
                    formate_time: {$first: "$formate_time"}
                }
            },{
                $project: {
                    _id: 0,
                    title: 1,
                    pic_ids: 1,
                    picview: 1,
                    max_picview: 1,
                    formate_time: 1
                }
            });

            aggregate = aggregate[0];
            let max_picview = aggregate.max_picview;
            let hotest_pic = await Pic.findOne({"meizihref": href, "picview": max_picview});

            aggregate.hotest_pic_id = hotest_pic._id;
            aggregate.hotest_pic_url = hotest_pic.url;
            aggregate.timestamp = timestamp;

            //check and save meizi
            let meizi, 
                meizi_query = { title: aggregate.title}, 
                meizi_doc = aggregate;
            meizi = await uniquSave(meizi_query, meizi_doc, Meizi);

            let meizi_id = meizi._id;
            let pic_categories = await PicCategory.find({"pic_id": pic_id}, {"category_id":1});

            //create categroy and meizi
            for (let i = 0, len = pic_categories.length; i < len; i++) {
                let category_id = pic_categories[i].category_id;
                let meizi_category, 
                    meizi_category_query = { meizi_id: meizi_id, category_id: category_id}, 
                    meizi_category_doc = { meizi_id: meizi_id, category_id: category_id};

                await uniquSave(meizi_category_query, meizi_category_doc, MeiziCategory);
            }

            let genera_id = genera_doc._id;

            await Genera.update({_id: genera_id}, {$addToSet: {"meizi_ids": meizi._id}});
            // console.log("meizi", meizi)
            console.log("meizi done")
            return 
        }
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
        let start = (Number(query.start) -1);
        start = start ? (start < 0 ? 0 : start) : 0 ;
        let end = (Number(query.end) -1);
        end = (end === 0) ? 1 : ( end ? (end < 0 ? 1 : end) : length);
        const zzr = query.zzr || null;
        const meizi_key = process.env.MEIZI_KEY || "1995"
        if (zzr === meizi_key) {
            for (let i = start; i < end; i++) {
                manageBricks(archive_bricks.eq(i));
            }
            return res.send("spider is start")
        }else {
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
