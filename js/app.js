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
    
      app.controller('TabController', function(){
          
      });
    
	  app.controller ('LoginController', ['requestService', function( requestService){
		  var self = this;
		  self.formData = {
                firstname: "default",
                lastname:"default",
                username:"default",
                passwrd:"default",
                emailaddress: "default",
                textareacontent: "default",
                gender: "default",
                member: false,
                file_profile: "default",
                file_avatar: "default"
			};
			
			self.save = function() {
				self.formData = self.form;
			};

			self.submitForm = function() {        
				self.formData = self.form;
				console.log(self.formData);
				requestService.loginRequest( self.formData)
				.then(function mysuccess (response){
                    debugger;
					console.log("success: "+ response.data); 
                    if (response.data.length === 0){
                        console.log("No record found");
                    }else{
                        console.log("Welcome "+ response.data.username);
                    }
				}, function myError (response){
                    debugger;
                    console.log("ERROR : "+ response.statusText);
                });
			};
			
			self.init = function(){
			};

			self.init();
	  }]);
	  
	  
  })();
