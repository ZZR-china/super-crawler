import glob from 'glob'
import config from '../../config/env'

let spiderCtrl = {}
let spiders = glob.sync(config.rootPath + '/server/spiders/**.spider.js')

spiders.forEach(function(spiderpath) {
    console.log('Loading spiders' + spiderpath)
    let spider = require(spiderpath)
    spiderCtrl[spider.name] = {}
    spiderCtrl[spider.name].start = spider.start
})

export default spiderCtrl
