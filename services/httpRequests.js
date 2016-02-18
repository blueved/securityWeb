(function(){
    var app = angular.module('securityApp', []);
    
    app.factory('requestService', function($http){
		  var factory = {};
		  factory.loginRequest = function(data){
				var url = "/logingRequest"; 
                console.log("sending loging request");
				return $http({  method: 'GET',  url: url, params: data});
		  };
		  factory.userList = function(){
				var url = "userList/"; 
				return $http({  method: 'GET',  url: url});
		  };
		  
		  return factory;
	  });
})();