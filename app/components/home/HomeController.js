app.controller('HomeController', function(){
    var self = this;
    self.init = function (){
        self.dateFrom = new Date();
        self.dateTo = new Date();
        
        console.log("home controller loaded");
    }
    self.init();
     
}); 