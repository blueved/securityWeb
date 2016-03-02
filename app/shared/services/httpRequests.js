(function(){
    var app = angular.module('securityApp', []);
    
    app.factory('requestService', function($http){
        var factory = {
            loginRequest: loginRequest,
            userList: userList,
            imageList: imageList
        };
            
        return factory;
        
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        var loginRequest = function(data){
            var url = "/logingRequest"; 
            console.log("sending loging request");
            return $http({  method: 'GET',  url: url, params: data});
        };
        
        var userList = function(){
            var url = "userList/"; 
            return $http({  method: 'GET',  url: url});
        };
        
        var imageList = function(dateFrom, dateTo){
            var url = "imageList/";
            var param = {dateFrom:dateFrom, dateTo:dateTo};
            return $http({mehtod:"POST", url:url, param:param });
        }
		  
		  
	  });
})();