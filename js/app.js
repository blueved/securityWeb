(function() {
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
    
	app.controller('MainController', function(){
		  var self = this;
          self.showTabs = false;
    }); 
    
    app.controller( "TestController", ["$http", function($http){
        var self = this;
        self.testBtn = function(){
            $http({url: '/userList', method:'GET'})
            .then(function reussite(data){
                console.log("## ", JSON.stringify(data));
                self.xx = "Liste finale";
                self.userList = data.data;
            }, function echec (status){
                console.log("echec");
                self.xx = "Final echec";
            });
        };
        self.init = function(){
            self.xx = "Initial";
        };
        self.init();
    }]);
    
    app.controller('TabController', function(){
          
	});
    
	  
	  
	  
  })();
