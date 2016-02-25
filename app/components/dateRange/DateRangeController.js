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
        //--------- drop down --------------------
        self.choicesDate = [
            'Previous Month',
            'Previous Week',
            'Today',
            'Current Week',
            'Current Month'
          ];

          
         self.setRange = function(item){
            switch (item){
                case 'Previous Month':
                    self.setPreviousMonth();
                    break;
                case 'Previous Week':
                    self.setPreviousWeek();
                    break;
                case 'Today':
                    self.dtFrom = new Date();
                    self.dtTo = new Date();
                    break;
                case 'Current Week':
                    self.setCurrentWeek();
                    break;
                case 'Current Month':
                    self.setCurrentMontMonth();
                    break;
            }
         };
        
            //--------------  date picker  ------------
            self.clear = function() {
            self.dtFrom = null;
            self.dtTo = null;
            };
            self.setPreviousWeek = function(){
              var from =  moment().subtract(1, 'weeks').startOf('isoWeek');
              var to  = moment().subtract(1, 'weeks').endOf('isoWeek');
              self.dtFrom = new Date(from);
              self.dtTo = new Date(to);
            };
            self.setPreviousMonth = function(){
                  var from =  moment().subtract(1,'months').startOf('month').format('YYYY-MM-DD');
                  var to  = moment().subtract(1,'months').endOf('month').format('YYYY-MM-DD');
                  self.dtFrom = new Date(from);
                  self.dtTo = new Date(to);
              };
            self.setCurrentWeek = function(){
                var from =  moment().startOf('week').format('YYYY-MM-DD');
                var to  = moment().format('YYYY-MM-DD');
                self.dtFrom = new Date(from);
                self.dtTo = new Date(to);
            };
            self.setCurrentMontMonth = function(){
                  var from =  moment().startOf('month').format('YYYY-MM-DD');
                  var to  = moment().format('YYYY-MM-DD');
                  self.dtFrom = new Date(from);
                  self.dtTo = new Date(to);
              };

          // Disable weekend selection
          self.disabled = function(date, mode) {
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
          };

          self.toggleMin = function() {
            self.minDate = self.minDate ? null : new Date();
          };

          self.toggleMin();
          self.maxDate = new Date(2020, 5, 22);

          self.open1 = function() {
            self.popup1.opened = true;
          };

          self.open2 = function() {
            self.popup2.opened = true;
          };

         /* self.setDate = function(year, month, day) {
            self.dt = new Date(year, month, day);
          };*/

          self.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
          };

          self.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
          self.format = self.formats[0];
          self.altInputFormats = ['M!/d!/yyyy'];

          self.popup1 = {
            opened: false
          };

          self.popup2 = {
            opened: false
          };

/*          var tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          var afterTomorrow = new Date();
          afterTomorrow.setDate(tomorrow.getDate() + 1);
          self.events =
            [
              {
                date: tomorrow,
                status: 'full'
              },
              {
                date: afterTomorrow,
                status: 'partially'
              }
            ];

          self.getDayClass = function(date, mode) {
            if (mode === 'day') {
              var dayToCheck = new Date(date).setHours(0,0,0,0);

              for (var i = 0; i < self.events.length; i++) {
                var currentDay = new Date(self.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                  return self.events[i].status;
                }
              }
            }

            return '';
          };*/
        
        //-------------------------------------
        self.getImages = function(){
            
        };
    
        self.init = function(){
            self.xx = "Initial";
            self.dateRange = "Today";
            self.dtFrom = new Date();
            self.dtTo = new Date();
            console.log("Image viewer initialized");
        };
        self.init();
    }]);