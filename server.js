var c = require('./constants.js');
var Hapi = require('hapi');
var MisfitAPI = require('misfit-cloud-api'); 

var mySettings = {
    clientKey: c.clientKey,
    clientSecret: c.clientSecret,
    redirect_uri: 'http://127.0.0.1:4008/misfit/code',
};
var misfitApi = new MisfitAPI(mySettings);
var maintoken;
var mainresult;

approutes = [
  {
    method: 'GET',
    path: '/misfit/login',
    config: {
	handler: function(request, reply){
		misfitApi.authorize(function(err,redirectURL){
			reply.redirect(redirectURL);
		});
    	}
    }
  },
  {
    method: 'GET',
    path: '/misfit/data',
    config: {
	handler: function(request, reply){
		reply(mainresult);
    	}
	}
  },
  {
    method: 'GET',
    path: '/misfit/code',
    config: {
	handler: function(request, reply){
		misfitApi.exchange(request.query.code, function(err,token){
		  if(err){
		    console.log(err);
		    reply(err);
		  }
		  maintoken = token;
		  misfitApi.getProfile({token:token.access_token},function(err,profile){
		    if(err) { console.log(err); }
		    if(profile&&profile.userId){
			misfitApi.getSummary({
			    token: maintoken.access_token,
			    start_date:'2015-01-01',
			    end_date:'2015-01-29',
			    detail:true
			},
			function(err,result){
			    if (err || !result) {
			        return console.log(err);
			    } else {
				mainresult = result;
				reply.redirect("/");
			    }
			});
		    }else{
		      console.log(profile);
		    }
		  })
		});
    	}
     }
  },

  {
    method: 'GET',
    path: '/',
    handler: function(request,reply) {
	    if(mainresult == null) {
		    reply.redirect("/misfit/login");
	    } else {
		    reply.file("public/index.html");
	    }
    }
  }


];

var server = new Hapi.Server();
server.connection({ host: '::', port: 4008 });
server.route(approutes);
server.start(function (err) {
  console.log('Server running at:', server.info.uri);
});
