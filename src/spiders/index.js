import glob from 'glob'
import config from '../../config/env'

let spiderCtrl = []
let spiders = glob.sync(config.rootPath + '/src/spiders/**.spider.js')

spiders.forEach(function(spiderpath) {
    console.log('Loading spiders' + spiderpath)
    let spider = require(spiderpath)
    spiderCtrl.push(spider)
})

export default spiderCtrl
