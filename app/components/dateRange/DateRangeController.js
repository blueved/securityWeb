app.controller( "DateRangeController", ["$http", function($http){
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


        
        //-------------------------------------
        self.getImages = function(){
            
        };
    
       
    }]);