var path=__dirname+"/phantomjs";
var ph=require('node-phantom');
exports.handle=function(url,callback,reqfunc,resfunc){
	if(typeof url != 'string'){
		callback({code:-1,msg:'Error type of url,the input url is:'+url});
		return;
	}
	console.log("Start to check the url:"+url);
	logout(url,callback,reqfunc,resfunc);
}

function logout(url,callback,reqfunc,resfunc){
	var req=[];
	var res=[];
	ph.create(function(err,phantom){
		if(err){ 
			console.log("FEI:create phantom err.");
			console.log(err);
			return;
		}

		phantom.createPage(function(err,page){
			//page.settings.userAgent="Mozilla/5.0 (compatible; AGCheckSpider/1.0; +http://www.agrantsem.com/) Safari/537.36";
			console.log(JSON.stringify(page,undefined,4));
			if(err){
				console.log("FEI:create page err.");
				console.log(err);
				return ;
			}
			pageOut(page,function(err,req1,res1){
				req=req.concat(req1);
				res=res.concat(res1);
				callback(null,req,res);
				page.evaluate(function(){
					console.log("test");
				})
			});
			console.log("Open url:"+url);
			page.open(url);
		});
	},{phantomPath:path});
}

function pageOut(page,callback,reqfunc,resfunc){
	var req=[];
	var res=[];
	page.onResourceRequested = function(request) {
		//console.log(JSON.stringify(arguments,undefined,4));
	   // nr.setHeader("User-Agent","Mozilla/5.0 (compatible; AGCheckSpider/1.0; +http://www.agrantsem.com/) Safari/537.36");
	    if(reqfunc){
	    	reqfunc(request);
	    }
	    req.push(request);
	};
	page.onResourceReceived = function(response) {
	    //console.log('Receive ' + JSON.stringify(response,undefined,4));
	    if(resfunc){
	    	resfunc(response);
	    }
	    res.push(response);
	};
	page.onLoadFinished = function(status){
		if(callback){
			callback(null,req,res);
		}
	}
}
