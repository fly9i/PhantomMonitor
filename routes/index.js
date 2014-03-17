
/*
 * GET home page.
 */
var phantom=require('../module/phantomjs');
exports.index = function(req, res){
	var url=req.query.url;
	if(url){
		console.log("Check url is:"+url);
		try{
			phantom.handle(url,function(err,requests,responses){
				//res.render('index', { content: JSON.stringify(requests) });
				if(err){
					res.send(err);
				}
				res.send({'reqs':requests,'reses':responses});
			});
		}catch(err){
			res.send(err);	
		}
	}else{
		res.send({code:404,err:"url must be input to check."})
	}

	//res.render('index', { content: "JSON.stringify(req)" });
};

exports.test = function(req,res){
	res.render('test');
}