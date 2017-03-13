## License

MIT
=======
# super-crawler
crawler based on express

pm2 start ./node_modules/.bin/gulp  --name 'pic' -- start


### meizi api

/meizi/random?type=

type : ['�Ը�', '̨��', '�崿', '�ձ�']

success data: 

```

{
"_id":"58c42acb4cbf4b4e7769f293",
"title":"�ٱ��Ʒ��� Beautyleg ����д�� No.2014 Vicni��15��",
"url":"http://i.meizitu.net/2016/02/01v15.jpg", //ͼƬ��ַ
"alt":"�ٱ��Ʒ��� Beautyleg ����д�� No.2014 Vicni", //ͼƬ����
"meizihref":"http://m.mzitu.com/58156",
"originhref":"http://m.mzitu.com/58156/15",
"picview":218595, //ͼƬ�����
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
"homesite":{"href":"http://m.mzitu.com","name":"����ͼ"}
}

```

fail data:

{"message":"Cannot read property 'meizi_ids' of null","request":"/meizi/random?type=asd"}

### pic api

/pic/random?type=

type : ['�Ը�', '̨��', '�崿', '�ձ�']

success data: 

```

{
"_id":"58c42acb4cbf4b4e7769f293",
"title":"�ٱ��Ʒ��� Beautyleg ����д�� No.2014 Vicni��15��",
"url":"http://i.meizitu.net/2016/02/01v15.jpg", //ͼƬ��ַ
"alt":"�ٱ��Ʒ��� Beautyleg ����д�� No.2014 Vicni", //ͼƬ����
"meizihref":"http://m.mzitu.com/58156",
"originhref":"http://m.mzitu.com/58156/15",
"picview":218595, //ͼƬ�����
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
"homesite":{"href":"http://m.mzitu.com","name":"����ͼ"}
}

```

fail data:

{"message":"Cannot read property 'meizi_ids' of null","request":"/meizi/random?type=asd"}

### categories api
/categories?limit=50

```

success data:

[{"_id":"58c6640b88c2d71748b023a6","name":"FeiLin(������)","__v":0,"CreateAt":1489396737709},{"_id":"58c6640b88c2d71748b023a8","name":"����Բ��(����ϣ)","__v":0,"CreateAt":1489396737709},{"_id":"58c6640b88c2d71748b023aa","name":"�Ը���Ů","__v":0,"CreateAt":1489396737709},{"_id":"58c6640b88c2d71748b023ac","name":"ʪ���ջ�","__v":0,"CreateAt":1489396737709},{"_id":"58c6640c88c2d71748b023ae","name":"����(����)","__v":0,"CreateAt":1489396737709}]

```