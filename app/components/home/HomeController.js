app
.filter('filterPath', function(){
    return function(filename){
        var str = filename.replace('/home/pi/securityServer/', '/public/');
        return str;
    }
})
.controller('HomeController',  ["requestService", function(requestService){
    var self = this;
    self.imgList = [];

    self.getImages = function(){
        requestService.imageList(self.dateFrom,self.dateTo )
        .then(function ole(data){
            console.log('Oleee ', data);
            var tmp = data.data;
            self.imgList = [];
            var max = tmp.length;
            for (var i = 0; i < max ;i++){
                self.imgList.push({
                    src:(tmp[i]).filename.replace('/home/pi/securityServer/', '/public/'),
                    id : i
                });
            }
        },
        function zut(status){
            console.log('zut');});
    };
    
    self.getAllImages = function(){
        requestService.imageList( )
    };
    
    self.init = function (){
        self.dateFrom = new Date();
        self.dateTo = new Date();
        
    }
    self.init();
     
}]); 