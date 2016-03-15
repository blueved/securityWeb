(function(){
    
    
    app.factory('requestService', function($http){
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        var test = function(){
            var url = "/test";
            return $http({method : "GET", url: url});
        };
        
        var loginRequest = function(data){
            var url = "/logingRequest"; 
            console.log("sending loging request");
            return $http({  method: 'GET',  url: url, params: data});
        };
        
        var userList = function(){
            var url = "/userList/"; 
            return $http({  method: 'GET',  url: url});
        };
        
        var imageList = function(dateFrom, dateTo){
            var url = "/images";
            if(typeof dateFrom != 'undefined' && typeof dateTo != 'undefined'){
                var f = moment(dateFrom).format("YYYY-MM-DD HH:MM:ss");
                var t = moment(dateTo).format("YYYY-MM-DD HH:MM:ss");
                url += "/"+f+"/"+t;
            }
                        
            return $http({mehtod:"GET", url:url});
        };
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        var factory = {
            loginRequest: loginRequest,
            userList: userList,
            imageList: imageList,
            test: test
        };
            
        return factory;
        
        
        
		  
		  
	  });
})();