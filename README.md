## License

MIT
=======
# super-crawler
crawler based on express

docker run -p 27017:27017 -v --name mymongo $PWD/db:/data/db -d mongo

pm2 start ./node_modules/.bin/gulp  --name 'pic' -- start


### meizi api

/meizi/random?type=&show=

type : ['日本', '清纯', '性感', '台湾']

show : 1 (if show id definded, pictrue will show)

success data: 

```

{
"_id":"58c42acb4cbf4b4e7769f293",
"title":"°Ù±äÖÆ·þÐã Beautyleg ÃÀÍÈÐ´Õæ No.2014 Vicni£¨15£©",
"url":"http://i.meizitu.net/2016/02/01v15.jpg", //Í¼Æ¬µØÖ·
"alt":"°Ù±äÖÆ·þÐã Beautyleg ÃÀÍÈÐ´Õæ No.2014 Vicni", //Í¼Æ¬±êÌâ
"meizihref":"http://m.mzitu.com/58156",
"originhref":"http://m.mzitu.com/58156/15",
"picview":218595, //Í¼Æ¬ä¯ÀÀÁ¿
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
"homesite":{"href":"http://m.mzitu.com","name":"ÃÃ×ÓÍ¼"}
}

```

fail data:

{"message":"Cannot read property 'meizi_ids' of null","request":"/meizi/random?type=asd"}

### pics api

1. /pics/random?type=

type : ['日本', '清纯', '性感', '台湾']

show : 1 (if show id definded, pictrue will show)

success data: 

```

{
"_id":"58c42acb4cbf4b4e7769f293",
"title":"999",
"url":"http://i.meizitu.net/2016/02/01v15.jpg",
"alt":"°Ù±äÖÆ·þÐã Beautyleg ÃÀÍÈÐ´Õæ No.2014 Vicni",
"meizihref":"http://m.mzitu.com/58156",
"originhref":"http://m.mzitu.com/58156/15",
"picview":218595,
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
"homesite":{"href":"http://m.mzitu.com","name":"ÃÃ×ÓÍ¼"}
}

```

fail data:

{"message":"Cannot read property 'meizi_ids' of null","request":"/meizi/random?type=asd"}

### categories api
/categories?limit=50

```

success data:

[{"_id":"58c6640b88c2d71748b023a6","name":"FeiLin(àÇàïàï)","__v":0,"CreateAt":1489396737709},
{"_id":"58c6640b88c2d71748b023aa","name":"ÐÔ¸ÐÃÀÅ®","__v":0,"CreateAt":1489396737709},
{"_id":"58c6640b88c2d71748b023ac","name":"ÊªÉíÓÕ»ó","__v":0,"CreateAt":1489396737709},
{"_id":"58c6640c88c2d71748b023ae","name":"±¬Èé(ÐØÆ÷)","__v":0,"CreateAt":1489396737709}]

```

2. /pic/latest?show=

show the latest pic


### albums api
/albums/random

/albums/58c6a871a244f0155811f589/pics

