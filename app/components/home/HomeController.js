app.controller('HomeController',  ["requestService", function(requestService){
    var self = this;
    self.init = function (){
        self.dateFrom = new Date();
        self.dateTo = new Date();
        
        requestService.test()
        .then(function success (data){console.log('ca marche'); console.log(data);},
              function papate(){console.log('banane');});
        console.log("home controller loaded");
    }
    self.init();
     
}]); 