app.controller('ImageViewerCtrl', function ($scope) {
    var self = this;
    self.noWrapSlides = false;
    self.active = 0;
    self.myInterval = 1000;
    var currInterval =  self.myInterval;
    var slides = self.slides = [];
    self.currIndex = 0;
    
    var init = function(){
        self.noWrapSlides = true;;
    };
    
    
    self.toggleSlider = function(){        
        if(self.myInterval > 0){
            currInterval = self.myInterval;           
            self.myInterval = 0;
        }else{
            self.myInterval = currInterval;
        }
    };
    
    init();
});