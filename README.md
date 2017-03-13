## License

MIT
=======
# super-crawler
crawler based on express

pm2 start ./node_modules/.bin/gulp  --name 'pic' -- start


### meizi api

/meizi/random?type=

type : ['性感', '台湾', '清纯', '日本']

success data: 

```

{
"_id":"58c42acb4cbf4b4e7769f293",
"title":"百变制服秀 Beautyleg 美腿写真 No.2014 Vicni（15）",
"url":"http://i.meizitu.net/2016/02/01v15.jpg", //图片地址
"alt":"百变制服秀 Beautyleg 美腿写真 No.2014 Vicni", //图片标题
"meizihref":"http://m.mzitu.com/58156",
"originhref":"http://m.mzitu.com/58156/15",
"picview":218595, //图片浏览量
"order":15,
"__v":0,
"CreateAt":1489243281995,
"timestamp":1454339880000,
"formate_time":{
	"year":2016,
	"month":2,
	"day":1,
	"hour":23,
	"minute":18,
	"full":"2016-02-01 23:18"
},
"homesite":{"href":"http://m.mzitu.com","name":"妹子图"}
}

```

fail data:

{"message":"Cannot read property 'meizi_ids' of null","request":"/meizi/random?type=asd"}

### pic api

/pic/random?type=

type : ['性感', '台湾', '清纯', '日本']

success data: 

```

{
"_id":"58c42acb4cbf4b4e7769f293",
"title":"百变制服秀 Beautyleg 美腿写真 No.2014 Vicni（15）",
"url":"http://i.meizitu.net/2016/02/01v15.jpg", //图片地址
"alt":"百变制服秀 Beautyleg 美腿写真 No.2014 Vicni", //图片标题
"meizihref":"http://m.mzitu.com/58156",
"originhref":"http://m.mzitu.com/58156/15",
"picview":218595, //图片浏览量
"order":15,
"__v":0,
"CreateAt":1489243281995,
"timestamp":1454339880000,
"formate_time":{
	"year":2016,
	"month":2,
	"day":1,
	"hour":23,
	"minute":18,
	"full":"2016-02-01 23:18"
},
"homesite":{"href":"http://m.mzitu.com","name":"妹子图"}
}

```

fail data:

{"message":"Cannot read property 'meizi_ids' of null","request":"/meizi/random?type=asd"}

### categories api
/categories?limit=50

```

success data:

[{"_id":"58c6640b88c2d71748b023a6","name":"FeiLin(嗲囡囡)","__v":0,"CreateAt":1489396737709},{"_id":"58c6640b88c2d71748b023a8","name":"土肥圆矮(周妍希)","__v":0,"CreateAt":1489396737709},{"_id":"58c6640b88c2d71748b023aa","name":"性感美女","__v":0,"CreateAt":1489396737709},{"_id":"58c6640b88c2d71748b023ac","name":"湿身诱惑","__v":0,"CreateAt":1489396737709},{"_id":"58c6640c88c2d71748b023ae","name":"爆乳(胸器)","__v":0,"CreateAt":1489396737709}]

```