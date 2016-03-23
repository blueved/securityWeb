app.controller('ImageViewerCtrl', function ($scope) {
    var self = this;
    self.noWrapSlides = false;
    self.active = 10;
    self.myInterval = 400;
    self.playMode = true;
    self.playLabel = self.playMode?"Pause":"Play";
    var currInterval =  self.myInterval;

    var slides = self.slides = [];
    self.currIndex = 0;
    self.toggleSlider = function(){
        
        if (self.playMode){
            self.myInterval = currInterval;
            self.playMode = false;
        }else{
            currInterval = self.myInterval;
            self.playMode = true;
            self.myInterval = 0;
        }
    };

    /*self.addSlide = function() {
        var newWidth = 600 + slides.length + 1;
        slides.push({
          image: 'http://lorempixel.com/' + newWidth + '/300',
          text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
          id: self.currIndex++
        });
    };

    self.randomize = function() {
        var indexes = generateIndexesArray();
        assignNewIndexesToSlides(indexes);
    };

    

    // Randomize logic below

    function assignNewIndexesToSlides(indexes) {
        for (var i = 0, l = slides.length; i < l; i++) {
          slides[i].id = indexes.pop();
        }
    }

    function generateIndexesArray() {
    var indexes = [];
        for (var i = 0; i < self.currIndex; ++i) {
          indexes[i] = i;
        }
        return shuffle(indexes);
    }

    // http://stackoverflow.com/questions/962802#962890
    function shuffle(array) {
        var tmp, current, top = array.length;

        if (top) {
          while (--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
          }
        }

        return array;
    }*/
});